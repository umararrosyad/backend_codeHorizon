const { products, Werehouses, categories, product_galleries, product_size, product_type, expedition_products, expedition, product_variant, feedbacks } = require("../models");
const { Op } = require("sequelize");
class ProductController {
  static async getAll(req, res, next) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;

      const offset = (page - 1) * limit;
      const searchName = req.query.name || "";

      const searchCondition = {
        [Op.or]: [{ name: { [Op.iLike]: `%${searchName}%` } }]
      };

      let data = await products.findAll({
        where: searchCondition,
        offset,
        limit,
        attributes: ["id", "category_id", "name", "description"],
        include: [
          { model: categories, attributes: { exclude: ["createdAt", "updatedAt"] } },
          { model: Werehouses, attributes: { exclude: ["createdAt", "updatedAt"] } },
          { model: product_galleries, attributes: { exclude: ["createdAt", "updatedAt"] } },
          { model: product_size, attributes: { exclude: ["createdAt", "updatedAt"] } },
          { model: product_type, attributes: { exclude: ["createdAt", "updatedAt"] } },
          {
            model: product_variant,
            attributes: { exclude: ["createdAt", "updatedAt"] },
            include: [
              { model: feedbacks, attributes: { exclude: ["createdAt", "updatedAt"] } },
              { model: product_size, attributes: { exclude: ["createdAt", "updatedAt"] } },
              { model: product_type, attributes: { exclude: ["createdAt", "updatedAt"] } }
            ]
          },
          {
            model: expedition_products,
            attributes: { exclude: ["createdAt", "updatedAt"] },
            include: [{ model: expedition, attributes: { exclude: ["createdAt", "updatedAt"] } }]
          }
        ]
      });

      const data1 = inputRating(data, getAllRatings(data));
      const data2 = inputPrice(data1, getPrice(data));

      const count = await products.count({
        where: searchCondition
      });
      // console.log(count);
      const totalPages = Math.ceil(count / limit);

      if (data.length === 0 && page > 1) {
        throw { name: "notFound" }; // Handle jika halaman yang diminta lebih besar dari total halaman yang tersedia
      }

      res.status(200).json({
        status: "success",
        message: "Data berhasil ditemukan.",
        data: data2,
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
      let data = await products.findByPk(id, {
        attributes: ["id", "category_id", "name", "description"],
        include: [
          { model: categories, attributes: { exclude: ["createdAt", "updatedAt"] } },
          { model: product_galleries, attributes: { exclude: ["createdAt", "updatedAt"] } },
          { model: product_size, attributes: { exclude: ["createdAt", "updatedAt"] } },
          { model: product_type, attributes: { exclude: ["createdAt", "updatedAt"] } },
          {
            model: product_variant,
            attributes: { exclude: ["createdAt", "updatedAt"] },
            include: [
              { model: feedbacks, attributes: { exclude: ["createdAt", "updatedAt"] } },
              { model: product_size, attributes: { exclude: ["createdAt", "updatedAt"] } },
              { model: product_type, attributes: { exclude: ["createdAt", "updatedAt"] } }
            ]
          },
          {
            model: expedition_products,
            attributes: { exclude: ["createdAt", "updatedAt"] },
            include: [{ model: expedition, attributes: { exclude: ["createdAt", "updatedAt"] } }]
          }
        ]
      });

      if (!data) {
        throw { name: "notFound" };
      }

      const data1 = inputRating(data, getAllRatings(data));
      const data2 = inputPrice(data1, getPrice(data));

      res.status(200).json({
        status: "success",
        message: "Data berhasil ditemukan.",
        data: data2
      });
    } catch (error) {
      next(error);
    }
  }

  static async create(req, res, next) {
    try {
      const { name, category_id, description } = req.body;
      if (!name || !category_id || !description) {
        throw { name: "nullParameter" };
      }

      const data = await products.create({
        name,
        category_id,
        description,
        createdAt: new Date(),
        updatedAt: new Date()
      });
      res.status(201).json({
        status: "success",
        message: "Data berhasil dibuat.",
        data
      });
    } catch (error) {
      next(error);
    }
  }

  static async update(req, res, next) {
    try {
      const { id } = req.params;
      const { name, category_id, description } = req.body;
      if (!name || !category_id || !description) {
        throw { name: "nullParameter" };
      }
      const [updateCount, [updatedItem]] = await products.update(
        {
          name,
          category_id,
          description
        },
        { where: { id }, returning: true }
      );
      const message = updateCount === 1 ? "Data berhasil diupdate" : "Data gagal diupdate";
      const status = updateCount === 1 ? "success" : "error";
      const data = updateCount === 1 ? updatedItem : null;
      res.status(201).json({
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
      const data = await products.findByPk(id);
      if (!data) {
        throw { name: "notFound" };
      }
      await products.destroy({ where: { id } });
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

function calculateAverage(arr) {
  const sum = arr.reduce((total, num) => total + num, 0);
  return sum / arr.length;
}

function inputPrice(arr, price) {
  for (let i = 0; i < arr.length; i++) {
    if (price[i]) {
      arr[i].dataValues.min_price = `${Math.min(...price[i])}`;
      arr[i].dataValues.max_price = `${Math.min(...price[i])}`;
    } else {
      arr[i].dataValues.min_price = "0";
      arr[i].dataValues.max_price = "0";
    }
  }
  return arr;
}

function inputRating(arr, rating) {
  for (let i = 0; i < arr.length; i++) {
    arr[i].dataValues.rating_product = `${rating[i]}`;
  }
  return arr;
}

function getPrice(data) {
  const price = [];

  for (let i = 0; i < data.length; i++) {
    let variant_price = [];
    const variants = data[i].product_variants;

    for (let j = 0; j < variants.length; j++) {
      variant_price.push(variants[j].dataValues.price);
    }
    price.push(variant_price);
  }
  return price;
}

function getAllRatings(data) {
  const ratings = [];

  for (let i = 0; i < data.length; i++) {
    let variant_rating = [];
    const variants = data[i].product_variants;

    for (let j = 0; j < variants.length; j++) {
      const feedbacks = variants[j].feedbacks;

      for (let k = 0; k < feedbacks.length; k++) {
        if (feedbacks[k].rating) {
          variant_rating.push(feedbacks[k].rating);
        }
      }
    }

    if (variant_rating.length > 0) {
      const averageRating = calculateAverage(variant_rating);
      ratings.push(averageRating);
    } else {
      ratings.push(0);
    }
  }

  return ratings;
}

module.exports = ProductController;
