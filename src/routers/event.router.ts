import { Router } from "express";
import { EventController } from "../controllers/event.controller";

export class EventRouter {
  private route: Router;
  private eventController = new EventController();

  constructor() {
    this.route = Router();
    this.eventController = new EventController();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.route.post("/", this.eventController.createEvent);
    this.route.get("/", this.eventController.getEvent);
    this.route.get("/:id", this.eventController.getEventById);
    this.route.patch("/:id", this.eventController.updateEvent);
    this.route.delete("/:id", this.eventController.deleteEvent);
  }

  public getRouter(): Router {
    return this.route;
  }
}
