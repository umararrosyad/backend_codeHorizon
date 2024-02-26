const { Werehouses, provinces, cities } = require("../models");
const axios = require("axios");
const { Op } = require("sequelize");
require("dotenv").config();

class WerehouseController {
  static async getAll(req, res, next) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;

      const offset = (page - 1) * limit;
      const searchName = req.query.name || "";
      const searchCondition = {
        [Op.or]: [{ werehouse_name: { [Op.iLike]: `%${searchName}%` } }]
      };

      const data = await Werehouses.findAll({
        where: searchCondition,
        offset,
        limit,
        attributes: { exclude: ["createdAt", "updatedAt"] },
        order: [["id", "ASC"]],
        include: [
          { model: provinces, attributes: { exclude: ["createdAt", "updatedAt"] } },
          { model: cities, attributes: { exclude: ["createdAt", "updatedAt"] } }
        ]
      });
      // console.log(data);
      if (!data[0]) {
        throw { name: "notFound" };
      }

      const count = await Werehouses.count({
        where: searchCondition
      });
      const totalPages = Math.ceil(count / limit);

      if (data.length === 0 && page > 1) {
        throw { name: "notFound" };
      }

      res.status(200).json({
        status: "success",
        message: "Data berhasil ditemukan.",
        data,
        pagination: {
          currentPage: page,
          totalPages,
          totalItems: count,
          perPage: limit
        }
      });
    } catch (error) {
      next(error);
    }
  }

  static async getAllonly(req, res, next) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;

      const offset = (page - 1) * limit;
      const searchName = req.query.name || "";
      const searchCondition = {
        [Op.or]: [{ werehouse_name: { [Op.iLike]: `%${searchName}%` } }]
      };

      const data = await Werehouses.findAll({ where: searchCondition, offset, limit, attributes: { exclude: ["createdAt", "updatedAt"] }, order: [["id", "ASC"]] });
      // console.log(data);

      const count = await Werehouses.count({
        where: searchCondition
      });
      const totalPages = Math.ceil(count / limit);

      if (data.length === 0 && page > 1) {
        throw { name: "notFound" };
      }

      res.status(200).json({
        status: "success",
        message: "Data berhasil ditemukan.",
        data,
        pagination: {
          currentPage: page,
          totalPages,
          totalItems: count,
          perPage: limit
        }
      });
    } catch (error) {
      next(error);
    }
  }

  static async getOne(req, res, next) {
    try {
      const { id } = req.params;
      const data = await Werehouses.findByPk(id, { attributes: { exclude: ["createdAt", "updatedAt"] } });
      if (!data) {
        throw { name: "notFound" };
      }
      const werehouse = data.dataValues;
      const city = werehouse.city_id;
      const province = werehouse.province_id;
      const response = await getName(city, province);

      data.dataValues.city_name = response.city_name;
      data.dataValues.province_name = response.province;

      res.status(200).json({
        status: "success",
        message: "Data berhasil ditemukan.",
        data
      });
    } catch (error) {
      next(error);
    }
  }
  static async create(req, res, next) {
    try {
      const { werehouse_name, address, province_id, city_id } = req.body;

      if (!werehouse_name || !address || !province_id || !city_id) {
        throw { name: "nullParameter" };
      }
      const data = await Werehouses.create({ werehouse_name, address, province_id, city_id });
      res.status(201).json({
        status: "success",
        message: "Data berhasil dibuat.",
        data
      });
    } catch (error) {
      next(error);
    }
  }

  static async update(req, res, next) {
    try {
      const { id } = req.params;
      const { werehouse_name, address, province_id, city_id } = req.body;

      console.log(address);
      if (!werehouse_name || !address || !province_id || !city_id) {
        throw { name: "nullParameter" };
      }
      const [updateCount, [updatedItem]] = await Werehouses.update({ werehouse_name, address, province_id, city_id }, { where: { id }, returning: true });
      const message = updateCount === 1 ? "Data berhasil diupdate" : "Data gagal diupdate";
      const status = updateCount === 1 ? "success" : "error";
      const data = updateCount === 1 ? updatedItem : null;
      res.status(200).json({
        status,
        message,
        data
      });
    } catch (error) {
      next(error);
    }
  }

  static async delete(req, res, next) {
    try {
      const { id } = req.params;
      const data = await Werehouses.findByPk(id);
      if (!data) {
        throw { name: "notFound" };
      }
      await Werehouses.destroy({ where: { id } });
      res.status(200).json({
        status: "success",
        message: "data berhasil dihapus",
        data
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = WerehouseController;

async function getName(city, province) {
  const response = await axios.get("https://api.rajaongkir.com/starter/city", {
    params: {
      id: city,
      province: province
    },
    headers: {
      key: process.env.Token_raja_ongkir
    }
  });
  return response.data.rajaongkir.results;
}
