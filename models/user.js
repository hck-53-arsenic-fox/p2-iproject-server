'use strict';
const {hashPassword} = require("../helper/bcrypt")
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    username: {
      type:  DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {msg: "Please insert your name"},
        notNull: {msg: "Please insert your name"}
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {msg: "Email is already registered"},
      validate: {
        isEmail: {msg: "Incorrect email format"},
        notEmpty: {msg: "Email is required"},
        notNull: {msg: "Email is required"},
      }
    }, 
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {msg: "Password is required"},
        notNull: {msg: "Password is required"},
        len: {
          msg: "Password length at least 5 characters",
          args: [5, 255]
        }
      }
    },
    profilePicture: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: {msg: "profilePicture"},
        notEmpty: {msg: "profilePicture"}
      }
    },
    isSubscribed: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate((user)=>{
    user.password = hashPassword(user.password)
    user.isSubscribed = false
  })
  return User;
};