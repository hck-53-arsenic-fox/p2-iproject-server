'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Transaction.belongsTo(models.User, { foreignKey: "UserId" })
      Transaction.belongsTo(models.Room, { foreignKey: "RoomId" })
      Transaction.hasOne(models.IdentityUser, { foreignKey: "TransactionId" })
    }
  }
  Transaction.init({
    status: DataTypes.STRING,
    UserId: DataTypes.INTEGER,
    RoomId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Transaction',
  });
  
  return Transaction;
};