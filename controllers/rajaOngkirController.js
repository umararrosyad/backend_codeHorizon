const { provinces, cities } = require("../models");
const axios = require("axios");
const { Op } = require("sequelize");
require("dotenv").config();

class WerehouseController {
  static async getCity(req, res, next) {
    try {
      let data = await cities.findAll({ attributes: { exclude: ["createdAt", "updatedAt"] } });
      if (!data[0]) {
        throw { name: "notFound" };
      }
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
      let data = await provinces.findAll({ attributes: { exclude: ["createdAt", "updatedAt"] } });
      if (!data[0]) {
        throw { name: "notFound" };
      }
      res.status(200).json({
        status: "success",
        message: "Data berhasil ditemukan.",
        data
      });
    } catch (error) {
      next(error);
    }
  }

  static async getCost(req, res, next) {
    try {
      const { origin, destination, weight } = req.body;
      const requestBody = {
        key: process.env.Token_raja_ongkir,
        origin,
        destination,
        weight,
        courier : "jne"
      };
      const response = await axios.post("https://api.rajaongkir.com/starter/cost", requestBody);
      const data = response.data

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
