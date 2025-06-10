const { v4: uuidv4 } = require('uuid');
const { generateLink } = require('../services/generateLink.service.js');


const BASE_URL = process.env.BASE_URL;
if (!BASE_URL) {
    throw new Error('BASE_URL is not defined in the environment variables');
}

const createFeedbackRequest = async (req, res) => {
    // const userId = req.sub;
    const userId = req.auth?.sub;
    console.log('User ID:', userId);
    console.log('Request Body:', req.body);
    
    const feedbackRequestId = uuidv4(); // Should come from the database
    const feedbackRequestLink = generateLink(userId, feedbackRequestId);
    if (!feedbackRequestLink) {
        return res.status(500).json({ message: 'Error generating feedback request link' });
    }
    res.status(200).json({ message: 'Link generated successfully', link: feedbackRequestLink });
}

module.exports = {
    createFeedbackRequest
};