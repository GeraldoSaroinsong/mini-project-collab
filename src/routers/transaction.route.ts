import { Router } from "express";
import { TransactionController } from "../controllers/transaction.controller";

// ? IMPORT CONTROLLERS(AND MIDDLEWARES). CONTOH:
// import { UserController } from "../controllers/user.controller";
// import { regisValidation } from "../middleware/validator";

export class TransactionRouter {
    private route: Router;
    // ? DEFINE PROPS HERE. CONTOH:
    private transactionController: TransactionController;

    constructor() {
        // ? INSTANTIATE ROUTER
        this.route = Router();
        // ? INSTANTIATE CONTROLLER HERE. CONTOH:
        this.transactionController = new TransactionController();

        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        // ? DEFINE ENDPOINTS HERE. CONTOH
        this.route.post(
            "/create",
            this.transactionController.createTransaction
        );
        this.route.get("/", this.transactionController.getTransaction);
        this.route.get(
            "/id/:id",
            this.transactionController.getTransactionById
        );
        this.route.get(
            "/transaction-by-user/:id",
            this.transactionController.getTransactionByUser
        );
        this.route.patch(
            "/update/:id",
            this.transactionController.updateTransaction
        );
        this.route.delete(
            "/delete/:id",
            this.transactionController.deleteTransaction
        );
    }

    public getRouter(): Router {
        return this.route;
    }
}
