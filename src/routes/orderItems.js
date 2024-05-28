import { Router } from "express";
import { listOrderItems, deleteOrderItem } from "../controllers/orderItems.js";
import authenticate from "../middlewares/auth.js";

const router = Router();

router.get("/", authenticate, listOrderItems);
router.delete("/:id", authenticate, deleteOrderItem);

export default router;
