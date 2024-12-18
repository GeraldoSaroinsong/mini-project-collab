import { Router } from "express";
import { RatingController } from "../controllers/rating.controller";

export class RatingRouter {
    private route: Router;
    private ratingController: RatingController;

    constructor() {
        this.route = Router();
        this.ratingController = new RatingController();

        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.route.post("/create", this.ratingController.createRating);
        this.route.get("/get", this.ratingController.getRating);
        this.route.get(
            "/rating-by-event",
            this.ratingController.getRatingByEvent
        );
        this.route.patch("/update/:id", this.ratingController.updateRating);
        this.route.delete("/delete/:id", this.ratingController.deleteRating);
    }

    public getRouter() {
        return this.route;
    }
}
