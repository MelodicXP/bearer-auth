'use strict';

// 3rd Party Resources
const express = require('express');
const cors = require('cors');

// Esoteric Resources
const errorHandler = require('./error-handlers/500.js');
const notFound = require('./error-handlers/404.js');
const authRoutes = require('./auth/router/index.js');

const PORT = process.env.PORT || 3000;

// Prepare the express app
const app = express();

// App Level MW
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use(authRoutes);

// Establish default route
app.get('/', (req, res, next) => {
  const message = 'Default route message';
  res.status(200).send(message);
});

// Catchalls
app.use(notFound);
app.use(errorHandler);

// Start Server
function start() {
  app.listen(PORT, () => console.log(`Server Up on ${PORT}`));
}

module.exports = {
  start, // to use in index.js at root
  app, // to use in testing
};