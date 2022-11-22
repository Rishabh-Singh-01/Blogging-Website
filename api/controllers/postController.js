const Post = require('../models/Post');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

// GETTING ALL POSTS

exports.getAllPostsController = catchAsync(async (req, res, next) => {
  let query = Post.find();
  // sorting for latest post
  query = query.sort('-updatedAt');

  // looking for any search item
  if (req.query.search) {
    const searchItem = req.query.search;
    query = await Post.find({ title: { $regex: searchItem, $options: 'i' } });
  }

  const posts = await query;
  res.status(200).json({
    status: 'success',
    results: posts.length,
    data: {
      posts,
    },
  });
});

// GETTING A SINGLE POST
exports.getPostController = catchAsync(async (req, res, next) => {
  // 1) Directly get the post based on the parameter id on the api which will denote
  // the post directly in DB

  const post = await Post.findById(req.params.id);
  res.status(200).json({
    status: 'success',
    data: {
      post,
    },
  });
});

// CREATING A SINGLE POST
exports.createPostController = catchAsync(async (req, res, next) => {
  const post = new Post(req.body);
  const newPost = await post.save();

  res.status(200).json({
    status: 'success',
    data: {
      post: newPost,
    },
  });
});

// UPDATING A SINGLE POST
exports.updatePostController = catchAsync(async (req, res, next) => {
  // in case somebody tries to somehow change the username
  const post = await Post.findById(req.params.id);
  if (req.body.username != post.username) {
    return next(
      new AppError(
        'Please refrain from changing username when changing post',
        400
      )
    );
  }

  // if everything is correct
  const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json({
    status: 'success',
    data: {
      post: updatedPost,
    },
  });
});

// DELETING A SINGLE POST
exports.deletePostController = catchAsync(async (req, res, next) => {
  await Post.findByIdAndDelete(req.params.id);

  res.status(204).json({
    status: 'success',
    data: {
      post: null,
    },
  });
});
