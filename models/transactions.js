'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class transactions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      transactions.belongsTo(models.users, { foreignKey: "user_id" });
      transactions.belongsTo(models.addresses, { foreignKey: "addresses_id" });
      transactions.hasMany(models.transaction_details, { foreignKey: "transaction_id" });
    }
  }
  transactions.init({
    user_id: DataTypes.INTEGER,
    addresses_id: DataTypes.INTEGER,
    product_price: DataTypes.INTEGER,
    shipping_price: DataTypes.INTEGER,
    total_price: DataTypes.INTEGER,
    payment_photo_url: DataTypes.STRING,
    transaction_status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'transactions',
  });
  return transactions;
};