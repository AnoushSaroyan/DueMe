const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLList, GraphQLID, GraphQLNonNull, GraphQLString } = graphql;
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
const AuthService = require("../../services/auth"); 
const secretOrkey = require("../../../config/keys").secretOrkey;
const jwt = require("jsonwebtoken");

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
        userByEmail: {
          type: UserType,
          args: { email: { type: new GraphQLNonNull(GraphQLString) } },
          resolve(_, args) {
            return User.findOne(args);
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
        usersChat: {
            type: new GraphQLList(ChatType),
            args: { _id: { type: new GraphQLNonNull(GraphQLID) } }, // other user_id
            async resolve(_, args, context) {
                // let validUser = await AuthService.verifyUser({ token: context.token });
                // const token = context.token;
                // const decoded = await jwt.verify(token, secretOrkey);
                // const valid_user_id = decoded.id;
                // const loggedIn = await User.findById(valid_user_id);
                let conversations = await Chat.find({});

                // if (loggedIn) {
                    // let valid_user_id = "5d96d076de8d3d64ecab25a7";
                    // let returnValue = conversations.filter(chat => chat.users.includes(args._id) && chat.users.includes(valid_user_id));
                    // return returnValue; 

                    // filter the chat with other user_id and the current user id
                    return conversations.filter(chat => chat.users.includes(args._id) && chat.users.includes(valid_user_id)); 
                // } else {
                //     throw new Error("Sorry, you need to be logged in");
                // }
            }
        },
        fetchOrCreateChatWithUser: {
            type: ChatType,
            args: {
                current_user_id: { type: new GraphQLNonNull(GraphQLID) },
                other_user_id: { type: new GraphQLNonNull(GraphQLID) }, // this is the other user's id
            },

            async resolve(_, { current_user_id, other_user_id }, context) {
                // let validUser = await AuthService.verifyUser({ token: context.token });
                // check if the user is loggedin
                // const token = context.token;
                // const decoded = await jwt.verify(token, secretOrkey);
                // const valid_user_id = decoded.id;
                // const loggedIn = await User.findById(valid_user_id);

                let conversations = await Chat.find({});

                // if (loggedIn) {
                    // let valid_user_id = "5d96d076de8d3d64ecab25a7";
                    // let returnValue = conversations.filter(chat => chat.users.includes(args._id) && chat.users.includes(valid_user_id));
                    // return returnValue; 

                    // filter the chat with other user_id and the current user id
                    let chaty = conversations.filter(chat => {
                        return chat.users.includes(current_user_id) && chat.users.includes(other_user_id)
                    });
                    let newChaty;
                    if (chaty.length !== 0) {
                        return chaty[0];
                    } else {
                        newChaty = await new Chat({ users: [current_user_id, other_user_id] }).save();
                        return newChaty;
                    }
                // } else {
                //     throw new Error("Sorry, you need to be logged in");
                // }
            }
        }

    })
});


module.exports = RootQueryType;