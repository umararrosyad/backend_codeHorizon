const { product_type } = require("../models");

class ProductTypeController {
  static async getAll(req, res, next) {
    try {
      const { product_id } = req.params;
      let type = await product_type.findAll({ where: { product_id }, attributes: { exclude: ["createdAt", "updatedAt"] } });
      res.status(200).json(type);
    } catch (error) {
      next(error);
    }
  }

  static async getOne(req, res, next) {
    try {
      const { product_id, id } = req.params;
      let type = await product_type.findByPk(id, { where: { product_id }, attributes: { exclude: ["createdAt", "updatedAt"] } });
      res.status(200).json(type);
    } catch (error) {
      next(error);
    }
  }

  static async create(req, res, next) {
    try {
      const { type_name } = req.body;
      const { product_id } = req.params;

      console.log(type_name);
      if (!req.file) {
        throw { name: "fileNotFound" };
      }
      const { filename } = req.file;
      const photo_url = `${req.protocol}://${req.get("host")}/static/${filename}`;
      const data = await product_type.create({ product_id, photo_url, type_name });
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async update(req, res, next) {
    try {
      const { type_name } = req.body;
      const { product_id, id } = req.params;
      if (!req.file) {
        throw { name: "fileNotFound" };
      }
      const { filename } = req.file;
      const photo_url = `${req.protocol}://${req.get("host")}/static/${filename}`;
      const data = await product_type.update({ photo_url, type_name }, { where: { product_id, id } });
      const status = data[0] == 1 ? "success" : "error";
      res.status(200).json({ status });
    } catch (error) {
      next(error);
    }
  }

  static async delete(req, res, next) {
    try {
      const { id } = req.params;
      await product_type.destroy({ where: { id } });
      let status;
      status = "success";
      res.status(201).json({ status });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ProductTypeController;
