"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "transactions",
      [
        {
          user_id : "1",
          addresses_id: "1",
          product_price: "20000",
          shipping_price: "10000",
          total_price: "30000",
          transaction_status: "belum bayar",
          createdAt: new Date(),
          updatedAt: new Date()
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    // await queryInterface.bulkDelete("feedback_galleries", null, {});
  }
};
