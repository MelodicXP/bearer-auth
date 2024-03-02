'use strict';

const express = require('express');
const authRouter = express.Router();

const basicAuth = require('../middleware/basic.js');
const bearerAuth = require('../middleware/bearer.js');
const accessControl = require('../middleware/access-control-list.js');

const {
  handleSignin,
  handleSignup,
  handleGetUsers,
  handleSecret,
} = require('./handlers.js');

authRouter.post('/signup', handleSignup);
authRouter.post('/signin', basicAuth, handleSignin);
authRouter.get('/users', bearerAuth, handleGetUsers);
authRouter.get('/secret', bearerAuth, handleSecret);

// Routes for authorization, acl takes in the capability
authRouter.post('/create', bearerAuth, accessControl('create'), (req, res, next) => {
  res.status(200).send('You have create permission');
});

// Routes for authorization, acl takes in the capability
authRouter.get('/read', bearerAuth, accessControl('read'), (req, res, next) => {
  res.status(200).send('You have read permission');
});

// Routes for authorization, acl takes in the capability
authRouter.put('/update', bearerAuth, accessControl('update'), (req, res, next) => {
  res.status(200).send('You have update permission');
});

// Routes for authorization, acl takes in the capability
authRouter.delete('/delete', bearerAuth, accessControl('delete'), (req, res, next) => {
  res.status(200).send('You have delete permission');
});
module.exports = authRouter;