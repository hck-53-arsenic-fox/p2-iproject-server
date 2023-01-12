'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Theater extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Theater.hasMany(models.Schedule)

      Theater.belongsToMany(models.Movie , {through: models.Schedule})
    }
  }
  Theater.init({
    name: DataTypes.STRING,
    location: DataTypes.STRING,
    address: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    price: DataTypes.INTEGER,
    totalSeat: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Theater',
  });
  return Theater;
};