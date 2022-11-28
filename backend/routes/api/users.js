const express = require("express");
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { User } = require("../../db/models");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const router = express.Router();

// Body validation errors for signUp
const validateSignup = [
  check("email")
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage("Invalid email"),
  check("username")
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage("Username is required"),
  check("username").not().isEmail().withMessage("Username cannot be an email."),
  check("firstName")
    .exists({ checkFalsy: true })
    .withMessage("First Name is required"),
  check("lastName")
    .exists({ checkFalsy: true })
    .withMessage("Last Name is required"),
  check("password")
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage("Password must be 6 characters or more."),
  handleValidationErrors,
];
// Sign up
router.post("/", validateSignup, async (req, res) => {
  const { email, password, username, firstName, lastName } = req.body;
  // console.log(`signup before`)
  // console.log(`signup after`)
  //if email and username already exits throw error
  const userEmail = await User.findOne({
    where: { email },
  });
  const userUsername = await User.findOne({
    where: { username },
  });
  if (userEmail) {
    res.status(403);
    return res.json({
      message: "User already exists",
      statusCode: 403,
      errors: {
        email: "User with that email already exists",
      },
    });
  }
  if (userUsername) {
    res.status(403);
    return res.json({
      message: "User already exists",
      statusCode: 403,
      errors: {
        email: "User with that username already exists",
      },
    });
  }
  let user = await User.signup({
    email,
    username,
    password,
    firstName,
    lastName,
  });

  let token = await setTokenCookie(res, user);

  user = user.toJSON();
  // console.log(`user`)
  delete user.createdAt;
  delete user.updatedAt;
  user.token = "";

  return res.json({
    user: user,
  });
});

module.exports = router;
