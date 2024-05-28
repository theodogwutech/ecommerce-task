import { ObjectId } from "mongodb";
import { describe, it, before, after } from "mocha";
import chai from "chai";
import chaiHttp from "chai-http";
import app from "../src/app.js";
import connectDB from "../src/services/db.js";

chai.use(chaiHttp);
const { expect } = chai;

describe("Order Items API", () => {
    let db;
    let seller;
    let orderItem;
    let product;
    let orderId = new ObjectId();

    before(async () => {
        db = await connectDB();
        seller = await db.collection("sellers").insertOne({
            seller_id: "oiJjoqjof839u02402ir0ncqxinj092u09u40",
            seller_zip_code_prefix: 54321,
        });

        product = await db.collection("products").insertOne({
            product_id: "1e9e8ef04dbcff4541ed2665jqofjwognowno",
            product_category_name: "perfumaria",
        });

        orderItem = await db.collection("orderitems").insertOne({
            order_item_id: "ojojwovownvowngjnvn0jw020p",
            product_id: "1e9e8ef04dbcff4541ed2665jqofjwognowno",
            seller_id: "oiJjoqjof839u02402ir0ncqxinj092u09u40",
            price: 100,
            shipping_limit_date: new Date(),
        });
    });

    after(async () => {
        await db
            .collection("sellers")
            .deleteOne({ seller_id: "oiJjoqjof839u02402ir0ncqxinj092u09u40" });
        await db
            .collection("products")
            .deleteOne({ product_id: "1e9e8ef04dbcff4541ed2665jqofjwognowno" });
        await db
            .collection("orderitems")
            .deleteOne({ order_item_id: "ojojwovownvowngjnvn0jw020p" });
    });

    it("should list order items", (done) => {
        chai.request(app)
            .get("/orderitems")
            .auth("oiJjoqjof839u02402ir0ncqxinj092u09u40", 54321)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body.data).to.be.an("array");
                expect(res.body.data[0]).to.include({
                    id: "ojojwovownvowngjnvn0jw020p",
                    product_id: "1e9e8ef04dbcff4541ed2665jqofjwognowno",
                    product_category: "perfumaria",
                    price: 100,
                });
                done();
            });
    });

    it("should delete an order item", (done) => {
        chai.request(app)
            .delete(`/orderitems/${orderId}`)
            .auth("oiJjoqjof839u02402ir0ncqxinj092u09u40", 54321)
            .end((err, res) => {
                expect(res).to.have.status(204);
                done();
            });
    });
});
