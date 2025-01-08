"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PromotionRouter = void 0;
const express_1 = require("express");
const promotion_controller_1 = require("../controllers/promotion.controller");
const verifyToken_1 = require("../middleware/verifyToken");
// ? IMPORT CONTROLLERS(AND MIDDLEWARES). CONTOH:
// import { UserController } from "../controllers/user.controller";
// import { regisValidation } from "../middleware/validator";
class PromotionRouter {
    constructor() {
        // ? INSTANTIATE ROUTER
        this.route = (0, express_1.Router)();
        // ? INSTANTIATE CONTROLLER HERE. CONTOH:
        this.promotionController = new promotion_controller_1.PromotionController();
        this.initializeRoutes();
    }
    initializeRoutes() {
        // ? DEFINE ENDPOINTS HERE. CONTOH
        this.route.post("/create", verifyToken_1.verifyTokenOrganizer, this.promotionController.createPromotion);
        this.route.get("/", this.promotionController.getPromotion);
        this.route.get("/get-event-promotion/:id", this.promotionController.getPromotionByEvent);
        this.route.patch("/update/:id", verifyToken_1.verifyTokenOrganizer, this.promotionController.updatePromotion);
        this.route.delete("/delete/:id", this.promotionController.deletePromotion);
        // this.route.patch(
        //     "/toggle/:id",
        //     this.promotionController.togglePromotion
        // );
    }
    getRouter() {
        return this.route;
    }
}
exports.PromotionRouter = PromotionRouter;
