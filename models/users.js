'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword } = require('../helper/bcrypt');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Users.hasOne(models.Invitations)
      Users.hasMany(models.Greets)
    }
  }
  Users.init({    
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull : {
          msg: "Email is Required!"
        },
        notEmpty : {
          msg: "Email is Required!"
        },
        isEmail: {            
          msg: "Format Email Invalid!"
        },
      }
    },
    
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty : {
          msg: "Password is Required!"
        },
        notNull : {
          msg: "Password is Required!"
        },
        len: {
            args: [5,20],
            msg: "Password min. 5 characters"
        }
      }
    },
    role: DataTypes.STRING,
    status: DataTypes.STRING,
    link_invitation: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull : {
          msg: "Link Undangan Mohon diisi"
        },
        notEmpty : {
          msg: "Link Undangan Mohon diisi"
        }
      }
    },
  }, {
    sequelize,
    modelName: 'Users',
  });


  Users.beforeCreate((user) => {
    user.password = hashPassword(user.password)    
    user.status = "silver"
  })

  return Users;
};