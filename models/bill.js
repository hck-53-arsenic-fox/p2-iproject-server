'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Bill extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Bill.init({
    month: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'month cannot be empty'
        },
        notNull: {
          msg: 'month cannot null'
        }
      }
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'month cannot be empty'
        },
        notNull: {
          msg: 'month cannot null'
        }
      }
    },
  }, {
    sequelize,
    modelName: 'Bill',
  });
  return Bill;
};