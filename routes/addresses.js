const express = require("express");
const router = express.Router();
const AddressController = require("../controllers/userAddress_controller");

router.post("/:user_id/address", AddressController.create);
router.put("/:user_id/address/:id", AddressController.update);
router.delete("/:user_id/address/:id", AddressController.delete);



module.exports = router;
