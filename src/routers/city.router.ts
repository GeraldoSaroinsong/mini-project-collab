import { Router } from "express";
import { CityController } from "../controllers/city.controller";

export class CityRouter {
  private route: Router;
  private cityController: CityController;

  constructor() {
    this.route = Router();
    this.cityController = new CityController();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.route.post("/city", this.cityController.addCity);
    this.route.get("/city/:id", this.cityController.getCityById);
    this.route.patch("/city/:id", this.cityController.updateCity);
    this.route.delete("/city/:id", this.cityController.deleteCity);
  }

  public getRouter(): Router {
    return this.route;
  }
}
