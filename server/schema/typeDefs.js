const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID,
    name: String,
    email: String,
    password: String,
    stories: [Story]
  }

  type Auth {
    token: ID
    user: User
  } 
  
  type Story {
    _id: ID
    title: String
    description: String
    image: String
    userId: User
  }
  type Query{
    getAllUsers: [User]
    user(_id: ID!): User
    story(_id: ID!): Story
    stories(userId: ID, name: String ): [Story]
    me: User
  }
 type Response {
  user: User
  story: Story
 }
  type Mutation {
    addUser(name: String!, email: String!, password: String!): Auth
    updateUser(name: String, email: String, password: String): User
    deleteUser(_id: ID): User
    addStory(title: String!, description: String! image: String, userId: ID): Story
    updateStory(_id: ID!,title: String, description: String, image: String): Story
    deleteStory(_id: ID!): [Story]
    login(email: String!, password: String!): Auth
  }
`
module.exports = typeDefs;