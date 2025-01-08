"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const response_1 = __importDefault(require("./utils/response"));
const user_router_1 = require("./routers/user.router");
const event_router_1 = require("./routers/event.router");
const city_router_1 = require("./routers/city.router");
const category_router_1 = require("./routers/category.router");
// import { CategoriesOnEventsRouter } from "./routers/categoriesOnEvents.router";
const promotion_router_1 = require("./routers/promotion.router");
const rating_router_1 = require("./routers/rating.router");
const payment_router_1 = require("./routers/payment.router");
const transaction_route_1 = require("./routers/transaction.route");
// ? Import Routers di bawah. contoh
// import {UserRouter} from "./routers/userRouter"
// dst
const PORT = process.env.PORT || 8082;
class App {
    constructor() {
        this.app = (0, express_1.default)();
        this.configure();
        this.routes();
        this.errorHandler();
    }
    configure() {
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.json());
    }
    routes() {
        this.app.get("/", (req, res) => {
            res.status(200).send("<h1>MINPRO API</h1>");
        });
        // ? definisikan router yang nanti digunkaan di app.use. contoh:
        const userRouter = new user_router_1.UserRouter();
        // const catOnEvRouter = new CategoriesOnEventsRouter();
        const categoryRouter = new category_router_1.CategoryRouter();
        const cityRouter = new city_router_1.CityRouter();
        const eventRouter = new event_router_1.EventRouter();
        const paymentRouter = new payment_router_1.PaymentRouter();
        const promotionRouter = new promotion_router_1.PromotionRouter();
        const ratingRouter = new rating_router_1.RatingRouter();
        const transactionRouter = new transaction_route_1.TransactionRouter();
        // ? penggunaan router yg sudah didefinisikan. contoh:
        this.app.use("/user", userRouter.getRouter());
        // this.app.use("/category-on-event", catOnEvRouter.getRouter());
        this.app.use("/category", categoryRouter.getRouter());
        this.app.use("/city", cityRouter.getRouter());
        this.app.use("/event", eventRouter.getRouter());
        this.app.use("/payment", paymentRouter.getRouter());
        this.app.use("/promotion", promotionRouter.getRouter());
        this.app.use("/rating", ratingRouter.getRouter());
        this.app.use("/transaction", transactionRouter.getRouter());
    }
    errorHandler() {
        this.app.use((error, req, res, next) => {
            response_1.default.error(res, error.message, error.rc, error.error);
        });
    }
    start() {
        this.app.listen(PORT, () => {
            console.log("MINPRO API RUNNING ", PORT);
        });
    }
}
exports.default = new App();
