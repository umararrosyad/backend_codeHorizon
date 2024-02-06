'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class expedition extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      expedition.hasMany(models.expedition_products, { foreignKey: "expedition_id" });
    }
  }
  expedition.init({
    expedition_name: DataTypes.STRING,
    photo_url: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'expedition',
  });
  return expedition;
};