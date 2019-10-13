const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        min: 4,
        max: 32
    },
    date: {
        type: Date,
        default: Date.now
    },
    teams: [
        {
            type: Schema.Types.ObjectId,
            ref: "team"
        }
    ],
    color: {
        type: String
    },
    projects: [
        {
            type: Schema.Types.ObjectId,
            ref: "project"
        }
    ]
})

module.exports = mongoose.model("user", UserSchema);