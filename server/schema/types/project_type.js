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
    // admin: { 
    //   type: require("./user_type"),
    //   resolve(parentValue) {
    //     return User.findById(parentValue.user)
    //       .then(user => user)
    //       .catch(err => null)
    //   } 
    // },
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