const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { Schema, Types} = mongoose;

const UserSchema = new Schema({
    username: { type: String, required: true, unique: true },
    firstName: { type: String, required: true, unique: false},
    lastName: { type: String, required: true, unique: false},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 8 },
})

const User = mongoose.model("User", UserSchema);
module.exports = User;