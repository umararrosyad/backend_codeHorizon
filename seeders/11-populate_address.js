"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "addresses",
      [
        {
          user_id: "1",
          address: "jl haji subroto",
          province_id: "5",
          city_id: "39",
          kode_pos: "9992",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          user_id: "1",
          address: "jl haji subroto",
          province_id: "5",
          city_id: "39",
          kode_pos: "9992",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          user_id: "2",
          address: "jl haji subroto",
          province_id: "5",
          city_id: "39",
          kode_pos: "9992",
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("addresses", null, {});
  }
};
