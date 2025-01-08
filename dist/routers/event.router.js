"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventRouter = void 0;
const express_1 = require("express");
const event_controller_1 = require("../controllers/event.controller");
const verifyToken_1 = require("../middleware/verifyToken");
class EventRouter {
    constructor() {
        this.eventController = new event_controller_1.EventController();
        this.route = (0, express_1.Router)();
        this.eventController = new event_controller_1.EventController();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.route.post("/create", verifyToken_1.verifyTokenOrganizer, this.eventController.createEvent);
        this.route.patch("/update/:id", verifyToken_1.verifyTokenOrganizer, this.eventController.updateEvent);
        this.route.get("/", this.eventController.getEvent);
        this.route.get("/all", this.eventController.getEventMany);
        this.route.get("/detail/:title", this.eventController.getEventByTitle);
        this.route.delete("/delete/:title", this.eventController.deleteEvent);
    }
    getRouter() {
        return this.route;
    }
}
exports.EventRouter = EventRouter;
