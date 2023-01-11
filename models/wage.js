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
      Wage.belongsTo(models.Country, { foreignKey: 'CountryCode' });
    }
  }
  Wage.init(
    {
      bigMacPriceUsd: DataTypes.FLOAT,
      avgWageUsd: DataTypes.FLOAT,
      CountryCode: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Wage',
    }
  );
  return Wage;
};
