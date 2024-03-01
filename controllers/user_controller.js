const { users, addresses } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");

class UserController {
  static async getAll(req, res, next) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;

      const offset = (page - 1) * limit;
      const searchName = req.query.name || "";

      const searchCondition = {
        [Op.or]: [{ name: { [Op.iLike]: `%${searchName}%` } }],
      };
      const data = await users.findAll({
        where: searchCondition,
        include: [addresses],
        limit,
        offset,
      });
      const count = await users.count({
        where: searchCondition,
      });
      const totalPages = Math.ceil(count / limit);

      if (data.length === 0 && page > 1) {
        throw { name: "notFound" };
      }

      res.status(200).json({
        status: "success",
        message: "Data berhasil ditemukan.",
        data,
        pagination: {
          currentPage: page,
          totalPages,
          totalItems: count,
          perPage: limit,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  static async getOne(req, res, next) {
    try {
      const { id } = req.params;

      const data = await users.findByPk(id, {
        include: [addresses],
      });
      if (!data) throw { name: "notFound" };

      res.status(200).json({
        status: "success",
        message: "data berhasil ditemukan",
        data,
      });
    } catch (err) {
      next(err);
    }
  }

  static async register(req, res, next) {
    try {
      const { email, name, password, phone_number, username } = req.body;
      if (!email || !name || !password || !phone_number || !username) {
        throw { name: "nullParameter" };
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await users.create({
        email,
        name,
        password: hashedPassword,
        phone_number,
        role: "user",
        username,
        photo_url: null,
      });

      res.status(201).json({
        status: "success",
        message: "register berhasil",
        data: newUser,
      });
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await users.findOne({ where: { email } });
      if (!user) {
        throw { name: "invalidCaredential" };
      }
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        throw { name: "invalidCaredential" };
      }
      const token = jwt.sign({ id: user.id }, "codehorizon");
      res.status(200).json({
        status: "success",
        message: "login berhasil",
        data: user,
        token,
      });
    } catch (err) {
      next(err);
    }
  }

  static async loginAdmin(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await users.findOne({ where: { email, role: "admin" } });
      if (!user) {
        throw { name: "invalidCaredential" };
      }

      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        throw { name: "invalidCaredential" };
      }
      const token = jwt.sign({ id: user.id }, "codehorizon");
      res.status(200).json({
        status: "success",
        message: "login berhasil",
        data: token,
      });
    } catch (err) {
      next(err);
    }
  }

  static async update(req, res, next) {
    try {
      const { id } = req.params;
      const { name, email, username, password, phone_number, photo_url } =
        req.body;
      const updateFields = {
        name,
        email,
        username,
        phone_number,
      };

      // Cek apakah photo_url ada dalam permintaan
      if (password) {
        // Jika ada, tambahkan ke bidang yang akan diperbarui
        const hashedPassword = await bcrypt.hash(password, 10);
        updateFields.password = hashedPassword;
      }

      if (photo_url !== undefined) {
        // Jika photo_url ada dalam permintaan, tambahkan ke bidang yang akan diperbarui
        updateFields.photo_url = photo_url;
      }

      const [updateCount, [updatedItem]] = await users.update(updateFields, {
        where: { id },
        returning: true,
      });
      const message = updateCount === 1 ? "Data berhasil diupdate" : "Data gagal diupdate";
      const status = updateCount === 1 ? "success" : "error";
      const data = updateCount === 1 ? updatedItem : null;
      res.status(200).json({
        status,
        message,
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  static async delete(req, res, next) {
    try {
      const { id } = req.params;
      const data = users.findByPk(id);
      if (!data) {
        throw { name: "notFound" };
      }
      await users.destroy({ where: { id } });
      res.status(200).json({
        status: "success",
        message: "data berhasil dihapus",
        data,
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = UserController;
