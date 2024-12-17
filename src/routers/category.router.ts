import { Router } from "express";
import { CategoryController } from "../controllers/category.controller";

export class CategoryRouter {
  private route: Router;
  private categoryController: CategoryController;

  constructor() {
    this.route = Router();
    this.categoryController = new CategoryController();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.route.post("/", this.categoryController.createCategory);
    this.route.get("/", this.categoryController.getCategory);
    this.route.get("/:id", this.categoryController.getCategoryById);
    this.route.patch("/:id", this.categoryController.updateCategory);
    this.route.delete("/:id", this.categoryController.deleteCategory);
  }

  public getRouter(): Router {
    return this.route;
  }
}
