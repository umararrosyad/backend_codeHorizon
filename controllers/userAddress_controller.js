const { addresses, provinces, cities } = require("../models");
const axios = require("axios");
class AddressController {
  static async getAll(req, res, next) {
    try {
      const { user_id } = req.params;

      const data = await addresses.findAll({
        where: { user_id },
        attributes: { exclude: ["createdAt", "updatedAt"] },
        include: [
          { model: provinces, attributes: { exclude: ["createdAt", "updatedAt"] } },
          { model: cities, attributes: { exclude: ["createdAt", "updatedAt"] } }
        ]
      });

      if (!data[0]) {
        throw { name: "notFound" };
      }
      
      res.status(200).json({
        status: "success",
        message: "data berhasil dibuat",
        data
      });
    } catch (error) {
      next(error);
    }
  }

  static async getOne(req, res, next) {
    try {
      const { user_id, id } = req.params;

      const data = await addresses.findByPk(id, {
        where: { user_id },
        attributes: { exclude: ["createdAt", "updatedAt"] }
      });

      if (!data) {
        throw { name: "notFound" };
      }

      const werehouse = data.dataValues;
      const city = werehouse.city_id;
      const province = werehouse.province_id;
      const response = await getName(city, province);
      data.dataValues.city_name = response.city_name;
      data.dataValues.province_name = response.province;

      res.status(200).json({
        status: "success",
        message: "data berhasil dibuat",
        data
      });
    } catch (error) {
      next(error);
    }
  }
  static async create(req, res, next) {
    try {
      const { address, province_id, city_id, kode_pos } = req.body;
      const { user_id } = req.params;

      if (!address || !province_id || !city_id || !kode_pos) {
        throw { name: "nullParameter" };
      }

      const data = await addresses.create({
        user_id: user_id,
        address,
        province_id,
        city_id,
        kode_pos
      });

      res.status(200).json({
        status: "success",
        message: "data berhasil dibuat",
        data
      });
    } catch (error) {
      next(error);
    }
  }

  static async update(req, res, next) {
    try {
      const { user_id, id } = req.params;
      const { address, province_id, city_id, kode_pos } = req.body;
      if (!address || !province_id || !city_id || !kode_pos) {
        throw { name: "nullParameter" };
      }

      const [updateCount, [updatedItem]] = await addresses.update(
        {
          user_id: user_id,
          address,
          province_id,
          city_id,
          kode_pos
        },
        { where: { id, user_id }, returning: true }
      );
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
      const { user_id, id } = req.params;
      const data = await addresses.findByPk(id);
      if (!data) {
        throw { name: "notFound" };
      }
      await addresses.destroy({ where: { user_id, id } });

      res.status(200).json({
        status: "success",
        message: "data berhasil dihapus",
        data
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = AddressController;

async function getName(city, province) {
  const response = await axios.get("https://api.rajaongkir.com/starter/city", {
    params: {
      id: city,
      province: province
    },
    headers: {
      key: "0382f3187bf1cf90fdc5487b8a659c45"
    }
  });
  return response.data.rajaongkir.results;
}
