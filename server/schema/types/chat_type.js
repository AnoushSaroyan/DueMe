const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = graphql;
const Chat = mongoose.model("chat")

const ChatType = new GraphQLObjectType({
    name: "ChatType",
    fields: () => ({
        _id: { type: GraphQLID },
        users: {
            type: new GraphQLList(require("./user_type")),
            resolve(parentValue) {
                return Chat.findById(parentValue._id)
                    .populate("users")
                    .then(chat => chat.users)
            }
        },
        messages: {
            type: new GraphQLList(require("./message_type")),
            resolve(parentValue) {
                return Chat.findById(parentValue._id)
                    .populate("messages")
                    .then(chat => chat.messages)
            }
        },
    })
});

module.exports = ChatType;
