const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLFloat, GraphQLBoolean } = graphql;
const Project = mongoose.model('project');
const Team = mongoose.model("team");


const ProjectType = new GraphQLObjectType({
  name: "ProjectType",
  fields: () => ({
    _id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    dueDate: { type: GraphQLString },
    color: { type: GraphQLString },
    team: { 
      type: require("./team_type"), 
      resolve(parentValue) {
        return Team.findById(parentValue.team)
          .then(team => team)
          .catch(err => null)
      }
    }
  })
});

module.exports = ProjectType;