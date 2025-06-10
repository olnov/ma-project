const mongoose = require("mongoose");
const RespondentSchema = require("./subdocs/respondent");
const { Schema, Types} = mongoose;

const CampaignSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: false },
    createdBy: { type: Types.ObjectId, ref: 'User', required: true },
    projects: [
        {
            project: { type: Types.ObjectId, ref: 'Project', required: true },
            team: [RespondentSchema]
        }
    ],
});

const Campaign = mongoose.model("Campaign", CampaignSchema);
module.exports = Campaign;