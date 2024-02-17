const { users, addresses } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class UserController {
  static async getAll(req, res, next) {
    try {
      const data = await users.findAll({
        include: [addresses],
      });
      if(!data){
        throw { name: "notFound" };
      }
      res.status(200).json({
        status: "success",
        message: "data berhasil ditemukan",
        data
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
        data
      });
    } catch (err) {
      next(err);
    }
  }

  static async register(req, res, next) {
    try {
      const { email, name, password, phone_number } = req.body;
      if(!email || !name || !password || !phone_number){
        throw { name: "nullParameter" };
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await users.create({
        email,
        name,
        password: hashedPassword,
        phone_number,
        role: "user", // Set nilai default role
        username: null,
        photo_url: null,
      });

      res.status(201).json({
        status: "success",
        message: "register berhasil",
        data : newUser
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
      res
        .cookie("access_token", token, { http_only: true })
        .status(200)
        .json({
          status: "success",
          message: "login berhasil",
          data : user
        });
    } catch (err) {
      next(err);
    }
  }

  static async update(req, res, next) {
    try {
      const { id } = req.params;
      const { name, email, username, password, phone_number, photo_url } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const  [updateCount, [updatedItem]]  = await users.update(
        {
          name,
          email,
          username,
          password: hashedPassword,
          phone_number,
          photo_url,
        },
        { where: { id }, returning: true }
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
      const { id } = req.params;
      const data = users.findByPk(id)
      if(!data){
        throw { name: "notFound" };
      }
      await users.destroy({where: { id }});
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

module.exports = UserController;
