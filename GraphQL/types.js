const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLList, GraphQLFloat, GraphQLInt, GraphQLBoolean } = require("graphql");
const Models = require('../models')

const UserType = new GraphQLObjectType({
    name: "User",
    description: "User type",
    fields: () => ({
        id: {
            type: GraphQLID
        },
        name: {
            type: GraphQLString
        },
        phone: {
            type: GraphQLString
        },
        email: {
            type: GraphQLString
        },
        accessModules: {
            type: new GraphQLList(GraphQLString),
            required: false
        }
    })
})

module.exports = {
    UserType,
};