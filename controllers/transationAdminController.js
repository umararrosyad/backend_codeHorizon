const { transactions, transaction_details } = require("../models");

class TransactionController {
  static async getAll(req, res, next) {
    try {
      const trans = await transactions.findAll({ attributes: { exclude: ["createdAt", "updatedAt"] }, include: [ {model :transaction_details , attributes: { exclude: ["createdAt", "updatedAt"] } }] });
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
      const { id } = req.params;
      const trans = await transactions.findByPk(id, { attributes: { exclude: ["createdAt", "updatedAt"] }, include: [ {model :transaction_details , attributes: { exclude: ["createdAt", "updatedAt"] } }] });
      if (!trans) {
        throw { name: "notFound" };
      }
      res.status(200).json(trans);
    } catch (error) {
      next(error);
    }
  }

  static async update(req, res, next) {
    try {
      const { id } = req.params;
      const {transaction_status} = req.body
      if (!transaction_status ) {
        throw { name: "nullParameter" };
      }
      const data = await transactions.update({ transaction_status }, { where: { id } });
      const status = data[0] == 1 ? "success" : "error";
      res.status(200).json({ status });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = TransactionController;
