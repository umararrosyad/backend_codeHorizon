"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      products.belongsTo(models.categories, { foreignKey: "category_id" });
      products.belongsTo(models.Werehouses, { foreignKey: "werehouse_id" });
      products.hasMany(models.product_galleries, { foreignKey: "product_id" });
      products.hasMany(models.product_size, { foreignKey: "product_id" });
      products.hasMany(models.product_type, { foreignKey: "product_id" });
      products.hasMany(models.expedition_products, { foreignKey: "product_id" });
      products.hasMany(models.product_variant, { foreignKey: "product_id" });

    }
  }
  products.init(
    {
      category_id: DataTypes.INTEGER,
      werehouse_id: DataTypes.INTEGER,
      name: DataTypes.STRING,
      description: DataTypes.STRING
    },
    {
      sequelize,
      modelName: "products"
    }
  );
  return products;
};
