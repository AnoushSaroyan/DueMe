const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLFloat, GraphQLID, GraphQLList, GraphQLBoolean } = graphql;
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
                users: { type: new GraphQLList(GraphQLID)}
            },
            resolve(_, {name, users}){
                return new Team({name, users}).save();
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
        }
    }
});

module.exports = mutation;

        // async resolve(parentValue, { name, description, weight }, context) {
            //     const validUser = await AuthService.verifyUser({ token: context.token });

            //     if (validUser.loggedIn) {
            //         const user = validUser._id;
            //         return new Product({ name, description, weight, user }).save();
            //     } else {
            //         throw new Error("Sorry, you need to be logged in to create a product");
            //     }
            // }