const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user_controller");

router.get("/", UserController.getAll);
router.get("/:id", UserController.getOne);
router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.put("/:id", UserController.update);
router.delete("/:id", UserController.delete);
// router.post("/", CategoryController.create);
// router.put("/:id", CategoryController.update);
// router.delete("/:id", CategoryController.delete);

module.exports = router;
