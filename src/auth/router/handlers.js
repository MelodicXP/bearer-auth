'use strict';

const { userModel } = require('../models/index.js');

async function handleSignup(req, res, next) {
  try {
    let newUser = await userModel.create(req.body);

    // Log newUser record
    console.log('New User Created:', newUser.toJSON());

    // Now, log the request headers
    console.log('Request Headers:', req.headers);

    const output = {
      user: newUser,
      token: newUser.token,
    };

    res.status(201).json(output);
  } catch (e) {
    console.error(e);
    next(e);
  }
}

async function handleSignin(req, res, next) {
  try {
    const user = {
      user: req.user,
      token: req.user.token,
    };
    res.status(200).json(user);
  } catch (e) {
    console.error(e);
    next(e);
  }
}

async function handleGetUsers(req, res, next) {
  try {
    const userRecords = await userModel.findAll({});
    const list = userRecords.map(user => user.username);
    res.status(200).json(list);
  } catch (e) {
    console.error(e);
    next(e);
  }
}

function handleSecret(req, res, next) {
  res.status(200).send('Welcome to the secret area!');
}

module.exports = {
  handleSignup,
  handleSignin,
  handleGetUsers,
  handleSecret,
};