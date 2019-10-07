const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLFloat, GraphQLID, GraphQLList, GraphQLBoolean } = graphql;
const mongoose = require("mongoose");
const { withFilter } = require('apollo-server');

const UserType = require("./types/user_type");
const AuthService = require('../services/auth');

const ChatType = require("./types/chat_type");

const User = mongoose.model("user");
const Chat = mongoose.model("chat");


// const graphQLISO = require("graphql-iso-date")
// const { GraphQLDate } = graphQLISO;


// Publish-Subscribe system, also known as pubsub in short, 
// is a type of database system that serves a group of subscribers interested in various events with notifications as the events occur.
const { PubSub } = require('graphql-subscriptions');

const pubsub = new PubSub();

const subscription = new GraphQLObjectType({
    name: "Subscription",
    fields: {
        chatCreated: {
            type: ChatType,
            // Manipulate the event data and return the new value before sending to graphql server
            resolve: data => {
                return data.chatCreated;
            },
            // When publishing data to subscribers, we need to make sure that each subscriber gets only the data it needs.
            // To do so, we can use withFilter helper from this package, which wraps AsyncIterator with a filter function, and lets you control each publication for each user.
            // asyncIterator is pretty much mapping a subscription to a pubsub channel ( to an event or to many events)
            subscribe: () => withFilter(() => pubsub.asyncIterator(["CHAT_CREATED"]))
        }
    }
});

module.exports = subscription;
