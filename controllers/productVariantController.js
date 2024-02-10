const { product_variant, product_type, product_size } = require("../models");

class ProductVariantController {
  static async getAll(req, res, next) {
    try {
      const { product_id } = req.params;
      const variant = await product_variant.findAll({
        attributes: { exclude: ["createdAt", "updatedAt"] },
        include: [
          { model: product_size, attributes: { exclude: ["createdAt", "updatedAt"] } },
          { model: product_type, attributes: { exclude: ["createdAt", "updatedAt"] } }
        ],
        where: { product_id }
      });
      if (!variant[0]) {
        throw { name: "notFound" };
      }
      res.status(200).json(variant);
    } catch (error) {
      next(error);
    }
  }

  static async getOne(req, res, next) {
    try {
      const { product_id, id } = req.params;
      const variant = await product_variant.findByPk(id, {
        attributes: { exclude: ["createdAt", "updatedAt"] },
        include: [
          { model: product_size, attributes: { exclude: ["createdAt", "updatedAt"] } },
          { model: product_type, attributes: { exclude: ["createdAt", "updatedAt"] } }
        ],
        where: { product_id }
      });
      if (!variant) {
        throw { name: "notFound" };
      }
      res.status(200).json(variant);
    } catch (error) {
      next(error);
    }
  }

  static async create(req, res, next) {
    try {
      const { product_type_id, product_size_id, weight, price, stock } = req.body;
      const { product_id } = req.params;
      if (!product_type_id || !product_size_id || !weight || !price || !stock) {
        throw { name: "nullParameter" };
      }

      const existingVariant = await product_variant.findOne({
        where: {
          product_type_id: product_type_id,
          product_size_id: product_size_id
        }
      });

      if (existingVariant) {
        throw { name: "DataExist" };
      }

      const data = await product_variant.create({ product_id, product_type_id, stock, product_size_id, weight, price });
      res.status(201).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async update(req, res, next) {
    try {
      const { weight, price, stock } = req.body;
      const { id } = req.params;
      if ( !weight || !price || !stock) {
        throw { name: "nullParameter" };
      }

      const data = await product_variant.update({ stock, weight, price }, {where : {id}});
      const status = data[0] == 1 ? "success" : "error";
      res.status(200).json({status});
    } catch (error) {
      next(error);
    }
  }

  static async delete(req, res, next) {
    try {
      const { id } = req.params;
      await product_variant.destroy({ where: { id } });
      let status = "success";
      res.status(200).json({ status });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ProductVariantController;
