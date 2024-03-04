const mongoose = require('mongoose');

const wishlistSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
});

const Wishlist = mongoose.model('Wishlist', wishlistSchema);

module.exports = Wishlist;