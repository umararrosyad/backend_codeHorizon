const { categories } = require("../models");
const { Op } = require("sequelize");

class CategoryController {
  static async getAll(req, res, next) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;

      const offset = (page - 1) * limit;
      const searchName = req.query.name || "";

      const searchCondition = {
        [Op.or]: [
          { category_name: { [Op.iLike]: `%${searchName}%` } } 
        ]
      };
      const data = await categories.findAll({ where : searchCondition, offset, limit });
      const count = await categories.count({
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

      const data = await categories.findByPk(id);
      if (!data) throw { name: "notFound" };

      res.status(200).json({
        status: "success",
        message: "data berhasil ditemukan",
        data
      });
    } catch (err) {
      next(err);
    }
  }

  static async create(req, res, next) {
    try {
      const { category_name } = req.body;
      if (!category_name) {
        throw { name: "nullParameter" };
      }
      if (!req.file) {
        throw { name: "fileNotFound" };
      }
      const { filename } = req.file;
      const photo_url = `${req.protocol}://${req.get("host")}/static/${filename}`;
      const newCategory = await categories.create({ category_name, photo_url });
      res.status(201).json({
        status: "success",
        message: "data berhasil dibuat",
        data: newCategory
      });
    } catch (error) {
      next(error);
    }
  }

  static async update(req, res, next) {
    try {
      const { id } = req.params;
      const { category_name } = req.body;
      if (req.file) {
        throw { name: "fileNotFound" };
      }
      const { filename } = req.file;
      const photo_url = `${req.protocol}://${req.get("host")}/static/${filename}`;
      const [updateCount, [updatedItem]] = await categories.update({ category_name, photo_url }, { where: { id }, returning: true });
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
      const data = await categories.findByPk(id);
      if (!data) throw { name: "notFound" };
      await categories.destroy({ where: { id } });
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

module.exports = CategoryController;
