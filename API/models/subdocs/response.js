const mongoose = require("mongoose");
const { Schema, Types} = mongoose;

const ResponseSchema = new Schema({
    content: { type: String, required: true },
    createdBy: { type: Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now },
}, { _id: false });

module.exports = ResponseSchema;