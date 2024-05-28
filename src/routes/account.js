import { Router } from "express";
import { updateAccount } from "../controllers/account.js";
import authenticate from "../middlewares/auth.js";

const router = Router();

router.put("/", authenticate, updateAccount);

export default router;
