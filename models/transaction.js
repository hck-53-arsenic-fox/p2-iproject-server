"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Transaction.belongsTo(models.User);
      Transaction.belongsTo(models.Exhibition);
    }
  }
  Transaction.init(
    {
      title: DataTypes.STRING,
      description: DataTypes.TEXT,
      isPay: DataTypes.BOOLEAN,
      ExhibitionId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Exhibition",
          key: "id",
        },
      },
      UserId: {
        type: DataTypes.INTEGER,
        references: {
          model: "User",
          key: "id",
        },
      },
      isTour: {
        type: DataTypes.BOOLEAN,
      },
    },
    {
      sequelize,
      modelName: "Transaction",
    }
  );
  return Transaction;
};
