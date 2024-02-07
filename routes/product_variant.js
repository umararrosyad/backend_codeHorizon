const express = require("express");
const router = express.Router();
const ProductVariantController = require("../controllers/productVariantController");

router.get("/:product_id/variant/", ProductVariantController.getAll);
router.get("/:product_id/variant/:id", ProductVariantController.getOne);
router.post("/:product_id/variant/", ProductVariantController.create);
router.put("/:product_id/variant/:id", ProductVariantController.update);
router.delete("/:product_id/variant/:id", ProductVariantController.delete);

module.exports = router;