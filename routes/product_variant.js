const express = require("express");
const router = express.Router();
const ProductVariantController = require("../controllers/productVariantController");
const auth = require("../middleware/auth")


router.get("/:product_id/variants/", ProductVariantController.getAll);
router.get("/:product_id/variants/:id", ProductVariantController.getOne);
router.post("/:product_id/variants/",auth, ProductVariantController.create);
router.put("/:product_id/variants/:id", auth,ProductVariantController.update);
router.delete("/:product_id/variants/:id",auth, ProductVariantController.delete);

module.exports = router;