const express = require("express");
const router = express.Router();
const CartController = require("../controllers/cart_controller");

router.get("/:user_id/cart/", CartController.getAll);
router.get("/:user/cart/:id", CartController.getOne);


module.exports = router;
