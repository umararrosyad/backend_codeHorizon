const { transactions, transaction_details, product_variant, products } = require("../models");

class TransactionController {
  static async getAll(req, res, next) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;

      const offset = (page - 1) * limit;

      const { user_id } = req.params;
      const data = await transactions.findAll({
        where: { user_id },
        limit,
        offset,
        attributes: { exclude: ["createdAt", "updatedAt"] },
        include: [
          {
            model: transaction_details,
            attributes: { exclude: ["createdAt", "updatedAt"] },
            include: [
              {
                model: product_variant,
                attributes: { exclude: ["createdAt", "updatedAt"] },
                include: [
                  {
                    model: products,
                    attributes: { exclude: ["createdAt", "updatedAt"] }
                  }
                ]
              }
            ]
          }
        ]
      });
      const count = await transactions.count();
      const totalPages = Math.ceil(count / limit);

      if (data.length === 0 ) {
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
      const data = await transactions.findByPk(id, { where: { user_id }, attributes: { exclude: ["createdAt", "updatedAt"] }, include: [{ model: transaction_details, attributes: { exclude: ["createdAt", "updatedAt"] } }] });
      if (!data) {
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

      const createData = await transactions.findByPk(transaction_id, {
        include: [{ model: transaction_details, attributes: { exclude: ["createdAt", "updatedAt"] } }],
        attributes: { exclude: ["createdAt", "updatedAt"] }
      });
      res.status(201).json({
        status: "success",
        message: "data berhasil dibuat",
        data: createData
      });
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
      const [updateCount, [updatedItem]] = await transactions.update({ payment_photo_url }, { where: { user_id, id }, returning: true });
      const message = updateCount === 1 ? "Data berhasil diupdate" : "Data gagal diupdate";
      const status = updateCount === 1 ? "success" : "error";
      const data = updateCount === 1 ? updatedItem : null;
      res.status(200).json({
        status,
        message,
        data
      });
      res.status(200).json({ status });
    } catch (error) {
      next(error);
    }
  }

  static async delete(req, res, next) {
    try {
      const { id } = req.params;
      const data = await transactions.findByPk(id);
      if (!data) {
        throw { name: "notFound" };
      }
      await transactions.destroy({ where: { id } });
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

module.exports = TransactionController;
