// require mongoose
const mongoose = require("mongoose");

// create schema

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
}, {
    timestamps: true
})

const User = mongoose.model("User", userSchema);

module.exports = User;