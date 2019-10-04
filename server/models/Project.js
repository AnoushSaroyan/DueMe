const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const date = require("../scalars/scalars.js")

const ProjectSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    duedate: {
        type: String,
        required: false
    }
});

module.exports = mongoose.model("project", ProjectSchema);