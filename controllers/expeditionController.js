const { expedition } = require("../models");

class ExpeditionController {
  static async getAll(req, res, next) {
    try {
      const expe = await expedition.findAll();
      res.status(200).json(expe);
    } catch (error) {
      next(error);
    }
  }

  static async getOne(req, res, next) {
    try {
      const { id } = req.params;
      const expe = await expedition.findAll({ where: { id } });
      if (!expe[0]) {
        throw { name: "notFound" };
      }
      res.status(200).json(expe);
    } catch (error) {
      next(error);
    }
  }

  static async create(req, res, next) {
    try {
      const { expedition_name } = req.body;
      console.log(expedition_name);
      if (!req.file) {
        throw { name: "fileNotFound" };
      }
      const { filename } = req.file;
      const photo_url = `${req.protocol}://${req.get("host")}/static/${filename}`;
      const data = await expedition.create({ photo_url, expedition_name });
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async update(req, res, next) {
    try {
      const { expedition_name } = req.body;
      const { id } = req.params;
      if (!req.file) {
        throw { name: "fileNotFound" };
      }
      const { filename } = req.file;
      const photo_url = `${req.protocol}://${req.get("host")}/static/${filename}`;
      const data = await expedition.update({ photo_url, expedition_name }, { where: { id } });
      const status = data[0] == 1 ? "success" : "error";
      res.status(200).json({ status });
    } catch (error) {
      next(error);
    }
  }

  static async delete(req, res, next) {
    try {
      const { id } = req.params;
      await expedition.destroy({ where: { id } });
      const status = "success";
      res.status(201).json({ status });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ExpeditionController;
