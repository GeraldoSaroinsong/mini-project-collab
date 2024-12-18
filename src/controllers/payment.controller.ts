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

    async getPaymentById(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<any> {
        try {
            const findPayment = await prisma.payment.findUnique({
                where: { id: parseInt(req.params.id) },
            });
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
            const findPayment = await prisma.user.findMany({
                select: {
                    transactions: {
                        select: { payment: true },
                    },
                },
                where: { id: parseInt(req.params.id) },
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

    async deletePayment(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<any> {
        try {
            const deletePayment = await prisma.payment.delete({
                where: { id: parseInt(req.params.id) },
            });
            return responseHandler.succes(
                res,
                `SUCCESSFULLY UPDATE PAYMENT`,
                200,
                deletePayment
            );
        } catch (error: any) {
            return responseHandler.error(res, error.message, 500, error);
        }
    }
}
