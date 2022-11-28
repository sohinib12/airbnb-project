const express = require("express");
const { setTokenCookie, restoreUser } = require("../../utils/auth");
const { requireAuth } = require("../../utils/auth");
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

//get all spots
const validateQuery = [
  check("page")
    .optional()
    .exists({ checkFalsy: true })
    .isInt({ min: 1 })
    .withMessage("Page must be greater than or equal to 0"),
  check("size")
    .optional()
    .exists({ checkFalsy: true })
    .isInt({ min: 1 })
    .withMessage("Size must be greater than or equal to 0"),
  check("minLat")
    .optional()
    .exists({ checkFalsy: true })
    .isDecimal()
    .withMessage("Minimum latitude is invalid"),
  check("maxLat")
    .optional()
    .exists({ checkFalsy: true })
    .isDecimal()
    .withMessage('Maximum latitude is invalid"'),
  check("minLng")
    .optional()
    .exists({ checkFalsy: true })
    .isDecimal()
    .withMessage("Minimum longitude is invalid"),
  check("maxLng")
    .optional()
    .exists({ checkFalsy: true })
    .isDecimal()
    .withMessage("Max longitude is invalid"),
  check("minPrice")
    .optional()
    .exists({ checkFalsy: true })
    .isFloat({ min: 0 })
    .withMessage("Minimum price must be greater than or equal to 0"),
  check("maxPrice")
    .optional()
    .exists({ checkFalsy: true })
    .isFloat({ min: 0 })
    .withMessage("Maximum price must be greater than or equal to 0"),
  handleValidationErrors,
];
router.get("/", validateQuery, async (req, res, next) => {
  let { page, size, minLat, maxLat, minLng, maxLng, minPrice, maxPrice } =
    req.query;
  page = parseInt(page) || 0;
  size = parseInt(size) || 20;

  //   page = page || 0;
  //   size = size || 20;

  let pagination = {};
  if (page >= 1 && size >= 1) {
    if (page > 10) page = 10;
    if (size > 20) size = 20;

    pagination.limit = size;
    pagination.offset = size * (page - 1);
  }

  let allSpots = await Spot.findAll({
    include: [
      {
        model: SpotImage,
      },
    ],
    ...pagination,
  });

  let spotList = [];
  allSpots.forEach((spot) => {
    spotList.push(spot.toJSON());
  });

  spotList.forEach((spot) => {
    //copy SpotImages
    const spotImages = spot.SpotImages;

    // delete SpotImages because not needed
    delete spot.SpotImages;

    //get only image which has preview =true
    spotImages.forEach((spotImage) => {
      if (spotImage.preview) {
        spot.previewImage = spotImage.url;
      }
    });
  });
  if (page && size) {
    return res.json({ Spots: spotList, page, size });
  }
  return res.json({ Spots: spotList });

  // return allSpots;
});

// Get all Spots owned by the Current User
router.get("/current", requireAuth, async (req, res, next) => {
  const currentUserSpots = await Spot.findAll({
    where: { ownerId: req.user.id },
    include: [
      { model: Review, attributes: [] },
      { model: SpotImage, attributes: [] },
    ],
    attributes: [
      "id",
      "ownerId",
      "address",
      "city",
      "state",
      "country",
      "lat",
      "lng",
      "name",
      "description",
      "price",
      "createdAt",
      "updatedAt",
      [sequelize.fn("AVG", sequelize.col("Reviews.stars")), "avgRating"],
      [sequelize.col("SpotImages.url"), "previewImage"],
    ],
    group: ["Reviews.stars", "SpotImages.url", "Spot.id"],
  });
  return res.json({ Spots: currentUserSpots });
});

// Get details of a Spot from an id
router.get("/:spotId", async (req, res, next) => {
  const spots = await Spot.findAll({
    where: { id: req.params.spotId },
    attributes: {
      include: [
        [sequelize.fn("COUNT", sequelize.col("Reviews.stars")), "numReviews"],
        [sequelize.fn("AVG", sequelize.col("Reviews.stars")), "avgStarRating"],
      ],
    },
    include: [
      { model: Review, attributes: [] },
      { model: SpotImage, attributes: ["id", "url", "preview"] },
      { model: User, attributes: ["id", "firstName", "lastName"] },
    ],
    group: ["Reviews.id", "SpotImages.id", "User.id"],
  });
  if (spots.length === 0) {
    res.status(404);
    return res.json({
      message: "Spot couldn't be found",
      statusCode: 404,
    });
  }
  return res.json(spots);
});

// Get all Reviews by a Spot's id
router.get("/:spotId/reviews", async (req, res, next) => {
  const spotId = req.params.spotId;
  const spot = await Spot.findByPk(spotId);
  if (spot) {
    const reviews = await Review.findAll({
      where: { spotId },
      include: [
        {
          model: User,
          attributes: {
            exclude: [
              "username",
              "hashedPassword",
              "email",
              "createdAt",
              "updatedAt",
            ],
          },
        },
        {
          model: ReviewImage,
          attributes: {
            exclude: ["reviewId", "createdAt", "updatedAt"],
          },
        },
      ],
    });
    return res.json({ Reviews: reviews });
  } else {
    return res.status(404).json({
      message: "Spot couldn't be found",
      statusCode: 404,
    });
  }
});

// Get all Bookings for a Spot based on the Spot's id
router.get("/:spotId/bookings", requireAuth, async (req, res, next) => {
  const spotId = req.params.spotId;
  const userId = req.user.id;
  // console.log(spotId)
  const spot = await Spot.findByPk(spotId);
  if (!spot) {
    res.status(404);
    return res.json({
      message: "Spot couldn't be found",
      statusCode: 404,
    });
  }

  let bookings = await Booking.findAll({
    where: { spotId: spotId },
    include: [
      {
        model: User,
        attributes: {
          exclude: [
            "username",
            "hashedPassword",
            "email",
            "createdAt",
            "updatedAt",
          ],
        },
      },
    ],
  });
  // If you ARE NOT the owner of the spot
  bookings = bookings.map((booking) => booking.toJSON());
  bookings.forEach((booking) => {
    if (booking.userId !== userId) {
      delete booking.id;
      delete booking.userId;
      delete booking.createdAt;
      delete booking.updatedAt;
      delete booking.User;
    }
  });
  res.status(200);
  return res.json({ Bookings: bookings });
});

// Create a Spot
const validateSpot = [
  check("address")
    .exists({ checkFalsy: true })
    .withMessage("Street address is required"),
  check("city").exists({ checkFalsy: true }).withMessage("City is required"),
  check("state").exists({ checkFalsy: true }).withMessage("State is required"),
  check("country")
    .exists({ checkFalsy: true })
    .withMessage("Country is required"),
  check("lat").isNumeric().withMessage("Latitude is not valid"),
  check("lng").isNumeric().withMessage("Longitude is not valid"),
  check("name")
    // .isLength({ max: 50 })
    .notEmpty()
    .withMessage("Name is required"),
  check("name")
    .isLength({ max: 50 })
    // .notEmpty()
    .withMessage("Name must be less than 50 characters"),
  check("description")
    .exists({ checkFalsy: true })
    .withMessage("Description is required"),
  check("price")
    .exists({ checkFalsy: true })
    .not()
    // .isInt({ min: 1 })
    // .isNumeric()
    .withMessage("Price per day is required"),
  handleValidationErrors,
];
router.post("/", requireAuth, validateSpot, async (req, res, next) => {
  const ownerId = req.user.id;
  const { address, city, state, country, lat, lng, name, description, price } =
    req.body;
  const newSpot = await Spot.create({
    ownerId,
    address,
    city,
    state,
    country,
    lat,
    lng,
    name,
    description,
    price,
  });
  res.status(201);
  return res.json(newSpot);
});

// Create a Review for a Spot based on the Spot's id
const validateReview = [
  check("review")
    .exists({ checkFalsy: true })
    .withMessage("Review text is required"),
  check("stars")
    .exists({ checkFalsy: true })
    .custom((value, { req }) => !isNaN(value) && value >= 1 && value <= 5)
    .withMessage("Stars must be an integer from 1 to 5"),
  handleValidationErrors,
];
router.post(
  "/:spotId/reviews",
  requireAuth,
  validateReview,
  async (req, res, next) => {
    const userId = req.user.id;
    const { review, stars } = req.body;
    const spotId = req.params.spotId;
    let spot = await Spot.findByPk(spotId, {
      include: { model: Review },
    });
    if (!spot) {
      return res.status(404).json({
        message: "Spot couldn't be found",
        statusCode: 404,
      });
    }
    let spotCopy = spot.toJSON();
    // console.log(spotCopy)
    // Review from the current user already exists for the Spot
    spotCopy.Reviews.forEach((review) => {
      if (review.userId === userId) {
        return res.status(403).json({
          message: "User already has a review for this spot",
          statusCode: 403,
        });
      }
    });
    let spotReview = await Review.create({
      userId,
      spotId: +spotId,
      review,
      stars,
    });
    res.status(201);
    return res.json(spotReview);
  }
);

// Create a Booking from a Spot based on the Spot's id
router.post("/:spotId/bookings", requireAuth, async (req, res, next) => {
  const bookingId = req.params.bookingId;
  const spotId = req.params.spotId;
  const userId = req.user.id;
  const { startDate, endDate } = req.body;
  const spot = await Spot.findByPk(spotId);
  if (!spot) {
    res.status(404);
    return res.json({
      message: "Spot couldn't be found",
      statusCode: 404,
    });
  }
  // Spot must NOT belong to the current user
  let spotCopy = spot.toJSON();
  if (spotCopy.ownerId !== req.user.id) {
    return res.status(403).json({
      message: "Forbidden",
      statusCode: 403,
    });
  }

  if (new Date(endDate) <= new Date(startDate)) {
    res.status(400);
    return res.json({
      message: "Validation error",
      statusCode: 400,
      errors: {
        endDate: "endDate cannot be on or before startDate",
      },
    });
  }
  const bookings = await Booking.findAll({
    where: { spotId },
  });

  for (let booking of bookings) {
    booking = booking.toJSON();
    // console.log(booking.startDate)
    // console.log(new Date(startDate))
    if (
      (new Date(startDate) >= booking.startDate &&
        new Date(startDate) <= booking.endDate) ||
      (new Date(endDate) >= booking.startDate &&
        new Date(endDate) <= booking.endDate)
    ) {
      res.status(403);
      return res.json({
        message: "Sorry, this spot is already booked for the specified dates",
        statusCode: 403,
        errors: {
          startDate: "Start date conflicts with an existing booking",
          endDate: "End date conflicts with an existing booking",
        },
      });
    }
  }

  let newBooking = await Booking.create({
    spotId: spot.id,
    userId,
    startDate,
    endDate,
  });
  // console.log(newBooking)
  // newBooking = newBooking.toJSON()
  return res.json(newBooking);
});

// Add an Image to a Spot based on the Spot's id
router.post("/:spotId/images", requireAuth, async (req, res, next) => {
  const { url, preview } = req.body;
  // console.log(req.params)
  const existingSpot = await Spot.findByPk(req.params.spotId);
  // console.log(existingSpot)
  if (existingSpot !== null) {
    // Spot must belong to the current user
    let spot = existingSpot.toJSON();
    if (req.user.id !== spot.ownerId) {
      res.status(403);
      return res.json({
        message: "Forbidden",
        statusCode: 403,
      });
    }
    const newSpotImage = await SpotImage.create({
      spotId: req.params.spotId,
      url,
      preview,
    });
    return res.json({
      id: newSpotImage.id,
      url: newSpotImage.url,
      preview: newSpotImage.preview,
    });
  } else {
    res.status(404);
    return res.json({
      message: "Spot couldn't be found",
      statusCode: 404,
    });
  }
});
// Edit a Spot
router.put("/:spotId", requireAuth, validateSpot, async (req, res, next) => {
  const ownerId = req.user.id;
  const { address, city, state, country, lat, lng, name, description, price } =
    req.body;
  // const updateSpot = await Spot.update({

  //      ownerId, address, city, state, country, lat, lng, name, description, price
  // },
  // {
  //     where: {id: req.params.spotId},
  //     returning: true,
  //     plain: true
  // })
  const spot = await Spot.findByPk(req.params.spotId);

  if (!spot) {
    res.status(404);
    return res.json({
      message: "Spot couldn't be found",
      statusCode: 404,
    });
  }
  // Spot must belong to the current user
  let currSpot = spot.toJSON();
  if (req.user.id !== currSpot.ownerId) {
    res.status(403);
    return res.json({
      message: "Forbidden",
      statusCode: 403,
    });
  }
  spot.id = req.params.spotId;
  spot.ownerId = req.user.id;
  spot.address = address;
  spot.city = city;
  spot.state = state;
  spot.country = country;
  spot.lat = lat;
  spot.lng = lng;
  spot.name = name;
  spot.description = description;
  spot.price = price;

  const updateSpot = await spot.save();

  res.status(200);
  return res.json(updateSpot);
});

// Delete a Spot
router.delete("/:spotId", requireAuth, async (req, res, next) => {
  const spot = await Spot.findByPk(req.params.spotId);
  if (!spot) {
    res.status(404);
    return res.json({
      message: "Spot couldn't be found",
      statusCode: 404,
    });
  }
  // Spot must belong to the current user
  let currSpot = spot.toJSON();
  if (req.user.id !== currSpot.ownerId) {
    res.status(403);
    return res.json({
      message: "Forbidden",
      statusCode: 403,
    });
  }
  await spot.destroy();
  res.status(200);
  return res.json({
    message: "Successfully deleted",
    statusCode: 200,
  });
});

module.exports = router;
