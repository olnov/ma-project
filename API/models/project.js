const mongoose = require("mongoose");
const { Schema, Types} = mongoose;

const ProjectSchema = new Schema({
    title: { type: String, required: true, unique: true },
    description: { type: String, required: false },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const Project = mongoose.model("Project", ProjectSchema);
module.exports = Project;