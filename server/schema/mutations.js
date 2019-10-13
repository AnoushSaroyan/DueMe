const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLFloat, GraphQLID, GraphQLList, GraphQLBoolean, GraphQLNonNull } = graphql;
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
const pubsub = require("./pubsub");
const secretOrkey = require("../../config/keys").secretOrkey;
const jwt = require("jsonwebtoken");

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
                team: {type: GraphQLID},
                color: { type: GraphQLString },
            },
            resolve(_, { name, description, dueDate, team, color }) {
                return new Project({ name, description, dueDate, team, color }).save().then( project => 
                    Team.findById(project.team).then( team => {
                        team.projects.push(project)
                        team.save()
                        return project
                    })
                )
            }
        },
        deleteProject: {
            type: ProjectType,
            args: {
                _id: { type: GraphQLID }
            },
            resolve(_, { _id }) {
                Project.findById(_id).then(project =>{
                    project.tasks.forEach(task => {
                        Task.remove({ _id: task})})
                    return project

                }).then(project => Team.findById(project.team).then(team => {
                    team.projects.pull(project)
                    team.save()
                    return Project.remove({ _id: _id });
                }))

            }
        },
        newTask: {
            type: TaskType,
            args: {
                description: { type: GraphQLString },
                title: { type: GraphQLString },
                dueDate: { type: GraphQLString },
                completed: { type: GraphQLBoolean },
                project: { type: GraphQLID },
                user: { type: GraphQLID },
            },
            resolve(_, { title, description, dueDate, completed, project, user }) {
				return new Task({ title, description, dueDate, completed, project, user }).save().then(task =>
					Project.findById(task.project).then(project => {
						project.tasks.push(task)
						project.save()
						return task;
					})
				)
            }
        },
        deleteTask: {
            type: TaskType,
            args: {
                _id: { type: GraphQLID }
            },
            resolve(_, { _id }) {
                Task.findById({_id}).then(task => 
                    Project.findById(task.project).then(project => {
                        project.tasks.pull(task)
                        project.save()
                        return Task.remove({ _id: _id })
                    })
                )

                // return Task.remove({ _id: _id });
            }
        },
        updateTask: {
            type: TaskType,
            args: {
                _id: { type: GraphQLID},
                title: { type: GraphQLString },
                description: { type: GraphQLString },
                user: { type: GraphQLID },
                project: { type: GraphQLID },
                completed: { type: GraphQLBoolean }
            },
            resolve(_, { _id, title, description, user, project, completed }){
                const updateObj = {};
                if (_id) updateObj._id = _id;
                if (title) updateObj.title = title;
                if (description) updateObj.description = description;
                if (user) updateObj.user = user;
                if (project) updateObj.project = project;
                if (completed !== undefined) updateObj.completed = completed;

                return Task.findOneAndUpdate(
                    {_id: _id},
                    { $set: updateObj },
                    { new: true},
                    (err, task) => {
                        return task;
                    }
                )
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
              let newUsers = []
              newUsers = await User.find({ email: { "$in": users } });
              let userIds = []
              userIds = newUsers.map(user => user._id);
              return new Team({name, users: userIds}).save().then(team => {newUsers.forEach(user => {
                  user.teams.push(team)
                  user.save()})
                return team}).then(team => team)
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
                // let validUser = await AuthService.verifyUser({ token: context.token });
                // check if the user is loggedin
                const token = context.token;
                const decoded = await jwt.verify(token, secretOrkey);
                const valid_user_id = decoded.id;
                const loggedIn = await User.findById(valid_user_id);
                if (loggedIn) {
                    return new Chat({ users: [valid_user_id, args.id] }).save();
                } else {
                    throw new Error("Sorry, you need to be logged in to create a chat");
                }
            }
        },
        newMessage: {
            type: ChatType,
            args: {
                content: { type: GraphQLString },
                user: { type: GraphQLID },
                chat: { type: GraphQLID }
            },
            async resolve(_, { content, user, chat }, context) {
                // let validUser = await AuthService.verifyUser({ token: context.token });
                // check if the user is loggedin
                // const token = context.token;
                // const decoded = await jwt.verify(token, secretOrkey);
                // const valid_user_id = decoded.id;
                // const loggedIn = await User.findById(valid_user_id);

                // if (loggedIn) {
                    let message = new Message({ content, user, chat });
                    await message.save();
                    // add the newly created message to the chat 
                    let chaty = await Chat.findById(chat);
                    if (!chaty.messages.includes(message)) {
                        chaty.messages.push(message);
                    }
                    await chaty.save();
                    // publish to the pubsub system so that the new data will get send to the chat that is subscribed to the messageSent subscription
                    await pubsub.publish("MESSAGE_SENT", { messageSent: chaty });
                    return chaty;
                // } else {
                //     throw new Error("Sorry, you need to be logged in to create a new message");
                // }
            }
        },
        deleteMessage: {
            type: MessageType,
            args: {
                id: { type: GraphQLID },
            },
            async resolve(_, { id }, context) {
                // let validUser = await AuthService.verifyUser({ token: context.token });
                // check if the user is loggedin
                const token = context.token;
                const decoded = await jwt.verify(token, secretOrkey);
                const valid_user_id = decoded.id;
                const loggedIn = await User.findById(valid_user_id);

                let message = await Message.findById(id);

                if (loggedIn) {
                    // check if the message auther is the current user id 
                    if (message.user !== valid_user_id) {
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
                    throw new Error("Sorry, you need to be logged in to delete a message");
                }
            }
        },
        changeUserColor: {
            type: UserType,
            args: {
                _id: { type: GraphQLID },
                color: { type: GraphQLString }
            },
            resolve(_, { _id, color }) {
                return User.findById(_id).then(user => {           
                    user.color = color
                    user.save()
                    return user
                })
            }
        }
    }
});

module.exports = mutation;