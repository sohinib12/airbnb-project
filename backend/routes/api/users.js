const express = require('express');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();

const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email.'),
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Please provide a username with at least 4 characters.'),
  check('username')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  handleValidationErrors
];

// Sign up
router.post(
  '/',
  validateSignup,
  async (req, res) => {
    const { email, password, username, firstName, lastName } = req.body;
    console.log(`signup before`)
    const user = await User.signup({
      email, username, password, firstName, lastName
    });
    console.log(`signup after`)
    const existingUser = await User.findAll({
      where: {
        email: email,
        username: username,
      }
    })
    if(existingUser){
      const err = new Error('User already exists');
      err.status = 403;
      err.message = "User with that username already exists";
    }


    let token = await setTokenCookie(res, user);
    const userData = user.toJSON();
    // console.log(userData)
    userData.token = ''

    return res.json({
      user: userData
    });
  }
);

module.exports = router;
