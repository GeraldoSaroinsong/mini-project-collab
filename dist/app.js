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
const categoriesOnEvents_router_1 = require("./routers/categoriesOnEvents.router");
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
        // middleware for direct access
        // this.app.use("/", express.static(path.join(__dirname, "../public")));
    }
    routes() {
        this.app.get("/", (req, res) => {
            res.status(200).send("<h1>MINPRO API</h1>");
        });
        // ? definisikan router yang nanti digunkaan di app.use. contoh:
        const userRouter = new user_router_1.UserRouter();
        const eventRouter = new event_router_1.EventRouter();
        const cityRouter = new city_router_1.CityRouter();
        const cateogryRouter = new category_router_1.CategoryRouter();
        const catOnEventsRouter = new categoriesOnEvents_router_1.CategoriesOnEventsRouter();
        // ? penggunaan router yg sudah didefinisikan. contoh:
        this.app.use("/user", userRouter.getRouter());
        this.app.use("/event", eventRouter.getRouter());
        this.app.use("/city", cityRouter.getRouter());
        this.app.use("/category", cateogryRouter.getRouter());
        this.app.use("/categories-on-events", catOnEventsRouter.getRouter());
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
