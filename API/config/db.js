const mongoose = require("mongoose");

const connectDB = async () => {
    // Check if connection string is present in .env file
    const MONGO_URI = process.env.MONGO_URI;
    if (!MONGO_URI) {
        console.error('MONGO_URI is not set');
        process.exit(1);
        }

    try {
        const conn = await mongoose.connect(MONGO_URI, {
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
        });
        console.log("MongoDB connected successfully");
        return conn;
    } catch (err) {
        console.error("Failed to connect to MongoDB", err);
        throw err;
    }
};

module.exports = connectDB;
