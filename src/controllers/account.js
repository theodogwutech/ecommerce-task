import { updateSellerCityAndState } from "../models/sellers.js";

export const updateAccount = async (req, res) => {
    const { city, state } = req.body;
    const sellerId = req.seller.seller_id;

    await updateSellerCityAndState(sellerId, city, state);
    res.status(201).json({
        success: true,
        code: 201,
        message: "Account updated successfully",
        data: { city, state },
    });
};
