const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    password: String!
  }

  type AuthPayload {
    token: String!
  }

  type Query {
    user(username: String!, id: String!): User
  }

  type Mutation {
    register(username: String!, password: String!): AuthPayload!
    login(username: String!, password: String!): AuthPayload!
  }
`;

module.exports = typeDefs;