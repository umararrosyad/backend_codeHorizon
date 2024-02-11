const express = require("express");
const router = express.Router();
const TransactionController = require("../controllers/transactionController");
const auth = require('../middleware/auth')
const multer = require("../middleware/multer");

router.get("/:user_id/transactions/",auth, TransactionController.getAll);
router.get("/:user_id/transactions/:id",auth, TransactionController.getOne);
router.post("/:user_id/transactions/",auth, TransactionController.create);
router.put("/:user_id/transactions/:id/upload",auth, multer.single("image"), TransactionController.update);
router.delete("/:user_id/transactions/:id", auth,TransactionController.delete);

module.exports = router;
