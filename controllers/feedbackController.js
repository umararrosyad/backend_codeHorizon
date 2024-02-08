const { feedbacks, product_variant, product_size, product_type } = require("../models");

class feedbacksController {
  static async getAll(req, res, next) {
    try {
      const { product_id } = req.params;
      let expe = await feedbacks.findAll({
        attributes: { exclude: ["createdAt", "updatedAt"] },
        include: [
          {
            model: product_variant,
            attributes: { exclude: ["createdAt", "updatedAt"] },
            where: { product_id },
            include: [
              { model: product_size, attributes: { exclude: ["createdAt", "updatedAt"] } },
              { model: product_type, attributes: { exclude: ["createdAt", "updatedAt"] } }
            ]
          }
        ]
      });
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
      let expe = await feedbacks.findByPk(id, {
        attributes: { exclude: ["createdAt", "updatedAt"] },
        include: [
          {
            model: product_variant,
            attributes: { exclude: ["createdAt", "updatedAt"] },
            where: { product_id },
            include: [
              { model: product_size, attributes: { exclude: ["createdAt", "updatedAt"] } },
              { model: product_type, attributes: { exclude: ["createdAt", "updatedAt"] } }
            ]
          }
        ]
      });
      if (!expe) {
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

      const data = await feedbacks.create({ product_id, expedition_id });
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async update(req, res, next) {
    try {
      const { expedition_id } = req.body;
      const { product_id, id } = req.params;
      console.log(expedition_id);
      const data = await feedbacks.update({ expedition_id }, { where: { product_id, id } });
      const status = data[0] == 1 ? "success" : "error";
      res.status(200).json({ status });
    } catch (error) {
      next(error);
    }
  }

  static async delete(req, res, next) {
    try {
      const { id } = req.params;
      await feedbacks.destroy({ where: { id } });
      let status = "success";
      res.status(201).json({ status });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = feedbacksController;
