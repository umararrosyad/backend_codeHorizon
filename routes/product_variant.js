const express = require("express");
const router = express.Router();
const ProductVariantController = require("../controllers/productVariantController");
const auth = require("../middleware/auth")


router.get("/:product_id/variant/", ProductVariantController.getAll);
router.get("/:product_id/variant/:id", ProductVariantController.getOne);
router.post("/:product_id/variant/",auth, ProductVariantController.create);
router.put("/:product_id/variant/:id", auth,ProductVariantController.update);
router.delete("/:product_id/variant/:id",auth, ProductVariantController.delete);

module.exports = router;