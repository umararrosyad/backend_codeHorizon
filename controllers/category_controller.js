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
      const { category_name} = req.body;
      if (!category_name) {
        throw { name: "nullParameter" };
      }
      if (!req.file) {
        throw { name: "fileNotFound" };
      }
      const { filename } = req.file;
      const photo_url = `${req.protocol}://${req.get("host")}/static/${filename}`;
      const newCategory = await categories.create({ category_name, photo_url });
      res.status(201).json(newCategory);
    } catch (error) {
      next(error);
    }
  }

  static async update(req, res, next) {
    try {
      const { id } = req.params;
      const { category_name} = req.body;
      if (!category_name) {
        throw { name: "nullParameter" };
      }
      if (!req.file) {
        throw { name: "fileNotFound" };
      }
      const { filename } = req.file;
      const photo_url = `${req.protocol}://${req.get("host")}/static/${filename}`;
      const updateCategory = await categories.update(
        { category_name, photo_url },
        { where: { id } }
      );
      
      const status = updateCategory[0] == 1 ? "success" : "error";
      res.status(200).json({ status });

      
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
