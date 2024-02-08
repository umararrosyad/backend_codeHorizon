const express = require("express");
const router = express.Router();
const ProductTypeController = require("../controllers/productTypeController");
// const auth = require('../middleware/auth')
const multer = require("../middleware/multer");

router.get("/:product_id/type/", ProductTypeController.getAll);
router.get("/:product_id/type/:id", ProductTypeController.getOne);
router.post("/:product_id/type/", multer.single("image"), ProductTypeController.create);
router.put("/:product_id/type/:id", multer.single("image"), ProductTypeController.update);
router.delete("/:product_id/type/:id", ProductTypeController.delete);

module.exports = router;
