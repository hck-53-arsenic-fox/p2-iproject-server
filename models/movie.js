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
      Movie.hasMany(models.Favorite,{foreignKey:'MovieId'})
    }
  }
  Movie.init({
    title: DataTypes.STRING,
    thumbnail: DataTypes.STRING,
    rating: DataTypes.STRING,
    year: DataTypes.INTEGER,
    description: DataTypes.STRING,
    trailer: DataTypes.STRING,
    genre: DataTypes.STRING,
    director: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Movie',
  });
  return Movie;
};