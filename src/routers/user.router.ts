import { Router } from "express";
import { UserController } from "../controllers/user.controller";

// ? IMPORT CONTROLLERS(AND MIDDLEWARES). CONTOH:
// import { UserController } from "../controllers/user.controller";
// import { regisValidation } from "../middleware/validator";

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
        this.route.post("/register", this.userController.registerUser);
        this.route.post("/login", this.userController.loginUser);
        this.route.patch("/update/:id", this.userController.updateUser);
        this.route.delete("/delete/:id", this.userController.daleteUser);
        this.route.post("/keep-login", this.userController.keepLoginUser);
        this.route.get("/user/:id", this.userController.registerUser);
    }

    public getRouter(): Router {
        return this.route;
    }
}
