import { Request, Response, NextFunction } from "express";
import { prisma } from "../config/prisma";
import responseHandler from "../utils/response";

export class CityController {
  async addCity(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const city = await prisma.city.create({
        data: req.body,
      });
      return responseHandler.succes(res, "Succesfully added city", 201, city);
    } catch (error) {
      return responseHandler.error(res, "Failed to add city", 500, error);
    }
  }

  async getCityById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const city = await prisma.city.findUnique({
        where: {
          id: parseInt(req.params.id),
        },
      });
      return responseHandler.succes(
        res,
        "Succesfully retrieved city data",
        200,
        city
      );
    } catch (error) {
      return responseHandler.error(
        res,
        "Failed to retrieve city data",
        500,
        error
      );
    }
  }

  async getCityByName(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const city = await prisma.city.findFirst({
        where: {
          name: req.params.name,
        },
      });
      return responseHandler.succes(
        res,
        "Succesfully retrieved city data",
        200,
        city
      );
    } catch (error) {
      return responseHandler.error(
        res,
        "Failed to retrieve city data",
        500,
        error
      );
    }
  }

  async getCityMany(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const city = await prisma.city.findMany();
      return responseHandler.succes(
        res,
        "Succesfully retrieved city data",
        200,
        city
      );
    } catch (error) {
      return responseHandler.error(
        res,
        "Failed to retrieve city data",
        500,
        error
      );
    }
  }

  async updateCity(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const city = await prisma.city.update({
        data: req.body,
        where: {
          id: parseInt(req.params.id),
        },
      });

      responseHandler.succes(res, "Succesfully updated city", 200, city);
    } catch (error) {
      return responseHandler.error(res, "Failed to update event", 500, error);
    }
  }

  async deleteCity(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const city = await prisma.city.delete({
        where: {
          id: parseInt(req.params.id),
        },
      });

      responseHandler.succes(res, "Succesfully deleted city", 200, city);
    } catch (error) {
      return responseHandler.error(
        res,
        "Failed to delete city data",
        500,
        error
      );
    }
  }
}
