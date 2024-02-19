'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Werehouses extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Werehouses.hasMany(models.products, { foreignKey: "Werehouse_id" });
    }
  }
  Werehouses.init({
    address: DataTypes.STRING,
    province_id: DataTypes.INTEGER,
    city_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Werehouses',
  });
  return Werehouses;
};