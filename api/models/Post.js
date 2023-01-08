const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      default: 'default.jpg',
    },
    username: {
      type: String,
      required: true,
    },
    userProfilePicture: {
      type: String,
      default: 'default.jpg',
    },
    userEmail: {
      type: String,
      required: true,
    },
    categories: {
      type: Array,
      required: false,
    },
    likes: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Post', PostSchema);
