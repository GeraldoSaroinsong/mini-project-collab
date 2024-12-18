"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContohRouter = void 0;
const express_1 = require("express");
// ? IMPORT CONTROLLERS(AND MIDDLEWARES). CONTOH:
// import { UserController } from "../controllers/user.controller";
// import { regisValidation } from "../middleware/validator";
class ContohRouter {
    // ? DEFINE PROPS HERE. CONTOH:
    // private userController: UserController;
    constructor() {
        // ? INSTANTIATE ROUTER
        this.route = (0, express_1.Router)();
        // ? INSTANTIATE CONTROLLER HERE. CONTOH:
        // this.userController = new UserController();
        this.initializeRoutes();
    }
    initializeRoutes() {
        // ? DEFINE ENDPOINTS HERE. CONTOH
        // this.route.post("/register", this.userController.registerUser);
    }
    getRouter() {
        return this.route;
    }
}
exports.ContohRouter = ContohRouter;
