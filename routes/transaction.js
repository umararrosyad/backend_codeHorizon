const express = require("express");
const router = express.Router();
const TransactionController = require("../controllers/transactionController");
// const auth = require('../middleware/auth')
const multer = require("../middleware/multer");

router.get("/:user_id/transaction/", TransactionController.getAll);
router.get("/:user_id/transaction/:id", TransactionController.getOne);
router.post("/:user_id/transaction/", TransactionController.create);
router.put("/:user_id/transaction/:id/upload", multer.single("image"), TransactionController.update);
router.delete("/:user_id/transaction/:id", TransactionController.delete);

module.exports = router;
