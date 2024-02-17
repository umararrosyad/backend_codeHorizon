const { product_galleries } = require("../models");

class ProductGalleryController {
  static async getAll(req, res, next) {
    try {
      const { product_id } = req.params;
      let data = await product_galleries.findAll({ where: { product_id }, attributes: { exclude: ["createdAt", "updatedAt"] } });
      if(!data[0]){
        throw {name:"notFound"}
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
      let data = await product_galleries.findByPk(id, { where: { product_id }, attributes: { exclude: ["createdAt", "updatedAt"] } });
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
      const { product_id } = req.params;
      if (!req.file) {
        throw { name: "fileNotFound" };
      }
      const { filename } = req.file;
      const photo_url = `${req.protocol}://${req.get("host")}/static/${filename}`;
      const data = await product_galleries.create({ product_id, photo_url });
      res.status(200).json({
        status : "success",
        message : "Data berhasil dibuat.",
        data
      });
    } catch (error) {
      next(error);
    }
  }

  static async delete(req, res, next) {
    try {
      const { id } = req.params;
      const data = product_galleries.findByPk(id)
      if(!data){
        throw {name:"notFound"}
      }
      await product_galleries.destroy({ where: { id } });
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

module.exports = ProductGalleryController;
