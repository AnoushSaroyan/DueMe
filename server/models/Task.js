const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const date = require("../scalars/scalars.js")

const TaskSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: "user"
	},
	project: {
		type: Schema.Types.ObjectId,
		ref: "project"
	},
	description: {
		type: String
	},
	dueDate: {
		type: String,
	},
	completed: {
		type: Boolean,
		require: true
	},
	title: {
		type: String,
		required: true
	},
});

TaskSchema.statics.updateTaskStatus = (id, completed) => {
	const Task = mongoose.model("task");

	return Task.findById(id).then(task => {
		task.completed = completed;
		return task.save();
	})
}

module.exports = mongoose.model("task", TaskSchema);