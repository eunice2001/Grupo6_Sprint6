'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Visited extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Visited.belongsTo(models.Product,{
        foreignKey: "product_id",
        as:"products"
      });
      Visited.belongsTo(models.User,{
        foreignKey: "user_id",
        as: "users"
      });
    }
  }
  Visited.init({
    visited: DataTypes.INTEGER,
    product_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    time: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Visited',
  });
  return Visited;
};