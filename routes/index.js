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
const addressRouter = require("./addresses");
const werehouseRouter = require("./werehouse");
const transactionAdminController = require("./transactionAdmin");
const path = require("path");

router.get("/", (req, res) => {
  res.send("Halo, dunia!");
});

router.use("/static", express.static(path.join(__dirname, "..", "public")));
router.use("/categories", categoryRouter);
router.use("/users", userRouter);
router.use("/products", productRouter);
router.use("/products", productGalleryRouter);
router.use("/products", productTypeRouter);
router.use("/products", productSizeRouter);
router.use("/products", productVariantRouter);
router.use("/products", expeditionProductRouter);
router.use("/products", feedbackRouter);
router.use("/users", transactionRouter);
router.use("/users", cartRouter);
router.use("/users", addressRouter);
router.use("/transactions", transactionAdminController);
router.use("/expeditions", expeditionRouter);
router.use("/werehouses", werehouseRouter);

module.exports = router;
