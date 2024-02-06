const { products, categories, product_galleries, product_size, product_type, expedition_products, expedition, product_variant, feedbacks } = require("../models");

class ProductController {
  static async getAll(req, res, next) {
    try {
      const Movie = await products.findAll({
        include: [
          categories,
          product_galleries,
          product_size,
          product_type,
          {
            model: product_variant,
            include: [feedbacks, product_size, product_type]
          },
          {
            model: expedition_products,
            include: [expedition]
          }
        ]
      });
      const movies1 = inputRating(Movie, getAllRatings(Movie));
      const movies2 = inputPrice(movies1, getPrice(Movie));

      res.status(200).json(movies2);
    } catch (error) {
      console.log(error);
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
      arr[i].dataValues.min_price = Math.min(...price[i]);
      arr[i].dataValues.max_price = Math.max(...price[i]);
    }
  }
  return arr;
}

function inputRating(arr, rating) {
  for (let i = 0; i < arr.length; i++) {
    // Menambahkan properti rating ke setiap objek movie
    arr[i].dataValues.rating_product = rating[i];
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
