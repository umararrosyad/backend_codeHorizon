'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class feedback_galleries extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  feedback_galleries.init({
    feedback_id: DataTypes.INTEGER,
    photo_url: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'feedback_galleries',
  });
  return feedback_galleries;
};