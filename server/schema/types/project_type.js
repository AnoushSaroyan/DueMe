const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLList, GraphQLString, GraphQLID, GraphQLFloat, GraphQLBoolean } = graphql;
const Project = mongoose.model('project');
const Team = mongoose.model("team");
const Task = mongoose.model("task");

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
		},
		tasks: {
			type: new GraphQLList(require("./task_type")),
			resolve(parentValue) {
				return Project.findById(parentValue._id)
					.populate("tasks")
					.then(project => project.tasks)
			}
		}
	})
});

module.exports = ProjectType;