"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "product_galleries",
      [
        {
          product_id: "1",
          photo_url: "https://placehold.co/600x400",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          product_id: "1",
          photo_url: "https://placehold.co/600x400",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          product_id: "2",
          photo_url: "https://placehold.co/600x400",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          product_id: "2",
          photo_url: "https://placehold.co/600x400",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          product_id: "2",
          photo_url: "https://placehold.co/600x400",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          product_id: "2",
          photo_url: "https://placehold.co/600x400",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          product_id: "3",
          photo_url: "https://placehold.co/600x400",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          product_id: "3",
          photo_url: "https://placehold.co/600x400",
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('product_galleries', null, {});
  }
};
