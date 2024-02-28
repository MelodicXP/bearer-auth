'use strict';

const base64 = require('base-64');
const { user } = require('../models/index.js');

function authError(res) {
  res.status(401).send('Authentication Required'); // Use 401 for "Unauthorized"
}

module.exports = async (req, res, next) => {

  if (!req.headers.authorization) { return authError(res); }

  let basic = req.headers.authorization;
  let [username, pass] = base64.decode(basic).split(':');

  try {
    req.user = await user.authenticateBasic(username, pass);
    next();
  } catch (e) {
    console.error(e);
    res.status(403).send('Invalid Login');
  }

};
