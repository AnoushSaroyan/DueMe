const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    chat: {
        type: Schema.Types.ObjectId,
        ref: "chat",
        required: true
    }
});

module.exports = mongoose.model("message", MessageSchema);