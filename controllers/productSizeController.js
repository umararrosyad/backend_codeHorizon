const { product_size } = require("../models");

class ProductSizeController {
  static async getAll(req, res, next) {
    try {
      const { product_id } = req.params;
      const data = await product_size.findAll({ where: { product_id }, attributes: { exclude: ["createdAt", "updatedAt"] } });
      if (!data[0]) {
        throw { name: "notFound" };
      }
      res.status(200).json({
        status : "success",
        message : "Data berhasil ditemukan.",
        data
      });
    } catch (error) {
      next(error);
    }
  }

  static async getOne(req, res, next) {
    try {
      const { product_id, id } = req.params;
      const data = await product_size.findByPk(id, { where: { product_id }, attributes: { exclude: ["createdAt", "updatedAt"] } });
      if (!data) {
        throw { name: "notFound" };
      }
      res.status(200).json({
        status : "success",
        message : "Data berhasil ditemukan.",
        data
      });
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
      res.status(201).json({
        status : "success",
        message : "Data berhasil dibuat.",
        data
      });
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
      const [updateCount, [updatedItem]] = await product_size.update({ size_name }, { where: { product_id, id },  returning: true });
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
      const data = await product_size.findByPk(id)
      if(!data){
        throw { name: "notFound" };
      }
      await product_size.destroy({ where: { id } });
      res.status(200).json({ 
        status : "success",
        message : "data berhasil dihapus",
        data
       });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ProductSizeController;
