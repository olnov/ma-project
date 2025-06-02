const { v4: uuidv4 } = require('uuid');

const generateLink = () =>{
    const BASE_URL = process.env.BASE_URL;
    if (!BASE_URL) {
        throw new Error('BASE_URL is not defined in the environment variables');
    }
    const linkId = uuidv4();
    const feedbackRequestLink = `${BASE_URL}/feedback/${linkId}`;
    return feedbackRequestLink;
}

module.exports = { generateLink };