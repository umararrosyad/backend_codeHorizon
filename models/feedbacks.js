'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class feedbacks extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  feedbacks.init({
    feedback_id: DataTypes.INTEGER,
    product_variant_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    rating: DataTypes.INTEGER,
    feedback: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'feedbacks',
  });
  return feedbacks;
};