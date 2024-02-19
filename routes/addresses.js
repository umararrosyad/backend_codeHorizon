const express = require("express");
const router = express.Router();
const AddressController = require("../controllers/userAddress_controller");

router.post("/:user_id/addresses", AddressController.create);
router.get("/:user_id/addresses", AddressController.getAll);
router.get("/:user_id/addresses/:id", AddressController.getOne);
router.put("/:user_id/addresses/:id", AddressController.update);
router.delete("/:user_id/addresses/:id", AddressController.delete);

module.exports = router;
