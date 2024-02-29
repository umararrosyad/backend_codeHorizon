const { products, Werehouses, categories, transaction_details, transactions, product_galleries, product_size, product_type, expedition_products, expedition, product_variant, feedbacks } = require("../models");
const { Op } = require("sequelize");
class ProductController {
  static async getAll(req, res, next) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;

      const short = req.query.short || "";

      const offset = (page - 1) * limit;
      const searchName = req.query.name || "";
      const searchCategory = req.query.category_id || "";
      console.log(searchCategory);
      const searchCondition = {
        [Op.or]: [{ name: { [Op.iLike]: `%${searchName}%` } }]
      };

      let data;
      let count;
      if (searchCategory == "") {
        data = await products.findAll({
          where: searchCondition,
          offset,
          limit,
          order: [["id", "ASC"]],
          attributes: ["id", "category_id", "name", "description"],
          include: [
            { model: categories, attributes: { exclude: ["createdAt", "updatedAt"] } },
            { model: Werehouses, attributes: { exclude: ["createdAt", "updatedAt"] } },
            { model: product_galleries, order: [["id", "ASC"]], attributes: { exclude: ["createdAt", "updatedAt"] } },
            { model: product_size, attributes: { exclude: ["createdAt", "updatedAt"] } },
            { model: product_type, attributes: { exclude: ["createdAt", "updatedAt"] } },
            {
              model: product_variant,
              attributes: { exclude: ["createdAt", "updatedAt"] },
              include: [
                { model: feedbacks, attributes: { exclude: ["createdAt", "updatedAt"] } },
                { model: product_size, attributes: { exclude: ["createdAt", "updatedAt"] } },
                { model: product_type, attributes: { exclude: ["createdAt", "updatedAt"] } },
                {
                  model: transaction_details,
                  attributes: { exclude: ["createdAt", "updatedAt"] },
                  include: [{ model: transactions, attributes: { exclude: ["createdAt", "updatedAt"] }, where: { transaction_status: "Selesai" } }]
                }
              ]
            },
            {
              model: expedition_products,
              attributes: { exclude: ["createdAt", "updatedAt"] },
              include: [{ model: expedition, attributes: { exclude: ["createdAt", "updatedAt"] } }]
            }
          ]
        });
        count = await products.count({
          where: searchCondition
        });
      } else {
        data = await products.findAll({
          where: searchCondition,
          offset,
          limit,
          order: [["id", "ASC"]],
          attributes: ["id", "category_id", "name", "description"],
          include: [
            { model: categories, attributes: { exclude: ["createdAt", "updatedAt"] }, where: { id: searchCategory } },
            { model: Werehouses, attributes: { exclude: ["createdAt", "updatedAt"] } },
            { model: product_galleries, order: [["id", "ASC"]], attributes: { exclude: ["createdAt", "updatedAt"] } },
            { model: product_size, attributes: { exclude: ["createdAt", "updatedAt"] } },
            { model: product_type, attributes: { exclude: ["createdAt", "updatedAt"] } },
            {
              model: product_variant,
              attributes: { exclude: ["createdAt", "updatedAt"] },
              include: [
                { model: feedbacks, attributes: { exclude: ["createdAt", "updatedAt"] } },
                { model: product_size, attributes: { exclude: ["createdAt", "updatedAt"] } },
                { model: product_type, attributes: { exclude: ["createdAt", "updatedAt"] } },
                {
                  model: transaction_details,
                  attributes: { exclude: ["createdAt", "updatedAt"] },
                  include: [{ model: transactions, attributes: { exclude: ["createdAt", "updatedAt"] }, where: { transaction_status: "Selesai" } }]
                }
              ]
            },
            {
              model: expedition_products,
              attributes: { exclude: ["createdAt", "updatedAt"] },
              include: [{ model: expedition, attributes: { exclude: ["createdAt", "updatedAt"] } }]
            }
          ]
        });

        count = await products.count({
          where: {
            [Op.and]: [
              searchCondition,
              { category_id: searchCategory } // Menambahkan kondisi category_id = 1
            ]
          }
        });
      }

      const data1 = inputRating(data, getAllRatings(data));
      const data2 = inputPrice(data1, getPrice(data));
      const data3 = inputQty(data2, getSold(data));

      if (short === "rating") {
        data3.sort((a, b) => parseFloat(b.dataValues.rating_product) - parseFloat(a.dataValues.rating_product));
      } else if (short === "total_sold") {
        data3.sort((a, b) => parseFloat(b.dataValues.total_sold) - parseFloat(a.dataValues.total_sold));
      } else if (short === "price") {
        data3.sort((a, b) => parseFloat(a.dataValues.min_price) - parseFloat(b.dataValues.min_price));
      }

      // console.log(count);
      const totalPages = Math.ceil(count / limit);

      if (data.length === 0 && page > 1) {
        throw { name: "notFound" }; // Handle jika halaman yang diminta lebih besar dari total halaman yang tersedia
      }

      res.status(200).json({
        status: "success",
        message: "Data berhasil ditemukan.",
        data: data3,
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
        attributes: ["id", "category_id", "werehouse_id", "name", "description"],
        include: [
          { model: categories, attributes: { exclude: ["createdAt", "updatedAt"] } },
          { model: Werehouses, attributes: { exclude: ["createdAt", "updatedAt"] } },
          { model: product_galleries, order: [["id", "ASC"]], attributes: { exclude: ["createdAt", "updatedAt"] } },
          { model: product_size, attributes: { exclude: ["createdAt", "updatedAt"] } },
          { model: product_type, attributes: { exclude: ["createdAt", "updatedAt"] } },
          {
            model: product_variant,
            attributes: { exclude: ["createdAt", "updatedAt"] },
            include: [
              { model: feedbacks, attributes: { exclude: ["createdAt", "updatedAt"] } },
              { model: product_size, attributes: { exclude: ["createdAt", "updatedAt"] } },
              { model: product_type, attributes: { exclude: ["createdAt", "updatedAt"] } },
              {
                model: transaction_details,
                attributes: { exclude: ["createdAt", "updatedAt"] },
                include: [{ model: transactions, attributes: { exclude: ["createdAt", "updatedAt"] }, where: { transaction_status: "Selesai" } }]
              }
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

      const rating = getAllRatingsOne(data);
      data.dataValues.rating_product = `${rating[0]}`;
      const price = getPriceOne(data);
      console.log(price)
      if (price[0].length > 0) {
        const nonZeroPrices = price[0].filter((val) => val !== 0);
        if (nonZeroPrices.length > 0) {
          data.dataValues.min_price = `${Math.min(...nonZeroPrices)}`;
          data.dataValues.max_price = `${Math.max(...price[0])}`;
        } else {
          // Semua harga adalah 0
          data.dataValues.min_price = "0";
          data.dataValues.max_price = "0";
        }
      } else {
        // Tidak ada harga
        data.dataValues.min_price = "0";
        data.dataValues.max_price = "0";
      }
      const sold = getSoldOne(data);
      data.dataValues.total_sold = `${sold[0]}`;

      // console.log(sold);

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
      const { werehouse_id, name, category_id, description } = req.body;
      console.log(werehouse_id, name, category_id, description);
      if (!werehouse_id || !name || !category_id || !description) {
        throw { name: "nullParameter" };
      }

      console.log(werehouse_id, name, category_id, description);

      const data = await products.create({
        name,
        category_id,
        werehouse_id,
        description,
        createdAt: new Date(),
        updatedAt: new Date()
      });
      console.log(data.id);
      const data2 = await product_variant.create({
        product_id: data.id,
        product_type_id: null,
        product_size_id: null,
        weight: 0,
        price: 0,
        stock: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      });

      console.log(data2);
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
      const { werehouse_id, name, category_id, description } = req.body;
      if (!name || !category_id || !description) {
        throw { name: "nullParameter" };
      }
      const [updateCount, [updatedItem]] = await products.update(
        {
          name,
          werehouse_id,
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
      console.log(id);
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
  const average = sum / arr.length;
  return average.toFixed(1);
}

function inputPrice(arr, price) {
  for (let i = 0; i < arr.length; i++) {
    if (price[i].length > 0) {
      const nonZeroPrices = price[i].filter((val) => val !== 0);
      if (nonZeroPrices.length > 0) {
        // Jika ada nilai yang tidak sama dengan 0, gunakan nilai minimal tersebut
        arr[i].dataValues.min_price = `${Math.min(...nonZeroPrices)}`;
      } else {
        // Jika semua nilai adalah 0, atur min_price menjadi "0"
        arr[i].dataValues.min_price = "0";
      }

      // Menggunakan nilai minimal dari semua harga
      arr[i].dataValues.max_price = `${Math.max(...price[i])}`;
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

function inputQty(arr, qty) {
  for (let i = 0; i < arr.length; i++) {
    arr[i].dataValues.total_sold = `${qty[i]}`;
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

function getSold(data) {
  const qtyArray = [];

  for (let i = 0; i < data.length; i++) {
    let qty = 0;
    const variants = data[i].product_variants;

    for (let j = 0; j < variants.length; j++) {
      const details = variants[j].transaction_details;

      for (let k = 0; k < details.length; k++) {
        if (details[k].qty) {
          qty += details[k].qty;
        }
      }
    }
    qtyArray.push(qty);
  }

  return qtyArray;
}

/////////////////////////////////////////////////////////////////////////////////////////////////

// function inputPrice(arr, price) {
//   for (let i = 0; i < arr.length; i++) {
//     if (price[i].length > 0) {
//       const nonZeroPrices = price[i].filter((val) => val !== 0);
//       if (nonZeroPrices.length > 0) {
//         // Jika ada nilai yang tidak sama dengan 0, gunakan nilai minimal tersebut
//         arr[i].dataValues.min_price = `${Math.min(...nonZeroPrices)}`;
//       } else {
//         // Jika semua nilai adalah 0, atur min_price menjadi "0"
//         arr[i].dataValues.min_price = "0";
//       }

//       // Menggunakan nilai minimal dari semua harga
//       arr[i].dataValues.max_price = `${Math.max(...price[i])}`;
//     } else {
//       arr[i].dataValues.min_price = "0";
//       arr[i].dataValues.max_price = "0";
//     }
//   }
//   return arr;
// }

// function inputRating(arr, rating) {
//   for (let i = 0; i < arr.length; i++) {
//     arr[i].dataValues.rating_product = `${rating[i]}`;
//   }
//   return arr;
// }

// function inputQty(arr, qty) {
//   for (let i = 0; i < arr.length; i++) {
//     arr[i].dataValues.total_sold = `${qty[i]}`;
//   }
//   return arr;
// }

function getPriceOne(data) {
  const price = [];
  let variant_price = [];
  const variants = data.product_variants;
  for (let j = 0; j < variants.length; j++) {
    variant_price.push(variants[j].dataValues.price);
  }
  price.push(variant_price);
  return price;
}

function getAllRatingsOne(data) {
  const ratings = [];

  let variant_rating = [];
  const variants = data.product_variants;

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
  console.log;
  return ratings;
}

function getSoldOne(data) {
  const qtyArray = [];

  let qty = 0;
  const variants = data.product_variants;

  for (let j = 0; j < variants.length; j++) {
    const details = variants[j].transaction_details;

    for (let k = 0; k < details.length; k++) {
      if (details[k].qty) {
        qty += details[k].qty;
      }
    }
  }
  qtyArray.push(qty);

  return qtyArray;
}

module.exports = ProductController;
