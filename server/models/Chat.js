const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ChatSchema = new Schema({
    date: {
        type: Date,
        default: Date.now
    },
    users: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    messages: {
        type: Schema.Types.ObjectId,
        ref: "message",
        default: []
    }
});

module.exports = mongoose.model("chat", ChatSchema);