"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRouter = void 0;
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const user_validator_1 = require("../middleware/validators/user.validator");
const verifyToken_1 = require("../middleware/verifyToken");
class UserRouter {
    constructor() {
        // ? INSTANTIATE ROUTER
        this.route = (0, express_1.Router)();
        // ? INSTANTIATE CONTROLLER HERE. CONTOH:
        this.userController = new user_controller_1.UserController();
        this.initializeRoutes();
    }
    initializeRoutes() {
        // ? DEFINE ENDPOINTS HERE. CONTOH
        this.route.post("/register", user_validator_1.regisValidation, this.userController.registerUser);
        this.route.post("/login", user_validator_1.loginValidation, this.userController.loginUser);
        this.route.patch("/update", verifyToken_1.verifyToken, this.userController.updateUser);
        this.route.post("/keep-login", verifyToken_1.verifyToken, this.userController.keepLoginUser);
        this.route.delete("/delete/:id", this.userController.deleteUser);
        this.route.get("/id/:id", this.userController.uniqueUser);
    }
    getRouter() {
        return this.route;
    }
}
exports.UserRouter = UserRouter;
