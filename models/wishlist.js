'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Wishlist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Wishlist.belongsTo(models.User, { foreignKey: 'UserId' })
      Wishlist.belongsTo(models.Product, { foreignKey: 'ProductId' })
    }
  }
  Wishlist.init({
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'User ID cannot be empty'
        },
        notEmpty: {
          msg: 'User ID cannot be empty'
        }
      }
    },
    ProductId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Product ID cannot be empty'
        },
        notEmpty: {
          msg: 'Product ID cannot be empty'
        },
        async unique(value) {
          try {
            const wishlist = await Wishlist.findOne({
              where: {
                ProductId: value,
                UserId: this.UserId,
              },
            });

            if (wishlist) {
              throw "Product in your wishlist already";
            }
          } catch (err) {
            throw "Product in your wishlist already";
          }
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Wishlist',
  });
  return Wishlist;
};