'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword } = require('../helpers/bcrypt')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Favorite,{foreignKey:'UserId'})
    }
  }
  User.init({
    username: {type:DataTypes.STRING,
    validate:{notEmpty:{message:'Username Required'}}
    },
    email: {type:DataTypes.STRING,
    validate:{isEmail:{message:'Invalid Email Format'},notEmpty:{message:'Email Required'}}
    },
    password: {type:DataTypes.STRING,
    validate:{notEmpty:{message:'Password Required'}}
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate((user)=>{
    user.password = hashPassword(user.password)
  })
  return User;
};