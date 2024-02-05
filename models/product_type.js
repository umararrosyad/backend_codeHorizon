'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class product_type extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  product_type.init({
    product_id: DataTypes.INTEGER,
    type_name: DataTypes.STRING,
    photo_url: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'product_type',
  });
  return product_type;
};