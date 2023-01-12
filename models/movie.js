'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Movie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Movie.hasMany(models.Schedule)
    }
  }
  Movie.init({
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    imageUrl: DataTypes.STRING,
    trailer: DataTypes.STRING,
    duration: DataTypes.INTEGER,
    producer: DataTypes.STRING,
    director: DataTypes.STRING,
    writer: DataTypes.STRING,
    cast: DataTypes.STRING,
    distributor: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Movie',
  });
  return Movie;
};