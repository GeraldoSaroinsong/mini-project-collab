import { Request, Response, NextFunction } from "express";
import { prisma } from "../config/prisma";
import responseHandler from "../utils/response";

export class CategoriesOnEventController {
  async createCategoriesOnEvent(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const categoriesOnEvents = await prisma.CategoriesOnEvents.create({
        data: req.body,
      });

      return responseHandler.succes(
        res,
        "Created category succesfully",
        201,
        categoriesOnEvents
      );
    } catch (error) {
      return responseHandler.error(
        res,
        "Failed to create category",
        500,
        error
      );
      // next(error);
    }
  }

  async getCategoriesOnEvent(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const categoriesOnEvents = await prisma.CategoriesOnEvents.findMany();

      responseHandler.succes(
        res,
        "Succesfully updated category",
        200,
        categoriesOnEvents
      );
    } catch (error) {
      // return responseHandler.error(res, "Failed top update event", 500, error);
      return responseHandler.error(
        res,
        "Failed to retrieve category data",
        500,
        error
      );
    }
  }

  async getCategoriesOnEventById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const categoriesOnEvent = await prisma.CategoriesOnEvents.findUniqe({
        where: {
          id: parseInt(req.params.id),
        },
      });
      return responseHandler.succes(
        res,
        "Succesfully retrieved category data",
        200,
        categoriesOnEvent
      );
    } catch (error) {
      return responseHandler.error(
        res,
        "Failed to retrieve category data",
        500,
        error
      );
    }
  }

  async updateCategoriesOnEvent(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const categoriesOnEvent = await prisma.CategoriesOnEvents.update({
        data: req.body,
        where: {
          id: parseInt(req.params.id),
        },
      });

      responseHandler.succes(
        res,
        "Succesfully updated category",
        200,
        categoriesOnEvent
      );
    } catch (error) {
      return responseHandler.error(
        res,
        "Failed to update category",
        500,
        error
      );
    }
  }

  async deleteCategoriesOnEvent(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const categoriesOnEvent = await prisma.categoriesOnEvents.delete({
        where: {
          id: parseInt(req.params.id),
        },
      });

      responseHandler.succes(
        res,
        "Succesfully deleted category",
        200,
        categoriesOnEvent
      );
    } catch (error) {
      return responseHandler.error(
        res,
        "Failed to delete category data",
        500,
        error
      );
    }
  }
}
