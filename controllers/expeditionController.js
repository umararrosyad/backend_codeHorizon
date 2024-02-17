const { expedition } = require("../models");
const { Op } = require("sequelize");

class ExpeditionController {
  static async getAll(req, res, next) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;

      const offset = (page - 1) * limit;
      const searchName = req.query.name || "";

      const searchCondition = {
        [Op.or]: [{ expedition_name: { [Op.iLike]: `%${searchName}%` } }]
      };
      const data = await expedition.findAll({ attributes: { exclude: ["createdAt", "updatedAt"] }, where: searchCondition, offset, limit });
      const count = await expedition.count({
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
      const data = await expedition.findByPk(id, { attributes: { exclude: ["createdAt", "updatedAt"] } });
      if (!data) {
        throw { name: "notFound" };
      }
      res.status(200).json({
        status: "success",
        message: "Data berhasil ditemukan.",
        data: data
      });
    } catch (error) {
      next(error);
    }
  }

  static async create(req, res, next) {
    try {
      const { expedition_name } = req.body;
      if (!expedition_name) {
        throw { name: "nullParameter" };
      }
      if (!req.file) {
        throw { name: "fileNotFound" };
      }
      const { filename } = req.file;
      const photo_url = `${req.protocol}://${req.get("host")}/static/${filename}`;
      const data = await expedition.create({ photo_url, expedition_name });
      res.status(201).json({
        status: "success",
        message: "Data berhasil dibuat",
        data: data
      });
    } catch (error) {
      next(error);
    }
  }

  static async update(req, res, next) {
    try {
      const { expedition_name } = req.body;
      const { id } = req.params;
      let photo_url;
      if (req.file) {
        const { filename } = req.file;
        photo_url = `${req.protocol}://${req.get("host")}/static/${filename}`;
      }

      const [updateCount, [updatedItem]] = await expedition.update({ photo_url, expedition_name }, { where: { id }, returning: true });
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
      const data = await expedition.findByPk(id);
      await expedition.destroy({ where: { id } });
      res.status(200).json({
        status: "success",
        message: "data berhasil dihapus",
        data: data
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ExpeditionController;
