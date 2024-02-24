const { product_type, product_size, product_variant } = require("../models");
const { Op } = require("sequelize");

class ProductTypeController {
  static async getAll(req, res, next) {
    try {
      const { product_id } = req.params;
      let data = await product_type.findAll({ where: { product_id }, attributes: { exclude: ["createdAt", "updatedAt"] } });
      if (!data[0]) {
        throw { name: "notFound" };
      }
      res.status(200).json({
        status: "success",
        message: "Data berhasil ditemukan.",
        data: data
      });
    } catch (error) {
      next(error);
    }
  }

  static async getOne(req, res, next) {
    try {
      const { product_id, id } = req.params;
      let data = await product_type.findByPk(id, { where: { product_id }, attributes: { exclude: ["createdAt", "updatedAt"] } });
      if (!data) {
        throw { name: "notFound" };
      }
      res.status(200).json({
        status: "success",
        message: "Data berhasil ditemukan.",
        data: data
      });
    } catch (error) {
      next(error);
    }
  }

  static async create(req, res, next) {
    try {
      const { type_name } = req.body;
      const { product_id } = req.params;
      if (!type_name) {
        throw { name: "nullParameter" };
      }
      if (!req.file) {
        throw { name: "fileNotFound" };
      }
      const { filename } = req.file;
      const photo_url = `${req.protocol}://${req.get("host")}/static/${filename}`;
      const data = await product_type.create({ product_id, photo_url, type_name });
      variantHandler(data.id, product_id);
      res.status(200).json({
        status: "success",
        message: "Data berhasil dibuat.",
        data: data
      });
    } catch (error) {
      next(error);
    }
  }

  static async update(req, res, next) {
    try {
      const { type_name } = req.body;
      const { product_id, id } = req.params;
      let photo_url;
      if (req.file) {
        const { filename } = req.file;
        photo_url = `${req.protocol}://${req.get("host")}/static/${filename}`;
      }

      const [updateCount, [updatedItem]] = await product_type.update({ photo_url, type_name }, { where: { product_id, id }, returning: true });
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
      const { id, product_id } = req.params;
      const data = await product_type.findByPk(id);
      if (!data) {
        throw { name: "notFound" };
      }
      await product_type.destroy({ where: { id } });
      variantHandlerDelete(id, product_id)
      res.status(200).json({
        status: "success",
        message: "data berhasil dihapus",
        data
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ProductTypeController;

async function variantHandler(id, product_id) {
  await product_variant.destroy({ where: { product_size_id: null, product_type_id: null } });

  const size = await product_size.findAll({ where: { product_id } });
  const type = await product_type.findAll({ where: { product_id } });
  const variant = await product_variant.findAll({ where: { product_id } });

  console.log(size);
  console.log(type);
  console.log(variant);

  if (size.length === 0) {
    const data2 = await product_variant.create({
      product_id: product_id,
      product_type_id: id,
      product_size_id: null,
      weight: 0,
      price: 0,
      stock: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    return;
  }

  AoutomaticFillVariant(size, type, product_id);
}

async function AoutomaticFillVariant(size, type, product_id) {
  await product_variant.destroy({ 
    where: { 
      [Op.or]: [
        { product_type_id: null },
        { product_size_id: null }
      ]
    }
  });
  size.forEach(async (size) => {
    type.forEach(async (type) => {
      const variant = await product_variant.findAll({ where: { product_id, product_type_id: type.id, product_size_id: size.id } });
      if (!variant[0]) {
        const data2 = await product_variant.create({
          product_id: product_id,
          product_type_id: type.id,
          product_size_id: size.id,
          weight: 0,
          price: 0,
          stock: 0,
          createdAt: new Date(),
          updatedAt: new Date()
        });
      }
    });
  });
}

async function variantHandlerDelete(id, product_id) {
  await product_variant.destroy({ where: { product_size_id: null, product_type_id: null } });

  const size = await product_size.findAll({ where: { product_id } });
  const type = await product_type.findAll({ where: { product_id } });
  const variant = await product_variant.findAll({ where: { product_id } });

  console.log(size);
  console.log(type);
  console.log(variant);

  if (type.length === 0 && size.length === 0) {
    const data2 = await product_variant.create({
      product_id: product_id,
      product_type_id: null,
      product_size_id: null,
      weight: 0,
      price: 0,
      stock: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    });
  }

  if (type.length === 0) {
    size.forEach(async (size) => {
      const data2 = await product_variant.create({
        product_id: product_id,
        product_type_id: null,
        product_size_id: size.id,
        weight: 0,
        price: 0,
        stock: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    });
  }
}