'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserBill extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserBill.belongsTo(models.User)
      UserBill.belongsTo(models.Bill)
    }
  }
  UserBill.init({
    UserId: DataTypes.INTEGER,
    BillId: DataTypes.INTEGER,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'UserBill',
  });

  UserBill.beforeCreate((userBill) => {
    userBill.status = 'Active';
  });

  return UserBill;
};