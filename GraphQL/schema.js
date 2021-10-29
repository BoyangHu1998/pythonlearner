const { GraphQLSchema, GraphQLObjectType } = require('graphql');

const mutations = require('./mutations');
const queries = require('./queries');


const RootQuery = new GraphQLObjectType({
    name: "RootQuery",
    description: "Queries",
    fields: queries
})

const RootMutation = new GraphQLObjectType({
    name: "RootMutation",
    description: "Mutations",
    fields: mutations
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: RootMutation,
})