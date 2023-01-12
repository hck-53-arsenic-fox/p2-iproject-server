'use strict';
const bcrypt = require('bcryptjs')
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
      User.hasMany(models.Cinema)
    }
  }
  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false, 
      validate: {
        notEmpty: {msg: 'Name is required'},
        notNull: {msg: 'Name is required'}
      }
    },
    email:  {
      type: DataTypes.STRING,
      allowNull: false, 
      unique: true,
      validate: {
        notEmpty: {msg: 'Name is required'},
        notNull: {msg: 'Name is required'},
        isEmail: {msg: 'Invalid email format'}
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false, 
      validate: {
        notEmpty: {msg: 'Password is required'},
        notNull: {msg: 'Password is required'}
      }
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false, 
      validate: {
        notEmpty: {msg: 'Address is required'},
        notNull: {msg: 'Address is required'}
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate(user => {
    user.password = bcrypt.hashSync(user.password , 10)
  })
  return User;
};