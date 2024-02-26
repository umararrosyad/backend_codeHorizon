"use strict";

const axios = require("axios");
require("dotenv").config();

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      const response = await axios.get("https://api.rajaongkir.com/starter/city", {
        headers: {
          key: process.env.Token_raja_ongkir 
        }
      });
      const cities = response.data.rajaongkir.results;

      await queryInterface.bulkInsert(
        "cities",
        cities.map((kota) => ({
          city_name: kota.city_name,
          province_id : kota.province_id,
          postal_code: kota.postal_code,
          createdAt: new Date(),
          updatedAt: new Date()
        }))
      );

      console.log("Data provinsi berhasil dimasukkan");
    } catch (error) {
      console.error("Gagal mendapatkan data provinsi:", error);
    }
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
