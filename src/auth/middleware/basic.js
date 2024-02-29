'use strict';

const base64 = require('base-64');
const { userModel } = require('../models/index.js');

// function authError(res) {
//   res.status(401).send('Authentication Required'); // Use 401 for "Unauthorized"
// }

module.exports = async (req, res, next) => {

  if (!req.headers.authorization || !req.headers.authorization.startsWith('Basic')) {
    throw new Error('Missing or invalid authorization header');
  }

  let basicHeaderParts = req.headers.authorization.split(' '); // ['Basic', 'am9objpmb28=']
  let encodedString = basicHeaderParts.pop(); // pop 'Basic' from array now is 'am9objpmb28='
  let decodedString = base64.decode(encodedString); // "username:password"
  let [username, pass] = decodedString.split(':'); // username, password

  try {
    req.user = await userModel.authenticateBasic(username, pass);
    next();
  } catch (e) {
    console.error(e);
    res.status(403).send('Invalid Login');
  }
};
