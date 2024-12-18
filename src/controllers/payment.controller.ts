import { NextFunction, Request, Response } from "express";
import { prisma } from "../config/prisma";
import responseHandler from "../utils/response";

export class PaymentController {
    async createPayment(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<any> {
        try {
            const newPayment = await prisma.payment.create(req.body);
            return responseHandler.succes(
                res,
                `SUCCESSFULLY CREATED NEW PAYMENT`,
                200,
                newPayment
            );
        } catch (error: any) {
            return responseHandler.error(res, error.message, 500, error);
        }
    }
    async getPayment(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<any> {
        try {
            const findPayment = await prisma.payment.findMany();
            return responseHandler.succes(
                res,
                `SUCCESSFULLY GET PAYMENT`,
                200,
                findPayment
            );
        } catch (error: any) {
            return responseHandler.error(res, error.message, 500, error);
        }
    }
    async getPaymentByUser(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<any> {
        try {
            const findPayment = await prisma.payment.findMany({
                where: req.body,
            });
            return responseHandler.succes(
                res,
                `SUCCESSFULLY GET USER PAYMENT`,
                200,
                findPayment
            );
        } catch (error: any) {
            return responseHandler.error(res, error.message, 500, error);
        }
    }
    async updatePayment(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<any> {
        try {
            const updatePayment = await prisma.payment.update({
                where: { id: parseInt(req.params.id) },
                data: req.body,
            });
            return responseHandler.succes(
                res,
                `SUCCESSFULLY UPDATE PAYMENT`,
                200,
                updatePayment
            );
        } catch (error: any) {
            return responseHandler.error(res, error.message, 500, error);
        }
    }
}
