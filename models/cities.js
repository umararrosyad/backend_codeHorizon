'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class cities extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      cities.belongsTo(models.provinces, { foreignKey: "province_id" });
      cities.hasMany(models.Werehouses, { foreignKey: "city_id" });
      cities.hasMany(models.addresses, { foreignKey: "city_id" });
      
    }
  }
  cities.init({
    city_name: DataTypes.STRING,
    province_id: DataTypes.INTEGER,
    postal_code: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'cities',
  });
  return cities;
};