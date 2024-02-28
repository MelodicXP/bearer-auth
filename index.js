'use strict';

// Start up DB Server
const { db } = require('./src/auth/models/index.js');

// Destructure start from server.js (starts server)
const { start } = require('./src/server.js');
db.sync()
  .then(() => {

    // Start the web server
    start();
  });
