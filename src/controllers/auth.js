const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const User = require('../models/user');

const SALT_ROUNDS = 10;
const TOKEN_SECRET = process.env.TOKEN_SECRET;
const TOKEN_EXPIRATION = 30 * 60;

const registerController = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: 'Validation error.' });
  }

  const { name, phone, email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ error: 'User already exists.' });
    }

    const hash = await bcrypt.hash(password, SALT_ROUNDS);

    const newUser = new User({
      name,
      phone,
      email,
      password: hash,
      role: 'user',
    });
    await newUser.save();

    const token = jwt.sign(
      { email: newUser.email, role: newUser.role, _id: newUser._id },
      TOKEN_SECRET,
      { expiresIn: TOKEN_EXPIRATION }
    );

    res.status(200).json({ email: newUser.email, role: newUser.role, token });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const loginController = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: 'Validation error.' });
  }

  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Username does not exist.' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ error: 'Password is incorrect.' });
    }

    const token = jwt.sign(
      { email: user.email, role: user.role, _id: user._id },
      TOKEN_SECRET,
      { expiresIn: TOKEN_EXPIRATION }
    );

    res.status(200).json({ user: user.email, role: user.role, token });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const deleteController = async (req, res, next) => {
  try {
    await User.deleteMany({});
    res.status(200).json({ msg: 'All users deleted with success.' });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports = { registerController, loginController, deleteController };
