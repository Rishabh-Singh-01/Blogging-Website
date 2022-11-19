const express = require('express');
const {
  signUpController,
  loginController,
  updatePasswordController,
  protectController,
  logoutController,
} = require('../controllers/authController');

const router = express.Router();

// SIGN UP FUNCTIONALITY
router.post('/signup', signUpController);

// LOGIN FUNCTIONALITY
router.post('/login', loginController);

// LOGOUT FUNCTIONALCITY

router.get('/logout', logoutController);

// UPDATE FUNCTIONALITY
router.patch(
  '/update-my-password',
  protectController,
  updatePasswordController
);

module.exports = router;
