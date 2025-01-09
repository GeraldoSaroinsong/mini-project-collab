import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import {
    loginValidation,
    regisValidation,
} from "../middleware/validators/user.validator";
import { verifyToken } from "../middleware/verifyToken";

export class UserRouter {
    private route: Router;
    // ? DEFINE PROPS HERE. CONTOH:
    private userController: UserController;

    constructor() {
        // ? INSTANTIATE ROUTER
        this.route = Router();
        // ? INSTANTIATE CONTROLLER HERE. CONTOH:
        this.userController = new UserController();

        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        // ? DEFINE ENDPOINTS HERE. CONTOH
        this.route.post(
            "/register",
            regisValidation,
            this.userController.registerUser
        );
        this.route.post(
            "/login",
            loginValidation,
            this.userController.loginUser
        );
        this.route.patch(
            "/update",
            verifyToken,
            this.userController.updateUser
        );
        this.route.post(
            "/keep-login",
            verifyToken,
            this.userController.keepLoginUser
        );
        this.route.delete("/delete/:id", this.userController.deleteUser);
        this.route.get("/id/:id", this.userController.uniqueUser);
        this.route.get("/refcode", this.userController.refCode);
        this.route.get("/duit/:id", this.userController.duit);
    }

    public getRouter(): Router {
        return this.route;
    }
}
