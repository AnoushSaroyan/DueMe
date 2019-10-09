const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLFloat, GraphQLID, GraphQLList, GraphQLBoolean } = graphql;
const mongoose = require("mongoose");

const UserType = require("./types/user_type");
const AuthService = require('../services/auth');

const ProjectType = require("./types/project_type");
const TaskType = require("./types/task_type");
const TeamType = require("./types/team_type");
const ChatType = require("./types/chat_type");
const MessageType = require("./types/message_type");

const User = mongoose.model("user");
const Project = mongoose.model("project");
const Task = mongoose.model("task");
const Team = mongoose.model("team");
const Chat = mongoose.model("chat");
const Message = mongoose.model("message");

// const graphQLISO = require("graphql-iso-date")
// const { GraphQLDate } = graphQLISO;

const mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        register: {
            type: UserType,
            args: {
                name: { type: GraphQLString },
                email: { type: GraphQLString },
                password: { type: GraphQLString }
            },
            resolve(_, data) {
                return AuthService.register(data);
            }           
        },
        logout: {
            type: UserType,
            args: {
                // all we need to log the user our is an id
                _id: { type: GraphQLID }
            },
            resolve(_, args) {
                return AuthService.logout(args);
            }
        },
        login: {
            type: UserType,
            args: {
                email: { type: GraphQLString },
                password: { type: GraphQLString }
            },
            resolve(_, args) {
                return AuthService.login(args);
            }
        },
        verifyUser: {
            type: UserType,
            args: {
                token: { type: GraphQLString }
            },
            resolve(_, args) {
                return AuthService.verifyUser(args);
            }
        },
        newProject: {
            type: ProjectType,
            args: {
                name: { type: GraphQLString },
                description: { type: GraphQLString},
                dueDate: { type: GraphQLString},
                team: {type: GraphQLID}
            },
            resolve(_, { name, description, dueDate, team }) {
                return new Project({ name, description, dueDate, team }).save();
            }
        },
        deleteProject: {
            type: ProjectType,
            args: {
                id: { type: GraphQLID }
            },
            resolve(_, { id }) {
                return Project.remove({ _id: id });
            }
        },
        newTask: {
            type: TaskType,
            args: {
                description: { type: GraphQLString },
                dueDate: { type: GraphQLString },
                completed: { type: GraphQLBoolean },
                project: { type: GraphQLID },
                user: { type: GraphQLID },
            },
            resolve(_, { description, dueDate, completed, project, user }) {
                return new Task({ description, dueDate, completed, project, user }).save();
            }
        },
        deleteTask: {
            type: TaskType,
            args: {
                id: { type: GraphQLID }
            },
            resolve(_, { id }) {
                return Task.remove({ _id: id });
            }
        },
        
        updateTaskStatus: {
            type: TaskType,
            args: {
                id: { type: GraphQLID },
                completed: { type: GraphQLBoolean }
            },
            resolve(_, { id, completed }) {
                return Task.updateTaskStatus(id, completed);
            }
        },
            
        newTeam: {
            type: TeamType,
            args: {
                name: { type: GraphQLString },
                users: { type: new GraphQLList(GraphQLString)}
            },
            async resolve(_, {name, users}){
              let newUsers;
              newUsers = await User.find({ email: { "$in": users } }).then(users => users.map(user => user._id));
              return new Team({name, users: newUsers}).save();
            }
        },

        addProjectToTeam: {
            type: TeamType,
            args: {
                teamId: { type: GraphQLID },
                projectId: { type: GraphQLID }
            },
            resolve(_, {teamId, projectId}){
                return Team.addProjectToTeam(teamId, projectId)
            }
        },
        createChat: {
            type: ChatType,
            args: {
                id: { type: GraphQLID } // that is the other user's id
            },
            async resolve(_, args, context) {
                let validUser = await AuthService.verifyUser({ token: context.token });
                if (validUser.loggedIn) {
                    return new Chat({ users: [validUser.id, args.id] }).save();
                } else {
                    throw new Error("Sorry, you need to be logged in to create a product");
                }
            }
        },
        newMessage: {
            type: MessageType,
            args: {
                content: { type: GraphQLString },
                user: { type: GraphQLID },
                chat: { type: GraphQLID }
            },
            async resolve(_, { content, user, chat }, context) {
                let validUser = await AuthService.verifyUser({ token: context.token });
                let message = new Message({ content, user, chat });

                if (validUser.loggedIn) {
                    await message.save();
                    // add the newly created message to the chat 
                    let chaty = await Chat.findById(chat);
                    if (!chaty.messages.includes(message)) {
                        chaty.messages.push(message);
                    }
                    await chaty.save();
                    // publish to the pubsub system so that the new data will get send to the chat that is subscribed to the messageSent subscription
                    await pubsub.publish("MESSAGE_SENT", { messageSent: message, chat: chaty });
                    return message;
                } else {
                    throw new Error("Sorry, you need to be logged in to create a product");
                }
            }
        },
        deleteMessage: {
            type: MessageType,
            args: {
                id: { type: GraphQLID },
            },
            async resolve(_, { id }, context) {
                let validUser = await AuthService.verifyUser({ token: context.token });
                let message = await Message.findById(id);

                if (validUser.loggedIn) {
                    // check if the message auther is the current user id 
                    if (message.user !== validUser.id) {
                        let chaty = await Chat.findById(chat);
                        // check if the chat contains the message then delete it from chat.messages
                        if (chaty.messages.includes(message)) {
                            chaty.messages.splice(message.indexOf(message), 1);

                            await channel.save();
                            await message.remove();
                            // publish to the pubsub system so that the new data will get send to the chat that is subscribed to the messageDelete subscription
                            await pubsub.publish("MESSAGE_DELETED", { messageDeleted: message, chat: chaty });
                            return message;
                        }
                    } else {
                        throw new Error("Sorry, you can't delete other users' messages");
                    }
                } else {
                    throw new Error("Sorry, you need to be logged in to create a product");
                }
            }
        },

    }
});

module.exports = mutation;