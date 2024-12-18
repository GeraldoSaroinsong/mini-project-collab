"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CityRouter = void 0;
const express_1 = require("express");
const city_controller_1 = require("../controllers/city.controller");
class CityRouter {
    constructor() {
        this.route = (0, express_1.Router)();
        this.cityController = new city_controller_1.CityController();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.route.post("/", this.cityController.addCity);
        this.route.get("/:id", this.cityController.getCityById);
        this.route.patch("/:id", this.cityController.updateCity);
        this.route.delete("/:id", this.cityController.deleteCity);
    }
    getRouter() {
        return this.route;
    }
}
exports.CityRouter = CityRouter;
