const express = require("express");
const router = express.Router();
const ProductTypeController = require("../controllers/productTypeController");
const auth = require('../middleware/auth')
const multer = require("../middleware/multer");

router.get("/:product_id/types/", ProductTypeController.getAll);
router.get("/:product_id/types/:id", ProductTypeController.getOne);
router.post("/:product_id/types/",auth, multer.single("image"), ProductTypeController.create);
router.put("/:product_id/types/:id", auth,multer.single("image"), ProductTypeController.update);
router.delete("/:product_id/types/:id", auth,ProductTypeController.delete);

module.exports = router;
