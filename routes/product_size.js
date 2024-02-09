const express = require("express");
const router = express.Router();
const ProductSizeontroller = require("../controllers/productSizeController");
const auth = require('../middleware/auth')

router.get("/:product_id/size/", ProductSizeontroller.getAll);
router.get("/:product_id/size/:id", ProductSizeontroller.getOne);
router.post("/:product_id/size/", auth,ProductSizeontroller.create);
router.put("/:product_id/size/:id", auth,ProductSizeontroller.update);
router.delete("/:product_id/size/:id",auth, ProductSizeontroller.delete);

module.exports = router;