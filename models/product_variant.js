'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class product_variant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      product_variant.belongsTo(models.products, { foreignKey: "product_id" });
      product_variant.belongsTo(models.product_size, { foreignKey: "product_size_id" });
      product_variant.belongsTo(models.product_type, { foreignKey: "product_type_id" });
      product_variant.hasMany(models.feedbacks, { foreignKey: "product_variant_id" });
      product_variant.hasMany(models.carts, { foreignKey: "product_variant_id" });
      product_variant.hasMany(models.transaction_details, { foreignKey: "product_variant_id" });
    }
  }
  product_variant.init({
    product_type_id: DataTypes.INTEGER,
    product_id: DataTypes.INTEGER,
    product_size_id: DataTypes.INTEGER,
    weight: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    stock: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'product_variant',
  });
  return product_variant;
};