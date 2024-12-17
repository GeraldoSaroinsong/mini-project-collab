import { Router } from "express";
import { EventController } from "../controllers/event.controller";

export class EventRouter {
  private route: Router;
  private eventController = new EventController();

  constructor() {
    this.route = Router();
    this.eventController = new EventController();
  }

  private initializeRoutes(): void {
    this.route.post("/event", this.eventController.createEvent);
    this.route.get("/event", this.eventController.getEvent);
    this.route.get("/event/:id", this.eventController.getEventById);
    this.route.patch("/event/:id", this.eventController.updateEvent);
    this.route.delete("/event/:id", this.eventController.deleteEvent);
  }

  public getRouter(): Router {
    return this.route;
  }
}
