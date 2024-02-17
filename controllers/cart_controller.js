const { carts, product_variant } = require("../models");

class CartController {
  static async getAll(req, res, next) {
    try {

      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;

      const offset = (page - 1) * limit;
      const { user_id } = req.params;
      const data = await carts.findAll({
        where: { user_id },
        include: [product_variant],
        attributes: { exclude: ["createdAt", "updatedAt"]},
        offset, limit 
      });
      const count = await carts.count();
      const totalPages = Math.ceil(count / limit);

      if (data.length === 0 && page > 1) {
        throw { name: "notFound" }; 
      }

      res.status(200).json({
        status: "success",
        message: "Data berhasil ditemukan.",
        data,
        pagination: {
          currentPage: page,
          totalPages,
          totalItems: count,
          perPage: limit
        }
      });
    } catch (error) {
      next(error);
    }
  }

  static async getOne(req, res, next) {
    try {
      const { user_id, id } = req.params;

      const data = await carts.findByPk(id, {
        where: { user_id, id },
        include: [product_variant]
      });
      if (!data) throw { name: "notFound" };
      res.status(200).json({
        status: "success",
        message: "data berhasil ditemukan",
        data
      });
    } catch (err) {
      next(err);
    }
  }

  static async create(req, res, next) {
    try {
      const { qty, product_variant_id } = req.body;
      if (!qty || !product_variant_id) {
        throw { name: "nullParameter" };
      }
      const { user_id } = req.params;
      const cart = await carts.findAll({ where: { product_variant_id, user_id } });
      if (!cart[0]) {
        const newCart = await carts.create({
          user_id,
          product_variant_id,
          qty
        });

        res.status(201).json({
          status: "success",
          message: "data berhasil dibuat",
          data: newCart
        });
      } else {
        const data1 = cart[0].dataValues;
        const newQty = data1.qty + qty;
        const [updateCount, [updatedItem]] = await carts.update(
          {
            qty: newQty
          },
          { where: { id: data1.id }, returning: true }
        );
        const message = updateCount === 1 ? "Data berhasil diupdate" : "Data gagal diupdate";
        const status = updateCount === 1 ? "success" : "error";
        const data = updateCount === 1 ? updatedItem : null;
        res.status(200).json({
          status,
          message,
          data
        });
      }
    } catch (error) {
      next(error);
    }
  }

  static async getOne(req, res, next) {
    try {
      const { user_id, id } = req.params;

      const data = await carts.findByPk(id, {
        where: { user_id, id },
        include: [product_variant]
      });
      if (!data) throw { name: "notFound" };
      res.status(200).json({
        status: "success",
        message: "data berhasil ditemukan",
        data
      });
    } catch (err) {
      next(err);
    }
  }

  static async update(req, res, next) {
    try {
      const { qty, product_variant_id } = req.body;
      if (!qty || !product_variant_id) {
        throw { name: "nullParameter" };
      }
      const { user_id, id } = req.params;
      const [updateCount, [updatedItem]] = await carts.update(
        {
          qty
        },
        { where: { id}, returning: true }
      );
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
      const { user_id, id } = req.params;
      const data = await carts.findByPk(id);
      if (!data) throw { name: "notFound" };
      await carts.destroy({ where: { user_id, id } });
      res.status(200).json({
        status: "success",
        message: "data berhasil dibuat",
        data: newCart
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = CartController;
