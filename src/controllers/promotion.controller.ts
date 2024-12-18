import { NextFunction, Request, Response } from "express";
import responseHandler from "../utils/response";
import { prisma } from "../config/prisma";

export class PromotionController {
    async createPromotion(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<any> {
        try {
            const newPromotion = await prisma.promotion.create(req.body);

            return responseHandler.succes(
                res,
                `SUCCESSFULLY CREATED NEW PROMOTION`,
                200,
                newPromotion
            );
        } catch (error: any) {
            return responseHandler.error(res, error.message, 500, error);
        }
    }

    async getPromotion(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<any> {
        try {
            const findPromotion = await prisma.promotion.findMany();

            return responseHandler.succes(
                res,
                `SUCCESSFULLY GET PROMOTIONS`,
                200,
                findPromotion
            );
        } catch (error: any) {
            return responseHandler.error(res, error.message, 500, error);
        }
    }

    async getPromotionByEvent(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<any> {
        try {
            const { id_event } = req.body;
            const eventPromotion = await prisma.promotion.findMany({
                where: { id_event },
            });

            return responseHandler.succes(
                res,
                `SUCCESSFULLY GET PROMOTIONS`,
                200,
                eventPromotion
            );
        } catch (error: any) {
            return responseHandler.error(res, error.message, 500, error);
        }
    }

    async updatePromotion(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<any> {
        try {
            const id = parseInt(req.params.id);
            const updatedPromotion = await prisma.promotion.update({
                where: { id },
                data: req.body,
            });

            return responseHandler.succes(
                res,
                `SUCCESSFULLY CREATED NEW PROMOTION`,
                200,
                updatedPromotion
            );
        } catch (error: any) {
            return responseHandler.error(res, error.message, 500, error);
        }
    }

    async deletePromotion(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<any> {
        try {
            const newPromotion = await prisma.promotion.delete({
                where: { id: parseInt(req.params.id) },
            });

            return responseHandler.succes(
                res,
                `PROMOTION SUCCESSFULLY DELETED`,
                200,
                newPromotion
            );
        } catch (error: any) {
            return responseHandler.error(res, error.message, 500, error);
        }
    }

    async togglePromotion(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<any> {
        try {
            const id = parseInt(req.params.id);
            const findPromotion = await prisma.promotion.findUnique({
                where: { id },
            });
            const updatedPromotion = await prisma.promotion.update({
                where: { id },
                data: { status: !findPromotion?.status },
            });

            return responseHandler.succes(
                res,
                `SUCCESSFULLY CREATED NEW PROMOTION`,
                200,
                updatedPromotion
            );
        } catch (error: any) {
            return responseHandler.error(res, error.message, 500, error);
        }
    }
}
