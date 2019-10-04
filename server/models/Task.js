const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const date = require("../scalars/scalars.js")

const TaskSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: "user"
	},
	title: {
		type: String,
		required: true
	},
	content: {
		type: String,
		required: false
	},
	duedate: {
		type: String,
		required: false
	},
	status: {
		type: Boolean,
		require: false
	}
});

module.exports = mongoose.model("task", TaskSchema);