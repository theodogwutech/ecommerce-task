import { describe, it, before, after } from "mocha";
import chai from "chai";
import chaiHttp from "chai-http";
import app from "../src/app.js";
import connectDB from "../src/services/db.js";

chai.use(chaiHttp);
const expect = chai.expect;

describe("Account API", () => {
    let db;
    let seller;

    before(async () => {
        db = await connectDB();
        seller = await db.collection("sellers").insertOne({
            seller_id: "dd7ddc04e1b6c2c614352b383efe2wer",
            seller_zip_code_prefix: 12345,
            seller_city: "Yaba",
            seller_state: "Lagos",
        });
    });

    after(async () => {
        await db
            .collection("sellers")
            .deleteOne({ seller_id: "dd7ddc04e1b6c2c614352b383efe2wer" });
    });

    it("should update seller city and state", async () => {
        return chai
            .request(app)
            .put("/account")
            .auth("dd7ddc04e1b6c2c614352b383efe2wer", 12345)
            .send({ city: "Ibadan", state: "Oyo" })
            .then((res) => {
                expect(res).to.have.status(201);
                expect(res.body.data).to.include({
                    city: "Ibadan",
                    state: "Oyo",
                });
            })
            .catch((err) => {
                throw err;
            });
    });
});
