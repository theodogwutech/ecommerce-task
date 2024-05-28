import auth from "basic-auth";
import { getSellerByIdAndZip } from "../models/sellers.js";

const authenticate = async (req, res, next) => {
    const credentials = auth(req);
    if (!credentials) {
        return res.status(401).json({
            success: false,
            code: 401,
            message: "Authentication required",
        });
    }

    const seller = await getSellerByIdAndZip(
        credentials.name,
        credentials.pass
    );

    if (!seller) {
        return res.status(401).json({
            success: false,
            code: 401,
            message: "Invalid credentials",
        });
    }

    req.seller = seller;
    next();
};

export default authenticate;
