const express = require("express");
const router = express.Router();
const CategoryController = require("../controllers/category_controller");
const multer = require("../middleware/multer");
const auth = require("../middleware/auth")


router.get("/", CategoryController.getAll);
router.get("/:id", CategoryController.getOne);
router.post("/", multer.single("image"), auth, CategoryController.create);
router.put("/:id", multer.single("image"), auth, CategoryController.update);
router.delete("/:id",auth, CategoryController.delete);

module.exports = router;
