'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Wage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Wage.init(
    {
      countryCode: DataTypes.STRING,
      countryName: DataTypes.STRING,
      bigMacPriceUsd: DataTypes.FLOAT,
      avgWageUsd: DataTypes.FLOAT,
      minutesToBuyBigMac: DataTypes.VIRTUAL,
    },
    {
      sequelize,
      modelName: 'Wage',
    }
  );
  return Wage;
};
