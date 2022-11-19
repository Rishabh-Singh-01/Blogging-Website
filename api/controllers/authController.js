const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const User = require('./../models/User');

exports.signUpController = catchAsync(async (req, res, next) => {
  const newUser = new User(req.body);
  const userSignedUp = await newUser.save();

  // HERE WE GIVE TOKEN/LOG IN USER SINCE HE IS REGISTERED SO HER AUTOMATICALLY GETS LOGGED
  // IN FOR THE FIRST TIME
  jwt.sign(
    { id: userSignedUp._id },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    },
    function (err, token) {
      if (err) {
        return next(new AppError('Something is wrong with token...', 404));
      }

      // Adding a cookie for browser to store data
      res.cookie('jwt', token, {
        expires: new Date(
          Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
        ),
        secure: false,
        httpOnly: true,
      });

      res.status(201).json({
        status: 'success',
        token,
        data: { user: userSignedUp },
      });
    }
  );
});

exports.loginController = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // 1) CHECK WHETHER USER AND PASSWORD ARE INPUTTED OR NOT
  if (!email || !password)
    return next(new AppError('Please input email and password !!', 400));

  // 2) CHECK IF USER EXISTS AND PASSWORD IS CORRECT
  const user = await User.findOne({ email }).select('+password');

  // console.log(user);

  if (!user || !(await user.comparePassword(password, user.password)))
    return next(new AppError('Incorrect email or password', 401));

  // 3) EVERYTHING IS OKAY , SEND TOKEN TO CLIENT
  jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    },
    function (err, token) {
      if (err) {
        return next(new AppError('Something is wrong with token...', 404));
      }
      // Adding a cookie for browser to store data
      res.cookie('jwt', token, {
        expires: new Date(
          Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
        ),
        secure: false,
        httpOnly: true,
      });
      res.status(201).json({
        status: 'success',
        token,
        data: {
          user,
        },
      });
    }
  );
});

// ASSUMING WE ARE ALREADY LOGGED IN

exports.updatePasswordController = catchAsync(async (req, res, next) => {
  // 1) Find info about user form DB
  const user = await User.findById(req.userInfo.id).select('+password');

  // 2) Check if posted password or password current is correct
  if (!(await user.comparePassword(req.body.passwordCurrent, user.password)))
    return next(new AppError('Password inputted is not correct', 401));

  // 3) Update the password field
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save(); // This will validate the newly inputted data form the schema

  // 4) Return new token or log in the user
  jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    },
    function (err, token) {
      if (err) {
        return next(new AppError('Something is wrong with token...', 404));
      }
      // Adding a cookie for browser to store data
      res.cookie('jwt', token, {
        expires: new Date(
          Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
        ),
        secure: false,
        httpOnly: true,
        secure: false,
      });
      res.status(200).json({
        status: 'success',
        token,
        data: {
          user,
        },
      });
    }
  );
});

// THIS BASICALLY CHECKS WHETHER A USER IS LOGGED IN
exports.protectController = catchAsync(async (req, res, next) => {
  // 1) Getting token and checking whether its there or not in request header
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return next(
      new AppError('You are not logged in/ no token available. ', 401)
    );
  }

  // 2) Checking whether token is real or not ie verification
  let decodedPayload;
  try {
    decodedPayload = await promisify(jwt.verify)(
      token,
      process.env.JWT_SECRET_KEY
    );
  } catch (err) {
    return next(
      new AppError('You token is not valid. Please log in again ', 401)
    );
  }

  // 3) Check whether user still exists or nor
  // 4) Check whether password was changed or not
  // IMPLEMENT ABOVE ONES LATER

  // Grant permission to protected route
  req.userInfo = decodedPayload;
  console.log('req.userInfo');
  next();
});

exports.logoutController = (req, res) => {
  console.log('resssss');
  res.cookie('jwt', 'loggedOut', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  console.log('resssss2');

  res.status(200).json({ status: 'success' });
};
