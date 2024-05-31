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

export const getOrderItemById = async (product_id, id) => {
    const db = await connectDB();

    return db
        .collection("orderitems")
        .findOne({ product_id, order_item_id: Number(id) });
};

export const updateOrderItemById = async (product_id, id, price, date) => {
    const db = await connectDB();

    const orderItem = await db
        .collection("orderitems")
        .findOne({ product_id, order_item_id: Number(id) });

    return db.collection("orderitems").findOneAndUpdate(
        { product_id, order_item_id: Number(id) },
        {
            $set: {
                product_id: product_id || orderItem.product_id,
                price: Number(price) || orderItem.price,
                shipping_limit_date:
                    new Date(date) || orderItem.shipping_limit_date,
            },
        },
        { returnDocument: "after" }
    );
};

export const deleteOrderItemById = async (product_id, id) => {
    const db = await connectDB();
    return db
        .collection("orderitems")
        .findOneAndDelete({ product_id, order_item_id: Number(id) });
};
