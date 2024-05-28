import { ObjectId } from "mongodb";
import connectDB from "../services/db.js";

export const getOrderItems = async (sellerId, limit, offset, sortBy) => {
    const db = await connectDB();
    return db
        .collection("orderitems")
        .find({ seller_id: sellerId })
        .sort({ [sortBy]: 1 })
        .skip(parseInt(offset))
        .limit(parseInt(limit))
        .toArray();
};

export const getOrderItemsCount = async (sellerId) => {
    const db = await connectDB();
    return db.collection("orderitems").countDocuments({ seller_id: sellerId });
};

export const deleteOrderItemById = async (id) => {
    const db = await connectDB();
    return db.collection("orderitems").deleteOne({ _id: new ObjectId(id) });
};
