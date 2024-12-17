import { Router } from "express";

// ? IMPORT CONTROLLERS(AND MIDDLEWARES). CONTOH:
// import { UserController } from "../controllers/user.controller";
// import { regisValidation } from "../middleware/validator";

export class ContohRouter {
    private route: Router;
    // ? DEFINE PROPS HERE. CONTOH:
    // private userController: UserController;

    constructor() {
        // ? INSTANTIATE ROUTER
        this.route = Router();
        // ? INSTANTIATE CONTROLLER HERE. CONTOH:
        // this.userController = new UserController();

        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        // ? DEFINE ENDPOINTS HERE. CONTOH
        // this.route.post("/register", this.userController.registerUser);
    }

    public getRouter(): Router {
        return this.route;
    }
}
