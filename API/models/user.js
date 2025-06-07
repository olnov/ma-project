const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { Schema, Types} = mongoose;

const UserSchema = new Schema(
    {
        auth0Id: { type: String, required: true, unique: true }, //Auth0 sub
        username: { type: String, unique: true },
        firstName: { type: String},
        lastName: { type: String},
        email: { type: String, required: true, unique: true }
    },
    {
        timestamps: true //for createdAt and updatedAt
    }
);

const User = mongoose.model("User", UserSchema);
module.exports = User;