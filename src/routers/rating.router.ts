import { Router } from "express";
import { RatingController } from "../controllers/rating.controller";
import { verifyTokenUser } from "../middleware/verifyToken";

export class RatingRouter {
    private route: Router;
    private ratingController: RatingController;

    constructor() {
        this.route = Router();
        this.ratingController = new RatingController();

        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.route.post(
            "/create",
            verifyTokenUser,
            this.ratingController.createRating
        );
        this.route.get("/get", this.ratingController.getRating);
        this.route.get(
            "/rating-by-event",
            this.ratingController.getRatingByEvent
        );
        this.route.patch(
            "/update/:id",
            verifyTokenUser,
            this.ratingController.updateRating
        );
        this.route.delete("/delete/:id", this.ratingController.deleteRating);
    }

    public getRouter() {
        return this.route;
    }
}
