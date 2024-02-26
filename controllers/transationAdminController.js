const { transactions, transaction_details, product_galleries, provinces, cities, product_variant, products, users, product_type, product_size, addresses } = require("../models");
const { Op } = require("sequelize");
class TransactionController {
  static async getAll(req, res, next) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const searchName = req.query.status || "";
      const searchCondition = {
        [Op.or]: [{ transaction_status: { [Op.iLike]: `%${searchName}%` } }]
      };

      const offset = (page - 1) * limit;
      const data = await transactions.findAll({
        where: searchCondition,
        limit,
        offset,
        attributes: { exclude: ["createdAt", "updatedAt"] },
        include: [
          { model: users, attributes: { exclude: ["createdAt", "updatedAt"] } },
          {
            model: addresses,
            attributes: { exclude: ["createdAt", "updatedAt"] },
            include: [
              { model: provinces, attributes: { exclude: ["createdAt", "updatedAt"] } },
              { model: cities, attributes: { exclude: ["createdAt", "updatedAt"] } }
            ]
          },
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
                  },
                  {
                    model: product_type,
                    attributes: { exclude: ["createdAt", "updatedAt"] }
                  },
                  {
                    model: product_size,
                    attributes: { exclude: ["createdAt", "updatedAt"] }
                  }
                ]
              }
            ]
          }
        ]
      });

      const promises = await data.map(async (item, index1) => {
        await Promise.all(
          item.transaction_details.map(async (item, index2) => {
            const id = item.product_variant.product.id;
            const gallery = await product_galleries.findAll({ where: { product_id: id } });
            data[index1].transaction_details[index2].product_variant.product.dataValues.product_galleries = gallery;
          })
        );
      });

      await Promise.all(promises);

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
      const data = await transactions.findByPk(id, {
        attributes: { exclude: ["createdAt", "updatedAt"] },
        include: [
          { model: users, attributes: { exclude: ["createdAt", "updatedAt"] } },
          {
            model: addresses,
            attributes: { exclude: ["createdAt", "updatedAt"] },
            include: [
              { model: provinces, attributes: { exclude: ["createdAt", "updatedAt"] } },
              { model: cities, attributes: { exclude: ["createdAt", "updatedAt"] } }
            ]
          },
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
                  },
                  {
                    model: product_type,
                    attributes: { exclude: ["createdAt", "updatedAt"] }
                  },
                  {
                    model: product_size,
                    attributes: { exclude: ["createdAt", "updatedAt"] }
                  }
                ]
              }
            ]
          }
        ]
      });

      const promises = await Promise.all(
        data.transaction_details.map(async (item, index) => {
          const id = item.product_variant.product.id;
          const gallery = await product_galleries.findAll({ where: { product_id: id } });
          data.transaction_details[index].product_variant.product.dataValues.product_galleries = gallery;
        })
      );

      await Promise.all(promises);

      data.transaction_details.map(async (item, index) => {
        const id = item.product_variant.product.id;
        const gallery = await product_galleries.findAll({ where: { product_id: id } });
        data.transaction_details[index].product_variant.product.dataValues.product_galleries = gallery;
      });

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
