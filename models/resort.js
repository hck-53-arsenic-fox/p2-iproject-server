'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Resort extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Resort.belongsTo(models.User)
    }
  }
  Resort.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true
      }
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true
      }
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true
      }
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true
      }
    }
  }, {
    sequelize,
    modelName: 'Resort',
  });
  return Resort;
};