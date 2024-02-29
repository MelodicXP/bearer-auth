'use strict';

const { userModel } = require('../models/index.js');

module.exports = async (req, res, next) => {

  try {

    const authHeader = req.headers.authorization;
    console.log ('Full authorization taken from middleware: ', authHeader);
  
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(403).json({ error: 'Invalid Login' });
    }
  
    const authType = req.headers.authorization.split(' ')[0];
    console.log('Authtype taken from middleware: ', authType);
  
    const token = req.headers.authorization.split(' ')[1];
    console.log('Token taken from middleware: ', token);

    const validUser = await userModel.authenticateToken(token);

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