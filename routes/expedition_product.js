const express = require("express");
const router = express.Router();
const ExpeditionProductController = require("../controllers/expeditionProductController");
const auth = require('../middleware/auth')

router.get("/:product_id/expeditions/", ExpeditionProductController.getAll);
router.get("/:product_id/expeditions/:id", ExpeditionProductController.getOne);
router.post("/:product_id/expeditions/",auth, ExpeditionProductController.create);
router.put("/:product_id/expeditions/:id",auth, ExpeditionProductController.update);
router.delete("/:product_id/expeditions/:id",auth, ExpeditionProductController.delete);

module.exports = router;