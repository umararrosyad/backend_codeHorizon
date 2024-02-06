'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class transaction_details extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      transaction_details.belongsTo(models.product_variant, { foreignKey: "product_variant_id" });
      transaction_details.belongsTo(models.transactions, { foreignKey: "transaction_id" });
    }
  }
  transaction_details.init({
    transaction_id: DataTypes.INTEGER,
    product_variant_id: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    qty: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'transaction_details',
  });
  return transaction_details;
};