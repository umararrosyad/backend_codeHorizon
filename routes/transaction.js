const express = require("express");
const router = express.Router();
const TransactionController = require("../controllers/transactionController");
const auth = require('../middleware/auth')
const multer = require("../middleware/multer");

router.get("/:user_id/transaction/",auth, TransactionController.getAll);
router.get("/:user_id/transaction/:id",auth, TransactionController.getOne);
router.post("/:user_id/transaction/",auth, TransactionController.create);
router.put("/:user_id/transaction/:id/upload",auth, multer.single("image"), TransactionController.update);
router.delete("/:user_id/transaction/:id", auth,TransactionController.delete);

module.exports = router;
