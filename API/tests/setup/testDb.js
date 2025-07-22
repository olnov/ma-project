const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

let mongo;

beforeAll(async () => {
    mongo = await MongoMemoryServer.create();
    const uri = mongo.getUri();
    await mongoose.connect(uri);
});
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