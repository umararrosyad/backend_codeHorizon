"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // await queryInterface.bulkInsert(
    //   "feedback_galleries",
    //   [
    //     {
    //       user_id: "1",
    //       address_id: "https://placehold.co/600x400",
    //       product_price: "https://placehold.co/600x400",
    //       shipping_price: "https://placehold.co/600x400",
    //       total_price: "https://placehold.co/600x400",
    //       payment_photo_url: "https://placehold.co/600x400",
    //       transaction_status: "https://placehold.co/600x400",
    //       createdAt: new Date(),
    //       updatedAt: new Date()
    //     },
    //     {
    //       feedback_id: "1",
    //       photo_url: "https://placehold.co/600x400",
    //       createdAt: new Date(),
    //       updatedAt: new Date()
    //     },
    //     {
    //       feedback_id: "1",
    //       photo_url: "https://placehold.co/600x400",
    //       createdAt: new Date(),
    //       updatedAt: new Date()
    //     }
    //   ],
    //   {}
    // );
  },

  async down(queryInterface, Sequelize) {
    // await queryInterface.bulkDelete("feedback_galleries", null, {});
  }
};
