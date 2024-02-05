'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class product_size extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  product_size.init({
    product_size_id: DataTypes.INTEGER,
    product_id: DataTypes.INTEGER,
    size_name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'product_size',
  });
  return product_size;
};