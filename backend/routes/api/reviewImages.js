const express = require("express");
const {
  setTokenCookie,
  restoreUser,
  requireAuth,
} = require("../../utils/auth");
const {
  User,
  Spot,
  SpotImage,
  Review,
  ReviewImage,
  Booking,
} = require("../../db/models");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const router = express.Router();

// Delete a Review Image
router.delete("/:imageId", requireAuth, async (req, res, next) => {
  const imageId = req.params.imageId;
  const currUser = req.user.id;
  let reviewImage = await ReviewImage.findByPk(imageId);

  if (!reviewImage) {
    res.status(404);
    return res.json({
      message: "Review Image couldn't be found",
      statusCode: 404,
    });
  }

  let review = await Review.findByPk(reviewImage.reviewId);
  let reviewCopy = review.toJSON();

  if (currUser !== reviewCopy.userId) {
    res.status(403);
    return res.json({
      message: "Forbidden",
      statusCode: 403,
    });
  }

  await reviewImage.destroy();
  res.status(200);
  return res.json({
    message: "Successfully deleted",
    statusCode: 200,
  });
});

module.exports = router;
