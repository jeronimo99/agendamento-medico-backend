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
  if(!errors.isEmpty()) {
    return res.status(400).json({ error: 'Validation error.' });
  }

  const {username, password} = req.body;

  try {
    const user = await User.findOne({username});
    if (user) {
      return res.send(400).json({error: 'User already exists.'})
    }

    const hash = await bcrypt.hash(password, SALT_ROUNDS);

    const newUser = new User({username, password: hash, role: 'user'});
    await newUser.save();

    const token = jwt.sign(
      {username: newUser.username, role: newUser.role},
      TOKEN_SECRET,
      {expiresIn: TOKEN_EXPIRATION}
    )

    res.status(200).json({user: newUser.username, role: newUser.role, token});
  } catch (err) {
    console.log(err);
    next(err);
  }
}

const deleteController = async (req, res, next) => {
  try {
    const user = await User.deleteMany({});
    res.status(200).json({msg: 'All users deleted with success.'});
  } catch (err) {
    console.log(err);
    next(err);
  }
}

module.exports = {registerController, deleteController}