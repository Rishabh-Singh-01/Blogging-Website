const express = require('express');
const {
  getPostController,
  createPostController,
  updatePostController,
  deletePostController,
  getAllPostsController,
  updateLikeController,
  getTopLikedPostsController,
  uploadPostPhoto,
  resizePostPhoto,
} = require('../controllers/postController');
const { protectController } = require('../controllers/authController');

const router = express.Router();

router.route('/most-liked-6').get(getTopLikedPostsController);

router
  .route('/')
  .get(getAllPostsController)
  .post(
    protectController,
    uploadPostPhoto,
    resizePostPhoto,
    createPostController
  );
router
  .route('/:id')
  .get(getPostController)
  .put(
    protectController,
    uploadPostPhoto,
    resizePostPhoto,
    updatePostController
  )
  .delete(protectController, deletePostController);

// routing of liking
router.route('/:id/like').patch(protectController, updateLikeController);

module.exports = router;
