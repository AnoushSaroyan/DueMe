const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLList, GraphQLID, GraphQLNonNull, GraphQLString } = graphql;
const ProjectType = require("./project_type")
const UserType = require("./user_type");
const TeamType = require("./team_type")
const TaskType = require("./task_type");
const User = mongoose.model("user");
const Project = mongoose.model("project");
const Task = mongoose.model("task");
const Team = mongoose.model("team");

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
                return Project.find({})
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
                return Task.find({})
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
                return Team.find({})
            }
        },
        team: {
            type: TeamType,
            args: { _id: { type: new GraphQLNonNull(GraphQLID) } },
            resolve(_, args) {
                return Team.findById(args._id);
            }
        },
    })
});


module.exports = RootQueryType;