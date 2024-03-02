'use strict';

require('dotenv').config();

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET || 'IsItSecret,IsItSafe?';

const userSchema = (sequelize, DataTypes) => {
  const model = sequelize.define('User', {
    username: { 
      type: DataTypes.STRING, 
      allowNull: false, 
      unique: true,
    },
    password: { 
      type: DataTypes.STRING, 
      allowNull: false, 
    },
    role: { // Add role to users created, stored in database
      type: DataTypes.ENUM('user', 'writer', 'editor', 'admin'),
      defaultValue: 'user',
    },

    // Create token for user
    token: {
      type: DataTypes.VIRTUAL,
      get() {
        return jwt.sign({ // header
          username: this.username, // payload
          capabilities: this.capabilities, // payload (include capabilities based on user's role)
        },
        SECRET, // signature
        {
          expiresIn: 1000 * 60  * 15, //expires 15 mins
        });
      },
    },
    // Capabilities based on user role saved in database
    capabilities: {
      type: DataTypes.VIRTUAL,
      get() {
        const acl = {
          user: ['read'],
          writer: ['read', 'create'],
          editor: ['read', 'create', 'update'],
          admin: ['read', 'create', 'update', 'delete'],
        };
        return acl[this.role];
      },
    },
  });


  model.beforeCreate(async (user) => {
    let hashedPass = await bcrypt.hash(user.password, 10);
    console.log('hashed password in beforeCreate: ', hashedPass);
    user.password = hashedPass;
  });

  // Basic AUTH: Validating strings (username, password) 
  model.authenticateBasic = async function (username, password) {
    const user = await this.findOne({ where: { username: username }});
    const valid = await bcrypt.compare(password, user.password);
    if (valid) { return user; }
    throw new Error('Invalid User');
  };

  // Bearer AUTH: Validating a token and re-issuing a new one
  model.authenticateToken = async function (token, res) {
    try {
      const parsedToken = jwt.verify(token, SECRET);

      const user = await this.findOne( { where: { username: parsedToken.username } });

      if (user && res) { 
        // Re-issue a new token
        const newToken = jwt.sign(
          { username: user.username },
          SECRET,
          { expiresIn: '15m' },
        );
        
        // Send new token back as header
        res.setHeader('Authorization', `Bearer ${newToken}`);
        

        // return user
        return user; 
      } else {
        throw new Error('User Not Found'); 
      }

    } catch (e) {
      throw new Error(e.message);
    }
  };

  return model;
};

module.exports = userSchema;