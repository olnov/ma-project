const mongoose = require("mongoose");
const { Schema, Types} = mongoose;

const UserSchema = new Schema({
    firstName: { type: String, required: true, unique: false},
    lastName: { type: String, required: true, unique: false},
    email: { type: String, required: true, unique: true },
});


const User = mongoose.model("User", UserSchema);
module.exports = User;