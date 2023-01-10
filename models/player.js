'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Player extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Player.hasMany(models.Favorite)
    }
  }
  Player.init({
    name: DataTypes.STRING,
    teamName: DataTypes.STRING,
    teamShort: DataTypes.STRING,
    playerNumber: DataTypes.INTEGER,
    height: DataTypes.STRING,
    weight: DataTypes.STRING,
    birthDate: DataTypes.STRING,
    country: DataTypes.STRING,
    experience: DataTypes.INTEGER,
    lastAttended: DataTypes.STRING,
    age: DataTypes.INTEGER,
    imgUrl: DataTypes.STRING,
    logoUrl: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Player',
  });
  return Player;
};