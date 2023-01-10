'use strict';
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
      User.hasMany(models.Favorite, {foreignKey: "UserId"})
    }
  }
  User.init({
    email: 
    {type: DataTypes.STRING,
      allowNull: false,
      unique: {msg: "Email already registered"},
      validate: {
        notEmpty: {msg: "Email cannot be empty"},
        isEmail: {msg: "Can only accept email format"}
      }
    },
    password: 
    {type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {msg: "Password cannot be empty"}
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};