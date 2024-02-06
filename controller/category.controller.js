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

      const movie = await Movie.findByPk(id);
      if (!movie) throw { name: "notFound" };

      res.status(200).json(movie);
    } catch (err) {
      next(err);
    }
  }

  static async create(req, res, next) {
    try {
      const { name, category } = req.body;
      const newMovie = await Movie.create({ name, category });
      res.status(201).json(newMovie);
    } catch (error) {
      next(error);
    }
  }

  static async update(req, res, next) {
    try {
      const { id } = req.params;
      const { name, category } = req.body;
      const updateMovie = await Movie.update(
        { name, category },
        { where: { id } }
      );
      res.status(200).json(updateMovie);
    } catch (error) {
      next(error);
    }
  }

  static async delete(req, res, next) {
    try {
      const { id } = req.params;
      await Movie.destroy({ where: { id } });
      res.status(200).json({ message: "Movie deleted successfully" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = CategoryController;
