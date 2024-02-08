const { expedition_products } = require("../models");

class ExpeditionProductController {
  static async getAll(req, res, next) {
    try {
      const { product_id } = req.params;
      let expe = await expedition_products.findAll({ where: { product_id } });
      if (!expe[0]) {
        throw { name: "notFound" };
      }
      res.status(200).json(expe);
    } catch (error) {
      next(error);
    }
  }

  static async getOne(req, res, next) {
    try {
      const { product_id, id } = req.params;
      let expe = await expedition_products.findAll({ where: { product_id, id } });
      if (!expe[0]) {
        throw { name: "notFound" };
      }
      res.status(200).json(expe);
    } catch (error) {
      next(error);
    }
  }

  static async create(req, res, next) {
    try {
      const { expedition_id } = req.body;
      const { product_id } = req.params;

      const data = await expedition_products.create({ product_id, expedition_id });
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async update(req, res, next) {
    try {
      const { expedition_id } = req.body;
      const { product_id,id } = req.params;
      console.log(expedition_id);
      const data = await expedition_products.update({ expedition_id }, { where: { product_id, id } });
      const status = data[0] == 1 ? "success" : "error";
      res.status(200).json({ status });
    } catch (error) {
      next(error);
    }
  }

  static async delete(req, res, next) {
    try {
      const { id } = req.params;
      await expedition_products.destroy({ where: { id } });
      let status = "success";
      res.status(201).json({ status });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ExpeditionProductController;
