const express = require("express");
const router = express.Router();
const FeedbackController = require("../controllers/feedbackController");
const multer = require('../middleware/multer')

router.get("/:product_id/feedback/", FeedbackController.getAll);
router.get("/:product_id/feedback/:id", FeedbackController.getOne);
router.post("/:product_id/feedback/",multer.array("image"), FeedbackController.create);
router.put("/:product_id/feedback/:id", FeedbackController.update);
router.delete("/:product_id/feedback/:id", FeedbackController.delete);
router.delete("/:product_id/feedback/gallery/:id", FeedbackController.deleteGallery);

module.exports = router;