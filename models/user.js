'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword } = require('../helpers/bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Favorite)
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      unique: { msg: "Username already used" },
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Username is required' },
        notNull: { msg: 'Username is required' }
      }
    },
    email: {
      type: DataTypes.STRING,
      unique: { msg: 'Email already registered' },
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Email is required' },
        notNull: { msg: 'Email is required' }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Password is required' },
        notNull: { msg: 'Password is required' }
      }
    },
    imgProfile: {
      type: DataTypes.STRING,
      defaultValue: "https://t4.ftcdn.net/jpg/03/46/93/61/360_F_346936114_RaxE6OQogebgAWTalE1myseY1Hbb5qPM.jpg"
    },
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate((user, option) => {
    user.password = hashPassword(user.password);
    user.status = "Regular";
  });
  return User;
};