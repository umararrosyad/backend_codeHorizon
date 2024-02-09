const express = require("express");
const router = express.Router();
const ExpeditionProductController = require("../controllers/expeditionProductController");
const auth = require('../middleware/auth')

router.get("/:product_id/expedition/", ExpeditionProductController.getAll);
router.get("/:product_id/expedition/:id", ExpeditionProductController.getOne);
router.post("/:product_id/expedition/", ExpeditionProductController.create);
router.put("/:product_id/expedition/:id", ExpeditionProductController.update);
router.delete("/:product_id/expedition/:id", ExpeditionProductController.delete);

module.exports = router;