"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentRouter = void 0;
const express_1 = require("express");
const payment_controller_1 = require("../controllers/payment.controller");
// ? IMPORT CONTROLLERS(AND MIDDLEWARES). CONTOH:
// import { UserController } from "../controllers/user.controller";
// import { regisValidation } from "../middleware/validator";
class PaymentRouter {
    constructor() {
        // ? INSTANTIATE ROUTER
        this.route = (0, express_1.Router)();
        // ? INSTANTIATE CONTROLLER HERE. CONTOH:
        this.paymentController = new payment_controller_1.PaymentController();
        this.initializeRoutes();
    }
    initializeRoutes() {
        // ? DEFINE ENDPOINTS HERE. CONTOH
        this.route.post("/create", this.paymentController.createPayment);
        this.route.get("/", this.paymentController.getPayment);
        this.route.get("/id/:id", this.paymentController.getPaymentById);
        this.route.get("/payment-by-user/:id", this.paymentController.getPaymentByUser);
        this.route.patch("/update/:id", this.paymentController.updatePayment);
        this.route.delete("/delete/:id", this.paymentController.deletePayment);
    }
    getRouter() {
        return this.route;
    }
}
exports.PaymentRouter = PaymentRouter;
