const { transactions, transaction_details, product_variant, products } = require("../models");

class TransactionController {
  static async getAll(req, res, next) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;

      const offset = (page - 1) * limit;
      const data = await transactions.findAll({
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
      const { id } = req.params;
      const data = await transactions.findByPk(id, { attributes: { exclude: ["createdAt", "updatedAt"] }, include: [{ model: transaction_details, attributes: { exclude: ["createdAt", "updatedAt"] } }] });
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

  static async update(req, res, next) {
    try {
      const { id } = req.params;
      const { transaction_status } = req.body;
      if (!transaction_status) {
        throw { name: "nullParameter" };
      }
      const [updateCount, [updatedItem]] = await transactions.update({ transaction_status }, { where: { id }, returning: true });
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
}

module.exports = TransactionController;
