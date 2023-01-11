'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class IdentityUser extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      IdentityUser.belongsTo(models.Transaction, { foreignKey: "TransactionId" })
    }
  }
  IdentityUser.init({
    image: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "E-KTP is required",
        },
        notEmpty: {
          msg: "E-KTP is required",
        },
      },
    },
    phoneNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Phone Number is required",
        },
        notEmpty: {
          msg: "Phone Number is required",
        },
      },
    },
    TransactionId : {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "TransactionId is required",
        },
        notEmpty: {
          msg: "TransactionId is required",
        },
      },
    }
  }, {
    sequelize,
    modelName: 'IdentityUser',
  });

  return IdentityUser;
};