import {
    getOrderItems,
    deleteOrderItemById,
    getOrderItemsCount,
    getOrderItemById,
    updateOrderItemById,
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

export const getOrderItem = async (req, res) => {
    const { product_id, id } = req.params;

    const orderItem = await getOrderItemById(product_id, id);

    if (!orderItem) {
        return res.status(404).json({
            message: "Order item not found",
        });
    }

    const product = await getProductById(product_id);

    return res.status(200).json({
        id: orderItem.order_item_id,
        product_id: orderItem.product_id,
        product_category: product.product_category_name,
        price: orderItem.price,
        date: orderItem.shipping_limit_date,
    });
};

export const updateOrderItem = async (req, res) => {
    try {
        const { product_id, id } = req.params;
        const { price, date } = req.body;

        const orderItem = await updateOrderItemById(
            product_id,
            id,
            price,
            date
        );

        if (orderItem) {
            return res.status(201).json({
                message: "Order item updated successfully",
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};

export const deleteOrderItem = async (req, res) => {
    try {
        const { product_id, id } = req.params;
        const deleted = await deleteOrderItemById(product_id, id);

        if (deleted) {
            res.status(200).json({
                message: "Order item deleted successfully",
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};
