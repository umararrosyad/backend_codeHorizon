'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      users.hasMany(models.addresses, { foreignKey: "user_id" });
      users.hasMany(models.carts, { foreignKey: "user_id" });
      users.hasMany(models.transactions, { foreignKey: "user_id" });
      users.hasMany(models.feedbacks, { foreignKey: "user_id" });


    }
  }
  users.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    role: DataTypes.STRING,
    photo_url: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'users',
  });
  return users;
};