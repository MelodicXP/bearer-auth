'use strict';

require('dotenv').config();

// Import Sequelize library
const { Sequelize, DataTypes } = require('sequelize');

// Import Model definitions
const userSchema = require('./user-schema.js');

// TODO - Create Collection to be imported here


// Connect to database for testing purpose, or connect to database from env
const DATABASE_URL = process.env.NODE_ENV === 'test' 
  ? 'sqlite:memory' 
  : process.env.DATABASE_URL;

// Configure database with dialect options
const DATABASE_CONFIG = process.env.NODE_ENV === 'production' ? {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
} : {};

// Initialize single instance of Sequelize with database configuration
const sequelizeDatabase = new Sequelize(DATABASE_URL, DATABASE_CONFIG);

// Initialize User Model
const userModel = userSchema(sequelizeDatabase, DataTypes);

// TODO Create Collection here

// Export sequelizeDatabase instance and models
module.exports = {
  sequelizeDatabase,
  userModel,
};