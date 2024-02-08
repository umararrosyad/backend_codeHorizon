const express = require("express");
const router = express.Router();
const FeedbackController = require("../controllers/feedbackController");
// const auth = require('../middleware/auth')

router.get("/:product_id/feedback/", FeedbackController.getAll);
router.get("/:product_id/feedback/:id", FeedbackController.getOne);
router.post("/:product_id/feedback/", FeedbackController.create);
router.put("/:product_id/feedback/:id", FeedbackController.update);
router.delete("/:product_id/feedback/:id", FeedbackController.delete);

module.exports = router;