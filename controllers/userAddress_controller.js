const { addresses } = require("../models");

class AddressController {
  static async create(req, res, next) {
    try {
      const { address, province_id, city_id, kode_pos } = req.body;
      const { user_id } = req.params;

      if (!address || !province_id || !city_id || !kode_pos) {
        throw { name: "nullParameter" };
      }

      const data = await addresses.create({
        user_id : user_id,
        address,
        province_id,
        city_id,
        kode_pos,
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
          kode_pos,
        },
        { where: { id,user_id }, returning: true }
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
      const {user_id, id } = req.params;
      const data = await addresses.findByPk(id)
      if(!data){
        throw { name: "notFound" }
      }
      await addresses.destroy({ where: { user_id, id} });

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
