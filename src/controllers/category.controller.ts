import { Request, Response, NextFunction } from "express";
import { prisma } from "../config/prisma";
import responseHandler from "../utils/response";

export class CategoryController {
  async createCategory(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const category = await prisma.category.create({
        data: req.body,
      });

      return responseHandler.succes(
        res,
        "Created category succesfully",
        201,
        category
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

  async getCategory(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const category = await prisma.category.findMany();

      responseHandler.succes(
        res,
        "Succesfully updated category",
        200,
        category
      );
    } catch (error) {
      // return responseHandler.error(res, "Failed top update category", 500, error);
      return responseHandler.error(
        res,
        "Failed to retrieve category data",
        500,
        error
      );
    }
  }

  async getCategoryById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const cateogry = await prisma.cateogry.findUniqe({
        where: {
          id: parseInt(req.params.id),
        },
      });
      return responseHandler.succes(
        res,
        "Succesfully retrieved cateogry data",
        200,
        cateogry
      );
    } catch (error) {
      return responseHandler.error(
        res,
        "Failed to retrieve cateogry data",
        500,
        error
      );
    }
  }

  async updateCategory(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const category = await prisma.category.update({
        data: req.body,
        where: {
          id: parseInt(req.params.id),
        },
      });

      responseHandler.succes(
        res,
        "Succesfully updated category",
        200,
        category
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

  async deleteCategory(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const category = await prisma.category.delete({
        where: {
          id: parseInt(req.params.id),
        },
      });

      responseHandler.succes(
        res,
        "Succesfully deleted category",
        200,
        category
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
