// This file is run automatically by Jest before tests (via setupFilesAfterEnv)
// - starts n isolated in-memory MongoDB instance using MongoMemoryServer
// - connects Mongoose before all tests, clears collections after each test, shuts down the server after all tests

const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

let mongo;
// Global setup before all tests
beforeAll(async () => {
    mongo = await MongoMemoryServer.create();
    const uri = mongo.getUri();
    await mongoose.connect(uri);
});
// Global tear-down after all tests
afterAll(async () => {
    try {
        await mongoose.connection.dropDatabase();
        await mongoose.connection.close();
        if (mongo) {
            await mongo.stop();
        }
        console.log("🧹 MongoMemoryServer stopped cleanly.");
    } catch (err) {
        console.error("Error during MongoMemoryServer teardown:", err);
    }
});
//pre-test cleanup
afterEach(async () => {
    try {
        const collections = mongoose.connection.collections;
        for (const key in collections) {
            const collection = collections[key];
            await collection.deleteMany();
        }
    } catch (err) {
        console.error("Error in afterEach while deleting collections:", err);
    }
});