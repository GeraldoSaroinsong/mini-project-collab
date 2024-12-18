"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventRouter = void 0;
const express_1 = require("express");
const event_controller_1 = require("../controllers/event.controller");
class EventRouter {
    constructor() {
        this.eventController = new event_controller_1.EventController();
        this.route = (0, express_1.Router)();
        this.eventController = new event_controller_1.EventController();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.route.post("/", this.eventController.createEvent);
        this.route.get("/", this.eventController.getEvent);
        this.route.get("/:id", this.eventController.getEventById);
        this.route.patch("/:id", this.eventController.updateEvent);
        this.route.delete("/:id", this.eventController.deleteEvent);
    }
    getRouter() {
        return this.route;
    }
}
exports.EventRouter = EventRouter;
