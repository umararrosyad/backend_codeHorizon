"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "carts",
      [
        {
          product_variant_id: "1",
          user_id: "1",
          qty: "1",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          product_variant_id: "2",
          user_id: "1",
          qty: "1",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          product_variant_id: "3",
          user_id: "1",
          qty: "1",
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("carts", null, {});
  }
};
