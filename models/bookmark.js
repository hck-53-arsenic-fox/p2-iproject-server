'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Bookmark extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Bookmark.belongsTo(models.User)
    }
  }
  Bookmark.init({
    name: DataTypes.STRING,
    type: DataTypes.STRING,
    UserId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    image_url: DataTypes.STRING,
    website: DataTypes.STRING,
    trip_advisor: DataTypes.STRING,
    price: DataTypes.STRING,
    ranking: DataTypes.STRING,
    location_id: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Bookmark',
  });
  return Bookmark;
};