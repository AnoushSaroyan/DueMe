const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLFloat, GraphQLBoolean } = graphql;
const Task = mongoose.model('task');
const User = mongoose.model('user');

const TaskType = new GraphQLObjectType({
	name: "TaskType",
	fields: () => ({
		_id: { type: GraphQLID },
		title: { type: GraphQLString },
		content: { type: GraphQLString },
		duedate: { type: GraphQLString },
        status: { type: GraphQLBoolean },
		user: {
			type: require("./user_type"),
			resolve(parentValue) {
				return User.findById(parentValue.user)
					.then(user => user)
					.catch(err => null)
			}
		},
	})
});

module.exports = TaskType;