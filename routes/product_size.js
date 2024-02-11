const express = require("express");
const router = express.Router();
const ProductSizeontroller = require("../controllers/productSizeController");
const auth = require('../middleware/auth')

router.get("/:product_id/sizes/", ProductSizeontroller.getAll);
router.get("/:product_id/sizes/:id", ProductSizeontroller.getOne);
router.post("/:product_id/sizes/", auth,ProductSizeontroller.create);
router.put("/:product_id/sizes/:id", auth,ProductSizeontroller.update);
router.delete("/:product_id/sizes/:id",auth, ProductSizeontroller.delete);

module.exports = router;