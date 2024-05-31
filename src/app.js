import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import orderItemsRoutes from "./routes/orderItems.js";
import accountRoutes from "./routes/account.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(cors({ origin: "*" }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/orderitems", orderItemsRoutes);
app.use("/account", accountRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

export default app;
