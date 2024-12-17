import { Router } from "express";
import { CategoriesOnEventController } from "../controllers/categoriesOnEvents.controller";

export class CategoriesOnEventsRouter {
  private route: Router;
  private catOnEventsController: CategoriesOnEventController;

  constructor() {
    this.route = Router();
    this.catOnEventsController = new CategoriesOnEventController();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.route.post("/", this.catOnEventsController.createCategoriesOnEvent);
    this.route.get("/", this.catOnEventsController.getCategoriesOnEvent);
    this.route.get("/:id", this.catOnEventsController.getCategoriesOnEventById);
    this.route.patch(
      "/:id",
      this.catOnEventsController.updateCategoriesOnEvent
    );
    this.route.delete(
      "/:id",
      this.catOnEventsController.deleteCategoriesOnEvent
    );
  }

  public getRouter(): Router {
    return this.route;
  }
}
