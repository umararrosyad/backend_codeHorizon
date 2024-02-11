const { carts, product_variant } = require("../models");

class CartController {
  static async getAll(req, res, next) {
    try {
      const { user_id } = req.params;
      let cart = await carts.findAll({
        where: { user_id },
        include: [product_variant],
        attributes: { exclude: ["createdAt", "updatedAt"] },
      });
      res.status(200).json(cart);
    } catch (error) {
      next(error);
    }
  }

  static async getOne(req, res, next) {
    try {
      const { user_id, id } = req.params;

      const cart = await carts.findByPk(id, {
        where: { user_id, id },
        include: [product_variant],
      });
      if (!cart) throw { name: "Item not found" };
      res.status(200).json(cart);
    } catch (err) {
      next(err);
    }
  }

  static async create(req, res, next) {
    try {
      const { qty } = req.body;
      const { user_id } = req.params;

      const newCart = await carts.create({
        user_id: user_id,
        product_variant_id:null,
        qty,
      });
      
      res.status(200).json(newCart);
    } catch (error) {
      next(error);
    }
  }

  static async update(req, res, next) {
    try {
      const { user_id, id } = req.params;
      const { address, province_id, city_id, kode_pos } = req.body;
      const updateAddress = await addresses.update(
        {
          user_id: user_id,
          address,
          province_id,
          city_id,
          kode_pos,
        },
        { where: { id, user_id } }
      );
      if (updateAddress == "1") {
        return res
          .status(200)
          .json({ message: "User Address updated successfully" });
      }
      return res.status(200).json({ message: "User Address updated failed" });
    } catch (error) {
      next(error);
    }
  }

  static async delete(req, res, next) {
    try {
      const { user_id, id } = req.params;

      // Hapus pengguna berdasarkan ID
      await addresses.destroy({ where: { user_id, id } });
      res.status(200).json({ message: "User Address deleted successfully" });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = CartController;
