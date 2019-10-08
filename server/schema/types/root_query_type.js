const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLList, GraphQLID, GraphQLNonNull } = graphql;
const ProjectType = require("./project_type")
const UserType = require("./user_type");
const TeamType = require("./team_type")
const TaskType = require("./task_type");
const MessageType = require("./message_type");
const ChatType = require("./chat_type");
const User = mongoose.model("user");
const Project = mongoose.model("project");
const Task = mongoose.model("task");
const Team = mongoose.model("team");
const Message = mongoose.model("message");
const Chat = mongoose.model("chat");
const AuthService = require('../../services/auth');

const RootQueryType = new GraphQLObjectType({
    name: "RootQueryType",
    fields: () => ({
        users: {
            type: new GraphQLList(UserType),
            resolve() {
                return User.find({});
            }
        },
        user: {
            type: UserType,
            args: { _id: { type: new GraphQLNonNull(GraphQLID) } },
            resolve(_, args) {
                return User.findById(args._id);
            }
        },
        projects: {
            type: new GraphQLList(ProjectType),
            resolve(){
                return Project.find({});
            }
        },
        project: {
            type: ProjectType,
            args: { _id: { type: new GraphQLNonNull(GraphQLID) } },
            resolve(_, args) {
                return Project.findById(args._id);
            }
        },
        tasks: {
            type: new GraphQLList(TaskType),
            resolve(){
                return Task.find({});
            }
        },
        task: {
            type: TaskType,
            args: { _id: { type: new GraphQLNonNull(GraphQLID) } },
            resolve(_, args) {
                return Task.findById(args._id);
            }
        },
        teams: {
            type: new GraphQLList(TeamType),
            resolve(){
                return Team.find({});
            }
        },
        team: {
            type: TeamType,
            args: { _id: { type: new GraphQLNonNull(GraphQLID) } },
            resolve(_, args) {
                return Team.findById(args._id);
            }
        },
        messages: {
            type: new GraphQLList(MessageType),
            resolve() {
                return Message.find({});
            }
        },
        message: {
            type: MessageType,
            args: { _id: { type: new GraphQLNonNull(GraphQLID) } },
            resolve(_, args) {
                return Message.findById(args._id);
            }
        },
        chats: {
            type: new GraphQLList(ChatType),
            resolve() {
                return Chat.find({});
            }
        },
        chat: {
            type: ChatType,
            args: { _id: { type: new GraphQLNonNull(GraphQLID) } },
            resolve(_, args) {
                return Chat.findById(args._id);
            }
        },
        userChats: {
            type: new GraphQLList(ChatType),
            args: { _id: { type: new GraphQLNonNull(GraphQLID) } }, // user_id
            async resolve(_, args, context) {
                let validUser = await AuthService.verifyUser({ token: context.token });
                let conversations = await Chat.find({});
                if (validUser.loggedIn) {
                    return conversations.filter(chat => chat.users.includes(args._id))
                } else {
                    throw new Error("Sorry, you need to be logged in to create a product");
                }
            }
            // async resolve(parentValue, { name, description, weight }, context) {
            //     const validUser = await AuthService.verifyUser({ token: context.token });

            //     if (validUser.loggedIn) {
            //         const user = validUser._id;
            //         return new Product({ name, description, weight, user }).save();
            //     } else {
            //         throw new Error("Sorry, you need to be logged in to create a product");
            //     }
            // }
        }
    })
});


module.exports = RootQueryType;