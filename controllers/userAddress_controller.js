const { users, addresses } = require("../models");

class AddressController {
  static async create(req, res, next) {

    try {
      const { address, province_id, city_id, kode_pos } =req.body;
      const { user_id } = req.params;

      const dataAddress = await addresses.create({
        user_id:user_id,
        address,
        province_id,
        city_id,
        kode_pos,
      });
      res.status(200).json(dataAddress);
    } catch (error) {
      next(error);
    }
  }

  static async update(req, res, next) {
    try {
      const { user_id, id } = req.params;
      const { address, province_id, city_id, kode_pos } = req.body;
      const updateAddress = await addresses.update(
        {
          user_id: user_id,
          address,
          province_id,
          city_id,
          kode_pos,
        },
        { where: { id,user_id } }
      );
      if (updateAddress == "1") {
        return res.status(200).json({ message: "User Address updated successfully" });
      }
      return res.status(200).json({ message: "User Address updated failed" });
    } catch (error) {
      next(error);
    }
  }

  static async delete(req, res, next) {
    try {
      const {user_id, id } = req.params;

      // Hapus pengguna berdasarkan ID
      await addresses.destroy({ where: { user_id, id} });
      res.status(200).json({ message: "User Address deleted successfully" });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = AddressController;
