const { product_type } = require("../models");

class ProductTypeController {
  static async getAll(req, res, next) {
    try {
      const { product_id } = req.params;
      let data = await product_type.findAll({ where: { product_id }, attributes: { exclude: ["createdAt", "updatedAt"] } });
      if(!data[0]){
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

  static async getOne(req, res, next) {
    try {
      const { product_id, id } = req.params;
      let data = await product_type.findByPk(id, { where: { product_id }, attributes: { exclude: ["createdAt", "updatedAt"] } });
      if(!data){
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
      const { type_name } = req.body;
      const { product_id } = req.params;
      if(!type_name){
        throw { name: "nullParameter" };
      }
      if (!req.file) {
        throw { name: "fileNotFound" };
      }
      const { filename } = req.file;
      const photo_url = `${req.protocol}://${req.get("host")}/static/${filename}`;
      const data = await product_type.create({ product_id, photo_url, type_name });
      res.status(200).json({
        status: "success",
        message: "Data berhasil dibuat.",
        data: data
      });
    } catch (error) {
      next(error);
    }
  }

  static async update(req, res, next) {
    try {
      const { type_name } = req.body;
      const { product_id, id } = req.params;
      let photo_url
      if (req.file) {
        const { filename } = req.file;
        photo_url = `${req.protocol}://${req.get("host")}/static/${filename}`;
      }
      
      const [updateCount, [updatedItem]]  = await product_type.update({ photo_url, type_name }, { where: { product_id, id }, returning: true });
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
      const data = await product_type.findByPk(id)
      if(!data){
        throw { name: "notFound" };
      }
      await product_type.destroy({ where: { id } });
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

module.exports = ProductTypeController;
