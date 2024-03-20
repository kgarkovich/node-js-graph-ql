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
    overview: String
    releaseDate: String
    poster_path: String
    backdrop_path: String
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
    releaseDate: String!
  }

  type AuthPayload {
    token: String!
    id: ID!
  }

  type Watchlist {
    title: String!
    id: ID!
    movie: MovieDetails
  }

  type Query {
    user(username: String!, id: String!): User
    allMovies: [Movie]
    anticipatedMovies(first: Int): [Movie]
    popularMovies(first: Int): [Movie]
    movieDetails: [MovieDetails]
    allWatchLists: [Watchlist]
  }

  type Mutation {
    register(username: String!, password: String!): AuthPayload!
    login(username: String!, password: String!): AuthPayload!
    addMovieToWatchlist(id: String!): MovieDetails!
    createWatchlist(userId: ID!, title: String!): Watchlist!
    removeWatchlist(id: ID!): Watchlist!
  }
`;

module.exports = typeDefs;