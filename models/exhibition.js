"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Exhibition extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Exhibition.hasMany(models.Transaction);
    }
  }
  Exhibition.init(
    {
      title: DataTypes.STRING,
      artist: DataTypes.STRING,
      description: DataTypes.TEXT,
      image: DataTypes.STRING,
      date: DataTypes.DATE,
      price: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Exhibition",
    }
  );
  return Exhibition;
};
