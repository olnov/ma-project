const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { Schema, Types} = mongoose;

const UserSchema = new Schema({
    firstName: { type: String, required: true, unique: false},
    lastName: { type: String, required: true, unique: false},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 8 },
});

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// This is method to compare a given plain text password with the database hash
// It is uesed in authentication.js controller to validate passowrds

UserSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};


const User = mongoose.model("User", UserSchema);
module.exports = User;