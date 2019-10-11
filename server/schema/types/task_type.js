const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLFloat, GraphQLBoolean } = graphql;
const Task = mongoose.model('task');
const User = mongoose.model('user');
const Project = mongoose.model('project');

const TaskType = new GraphQLObjectType({
	name: "TaskType",
	fields: () => ({
		_id: { type: GraphQLID },
		description: { type: GraphQLString },
		title: { type: GraphQLString },
		dueDate: { type: GraphQLString },
		completed: { type: GraphQLBoolean },
		description: { type: GraphQLString },
		user: {
			type: require("./user_type"),
			resolve(parentValue) {
				return User.findById(parentValue.user)
					.then(user => user)
					.catch(err => null)
			}
		},
		project: {
			type: require("./project_type"),
			resolve(parentValue) {
				return Project.findById(parentValue.project)
					.then(project => project)
					.catch(err => null)
			}
		}
	})
});

module.exports = TaskType;