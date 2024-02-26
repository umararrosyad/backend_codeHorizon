'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class provinces extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      provinces.hasMany(models.Werehouses, { foreignKey: "province_id" });
      provinces.hasMany(models.addresses, { foreignKey: "province_id" });
      provinces.hasMany(models.cities, { foreignKey: "province_id" });
    }
  }
  provinces.init({
    province_name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'provinces',
  });
  return provinces;
};