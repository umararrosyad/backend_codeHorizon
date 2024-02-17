const { expedition_products, expedition } = require("../models");

class ExpeditionProductController {
  static async getAll(req, res, next) {
    try {
      const { product_id } = req.params;
      let data = await expedition_products.findAll({
        attributes: { exclude: ["createdAt", "updatedAt"] },
        where: { product_id },
        include: [
          {
            model: expedition,
            attributes: { exclude: ["createdAt", "updatedAt"] }
          }
        ]
      });
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
      let data = await expedition_products.findByPk(id, {
        attributes: { exclude: ["createdAt", "updatedAt"] },
        where: { product_id },
        include: [
          {
            model: expedition,
            attributes: { exclude: ["createdAt", "updatedAt"] }
          }
        ]
      });
      if (!data) {
        throw { name: "notFound" };
      }
      res.status(200).json({
        status : "success",
        message : "Data berhasil ditemukan.",
        data : data
      });
    } catch (error) {
      next(error);
    }
  }

  static async create(req, res, next) {
    try {
      const { expedition_id } = req.body;
      const { product_id } = req.params;
      if (!expedition_id) {
        throw { name: "nullParameter" };
      }
      const data = await expedition_products.create({ product_id, expedition_id });
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
      const { expedition_id } = req.body;
      const { product_id, id } = req.params;
      if (!expedition_id) {
        throw { name: "nullParameter" };
      }
      const [updateCount, [updatedItem]] = await expedition_products.update({ expedition_id }, { where: { product_id,id }, returning: true });
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
      const data = await expedition_products.findByPk(id)
      if(!data){
        throw { name: "notFound" };
      }
      await expedition_products.destroy({ where: { id } });
      res.status(200).json({
        status : "success",
        message : "data berhasil dihapus",
        data : data
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ExpeditionProductController;
