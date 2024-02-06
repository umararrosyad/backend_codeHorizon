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
      product_size.belongsTo(models.products, { foreignKey: "product_id" });
      product_size.hasMany(models.product_variant, { foreignKey: "product_size_id" });

    }
  }
  product_size.init({
    product_id: DataTypes.INTEGER,
    size_name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'product_size',
  });
  return product_size;
};