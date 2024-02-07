"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "feedbacks",
      [
        {
          product_variant_id: "1",
          user_id: "1",
          rating: "5",
          feedback: "sangat bagus",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          product_variant_id: "2",
          user_id: "1",
          rating: "5",
          feedback: "sangat bagus",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          product_variant_id: "3",
          user_id: "1",
          rating: "5",
          feedback: "sangat bagus",
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("feedbacks", null, {});
  }
};
