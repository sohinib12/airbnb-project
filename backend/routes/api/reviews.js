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
  sequelize,
} = require("../../db/models");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const { Op } = require("sequelize");
const router = express.Router();

// Get all Reviews of the Current User
router.get("/current", requireAuth, async (req, res) => {
  const reviews = await Review.findAll({
    where: { userId: req.user.id },
    include: [
      { model: User, attributes: ["id", "firstName", "lastName"] },
      {
        model: Spot,
        include: [
          {
            model: SpotImage,
          },
        ],
        attributes: {
          exclude: ["description", "createdAt", "updatedAt"],
        },
        group: ["SpotImage.id"],
      },
      { model: ReviewImage, attributes: ["id", "url"] },
    ],
    group: ["User.id", "Spot.id", "ReviewImages.id", "Review.id"],
  });

  let reviewList = [];
  reviews.forEach((review) => {
    reviewList.push(review.toJSON());
  });

  reviewList.forEach((review) => {
    //copy SpotImages
    const spotImages = review.Spot.SpotImages;

    // delete SpotImages because not needed
    delete review.Spot.SpotImages;

    //get only image which has preview =true
    spotImages.forEach((spotImage) => {
      if (spotImage.preview) {
        review.Spot.previewImage = spotImage.url;
      }
    });
  });
  res.status(200);
  return res.json({ Reviews: reviewList });
});

// Add an Image to a Review based on the Review's id
router.post("/:reviewId/images", requireAuth, async (req, res, next) => {
  const { url } = req.body;
  const reviewId = req.params.reviewId;
  const review = await Review.findByPk(reviewId);
  if (!review) {
    return res.status(404).json({
      message: "Review couldn't be found",
      statusCode: 404,
    });
  }
  // Review must belong to the current user
  let reviewCopy = review.toJSON();
  if (reviewCopy.userId !== req.user.id) {
    return res.status(403).json({
      message: "Forbidden",
      statusCode: 403,
    });
  }

  let reviewImage = await ReviewImage.create({
    reviewId: review.id,
    url,
  });
  let count = await ReviewImage.findOne({
    where: { reviewId },
    attributes: [
      [sequelize.fn("COUNT", sequelize.col("ReviewImage.url")), "imageCount"],
    ],
  });
  // maximum of 10 images per resource
  count = count.toJSON();
  if (count.imageCount > 10) {
    return res.status(403).json({
      message: "Maximum number of images for this resource was reached",
      statusCode: 403,
    });
  }
  reviewImage = reviewImage.toJSON();
  delete reviewImage.createdAt;
  delete reviewImage.updatedAt;
  delete reviewImage.reviewId;

  return res.json(reviewImage);
});
// Edit a Review
const validateReview = [
  check("review")
    .exists({ checkFalsy: true })
    .withMessage("Review text is required"),
  check("stars")
    .exists({ checkFalsy: true })
    .isNumeric({ min: 1, max: 5 })
    .withMessage("Stars must be an integer from 1 to 5"),
  handleValidationErrors,
];
router.put(
  "/:reviewId",
  requireAuth,
  validateReview,
  async (req, res, next) => {
    const { review, stars } = req.body;
    const updatedReview = await Review.findByPk(req.params.reviewId);

    if (!updatedReview) {
      return res.status(404).json({
        message: "Review couldn't be found",
        statusCode: 404,
      });
    }
    // Review must belong to the current user
    let reviewCopy = updatedReview.toJSON();
    if (reviewCopy.userId !== req.user.id) {
      return res.status(403).json({
        message: "Forbidden",
        statusCode: 403,
      });
    }
    updatedReview.review = review;
    updatedReview.stars = stars;

    await updatedReview.save();
    return res.json(updatedReview);
  }
);

// Delete a Review
router.delete("/:reviewId", requireAuth, async (req, res, next) => {
  const review = await Review.findByPk(req.params.reviewId);
  if (!review) {
    res.status(404);
    return res.json({
      message: "Review couldn't be found",
      statusCode: 404,
    });
  }
  // Review must belong to the current user
  let currReview = review.toJSON();
  if (req.user.id !== currReview.userId) {
    res.status(403);
    return res.json({
      message: "Forbidden",
      statusCode: 403,
    });
  }
  await review.destroy();
  res.status(200);
  return res.json({
    message: "Successfully deleted",
    statusCode: 200,
  });
});

module.exports = router;
