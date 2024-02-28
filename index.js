'use strict';

// Destructure start from server.js (starts server)
const { start } = require('./src/server.js');

// Start up DB Server
const { sequelizeDatabase } = require('./src/auth/models/index.js');

sequelizeDatabase.sync()
  .then(() => {
    console.log('Successful Connection!');
    // Start the web server
    start();
  });
