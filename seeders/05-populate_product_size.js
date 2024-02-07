'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "product_sizes",
      [
        {
          product_id: "1",
          size_name : "X",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          product_id: "1",
          size_name : "L",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          product_id: "2",
          size_name : "XL",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          product_id: "2",
          size_name : "M",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          product_id: "2",
          size_name : "L",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          product_id: "2",
          size_name : "XXS",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          product_id: "3",
          size_name : "S",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          product_id: "3",
          size_name : "L",
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('product_sizes', null, {});

  }
};
