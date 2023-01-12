'use strict';
const {
  Model
} = require('sequelize');
const { hashPass } = require('../helpers/bcryptjs');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsToMany(models.Doctor, {through: 'Transaction'})
    }
  }
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true, 
        msg: 'Email must be unique'
      },
      validate:{
        isEmail: {msg: 'Invalid email format'},
        notEmpty: {msg: 'Email is required'},
        notNull: {msg: 'Email is required'}
      }
    },
    password:{ 
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notEmpty:{msg: 'Password is required'},
        notNull: {msg: 'Password is required'}
      }
    },
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate((user) => {
    user.password = hashPass(user.password)
  })
  return User;
};