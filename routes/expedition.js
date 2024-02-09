const express = require("express");
const router = express.Router();
const ExpeditionController = require("../controllers/expeditionController");
const auth = require('../middleware/auth')
const multer = require("../middleware/multer");

router.get("/", ExpeditionController.getAll);
router.get("/:id", ExpeditionController.getOne);
router.post("/", multer.single("image"),auth, ExpeditionController.create);
router.put("/:id", multer.single("image"),auth, ExpeditionController.update);
router.delete("/:id",auth, ExpeditionController.delete);

module.exports = router;
