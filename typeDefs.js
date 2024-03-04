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
    posterPath: String
    backdropPath: String
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
    anticipatedMovies: [Movie]
    popularMovies: [Movie]
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