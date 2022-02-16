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
      User.belongsTo(models.Avatar,{
        foreignKey:"avatar_id",
        as:"avatars"
      })
      User.belongsTo(models.Rol,{
        foreignKey:"rol_id",
        as:"rols"
      })
      User.hasMany(models.visited,{
        foreignKey: "user_id",
        as: "visits"
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
    timestamps: false
  });
  return User;
};