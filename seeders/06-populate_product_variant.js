"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "product_variants",
      [
        {
          product_type_id: "1",
          product_id: "1",
          product_size_id: "1",
          weight: "23999",
          price: "10000",
          stock : "2",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          product_type_id: "1",
          product_id: "1",
          product_size_id: "2",
          weight: "23999",
          price: "10000",
          stock : "2",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          product_type_id: "1",
          product_id: "1",
          product_size_id: "3",
          weight: "23999",
          price: "10000",
          stock : "2",
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("product_variants", null, {});
  }
};
