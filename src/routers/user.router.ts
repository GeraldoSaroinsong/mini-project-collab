import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { loginValidation, regisValidation } from "../middleware/validator";
import { verifyToken } from "../middleware/verifyToken";

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
    this.route.post(
      "/register",
      regisValidation,
      this.userController.registerUser
    );
    this.route.post("/login", loginValidation, this.userController.loginUser);
    this.route.patch("/update/:id", this.userController.updateUser);
    this.route.delete("/delete/:id", this.userController.deleteUser);
    this.route.post(
      "/keep-login",
      verifyToken,
      this.userController.keepLoginUser
    );
    this.route.get("/user/:id", this.userController.uniqueUser);
  }

  public getRouter(): Router {
    return this.route;
  }
}
