const { categories } = require("../models");

class CategoryController {
  static async getAll(req, res, next) {
    try {
      const category = await categories.findAll();
      res.status(200).json(category);
    } catch (error) {
      next(error);
    }
  }

  static async getOne(req, res, next) {
    try {
      const { id } = req.params;

      const category = await categories.findByPk(id);
      if (!category) throw { name: "notFound" };

      res.status(200).json(category);
    } catch (err) {
      next(err);
    }
  }

  static async create(req, res, next) {
    try {
      const { category_name, photo_url } = req.body;
      const newCategory = await categories.create({ category_name, photo_url });
      res.status(201).json(newCategory);
    } catch (error) {
      next(error);
    }
  }

  static async update(req, res, next) {
    try {
      const { id } = req.params;
      const { category_name, photo_url } = req.body;
      const updateCategory = await categories.update(
        { category_name, photo_url },
        { where: { id } }
      );
      res.status(200).json({ message: "Category updated successfully" });
    } catch (error) {
      next(error);
    }
  }

  static async delete(req, res, next) {
    try {
      const { id } = req.params;
      await categories.destroy({ where: { id } });
      res.status(200).json({ message: "Category deleted successfully" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = CategoryController;
