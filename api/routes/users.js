const express = require('express');
const { protectController } = require('../controllers/authController');
const {
  updateDataController,
  deleteAccountController,
  getUserController,
  uploadUserPhoto,
  resizeUserPhoto,
} = require('../controllers/userController');
const router = express.Router();

// UPDATE THE DATA
router.patch(
  '/update-my-data',
  protectController,
  uploadUserPhoto,
  resizeUserPhoto,
  updateDataController
);

// DELETE THE ACCOUNT
router.delete('/delete-my-account', protectController, deleteAccountController);

// GET USER INFO
router.get('/', protectController, getUserController);

module.exports = router;
