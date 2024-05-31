import { Router } from "express";
import {
    listOrderItems,
    deleteOrderItem,
    getOrderItem,
    updateOrderItem,
} from "../controllers/orderItems.js";
import authenticate from "../middlewares/auth.js";

const router = Router();

router.get("/", authenticate, listOrderItems);
router.get("/:product_id/:id", authenticate, getOrderItem);
router.put("/:product_id/:id", authenticate, updateOrderItem);
router.delete("/:product_id/:id", authenticate, deleteOrderItem);

export default router;
