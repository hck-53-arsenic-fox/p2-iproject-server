'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Profile.belongsTo(models.Doctor)
    }
  }
  Profile.init({
    name: DataTypes.STRING,
    specialization: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    fee: DataTypes.INTEGER,
    DoctorId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Profile',
  });
  return Profile;
};