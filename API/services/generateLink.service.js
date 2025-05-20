const generateLink = (userId, feedbackRequestId) =>{
    const BASE_URL = process.env.BASE_URL;
    if (!BASE_URL) {
        throw new Error('BASE_URL is not defined in the environment variables');
    }
    if (!userId || !feedbackRequestId) {
        throw new Error('User ID and Feedback Request ID are required');
    }
    const feedbackRequestLink = `${BASE_URL}/feedback?user_id=${userId}&feedback_id=${feedbackRequestId}`;
    return feedbackRequestLink;
}

module.exports = { generateLink };