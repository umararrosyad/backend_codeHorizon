const express = require("express");
const router = express.Router();
const categoryRouter = require("./category");
const productRouter = require("./product");
const productGalleryRouter = require("./product_gallery");
const productTypeRouter = require("./product_type");
const path = require("path");

router.get("/", (req, res) => {
  res.send("Halo, dunia!");
});

router.use("/static", express.static(path.join(__dirname, "..", "public")));
router.use("/categories", categoryRouter);
router.use("/product", productRouter);
router.use("/product", productGalleryRouter);
router.use("/product", productTypeRouter);

module.exports = router;
