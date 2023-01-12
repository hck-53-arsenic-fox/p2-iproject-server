"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Product extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Product.belongsTo(models.Category, {
                foreignKey: "CategoryId",
            });
        }
    }
    Product.init(
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: {
                        msg: "Product name is required",
                    },
                    notEmpty: {
                        msg: "Product name is required",
                    },
                },
            },
            size: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: {
                        msg: "size is required",
                    },
                    notEmpty: {
                        msg: "size is required",
                    },
                },
            },
            stock: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    notNull: {
                        msg: "stock is required",
                    },
                    notEmpty: {
                        msg: "stock is required",
                    },
                },
            },
            description: DataTypes.TEXT,
            price: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    notNull: {
                        msg: "price is required",
                    },
                    notEmpty: {
                        msg: "price is required",
                    },
                },
            },
            CategoryId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    notNull: {
                        msg: "category is required",
                    },
                    notEmpty: {
                        msg: "category is required",
                    },
                },
            },
            imageUrl: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "Product",
        }
    );
    return Product;
};
