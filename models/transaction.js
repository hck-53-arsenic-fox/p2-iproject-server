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
      Transaction.belongsTo(models.User)
      Transaction.belongsTo(models.Doctor)
    }
  }
  Transaction.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: {
      type: DataTypes.STRING,
      allowNull:false,
      validate:{
        notEmpty:{msg: 'Name is required'},
        notNull: {msg: 'Name is required'}
      }
    },
    date: {
      type: DataTypes.DATE,
      allowNull:false,
      validate:{
        notEmpty:{msg: 'Date is required'},
        notNull: {msg: 'Date is required'}
      }
    },
    UserId: DataTypes.INTEGER,
    DoctorId: DataTypes.INTEGER,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Transaction',
  });
  return Transaction;
};