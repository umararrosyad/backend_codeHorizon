const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/werehouseController");
const auth = require("../middleware/auth")
router.get("/", ProductController.getAll);
router.get("/:id", ProductController.getOne);
router.post("/",auth, ProductController.create);
router.put("/:id",auth, ProductController.update);
router.delete('/:id',auth, ProductController.delete)

module.exports = router;
