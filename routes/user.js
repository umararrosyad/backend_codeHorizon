const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user_controller");
const auth = require("../middleware/auth");

router.get("/", UserController.getAll);
router.get("/:id", UserController.getOne);
router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.put("/:id",auth, UserController.update);
router.delete("/:id",auth, UserController.delete);


module.exports = router;
