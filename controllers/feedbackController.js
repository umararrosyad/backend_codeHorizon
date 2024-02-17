const { feedbacks, product_variant, product_size, product_type, feedback_galleries } = require("../models");
const { Op } = require("sequelize");
class feedbacksController {
  static async getAll(req, res, next) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;

      const offset = (page - 1) * limit;
      
      const { product_id } = req.params;
      let data = await feedbacks.findAll({
        attributes: { exclude: ["createdAt", "updatedAt"] },
        include: [
          {
            model: product_variant,
            attributes: { exclude: ["createdAt", "updatedAt"] },
            where: { product_id },
            include: [
              { model: product_size, attributes: { exclude: ["createdAt", "updatedAt"] } },
              { model: product_type, attributes: { exclude: ["createdAt", "updatedAt"] } }
            ]
          },
          { model: feedback_galleries, attributes: { exclude: ["createdAt", "updatedAt"] } }
        ],
        offset,
        limit
      });
      const count = await feedbacks.count();
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
      const { product_id, id } = req.params;
      let data = await feedbacks.findByPk(id, {
        attributes: { exclude: ["createdAt", "updatedAt"] },
        include: [
          {
            model: product_variant,
            attributes: { exclude: ["createdAt", "updatedAt"] },
            where: { product_id },
            include: [
              { model: product_size, attributes: { exclude: ["createdAt", "updatedAt"] } },
              { model: product_type, attributes: { exclude: ["createdAt", "updatedAt"] } }
            ]
          },
          { model: feedback_galleries, attributes: { exclude: ["createdAt", "updatedAt"] } }
        ]
      });
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
      const { user_id, product_variant_id, feedback, rating } = req.body;
      const { product_id } = req.params;
      if (!product_variant_id || !user_id || !feedback || !rating ) {
        throw { name: "nullParameter" };
      }

      const data = await feedbacks.create({ user_id, product_variant_id, feedback, rating });

      const feedback_id = data.dataValues.id;

      for (const file of req.files) {
        const { filename } = file;
        const photo_url = `${req.protocol}://${req.get("host")}/static/${filename}`;
        await feedback_galleries.create({ feedback_id, photo_url });
      }
      
      const createData = await feedbacks.findByPk(feedback_id, {
        include: [feedback_galleries]
      });
      res.status(201).json({
        status : "success",
        message : "Data berhasil dibuat.",
        data : createData
      });
    } catch (error) {
      next(error);
    }
  }

  static async update(req, res, next) {
    try {
      const { feedback, rating } = req.body;
      const { id } = req.params;
      const [updateCount, [updatedItem]] = await feedbacks.update({ feedback, rating }, { where: { id }, returning: true });
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
      data = await feedbacks.findByPk(id)
      if (!data) {
        throw { name: "notFound" };
      }
      await feedbacks.destroy({ where: { id } });
      res.status(200).json({ 
        status : success,
        message : "data berhasil dihaps",
        data
       });
    } catch (error) {
      next(error);
    }
  }

  static async deleteGallery(req, res, next) {
    try {
      const { id } = req.params;
      data = await feedback_galleries.findByPk(id)
      if (!data) {
        throw { name: "notFound" };
      }
      await feedback_galleries.destroy({ where: { id } });
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

module.exports = feedbacksController;
