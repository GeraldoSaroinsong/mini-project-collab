import { Router } from "express";
import { PromotionController } from "../controllers/promotion.controller";
import { verifyTokenOrganizer } from "../middleware/verifyToken";

// ? IMPORT CONTROLLERS(AND MIDDLEWARES). CONTOH:
// import { UserController } from "../controllers/user.controller";
// import { regisValidation } from "../middleware/validator";

export class PromotionRouter {
    private route: Router;
    // ? DEFINE PROPS HERE. CONTOH:
    private promotionController: PromotionController;

    constructor() {
        // ? INSTANTIATE ROUTER
        this.route = Router();
        // ? INSTANTIATE CONTROLLER HERE. CONTOH:
        this.promotionController = new PromotionController();

        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        // ? DEFINE ENDPOINTS HERE. CONTOH
        this.route.post(
            "/create",
            verifyTokenOrganizer,
            this.promotionController.createPromotion
        );
        this.route.get("/", this.promotionController.getPromotion);
        this.route.get(
            "/get-event-promotion/:id",
            this.promotionController.getPromotionByEvent
        );
        this.route.patch(
            "/update/:id",
            verifyTokenOrganizer,
            this.promotionController.updatePromotion
        );
        this.route.delete(
            "/delete/:id",
            this.promotionController.deletePromotion
        );
        // this.route.patch(
        //     "/toggle/:id",
        //     this.promotionController.togglePromotion
        // );
    }

    public getRouter(): Router {
        return this.route;
    }
}
