import connectDB from "../services/db.js";

export const getProductById = async (product_id) => {
    const db = await connectDB();
    return db.collection("products").findOne({ product_id });
};
