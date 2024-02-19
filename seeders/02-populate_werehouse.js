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
      "Werehouses",
      [
        {
          address: "jl in aja dulu",
          province_id: "5",
          city_id: "39",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          address: "jl in aja dulu yaa kaan",
          province_id: "5",
          city_id: "39",
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
    await queryInterface.bulkDelete("Werehouses", null, {});
  }
};
