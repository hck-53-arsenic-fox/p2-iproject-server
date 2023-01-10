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
      User.hasMany(models.Cart, {foreignKey:"UserId"})
    }
  }
  User.init({
    username: DataTypes.STRING,
    email: {
      type:DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg:"Email already exist"
      },
      validate: {
        isEmail: true,
        notNull: {
          msg: 'Please enter your email'
        }
      }
    },
    password:{
      type:DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [5],
        notNull: {
          args: true,
          msg: 'Please enter your password'
        }
      }
    },
    phoneNumber: DataTypes.STRING,
    address: DataTypes.STRING,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate((user) => {
    user.password = hashPassword(user.password)
  })
  return User;
};