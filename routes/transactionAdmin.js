const express = require("express");
const router = express.Router();
const TransactionAdminController = require("../controllers/transationAdminController");
const auth = require('../middleware/auth')
const multer = require("../middleware/multer");

router.get("/",auth, TransactionAdminController.getAll);
router.get("/:id",auth, TransactionAdminController.getOne);
router.put("/:id",auth, TransactionAdminController.update);

module.exports = router;
