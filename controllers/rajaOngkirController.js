const { Werehouses } = require("../models");
const axios = require("axios");
const { Op } = require("sequelize");
require('dotenv').config();

class WerehouseController {
  static async getCity(req, res, next) {
    try {
      const response = await axios.get("https://api.rajaongkir.com/starter/city", {
        headers: {
          key: process.env.Token_raja_ongkir
        }
      });

      const data = response.data.rajaongkir.results;
      res.status(200).json({
        status: "success",
        message: "Data berhasil ditemukan.",
        data
      });
    } catch (error) {
      next(error);
    }
  }

  static async getProvince(req, res, next) {
    try {
      const response = await axios.get("https://api.rajaongkir.com/starter/province", {
        headers: {
          key: process.env.Token_raja_ongkir
        }
      });

      const data = response.data.rajaongkir.results;
      res.status(200).json({
        status: "success",
        message: "Data berhasil ditemukan.",
        data
      });
    } catch (error) {
      next(error);
    }
  }
}
module.exports = WerehouseController;
