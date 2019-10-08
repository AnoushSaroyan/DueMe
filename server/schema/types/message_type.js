const mongoose = require("mongoose");
const graphql = require("graphql");
const graphqlIsoDate = require("graphql-iso-date");
const { GraphQLDate, GraphQLTime, GraphQLDateTime } = graphqlIsoDate;
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = graphql;
const User = mongoose.model("user");

const MessageType = new GraphQLObjectType({
    name: "MessageType",
    fields: () => ({
        _id: { type: GraphQLID },
        chat: { type: GraphQLID },
        content: { type: GraphQLString },
        date: { type: GraphQLDateTime },
        user: {
            type: require("./user_type"),
            resolve(parentValue) {
                return User.findById(parentValue.user)
                    .then(user => user)
                    .catch(err => null)
            }
        },
    })
});

module.exports = MessageType;