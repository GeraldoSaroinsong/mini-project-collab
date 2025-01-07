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
      const id_organizer = parseInt(res.locals.decrypt.id);

      const event = await prisma.event.create({
        data: { ...req.body, id_organizer },
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
      const {
        city,
        title,
        isPaidEvent,
        category,
        sortBy,
        order = "asc",
        limit,
        skip,
      } = req.query;

      const filters: any = {};
      if (city) {
        filters.city = {
          name: {
            contains: city as string,
          },
        };
      }
      if (title) {
        filters.title = { contains: title as string };
      }
      if (category) {
        filters.category = {
          name: {
            contains: category as string,
          },
        };
      }
      if (isPaidEvent !== undefined) {
        filters.isPaidEvent = isPaidEvent === "true";
      }

      const sorting: any = {};
      if (sortBy) {
        sorting[sortBy as string] = order;
      }

      const event = await prisma.event.findMany({
        where: filters,
        include: {
          city: true,
          category: true,
        },
      });
      console.log(event);

      responseHandler.succes(res, "Succesfully retrived event", 200, event);
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

  async getEventMany(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const event = await prisma.event.findMany();
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

  async getEventByTitle(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const event = await prisma.event.findUnique({
        where: {
          title: req.params.title,
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
