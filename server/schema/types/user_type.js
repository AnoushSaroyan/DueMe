const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLFloat, GraphQLBoolean } = graphql;
const User = mongoose.model('user');

const UserType = new GraphQLObjectType({
    name: "UserType",
    fields: () => ({
        _id: { type: GraphQLID },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        token: { type: GraphQLString },
        loggedIn: { type: GraphQLBoolean }
    })
});

module.exports = UserType;