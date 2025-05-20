import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    }
},

{timstamps: true}
);

const User = mongoose.model('User', userSchema);

module.exports = User;