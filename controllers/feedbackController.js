const { feedbacks, product_variant, product_size, product_type, feedback_galleries } = require("../models");

class feedbacksController {
  static async getAll(req, res, next) {
    try {
      const { product_id } = req.params;
      let expe = await feedbacks.findAll({
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
      if (!expe[0]) {
        throw { name: "notFound" };
      }
      res.status(200).json(expe);
    } catch (error) {
      next(error);
    }
  }

  static async getOne(req, res, next) {
    try {
      const { product_id, id } = req.params;
      let expe = await feedbacks.findByPk(id, {
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
      if (!expe) {
        throw { name: "notFound" };
      }
      res.status(200).json(expe);
    } catch (error) {
      next(error);
    }
  }

  static async create(req, res, next) {
    try {
      const { user_id, product_variant_id, feedback, rating } = req.body;
      const { product_id } = req.params;
      if (!product_variant_id || user_id || feedback || rating || user_id) {
        throw { name: "nullParameter" };
      }

      const data = await feedbacks.create({ user_id, product_variant_id, feedback, rating });

      const feedback_id = data.dataValues.id;

      for (const file of req.files) {
        const { filename } = file;
        const photo_url = `${req.protocol}://${req.get("host")}/static/${filename}`;
        await feedback_galleries.create({ feedback_id, photo_url });
      }
      
      const data1 = await feedbacks.findByPk(feedback_id, {
        include: [feedback_galleries]
      });
      res.status(200).json(data1);
    } catch (error) {
      next(error);
    }
  }

  static async update(req, res, next) {
    try {
      const { feedback, rating } = req.body;
      const { id } = req.params;
      if ( !feedback || !rating ){
        throw { name: "nullParameter" };
      }
      console.log(expedition_id);
      const data = await feedbacks.update({ feedback, rating }, { where: {  id } });
      const status = data[0] == 1 ? "success" : "error";
      res.status(200).json({ status });
    } catch (error) {
      next(error);
    }
  }

  static async delete(req, res, next) {
    try {
      const { id } = req.params;
      await feedbacks.destroy({ where: { id } });
      let status = "success";
      res.status(201).json({ status });
    } catch (error) {
      next(error);
    }
  }

  static async deleteGallery(req, res, next) {
    try {
      const { id } = req.params;
      await feedback_galleries.destroy({ where: { id } });
      let status = "success";
      res.status(201).json({ status });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = feedbacksController;
