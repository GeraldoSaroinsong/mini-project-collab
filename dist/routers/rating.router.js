"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RatingRouter = void 0;
const express_1 = require("express");
const rating_controller_1 = require("../controllers/rating.controller");
const verifyToken_1 = require("../middleware/verifyToken");
class RatingRouter {
    constructor() {
        this.route = (0, express_1.Router)();
        this.ratingController = new rating_controller_1.RatingController();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.route.post("/create", verifyToken_1.verifyTokenUser, this.ratingController.createRating);
        this.route.get("/get", this.ratingController.getRating);
        this.route.get("/rating-by-event", this.ratingController.getRatingByEvent);
        this.route.patch("/update/:id", verifyToken_1.verifyTokenUser, this.ratingController.updateRating);
        this.route.delete("/delete/:id", this.ratingController.deleteRating);
    }
    getRouter() {
        return this.route;
    }
}
exports.RatingRouter = RatingRouter;
