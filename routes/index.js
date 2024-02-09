const express = require("express");
const router = express.Router();
const categoryRouter = require("./category");
const userRouter = require("./user");
const productRouter = require("./product");
const productGalleryRouter = require("./product_gallery");
const productTypeRouter = require("./product_type");
const productSizeRouter = require("./product_size");
const productVariantRouter = require("./product_variant");
const expeditionRouter = require("./expedition");
const expeditionProductRouter = require("./expedition_product");
const feedbackRouter = require("./feedbacks");
const transactionRouter = require("./transaction");
const path = require("path");

router.get("/", (req, res) => {
  res.send("Halo, dunia!");
});

router.use("/static", express.static(path.join(__dirname, "..", "public")));
router.use("/categories", categoryRouter);
router.use("/users", userRouter);
router.use("/product", productRouter);
router.use("/product", productGalleryRouter);
router.use("/product", productTypeRouter);
router.use("/product", productSizeRouter);
router.use("/product", productVariantRouter);
router.use("/product", expeditionProductRouter);
router.use("/product", feedbackRouter);
router.use("/users", transactionRouter);
router.use("/expedition", expeditionRouter);

module.exports = router;
