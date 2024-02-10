const { product_size } = require("../models");

class ProductSizeController {
  static async getAll(req, res, next) {
    try {
      const { product_id } = req.params;
      let type = await product_size.findAll({ where: { product_id }, attributes: { exclude: ["createdAt", "updatedAt"] } });
      if (!type[0]) {
        throw { name: "notFound" };
      }
      res.status(200).json(type);
    } catch (error) {
      next(error);
    }
  }

  static async getOne(req, res, next) {
    try {
      const { product_id, id } = req.params;
      let type = await product_size.findByPk(id, { where: { product_id }, attributes: { exclude: ["createdAt", "updatedAt"] } });
      if (!type) {
        throw { name: "notFound" };
      }
      res.status(200).json(type);
    } catch (error) {
      next(error);
    }
  }

  static async create(req, res, next) {
    try {
      const { size_name } = req.body;
      const { product_id } = req.params;
      if(!size_name){
        throw { name: "nullParameter" };
      }

      const data = await product_size.create({ product_id, size_name });
      res.status(201).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async update(req, res, next) {
    try {
      const { size_name } = req.body;
      const { product_id, id } = req.params;
      if(!size_name){
        throw { name: "nullParameter" };
      }
      const data = await product_size.update({ size_name }, { where: { product_id, id } });
      const status = data[0] == 1 ? "success" : "error";
      res.status(200).json({ status });
    } catch (error) {
      next(error);
    }
  }

  static async delete(req, res, next) {
    try {
      const { id } = req.params;
      await product_size.destroy({ where: { id } });
      let status = "success";
      res.status(200).json({ status });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ProductSizeController;
