const bcrypt = require('bcryptjs');
const User = require('../models/user');
const WatchlistMovie = require('../models/watchlist-movie');
const Watchlist = require('../models/watchlist');
const { generateToken } = require('../utils/auth');

const resolvers = {
  Query: {
    allMovies: (_, __, { dataSources }) =>
      dataSources.MoviesAPI.getMovies('movie/now_playing?language=en-US&page=2'),
    anticipatedMovies: (_, { first }, { dataSources }) =>
      dataSources.MoviesAPI.getPartMovies('movie/anticipated', first),
    popularMovies: (_, { first }, { dataSources }) =>
      dataSources.MoviesAPI.getPartMovies('movie/top_rated', first),
    movieDetails: async (_, { id }, { dataSources }) => {
      return dataSources.moviesAPI.getMovies(`movie/${id}`);
    },
    allWatchLists: async (_, { id }, { dataSources }) => {
      try {
        const wishlists = await Wishlist.find();

        return wishlists;
      } catch (error) {
        console.error('Error fetching wishlists:', error);
        throw new Error('Failed to fetch wishlists');
      }
    },
  },
  Mutation: {
    register: async (_, { username, password }) => {
        try {
          const existingUser = await User.findOne({ username });
    
          if (existingUser) {
            throw new Error('User exists');
          }
    
          const hashedPassword = await bcrypt.hash(password, 10);
    
          const newUser = new User({ username, password: hashedPassword });
    
          await newUser.save();

          const token = generateToken(newUser);
    
          return { message: 'Success', token };
        } catch (error) {
          throw new Error(error);
        }
      },
    login: async (_, { username, password }) => {
        try {
          const user = await User.findOne({ username });
    
          if (!user) {
            throw new Error('No user');
          }
    
          const validPassword = await bcrypt.compare(password, user.password);
    
          if (!validPassword) {
            throw new Error('Invalid username or password');
          }

          const token = generateToken(user);
    
          return { message: 'Success', token, id: user._id,  };
        } catch (error) {
          throw new Error(error);
        }
    },
    addMovieToWatchlist: async (_, { id }, { dataSources }) => {
      try {
        const movieData = await dataSources.moviesAPI.getMovies(`movie/${id}`);

        const watchlistMovie = new WatchlistMovie({
          id: movieData.id,
          title: movieData.title,
          overview: movieData.overview,
          releaseDate: movieData.releaseDate,
        });

        await watchlistMovie.save();

        return movieData;
      } catch (error) {
          console.error('Error fetching and saving movie data:', error);
        throw error;
      }

    },
    createWatchlist: async (_, { userId, title }) => {
      try {
        const watchlist = await Watchlist.create({ title, userId });

        return watchlist;
      } catch (error) {
          console.error('Error creating watchlist:', error);
          throw new Error('Failed to create watchlist');
      }
    },
    removeWatchlist: async (_, { id }) => {
      try {
        const watchlist = await Watchlist.findByIdAndRemove(id);

        return watchlist;
      } catch (error) {
          console.error('Error removing watchlist:', error);
          throw new Error('Failed to remove watchlist');
      }
    },
  }
};

module.exports = resolvers;