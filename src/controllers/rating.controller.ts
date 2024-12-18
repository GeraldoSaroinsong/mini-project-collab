import { NextFunction, Request, Response } from "express";
import responseHandler from "../utils/response";
import { prisma } from "../config/prisma";

export class RatingController {
    async createRating(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<any> {
        try {
            const newRating = await prisma.rating.create(req.body);

            return responseHandler.succes(
                res,
                `SUCCESSFULLY CREATED NEW RATING`,
                200,
                newRating
            );
        } catch (error: any) {
            return responseHandler.error(res, error.message, 500, error);
        }
    }

    async getRating(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<any> {
        try {
            const findRating = await prisma.rating.findMany();

            return responseHandler.succes(
                res,
                `SUCCESSFULLY GET RATINGS`,
                200,
                findRating
            );
        } catch (error: any) {
            return responseHandler.error(res, error.message, 500, error);
        }
    }

    async getRatingByEvent(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<any> {
        try {
            const id_event = req.params.id;
            const eventRatings = await prisma.event.findUnique({
                where: { id: parseInt(req.params.id) },
                select: { transactions: { select: { rating: true } } },
            });

            return responseHandler.succes(
                res,
                `SUCCESSFULLY GET EVENT RATINGS`,
                200,
                eventRatings
            );
        } catch (error: any) {
            return responseHandler.error(res, error.message, 500, error);
        }
    }

    async updateRating(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<any> {
        try {
            const id = parseInt(req.params.id);
            const updatedRating = await prisma.rating.update({
                where: { id },
                data: req.body,
            });

            return responseHandler.succes(
                res,
                `SUCCESSFULLY UPDATED RATING`,
                200,
                updatedRating
            );
        } catch (error: any) {
            return responseHandler.error(res, error.message, 500, error);
        }
    }

    async deleteRating(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<any> {
        try {
            const deletedRating = await prisma.rating.delete({
                where: { id: parseInt(req.params.id) },
            });

            return responseHandler.succes(
                res,
                `RATING SUCCESSFULLY DELETED`,
                200,
                deletedRating
            );
        } catch (error: any) {
            return responseHandler.error(res, error.message, 500, error);
        }
    }

}
