const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    password: String!
  }

  type Movie {
    id: ID!
    title: String!
    poster_path: String
  }

  type Results {
    results: [Movie]
    page: Int
    total_pages: Int
    total_results: Int
  }

  type Genre {
    id: Int
    name: String
  }

  type MovieDetails {
    id: ID!
    title: String!
    overview: String!
    release_date: String!
    poster_path: String!
    genres: [Genre]
  }

  type AuthPayload {
    token: String!
    id: ID!
  }

  input MovieInput {
    id: ID!
    title: String!
  }

  type WatchlistMovie {
    id: ID!
    title: String!
  }

  type Watchlist {
    title: String!
    id: ID!
    userId: ID!
    movies: [WatchlistMovie]
  }

  type Query {
    user(username: String!, id: String!): User
    allMovies: [Movie]
    anticipatedMovies(first: Int): [Movie]
    popularMovies(first: Int): [Movie]
    movieDetails(id: ID!): MovieDetails
    allWatchLists(userId: ID!): [Watchlist]
    watchlist(userId: String!): [Watchlist]
    oneWatchList(id: ID!): Watchlist
  }

  type Mutation {
    register(username: String!, password: String!): AuthPayload!
    login(username: String!, password: String!): AuthPayload!
    addMovieToWatchlist(id: String!, movie: MovieInput): Watchlist!
    removeMovieFromWatchlist(id: String!, movieId: String!): Watchlist!
    createWatchlist(userId: String!, title: String!): Watchlist!
    removeWatchlist(id: String!): Watchlist!
  }
`;

module.exports = typeDefs;