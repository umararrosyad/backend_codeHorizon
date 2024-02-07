const { users } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class UserController {
  static async getAll(req, res, next) {
    try {
      const user = await users.findAll();
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }

  static async getOne(req, res, next) {
    try {
      const { id } = req.params;

      const user = await users.findByPk(id);
      if (!user) throw { name: "Item not found" };

      res.status(200).json(user);
    } catch (err) {
      next(err);
    }
  }

  static async register(req, res, next) {
    try {
      const { email, name, password, phone_number } = req.body;

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

      res.status(201).json(newUser);
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await users.findOne({ where: { email } });
      if (!user) {
        throw { name: "InvalidCredential" };
      }
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        throw { name: "InvalidCredential" };
      }
      const token = jwt.sign({ id: user.id }, "codehorizon");
      // res.status(200).json({ token });
      res
        .cookie("access_token", token, { http_only: true })
        .status(200)
        .json(user);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = UserController;
