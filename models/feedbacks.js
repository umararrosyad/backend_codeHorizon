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
      feedbacks.belongsTo(models.product_variant, { foreignKey: "product_variant_id" });
      feedbacks.hasMany(models.feedback_galleries, { foreignKey: "feedback_id" });
      feedbacks.belongsTo(models.users, { foreignKey: "user_id" });

    }
  }
  feedbacks.init({
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