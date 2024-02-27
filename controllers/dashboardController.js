const { products, Werehouses, categories, users, transaction_details, transactions, product_galleries, product_size, product_type, expedition_products, expedition, product_variant, feedbacks } = require("../models");
const { Op } = require("sequelize");
class ProductController {
  static async getData(req, res, next) {
    try {
      const searchCondition = {
        [Op.or]: [{ transaction_status: { [Op.iLike]: "%Selesai%" } }]
      };

      const product = await products.count();
      console.log(product);
      const user = await users.count();
      console.log(user);

      const transaction = await transactions.count();
      console.log(transaction);

      const finishTransaction = await transactions.count({ where: searchCondition });
      console.log(finishTransaction);

      res.status(200).json({
        status: "success",
        message: "Data berhasil ditemukan.",
        data:{ product,user,transaction, finishTransaction}
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ProductController;
