const express = require("express");
const router = express.Router();
const CategoryController = require("../controllers/category_controller");

router.get("/", CategoryController.getAll);
router.get("/:id", CategoryController.getOne);
router.post("/", CategoryController.create);
router.put("/:id", CategoryController.update);
router.delete("/:id", CategoryController.delete);

module.exports = router;
