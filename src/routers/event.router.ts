import { Router } from "express";
import { EventController } from "../controllers/event.controller";
import { verifyTokenOrganizer } from "../middleware/verifyToken";

export class EventRouter {
    private route: Router;
    private eventController = new EventController();

    constructor() {
        this.route = Router();
        this.eventController = new EventController();
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.route.post(
            "/create",
            verifyTokenOrganizer,
            this.eventController.createEvent
        );
        this.route.patch(
            "/update/:id",
            verifyTokenOrganizer,
            this.eventController.updateEvent
        );
        this.route.get("/", this.eventController.getEvent);
        this.route.get("/detail/:title", this.eventController.getEventById);
        this.route.delete("/delete/:title", this.eventController.deleteEvent);
    }

    public getRouter(): Router {
        return this.route;
    }
}
