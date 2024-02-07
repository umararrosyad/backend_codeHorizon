const express = require("express");
const router = express.Router();
const ProductGalleryController = require("../controllers/productGallery_controller");
// const auth = require('../middleware/auth')
const multer = require("../middleware/multer");

router.get("/:product_id/gallery/", ProductGalleryController.getAll);
router.get("/:product_id/gallery/:id", ProductGalleryController.getOne);
router.post("/:product_id/gallery/", multer.single("image"), ProductGalleryController.create);
router.delete("/:product_id/gallery/:id", ProductGalleryController.delete);

module.exports = router;
