"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "users",
      [
        {
          name: "supriadi",
          email: "supriadi@gmail.com",
          username: "supri",
          password: "12345",
          phone_number: "9853908590345",
          role: "uaer",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "kang riayadi",
          email: "riyadi@gmail.com",
          username: "kang",
          password: "12345",
          phone_number: "9853908590345",
          role: "uaer",
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", null, {});
  }
};
