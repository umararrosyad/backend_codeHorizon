"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "expeditions",
      [
        {
          expedition_name: "jne",
          photo_url: "https://placehold.co/600x400",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          expedition_name: "pos",
          photo_url: "https://placehold.co/600x400",
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("expeditions", null, {});
  }
};
