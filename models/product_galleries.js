'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class product_galleries extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  product_galleries.init({
    product_gallery_id: DataTypes.INTEGER,
    product_id: DataTypes.INTEGER,
    photo_url: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'product_galleries',
  });
  return product_galleries;
};