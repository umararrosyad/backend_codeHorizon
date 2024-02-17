const express = require("express");
const router = express.Router();
const CartController = require("../controllers/cart_controller");
const auth = require("../middleware/auth");

router.get("/:user_id/carts/", auth, CartController.getAll);
router.get("/:user_id/carts/:id", auth, CartController.getOne);
router.post("/:user_id/carts/", CartController.create);
router.put("/:user_id/carts/:id", CartController.update);
router.delete("/:user_id/carts/:id", CartController.delete);

module.exports = router;
