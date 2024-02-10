'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "transaction_details",
      [
        {
          transaction_id : "1",
          product_variant_id : "1",
          price : "10000",
          qty : "1",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          transaction_id : "1",
          product_variant_id : "2",
          price : "10000",
          qty : "1",
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
