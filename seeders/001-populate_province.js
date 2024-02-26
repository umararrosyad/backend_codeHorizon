"use strict";

const axios = require("axios");
require("dotenv").config();

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      const response = await axios.get("https://api.rajaongkir.com/starter/province", {
        headers: {
          key: process.env.Token_raja_ongkir // Ganti dengan API key Anda
        }
      });
      const provinces = response.data.rajaongkir.results;

      // Masukkan data provinsi ke dalam tabel Provinsi
      await queryInterface.bulkInsert(
        "provinces",
        provinces.map((provinsi) => ({
          province_name: provinsi.province,
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
