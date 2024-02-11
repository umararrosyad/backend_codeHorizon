const express = require("express");
const router = express.Router();
const ProductGalleryController = require("../controllers/productGallery_controller");
const auth = require('../middleware/auth')
const multer = require("../middleware/multer");

router.get("/:product_id/galleries/", ProductGalleryController.getAll);
router.get("/:product_id/galleries/:id", ProductGalleryController.getOne);
router.post("/:product_id/galleries/",auth, multer.single("image"), ProductGalleryController.create);
router.delete("/:product_id/galleries/:id",auth, ProductGalleryController.delete);

module.exports = router;
