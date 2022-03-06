const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        id: ID!
        name: String!
        phone: String!
        email: String!
        accessModules: [String!]! 
    },

    type Query {
        users: [User]
        user(id: ID): User
    },



    type Mutation {
        register(
            name: String!,
            email: String!,
            password: String!,
            phone: String!
        ): User
        
        login(
            email: String!,
            password: String!
        ): String
        
        updateUser(
            id: String!
            name: String
            email: String
            password: String
            phone: String
            avatar: String
            accessModules: [String]
        ): User
    },
`;

// input RegisterInput {
//     name: String!
//     email: String!
//     password: String!
//     phone: String!
// },

// input LoginInput {
//     email: String!
//     password: String!
// },

// input UpdateUserInput {
//     id: String!
//     name: String
//     email: String
//     password: String
//     phone: String
//     avatar: String
//     accessModules: [String]
// },

// login(loginInput: LoginInput): String
// updateUser(updateUserInput: UpdateUserInput): User

module.exports = typeDefs;