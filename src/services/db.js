import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const url = process.env.DB_URL;
const dbName = process.env.DB_NAME;

const connectDB = async () => {
    try {
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);

        return db;
    } catch (error) {
        console.error("Error connecting to MongoDB", error);
        throw error;
    }
};

export default connectDB;
