const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLFloat, GraphQLBoolean, GraphQLList } = graphql;
const Project = mongoose.model("project");
const Team = mongoose.model("team");

const TeamType = new GraphQLObjectType({
    name: "TeamType",
    fields: () => ({
        _id: { type: GraphQLID },
        name: { type: GraphQLString },
        projects: {
            type: new GraphQLList(require("./project_type")),
            resolve(parentValue) {
                return Team.findById(parentValue._id) 
                    .populate("projects")
                    .then(team => team.projects)
            }
        },
        users: {
            type: new GraphQLList(require("./user_type")),
            resolve(parentValue) {
                return Team.findById(parentValue._id) 
                    .populate("users")
                    .then(team => team.users)
            }
        }
    })
})

module.exports = TeamType;