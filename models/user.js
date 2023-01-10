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
      User.hasMany(models.Wishlist, { foreignKey: 'UserId' })
      User.hasMany(models.Cart, { foreignKey: 'UserId' })
    }
  }
  User.init({
    email: {
      type: DataTypes.STRING,
      unique: {
        msg: "Email has been exists"
      },
      allowNull: false,
      validate: {
        isEmail: {
          msg: 'Please type in email format'
        },
        notNull: {
          msg: 'Email cannot be empty'
        },
        notEmpty: {
          msg: 'Email cannot be empty'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Password cannot be empty'
        },
        notEmpty: {
          msg: 'Password cannot be empty'
        },
        len: {
          args: [5],
          msg: 'Minimal password character is 5'
        }
      }
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Username cannot be empty'
        },
        notEmpty: {
          msg: 'Username cannot be empty'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate(user => {
    user.password = hashPassword(user.password)
  })
  return User;
};