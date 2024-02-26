const { provinces, cities } = require("../models");
const axios = require("axios");
const { Op } = require("sequelize");
require('dotenv').config();

class WerehouseController {
  static async getCity(req, res, next) {
    try{
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
}
module.exports = WerehouseController;
