const User = require('../models/User');
const catchAsync = require('../utils/catchAsync');

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
    email: req.body.email,
  };

  // 3) Updating the user info
  const updatedUser = await User.findByIdAndUpdate(
    req.userInfo.id,
    filteredBody,
    {
      new: true,
      runValidators: true,
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
