const express = require("express");
const router = express.Router();
const CartController = require("../controllers/cart_controller");
const auth = require("../middleware/auth");

router.get("/:user_id/cart/",auth, CartController.getAll);
router.get("/:user_id/cart/:id",auth, CartController.getAll);
router.post("/:user_id/cart/:product_variant_id", CartController.create);
router.put("/:user_id/cart/:id", CartController.update);
router.delete("/:user_id/cart/:id", CartController.delete); 


module.exports = router;
