const express = require("express");
const router = express.Router();
const FeedbackController = require("../controllers/feedbackController");
const multer = require('../middleware/multer')
const auth = require("../middleware/auth")


router.get("/:product_id/feedbacks/", FeedbackController.getAll);
router.get("/:product_id/feedbacks/:id", FeedbackController.getOne);
router.post("/:product_id/feedbacks/",auth,multer.array("image"), FeedbackController.create);
router.put("/:product_id/feedbacks/:id",auth, FeedbackController.update);
router.delete("/:product_id/feedbacks/:id", auth, FeedbackController.delete);
router.delete("/:product_id/feedbacks/gallery/:id", auth, FeedbackController.deleteGallery);

module.exports = router;