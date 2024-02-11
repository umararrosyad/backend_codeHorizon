const express = require("express");
const router = express.Router();
const CategoryController = require("../controllers/category_controller");
const multer = require("../middleware/multer");
const auth = require("../middleware/auth")


router.get("/", CategoryController.getAll);
router.get("/:id", CategoryController.getOne);
router.post("/", auth, multer.single("image"), CategoryController.create);
router.put("/:id", auth, multer.single("image"), CategoryController.update);
router.delete("/:id",auth, CategoryController.delete);

module.exports = router;
