const express = require("express");
const router = express.Router();
const dashboardController = require("../controllers/dashboardController");
const auth = require('../middleware/auth')
const multer = require("../middleware/multer");

router.get("/", dashboardController.getData);

module.exports = router;
