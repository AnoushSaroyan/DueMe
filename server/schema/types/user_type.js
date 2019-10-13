const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLFloat, GraphQLBoolean, GraphQLList } = graphql;
const User = mongoose.model('user');
const Team = mongoose.model('team');
const TeamType = require("./team_type");
const Project = mongoose.model("project");

const UserType = new GraphQLObjectType({
    name: "UserType",
    fields: () => ({
        _id: { type: GraphQLID },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        token: { type: GraphQLString },
        loggedIn: { type: GraphQLBoolean },
        teams: {
            type: new GraphQLList(TeamType),
            resolve(parentValue) {
                return User.findById(parentValue.id)
                    .populate("teams")
                    .then(user => user.teams);
        }},
        color: { type: GraphQLString },
        projects: {
            type: new GraphQLList(require("./project_type")),
            resolve(parentValue) {
                return User.findById(parentValue._id)
                    .populate("projects")
                    .then(user=> user.projects)
            }
        }
    })
});

module.exports = UserType;