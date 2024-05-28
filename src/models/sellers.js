import connectDB from "../services/db.js";

export const getSellerByIdAndZip = async (seller_id, zip_code_prefix) => {
    const db = await connectDB();

    return db.collection("sellers").findOne({
        seller_id: String(seller_id),
        seller_zip_code_prefix: Number(zip_code_prefix),
    });
};

export const updateSellerCityAndState = async (seller_id, city, state) => {
    const db = await connectDB();
    return db
        .collection("sellers")
        .updateOne(
            { seller_id },
            { $set: { seller_city: city, seller_state: state } }
        );
};
