const { product_variant, product_type, product_size } = require("../models");

class ProductVariantController {
  static async getAll(req, res, next) {
    try {
      const { product_id } = req.params;
      const data = await product_variant.findAll({
        attributes: { exclude: ["createdAt", "updatedAt"] },
        include: [
          { model: product_size, attributes: { exclude: ["createdAt", "updatedAt"] } },
          { model: product_type, attributes: { exclude: ["createdAt", "updatedAt"] } }
        ],
        where: { product_id }
      });
      if (!data[0]) {
        throw { name: "notFound" };
      }
      res.status(200).json({
        status: "success",
        message: "data berhasil ditemukan",
        data
      });
    } catch (error) {
      next(error);
    }
  }

  static async getOne(req, res, next) {
    try {
      const { product_id, id } = req.params;
      const data = await product_variant.findByPk(id, {
        attributes: { exclude: ["createdAt", "updatedAt"] },
        include: [
          { model: product_size, attributes: { exclude: ["createdAt", "updatedAt"] } },
          { model: product_type, attributes: { exclude: ["createdAt", "updatedAt"] } }
        ],
        where: { product_id }
      });
      if (!data) {
        throw { name: "notFound" };
      }
      res.status(200).json({
        status: "success",
        message: "data berhasil dihapus",
        data
      });
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
      res.status(201).json({
        status: "success",
        message: "data berhasil dibuat",
        data
      });
    } catch (error) {
      next(error);
    }
  }

  static async update(req, res, next) {
    try {
      const { weight, price, stock } = req.body;
      const { id } = req.params;
      const [updateCount, [updatedItem]] = await product_variant.update({ stock, weight, price }, {where : {id}, returning: true });
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
      const data = product_variant.findByPk()
      if(!data){
        throw { name: "notFound" };
      }
      await product_variant.destroy({ where: { id } });
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

module.exports = ProductVariantController;
