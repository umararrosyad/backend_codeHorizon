'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class expedition_product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  expedition_produk.init({
    expedition_product_id: DataTypes.INTEGER,
    product_id: DataTypes.INTEGER,
    expedition_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'expedition_product',
  });
  return expedition_produk;
};