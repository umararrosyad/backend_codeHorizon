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
      // define association here
    }
  }
  transactions.init({
    transaction_id: DataTypes.INTEGER,
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