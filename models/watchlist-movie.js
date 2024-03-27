const mongoose = require('mongoose');
const { Schema } = mongoose;

const watchlistMovieSchema = new Schema({
  id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
});

const WatchlistMovie = mongoose.model('WatchlistMovie', watchlistMovieSchema);

module.exports = WatchlistMovie;
module.exports = watchlistMovieSchema;