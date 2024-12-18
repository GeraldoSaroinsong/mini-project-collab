"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriesOnEventsRouter = void 0;
const express_1 = require("express");
const categoriesOnEvents_controller_1 = require("../controllers/categoriesOnEvents.controller");
class CategoriesOnEventsRouter {
    constructor() {
        this.route = (0, express_1.Router)();
        this.catOnEventsController = new categoriesOnEvents_controller_1.CategoriesOnEventController();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.route.post("/", this.catOnEventsController.createCategoriesOnEvent);
        this.route.get("/", this.catOnEventsController.getCategoriesOnEvent);
        // this.route.get("/:id", this.catOnEventsController.getCategoriesOnEventById);
        // this.route.patch(
        //   "/:id",
        //   this.catOnEventsController.updateCategoriesOnEvent
        // );
        // this.route.delete(
        //   "/:id",
        //   this.catOnEventsController.deleteCategoriesOnEvent
        // );
    }
    getRouter() {
        return this.route;
    }
}
exports.CategoriesOnEventsRouter = CategoriesOnEventsRouter;
