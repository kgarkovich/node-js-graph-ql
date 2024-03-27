const mongoose = require('mongoose');
const watchlistMovieSchema = require('./watchlist-movie');

const wishlistSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  movies: {
    type: [watchlistMovieSchema],
  },
});

const Wishlist = mongoose.model('Wishlist', wishlistSchema);

module.exports = Wishlist;