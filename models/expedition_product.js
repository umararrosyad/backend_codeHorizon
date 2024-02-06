"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class expedition_products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      expedition_products.belongsTo(models.products, { foreignKey: "product_id" });
      expedition_products.belongsTo(models.expedition, { foreignKey: "expedition_id" });
    }
  }
  expedition_products.init(
    {
      product_id: DataTypes.INTEGER,
      expedition_id: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: "expedition_products"
    }
  );
  return expedition_products;
};
