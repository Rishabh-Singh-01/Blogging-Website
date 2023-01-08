const multer = require('multer');
const sharp = require('sharp');
const Post = require('../models/Post');
const User = require('../models/User');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

//////////// MULTER RELATED STUFF ///////////////////

// const multerStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, './public/img/users');
//   },
//   filename: (req, file, cb) => {
//     const ext = file.mimetype.split('/')[1];

//     cb(null, `user-${req.userInfo.id}-${Date.now()}.${ext}`);
//   },
// });

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

exports.uploadUserPhoto = upload.single('photo');

exports.resizeUserPhoto = (req, res, next) => {
  if (!req.file) return next();

  req.file.filename = `user-${req.userInfo.id}-${Date.now()}.webp`;

  sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat('webp')
    .webp({ nearlossless: true, quality: 50 })
    .toFile(`public/img/users/${req.file.filename}`);
  next();
};
////////////////////////////////////////////////////

exports.getUserController = catchAsync(async (req, res, next) => {
  console.log('this is a user');
  const user = await User.findById(req.userInfo.id);

  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
});

exports.updateDataController = catchAsync(async (req, res, next) => {
  // 1) Check that password isnt available in the req.body IMPLEMENTED LATER
  // 2) Taking on the information and filtering out

  const filteredBody = {
    username: req.body.username,
    aboutme: req.body.aboutme,
  };
  if (req.file) filteredBody.profilePic = req.file.filename;
  // console.log(req.file);

  // 3) Updating the user info
  const updatedUser = await User.findByIdAndUpdate(
    req.userInfo.id,
    filteredBody,
    {
      new: true,
      runValidators: true,
    }
  );

  // console.log(updatedUser);

  // changing all the main posts by the user
  await Post.updateMany(
    { userEmail: req.body.email },
    {
      $set: {
        username: updatedUser.username,
        userProfilePicture: updatedUser.profilePic,
      },
    }
  );

  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser,
    },
  });
});

exports.deleteAccountController = catchAsync(async (req, res, next) => {
  // 1) Find the user and delete it from the data

  await User.findByIdAndDelete(req.userInfo.id);

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
