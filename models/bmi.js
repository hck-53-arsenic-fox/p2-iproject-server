'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BMI extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  BMI.init(
    {
      country: DataTypes.STRING,
      iso_a3: DataTypes.STRING,
      currency_code: DataTypes.STRING,
      local_price: DataTypes.FLOAT,
      dollar_ex: DataTypes.FLOAT,
      rupiah_ex: DataTypes.FLOAT,
      rupiah_ex_10000: DataTypes.FLOAT,
      dollar_price: DataTypes.FLOAT,
      rupiah_price: DataTypes.FLOAT,
      dollar_ppp: DataTypes.FLOAT,
      rupiah_ppp: DataTypes.FLOAT,
      rupiah_ppp_10000: DataTypes.FLOAT,
      GDP_bigmac: DataTypes.FLOAT,
      dollar_valuation: DataTypes.FLOAT,
      rupiah_valuation: DataTypes.FLOAT,
    },
    {
      sequelize,
      modelName: 'BMI',
    }
  );
  return BMI;
};
