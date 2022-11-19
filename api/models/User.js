// THIS USES FAT MODEL , SLIM CONTROLLER PHILOSOPHY
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

// SCHEMA DESIGN
const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'Please, confirm your username !'],
      unique: true,
    },
    email: {
      type: String,
      required: [true, 'Please, confirm your email !'],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, 'Please, confirm your valid email !'],
    },
    password: {
      type: String,
      required: [true, 'Please, confirm your password !'],
      minLength: 8,
      select: false,
    },
    passwordConfirm: {
      type: String,
      required: [true, 'Please, confirm your password.'],
      validate: {
        validator: function (el) {
          return el === this.password;
        },
        message: 'Passwords do not match !!!',
      },
    },
    profilePic: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
);

// HASHING PASSWORD
UserSchema.pre('save', async function (next) {
  // This basically return the fn without any change if we use this for modifying data
  // but donot modify the password itself but something else;
  if (!this.isModified('password')) return next();

  // Hashing password with salt value of 12
  this.password = await bcrypt.hash(this.password, 12);

  // Deleting the password Confirm and not saving that coz we dont need two same password
  // by setting it up to undefined;
  this.passwordConfirm = undefined;

  // calling the next middlew are
  next();
});

// ISNTANCE METHOD

UserSchema.methods.comparePassword = async function (
  userTypedPassword,
  correctCheckerPassword
) {
  return await bcrypt.compare(userTypedPassword, correctCheckerPassword);
};

// EXPORTING MODEL
const User = mongoose.model('User', UserSchema);

module.exports = User;
