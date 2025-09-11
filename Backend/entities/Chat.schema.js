const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    
    role: {
        type: String,
        enum: ['user', 'assistant'],
        required: true,
    }   
},{timestamps: true})

module.exports = mongoose.model("chats", userSchema)