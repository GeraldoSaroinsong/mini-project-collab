import { Request, Response, NextFunction } from "express";
import { prisma } from "../config/prisma";
import responseHandler from "../utils/response";

export class EventController {
  async createEvent(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const event = await prisma.event.create({
        data: req.body,
      });

      return responseHandler.succes(
        res,
        "Created event succesfully",
        201,
        event
      );
    } catch (error) {
      return responseHandler.error(res, "Failed to create event", 500, error);
      // next(error);
    }
  }

  async getEvent(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const event = await prisma.event.findMany();

      responseHandler.succes(res, "Succesfully updated event", 200, event);
    } catch (error) {
      // return responseHandler.error(res, "Failed top update event", 500, error);
      return responseHandler.error(
        res,
        "Failed to retrieve event data",
        500,
        error
      );
    }
  }

  async getEventById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const event = await prisma.event.findUnique({
        where: {
          id: parseInt(req.params.id),
        },
      });
      return responseHandler.succes(
        res,
        "Succesfully retrieved event data",
        200,
        event
      );
    } catch (error) {
      return responseHandler.error(
        res,
        "Failed to retrieve event data",
        500,
        error
      );
    }
  }

  async updateEvent(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const event = await prisma.event.update({
        data: req.body,
        where: {
          id: parseInt(req.params.id),
        },
      });

      responseHandler.succes(res, "Succesfully updated event", 200, event);
    } catch (error) {
      return responseHandler.error(res, "Failed to update event", 500, error);
    }
  }

  async deleteEvent(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const event = await prisma.event.delete({
        where: {
          id: parseInt(req.params.id),
        },
      });

      responseHandler.succes(res, "Succesfully deleted event", 200, event);
    } catch (error) {
      return responseHandler.error(
        res,
        "Failed to delete event data",
        500,
        error
      );
    }
  }
}
