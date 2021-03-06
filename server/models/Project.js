const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    dueDate: {
        type: String,
        required: false
    },
    team: {
        type: Schema.Types.ObjectId,
        ref: "team"
	},
	tasks: [{
		type: Schema.Types.ObjectId,
		ref: "task"
	}],
    color: {
        type: String,
        required: true
    },
    
});

module.exports = mongoose.model("project", ProjectSchema);