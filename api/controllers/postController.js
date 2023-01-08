const Post = require('../models/Post');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const multer = require('multer');
const sharp = require('sharp');
const crypto = require('crypto');
// MULTER CONFIGURATIONS FOR THE POSTS IMG /////////////////

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  // console.log(file.mimetype);
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Please select image as file!!', 400), false);
  }
};
const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadPostPhoto = upload.single('photo');

exports.resizePostPhoto = (req, res, next) => {
  if (!req.file) return next();

  req.file.filename = `Posts-${crypto.randomUUID()}-${Date.now()}.webp`;

  sharp(req.file.buffer)
    .resize(1000, 500, {
      fit: 'fill',
    })
    .toFormat('webp')
    .webp({ nearlossless: true, quality: 90 })
    .toFile(`public/img/posts/${req.file.filename}`);
  next();
};
////////////////////////////////////////////////////

//  GETTING ONLY TOP 6 POSTS MOST LIKED POSTS

exports.getTopLikedPostsController = async (req, res, next) => {
  //   // let query = Post.find();
  //   // query;
  //   Post.aggregate([
  //     { $unwind: '$likes' },
  //     { $group: { _id: '$_id', sum: { $sum: 1 } } },
  //     { $group: { _id: null, total_sum: { $sum: '$sum' } } },
  //   ]);
  //   query = query.sort('-createdAt');
  //   const posts = await query;
  //   res.status(200).json({
  //     status: 'success',
  //     results: posts.length,
  //     data: {
  //       posts,
  //     },
  //   });
};

// GETTING ALL POSTS

exports.getAllPostsController = catchAsync(async (req, res, next) => {
  let query;

  // sorting the results
  // if (req.query.sort) {
  //   const sortBy = req.query.sort.split(',').join(' ');
  //   query = query.sort(sortBy);
  // } else {
  // }

  // looking for any search item if not then complete search
  if (req.query.search) {
    const searchItem = req.query.search;
    query = Post.find({ title: { $regex: searchItem, $options: 'i' } });
  } else {
    query = Post.find();
  }

  // sorting for latest post
  query = query.sort('-createdAt');

  // pagination
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 5;
  const skip = (page - 1) * limit;

  query = query.skip(skip).limit(limit);

  // this below denotes whether once the skipped number of
  // docs is greater than total will cause error or not
  // without this error doesnt occur just 0 only
  // if (req.query.page) {
  //   const numPosts = await Post.countDocuments({});
  //   if (skip >= numPosts)
  //     return next(new AppError('This page doesnot exists', 404));
  // }

  // returning the resposnse
  const posts = await query;
  res.status(200).json({
    status: 'success',
    results: posts.length,
    data: {
      page,
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
  // console.log(req.body);
  if (req.file) req.body.photo = req.file.filename;
  const post = new Post(req.body);
  // console.log('/////////////');
  let newPost = await post.save();

  console.log(newPost);
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
  // console.log(req.body);
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
  if (req.file) req.body.photo = req.file.filename;
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

// UPDATING LIKES ON A SINGLE POST

exports.updateLikeController = catchAsync(async (req, res, next) => {
  const post = await Post.findById(req.params.id);

  if (!post.likes.includes(req.body.userId)) {
    await post.updateOne(
      {
        $push: { likes: req.body.userId },
      },
      {
        new: true,
      }
    );
    // since post is the post without any updation so we manually update them
    res.status(200).json({
      status: 'success',
      data: {
        postLikes: post.likes.length + 1,
      },
    });
  } else {
    await post.updateOne(
      {
        $pull: { likes: req.body.userId },
      },
      {
        new: true,
      }
    );
    // since post is the post without any updation so we manually update them
    res.status(200).json({
      status: 'success',
      data: {
        postLikes: post.likes.length - 1,
      },
    });
  }
});
