const { products, categories, product_galleries, product_size, product_type, expedition_products, expedition, product_variant, feedbacks } = require("../models");

class ProductController {
  static async getAll(req, res, next) {
    try {
      let Product = await products.findAll({
        attributes: { exclude: ["createdAt", "updatedAt"] },
        include: [
          { model: categories,  attributes: { exclude: ["createdAt", "updatedAt"] }},
          { model: product_galleries, attributes: { exclude: ["createdAt", "updatedAt"] } },
          { model: product_size,  attributes: { exclude: ["createdAt", "updatedAt"] } },
          { model: product_type,  attributes: { exclude: ["createdAt", "updatedAt"] } },
          {
            model: product_variant,
            attributes: { exclude: ["createdAt", "updatedAt"] },
            include: [
              { model: feedbacks,  attributes: { exclude: ["createdAt", "updatedAt"] }},
              { model: product_size, attributes: { exclude: ["createdAt", "updatedAt"] } },
              { model: product_type, attributes: { exclude: ["createdAt", "updatedAt"] } }
            ]
          },
          {
            model: expedition_products,
            attributes: { exclude: ["createdAt", "updatedAt"] },
            include: [{model:expedition, attributes: { exclude: ["createdAt", "updatedAt"] }}]
          }
        ]
      });
      if(!Product[0]){
        throw {name:"notFound"}
      }
      Product = inputRating(Product, getAllRatings(Product));
      Product = inputPrice(Product, getPrice(Product));

      res.status(200).json(Product);
    } catch (error) {
      next(error);
    }
  }

  static async getOne(req, res, next) {
    try {
      const { id } = req.params;
      let Product = await products.findByPk(id, {
        attributes: ["id", "category_id", "name", "description"],
        include: [
          { model: categories, attributes: ["id", "category_name"] },
          { model: product_galleries, attributes: ["id", "photo_url"] },
          { model: product_size, attributes: ["id", "size_name"] },
          { model: product_type, attributes: ["id", "type_name", "photo_url"] },
          {
            model: product_variant,
            attributes: ["id", "weight", "price", "stock"],
            include: [
              { model: feedbacks, attributes: ["id", "rating"] },
              { model: product_size, attributes: ["id", "size_name"] },
              { model: product_type, attributes: ["id", "type_name", "photo_url"] }
            ]
          },
          {
            model: expedition_products,
            attributes: ["id", "expedition_id"],
            include: [{model:expedition, attributes: ["id", "expedition_name", "photo_url"]}]
          }
        ]
      });

      if (!Product) {
        throw { name: "notFound" };
      }
      Product = inputRating(Product, getAllRatings(Product));
      Product = inputPrice(Product, getPrice(Product));

      res.status(200).json(Product);
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

      const newProduct = await products.create({
        name,
        category_id,
        description,
        createdAt: new Date(),
        updatedAt: new Date()
      });
      if (newProduct) {
        newProduct.dataValues.status = "success";
      }
      res.status(201).json(newProduct);
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
      const newProduct = await products.update(
        {
          name,
          category_id,
          description
        },
        { where: { id } }
      );
      let status;
      if (newProduct[0] == "1") {
        status = "success";
      } else {
        status = "error";
      }
      res.status(201).json({ status });
    } catch (error) {
      next(error);
    }
  }

  static async delete(req, res, next) {
    try {
      const { id } = req.params;
      await products.destroy({ where: { id } });
      let status;
      status = "success";
      res.status(201).json({ status });
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

    return price;
  }
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
