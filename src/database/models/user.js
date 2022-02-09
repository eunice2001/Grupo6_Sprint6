'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasOne(models.Address,{
        foreignKey: 'user_id',
        as: "addresses"
      });
      User.hasOne(models.Order,{
        foreignKey:"user_id",
        as:"orders"
      })
    }
  }
  User.init({
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING,
    pass: DataTypes.STRING,
    avatar_id: DataTypes.INTEGER,
    rol_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};