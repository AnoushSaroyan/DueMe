const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLFloat, GraphQLID, GraphQLList } = graphql;
const mongoose = require("mongoose");

const UserType = require("./types/user_type");
const AuthService = require('../services/auth');

const ProjectType = require("./types/project_type");
const TaskType = require("./types/task_type");
const TeamType = require("./types/team_type");

const User = mongoose.model("user");
const Project = mongoose.model("project");
const Task = mongoose.model("task");
const Team = mongoose.model("team");

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
                admin: { type: GraphQLID}
            },
            resolve(_, { name, description, admin }) {
                return new Project({ name, description, admin }).save();
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
                title: { type: GraphQLString },
                // title: { type: GraphQLString },
                // content: { type: GraphQLString },
                // duedate: { type: GraphQLString },
                // status: { type: GraphQLBoolean },
            },
            resolve(_, { title }) {
                return new Task({ title }).save();
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
            // async resolve(parentValue, { name, description, weight }, context) {
            //     const validUser = await AuthService.verifyUser({ token: context.token });

            //     if (validUser.loggedIn) {
            //         const user = validUser._id;
            //         return new Product({ name, description, weight, user }).save();
            //     } else {
            //         throw new Error("Sorry, you need to be logged in to create a product");
            //     }
            // }
        newTeam: {
            type: TeamType,
            args: {
                name: { type: GraphQLString },
                users: { type: new GraphQLList(GraphQLID)}
            },
            resolve(_, {name, users}){
                return new Team({name, users}).save();
            }
        }
    }
});

module.exports = mutation;