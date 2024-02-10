const { transactions, transaction_details } = require("../models");

class TransactionController {
  static async getAll(req, res, next) {
    try {
      const { user_id } = req.params;
      const trans = await transactions.findAll({ where: { user_id }, attributes: { exclude: ["createdAt", "updatedAt"] } });
      if (!trans[0]) {
        throw { name: "notFound" };
      }
      res.status(200).json(trans);
    } catch (error) {
      next(error);
    }
  }

  static async getOne(req, res, next) {
    try {
      const { user_id, id } = req.params;
      const trans = await transactions.findByPk(id, { where: { user_id }, attributes: { exclude: ["createdAt", "updatedAt"] } });
      if (!trans) {
        throw { name: "notFound" };
      }
      res.status(200).json(trans);
    } catch (error) {
      next(error);
    }
  }

  static async create(req, res, next) {
    try {
      const { addresses_id, product_price, shipping_price, total_price, transaction_detail } = req.body;
      const { user_id } = req.params;
      if (!addresses_id || !product_price || !shipping_price || !total_price || !transaction_detail) {
        throw { name: "nullParameter" };
      }
      const data = await transactions.create({ user_id, addresses_id, product_price, shipping_price, total_price, transaction_status: "belum bayar" });
      const transaction_id = data.dataValues.id;
      for (const detail of transaction_detail) {
        const { product_variant_id, price, qty } = detail;
        await transaction_details.create({ transaction_id, product_variant_id, price, qty });
      }

      const data1 = await transactions.findByPk(transaction_id, {
        include: [{ model: transaction_details, attributes: { exclude: ["createdAt", "updatedAt"] } }],
        attributes: { exclude: ["createdAt", "updatedAt"] }
      });
      res.status(200).json(data1);
    } catch (error) {
      next(error);
    }
  }

  static async update(req, res, next) {
    try {
      const { user_id, id } = req.params;
      if (!req.file) {
        throw { name: "fileNotFound" };
      }

      const { filename } = req.file;
      const payment_photo_url = `${req.protocol}://${req.get("host")}/static/${filename}`;
      const data = await transactions.update({ payment_photo_url }, { where: { user_id, id } });
      console.log(data);
      const status = data[0] == 1 ? "success" : "error";
      res.status(200).json({ status });
    } catch (error) {
      next(error);
    }
  }

  static async delete(req, res, next) {
    try {
      const { id } = req.params;
      await transactions.destroy({ where: { id } });
      let status;
      status = "success";
      res.status(201).json({ status });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = TransactionController;
