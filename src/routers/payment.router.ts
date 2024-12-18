import { Router } from "express";
import { PaymentController } from "../controllers/payment.controller";

// ? IMPORT CONTROLLERS(AND MIDDLEWARES). CONTOH:
// import { UserController } from "../controllers/user.controller";
// import { regisValidation } from "../middleware/validator";

export class PaymentRouter {
    private route: Router;
    // ? DEFINE PROPS HERE. CONTOH:
    private paymentController: PaymentController;

    constructor() {
        // ? INSTANTIATE ROUTER
        this.route = Router();
        // ? INSTANTIATE CONTROLLER HERE. CONTOH:
        this.paymentController = new PaymentController();

        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        // ? DEFINE ENDPOINTS HERE. CONTOH
        this.route.post("/create", this.paymentController.createPayment);
        this.route.get("/", this.paymentController.getPayment);
        this.route.get("/id/:id", this.paymentController.getPaymentById);
        this.route.get(
            "/payment-by-user/:id",
            this.paymentController.getPaymentByUser
        );
        this.route.patch("/update/:id", this.paymentController.updatePayment);
        this.route.delete("/delete/:id", this.paymentController.deletePayment);
    }

    public getRouter(): Router {
        return this.route;
    }
}
