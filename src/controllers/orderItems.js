import {
    getOrderItems,
    deleteOrderItemById,
    getOrderItemsCount,
} from "../models/orderItems.js";
import { getProductById } from "../models/products.js";

export const listOrderItems = async (req, res) => {
    const {
        limit = 20,
        offset = 0,
        sortBy = "shipping_limit_date",
    } = req.query;
    const sellerId = req.seller.seller_id;

    const orderItems = await getOrderItems(sellerId, limit, offset, sortBy);
    const total = await getOrderItemsCount(sellerId);

    const data = await Promise.all(
        orderItems.map(async (item) => {
            const product = await getProductById(item.product_id);
            return {
                id: item.order_item_id,
                product_id: item.product_id,
                product_category: product.product_category_name,
                price: item.price,
                date: item.shipping_limit_date,
            };
        })
    );

    return res.status(200).json({
        data,
        total,
        limit: parseInt(limit),
        offset: parseInt(offset),
    });
};

export const deleteOrderItem = async (req, res) => {
    const { id } = req.params;
    await deleteOrderItemById(id);
    res.status(204).send();
};
