'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RentData extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Console, {foreignKey: 'ConsoleId'})
    }
  }
  RentData.init({
    user: DataTypes.STRING,
    day: DataTypes.INTEGER,
    ConsoleId: DataTypes.INTEGER,
    GameId: {
      type: DataTypes.ARRAY(DataTypes.INTEGER)
    },
    total_price: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'RentData',
  });
  return RentData;
};