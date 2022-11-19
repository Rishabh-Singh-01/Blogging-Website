const express = require('express');
const {
  getPostController,
  createPostController,
  updatePostController,
  deletePostController,
  getAllPostsController,
} = require('../controllers/postController');
const { protectController } = require('../controllers/authController');

const router = express.Router();

router
  .route('/')
  .get(getAllPostsController)
  .post(protectController, createPostController);
router
  .route('/:id')
  .get(getPostController)
  .put(protectController, updatePostController)
  .delete(protectController, deletePostController);

module.exports = router;
