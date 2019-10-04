const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TeamSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    projects: [
        {
            type: Schema.Types.ObjectId,
            ref: "project"
        }
    ],
    users: [{
        type: Schema.Types.ObjectId,
        ref: 'user'
    }]
});

module.exports = mongoose.model("team", TeamSchema);