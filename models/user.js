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
    }
  }
  User.init({
    email: {
      type: DataTypes.STRING,
      unique:{
        msg: "Email must be Unique"
      },
      allowNull: false,
      validate:{
        isEmail:{
          msg: "Invalid Format Email"
        },
        notEmpty: {
          msg: "Email is Required"
        },
        notNull:{
          msg: "Email is Required"
        }

      }
    },
    password:{
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notNull:{
          msg: "Password is Required"
        },
        notEmpty:{
          msg: "Password is Required"
        }
      }

    },
    role: DataTypes.STRING,
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Name is Required"
        },
        notEmpty:{
          msg: "Name is Required"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  })
  User.beforeCreate((user) => {
    user.role = "Unsubscribe"
    user.password = hashPassword(user.password)
  })

  return User;
};