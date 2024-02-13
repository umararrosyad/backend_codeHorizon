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
const cartRouter = require("./cart");
const addressRouter = require("./addresses")
const transactionAdminController = require("./transactionAdmin")
const path = require("path");

router.get("/", (req, res) => {
  res.send("Halo, dunia!");
});

router.use("/static", express.static(path.join(__dirname, "..", "public")));
router.use("api/v1/categories", categoryRouter);
router.use("api/v1/users", userRouter);
router.use("api/v1/products", productRouter);
router.use("api/v1/products", productGalleryRouter);
router.use("api/v1/products", productTypeRouter);
router.use("api/v1/products", productSizeRouter);
router.use("api/v1/products", productVariantRouter);
router.use("api/v1/products", expeditionProductRouter);
router.use("api/v1/products", feedbackRouter);
router.use("api/v1/users", transactionRouter);
router.use("api/v1/users", cartRouter);
router.use("api/v1/users", addressRouter);
router.use("api/v1/transactions", transactionAdminController);
router.use("api/v1/expeditions", expeditionRouter);


module.exports = router;
