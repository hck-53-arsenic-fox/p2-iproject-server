'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Doctor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Doctor.belongsToMany(models.User, {through: 'Transaction'})
      Doctor.belongsTo(models.Category)
    }
  }
  Doctor.init({
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    price: DataTypes.INTEGER,
    duration: DataTypes.INTEGER,
    imageUrl: DataTypes.TEXT,
    CategoryId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Doctor',
  });
  return Doctor;
};