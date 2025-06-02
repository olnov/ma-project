const mongoose = require("mongoose");
const { Schema, Types} = mongoose;

const CampaignSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: false },
    createdBy: { type: Types.ObjectId, ref: 'User', required: true },
    project: [{ type: Types.ObjectId, ref: 'Project', required: true }],
});

const Campaign = mongoose.model("Campaign", CampaignSchema);
module.exports = Campaign;