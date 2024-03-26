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

  type MovieDetails {
    id: ID!
    title: String!
    overview: String!
    release_date: String!
    backdrop_path: String!
  }

  type AuthPayload {
    token: String!
    id: ID!
  }

  type Watchlist {
    title: String!
    id: ID!
  }

  type Query {
    user(username: String!, id: String!): User
    allMovies: [Movie]
    anticipatedMovies(first: Int): [Movie]
    popularMovies(first: Int): [Movie]
    movieDetails(id: ID!): MovieDetails
    allWatchLists: [Watchlist]
    watchlist(userId: String!): [Watchlist]
  }

  type Mutation {
    register(username: String!, password: String!): AuthPayload!
    login(username: String!, password: String!): AuthPayload!
    addMovieToWatchlist(id: String!): MovieDetails!
    createWatchlist(userId: String!, title: String!): Watchlist!
    removeWatchlist(id: String!): Watchlist!
  }
`;

module.exports = typeDefs;