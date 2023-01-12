"use strict";
const { Model } = require("sequelize");
const { hashPassword } = require("../helpers/bcrypt");
module.exports = (sequelize, DataTypes) => {
    class Customer extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Customer.init(
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: {
                        msg: "name is requireed",
                    },
                    notEmpty: {
                        msg: "name is requireed",
                    },
                },
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: {
                    args: true,
                    msg: "Email address already in use!",
                },
                validate: {
                    notNull: {
                        msg: "email is required",
                    },
                    notEmpty: {
                        msg: "email is required",
                    },
                    isEmail: {
                        msg: "Invalid email format",
                    },
                },
            },
            phoneNumber: DataTypes.STRING,
            password: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: {
                        msg: "password is requireed",
                    },
                    notEmpty: {
                        msg: "password is requireed",
                    },
                    customValidator(value) {
                        if (value.length < 5 && value.length > 0) {
                            throw new Error("minimum password is 5");
                        }
                    },
                },
            },
            address: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "Customer",
        }
    );
    Customer.beforeCreate(function (customer) {
        customer.password = hashPassword(customer.password);
    });
    return Customer;
};
