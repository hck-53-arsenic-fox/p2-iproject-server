'use strict';
const {
  Model
} = require('sequelize');
const { hassing } = require('../helpers/bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Log)
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: 'Username has been used'
      },
      validate: {
        notEmpty: {
          msg: 'Username cannot be empty'
        },
        notNull: {
          msg: 'Username cannot be empty'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: 'Email has been used'
      },
      validate: {
        notEmpty: {
          msg: 'Email cannot be empty'
        },
        notNull: {
          msg: 'Email cannot be empty'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Password cannot be empty'
        },
        notNull: {
          msg: 'Password cannot be empty'
        }
      }
    }
  }, {
    hooks: {
      beforeCreate: (user) => {
        user.password = hassing(user.password)
        user.isSubscribed = false
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};