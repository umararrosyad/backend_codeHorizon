'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "product_types",
      [
        {
          product_id: "1",
          type_name : "merah",
          photo_url: "https://placehold.co/600x400",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          product_id: "1",
          type_name : "biru",
          photo_url: "https://placehold.co/600x400",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          product_id: "2",
          type_name : "kuning",
          photo_url: "https://placehold.co/600x400",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          product_id: "2",
          type_name : "merah",
          photo_url: "https://placehold.co/600x400",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          product_id: "2",
          type_name : "hijau",
          photo_url: "https://placehold.co/600x400",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          product_id: "2",
          type_name : "jingga",
          photo_url: "https://placehold.co/600x400",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          product_id: "3",
          type_name : "2 tahun",
          photo_url: "https://placehold.co/600x400",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          product_id: "3",
          type_name : "6 bulan",
          photo_url: "https://placehold.co/600x400",
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('product_types', null, {});

  }
};
