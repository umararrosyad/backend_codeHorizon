"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "expedition_products",
      [
        {
          product_id: "1",
          expedition_id: "1",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          product_id: "1",
          expedition_id: "2",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          product_id: "2",
          expedition_id: "2",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          product_id: "3",
          expedition_id: "1",
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("expedition_products", null, {});
  }
};
