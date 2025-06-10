const mongoose = require("mongoose");
const { Schema, Types} = mongoose;
const ResponseSchema = require('./response'); 

const RespondentSchema = new Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    link: { type: String, required: true, unique: true },
    responded: { type: Boolean, default: false },
    responses: [ResponseSchema],
}, { _id: false });

module.exports = RespondentSchema;