"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionRouter = void 0;
const express_1 = require("express");
const transaction_controller_1 = require("../controllers/transaction.controller");
// ? IMPORT CONTROLLERS(AND MIDDLEWARES). CONTOH:
// import { UserController } from "../controllers/user.controller";
// import { regisValidation } from "../middleware/validator";
class TransactionRouter {
    constructor() {
        // ? INSTANTIATE ROUTER
        this.route = (0, express_1.Router)();
        // ? INSTANTIATE CONTROLLER HERE. CONTOH:
        this.transactionController = new transaction_controller_1.TransactionController();
        this.initializeRoutes();
    }
    initializeRoutes() {
        // ? DEFINE ENDPOINTS HERE. CONTOH
        this.route.post("/create", this.transactionController.createTransaction);
        this.route.get("/", this.transactionController.getTransaction);
        this.route.get("/id/:id", this.transactionController.getTransactionById);
        this.route.get("/transaction-by-user/:id", this.transactionController.getTransactionByUser);
        this.route.patch("/update/:id", this.transactionController.updateTransaction);
        this.route.delete("/delete/:id", this.transactionController.deleteTransaction);
    }
    getRouter() {
        return this.route;
    }
}
exports.TransactionRouter = TransactionRouter;
