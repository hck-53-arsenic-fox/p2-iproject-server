'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword } = require('../helper');
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
    userName: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{
          msg:'User Name is required'
        },
        notEmpty:'User Name is required'
      }
    },
    password:  {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{
          msg:'Password is required'
        },
        notEmpty:'Password is required'
      }
    },
    email:  {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{
          msg:'Email is required'
        },
        notEmpty:'Email is required'
      }
    },
    isSubscribed:{
      type:DataTypes.BOOLEAN
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate((user)=>{
    user.password=hashPassword(user.password)
    user.isSubscribed=false
  })
  return User;
};