"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      "categories",
      [
        {
          category_name: "Pakaian",
          photo_url: "https://placehold.co/600x400",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          category_name: "Kebutuhan Lainnya",
          photo_url: "https://placehold.co/600x400",
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     */
    await queryInterface.bulkDelete("categories", null, {});
  }
};
