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

// Get all of the Current User's Bookings
router.get("/current", requireAuth, async (req, res, next) => {
  const bookings = await Booking.findAll({
    where: { userId: req.user.id },
    include: [
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
    ],
  });
  let bookingList = [];
  bookings.forEach((booking) => {
    bookingList.push(booking.toJSON());
  });

  bookingList.forEach((booking) => {
    //copy SpotImages
    const spotImages = booking.Spot.SpotImages;

    // delete SpotImages because not needed
    delete booking.Spot.SpotImages;

    //get only image which has preview =true
    spotImages.forEach((spotImage) => {
      if (spotImage.preview) {
        booking.Spot.previewImage = spotImage.url;
      }
    });
  });
  res.status(200);
  return res.json({ Bookings: bookingList });
});

// Edit a Booking
router.put("/:bookingId", requireAuth, async (req, res, next) => {
  const bookingId = req.params.bookingId;
  const { startDate, endDate } = req.body;
  const booking = await Booking.findByPk(bookingId);
  if (!booking) {
    res.status(404);
    return res.json({
      message: "Booking couldn't be found",
      statusCode: 404,
    });
  }
  let bookingCopy = booking.toJSON();
  if (bookingCopy.userId !== req.user.id) {
    return res.status(403).json({
      message: "Forbidden",
      statusCode: 403,
    });
  }

  if (new Date(startDate) > new Date(endDate)) {
    res.status(400);
    return res.json({
      message: "Validation error",
      statusCode: 400,
      errors: {
        endDate: "endDate cannot come before startDate",
      },
    });
  }
  if (new Date() > new Date(endDate)) {
    res.status(403);
    return res.json({
      message: "Past bookings can't be modified",
      statusCode: 403,
    });
  }
  // check this with TA
  // if(new Date(startDate) >= booking.startDate && new Date(startDate) <= booking.endDate ||
  //     (new Date(endDate) >= booking.startDate && new Date(endDate) <= booking.endDate)){
  //         res.status(403)
  //         return res.json({
  //             "message": "Sorry, this spot is already booked for the specified dates",
  //             "statusCode": 403,
  //             "errors": {
  //                startDate: "Start date conflicts with an existing booking",
  //                 endDate: "End date conflicts with an existing booking"
  //             }
  //         })
  //     }
  booking.set({ startDate, endDate });
  await booking.save();
  return res.json(booking);
});

// Delete a Booking
router.delete("/:bookingId", async (req, res, next) => {
  const booking = await Booking.findByPk(req.params.bookingId);
  if (!booking) {
    res.status(404);
    return res.json({
      message: "Booking couldn't be found",
      statusCode: 404,
    });
  }
  await booking.destroy();
  res.status(200);
  return res.json({
    message: "Successfully deleted",
    statusCode: 200,
  });
});

module.exports = router;
