const bcrypt = require('bcryptjs');
const User = require('../models/user');
const Watchlist = require('../models/watchlist');
const { generateToken } = require('../utils/auth');

const resolvers = {
  Query: {
    allMovies: (_, { page }, { dataSources }) => {
      return dataSources.MoviesAPI.getMovies(`movie/now_playing?language=en-US&page=${page}`);
    },
    filterMovies: (_, args, { dataSources }) => {
      const { page, genre = null, region = '', year = null } = args || {};

      return dataSources.MoviesAPI.filterMovies(`movie/now_playing?language=en-US&page=${page}`, { region, genre, year });
    },
    anticipatedMovies: (_, { first }, { dataSources }) =>
      dataSources.MoviesAPI.getPartMovies('movie/upcoming', first),
    popularMovies: (_, { first }, { dataSources }) =>
      dataSources.MoviesAPI.getPartMovies('movie/top_rated', first),
    movieDetails: async (_, { id }, { dataSources }) => {
      const data = await dataSources.MoviesAPI.getMovie(`movie/${id}`);

      return data;
    },
    allWatchLists: async (_, { userId }, { dataSources }) => {
      try {
        const watchlists = await Watchlist.find({ userId });

        return watchlists;
      } catch (error) {
        console.error('Error fetching watchlists:', error);
        throw new Error('Failed to fetch watchlists');
      }
    },
    oneWatchList: async (_, { id }, { dataSources }) => {
      try {
        const watchlist = await Watchlist.findById(id);

        return watchlist;
      } catch (error) {
        console.error('Error fetching watchlist:', error);
        throw new Error('Failed to fetch watchlist');
      }
    },
    genres: (_, __, { dataSources }) =>
      dataSources.MoviesAPI.getGenres('genre/movie/list?language=en'),
    countries: (_, __, { dataSources }) =>
      dataSources.MoviesAPI.getCountries('configuration/countries?language=en-US'),
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
    
          return { message: 'Success', token, id: newUser._id,  };
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
    addMovieToWatchlist: async (_, { id, movie }, { dataSources }) => {
      try {
        const watchlist = await Watchlist.findById(id);
        const existingMovie = watchlist.movies.find((item) => item.id === movie.id);

        if (existingMovie) {
          throw new Error('Movie already exists in watchlist');
        }

        watchlist.movies.push(movie);

        await watchlist.save();
    
        return watchlist;
      } catch (error) {
          console.error('Failed to adding movie:', error);
        throw error;
      }
    },
    removeMovieFromWatchlist: async (_, { id, movieId }, { dataSources }) => {
      try {
        const watchlist = await Watchlist.findById(id);

        watchlist.movies = watchlist.movies.filter(movie => movie.id !== movieId);

        await watchlist.save();
    
        return watchlist;
      } catch (error) {
          console.error('Failed to remove movie:', error);
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
        const watchlist = await Watchlist.findByIdAndDelete(id);

        return watchlist;
      } catch (error) {
          console.error('Error removing watchlist:', error);
          throw new Error('Failed to remove watchlist');
      }
    },
    renameWatchlist: async (_, { id, title }) => {
      try {
        const watchlist = await Watchlist.findById(id);

        watchlist.title = title;

        await watchlist.save();

        return watchlist;
      } catch (error) {
          console.error('Error renaming watchlist:', error);
          throw new Error('Failed to rename watchlist');
      }
    },
  }
};

module.exports = resolvers;