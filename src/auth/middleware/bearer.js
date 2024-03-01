'use strict';

require('dotenv').config();

const REISSUE_TOKEN_ON_EACH_REQUEST = process.env.REISSUE_TOKEN_ON_EACH_REQUEST;

const { userModel } = require('../models/index.js');

module.exports = async (req, res, next) => {

  try {

    const authHeader = req.headers.authorization;
  
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(403).json({ error: 'Invalid Login' });
    }

    const token = req.headers.authorization.split(' ')[1];

    // const validUser = await userModel.authenticateToken(token);
    const validUser = await userModel.authenticateToken(token, REISSUE_TOKEN_ON_EACH_REQUEST ? res : null);

    if(validUser){ 
      req.user = validUser; // Attach user to request object
      req.token = validUser.token; // Attach token to request object
      next(); // proceed to next middleware or route handler
    } else {
      return res.status(403).json({ error: 'User not found'});
    }
  } catch (e) {
    console.error(e);
    res.status(403).send('Invalid Login');
  }
};