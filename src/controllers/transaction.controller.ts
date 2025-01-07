import { NextFunction, Request, Response } from "express";
import { prisma } from "../config/prisma";
import responseHandler from "../utils/response";
import Midtrans, { MidtransClient } from "midtrans-node-client";
import { tokenMidtransGenerator } from "../utils/tokenMidtransGenerator";

export class TransactionController {
  async createTransaction(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const input = req.body.data;
      const total = input.subtotal * input.quantity;
      console.log("INPUT", input);

      const newTransaction = await prisma.transaction.create({
        data: {
          ...input,
          total,
        },
      });

      console.log("NEW TRANSACTION DATA", newTransaction);

      let snap = new MidtransClient.Snap({
        isProduction: false,
        serverKey: process.env.SECRET,
        clientKey: process.env.NEXT_PUBLIC_API,
      });

      let parameter = {
        item_details: {
          id: newTransaction.id_event,
          price: newTransaction.subtotal,
          quantity: newTransaction.quantity,
        },
        order_details: {
          order_id: newTransaction.id,
          gross_amount: newTransaction.total,
        },
      };

      console.log("PARAMETER", parameter);

      const tokenMidtrans = tokenMidtransGenerator(parameter);

      return responseHandler.succes(
        res,
        `SUCCESSFULLY CREATED NEW TRANSACTION`,
        200,
        { newTransaction, tokenMidtrans }
      );
    } catch (error: any) {
      return responseHandler.error(res, error.message, 500, error);
    }
  }

  async getTransaction(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const findTransaction = await prisma.transaction.findMany();
      return responseHandler.succes(
        res,
        `SUCCESSFULLY GET TRANSACTION`,
        200,
        findTransaction
      );
    } catch (error: any) {
      return responseHandler.error(res, error.message, 500, error);
    }
  }

  async getTransactionById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const findTransaction = await prisma.transaction.findUnique({
        where: { id: parseInt(req.params.id) },
      });
      return responseHandler.succes(
        res,
        `SUCCESSFULLY GET TRANSACTION`,
        200,
        findTransaction
      );
    } catch (error: any) {
      return responseHandler.error(res, error.message, 500, error);
    }
  }

  async getTransactionByUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const findTransaction = await prisma.user.findMany({
        select: {
          transactions: true,
        },
        where: { id: parseInt(req.params.id) },
      });
      return responseHandler.succes(
        res,
        `SUCCESSFULLY GET USER TRANSACTION`,
        200,
        findTransaction
      );
    } catch (error: any) {
      return responseHandler.error(res, error.message, 500, error);
    }
  }

  async updateTransaction(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const updateTransaction = await prisma.transaction.update({
        where: { id: parseInt(req.params.id) },
        data: req.body,
      });
      return responseHandler.succes(
        res,
        `SUCCESSFULLY UPDATE TRANSACTION`,
        200,
        updateTransaction
      );
    } catch (error: any) {
      return responseHandler.error(res, error.message, 500, error);
    }
  }

  async deleteTransaction(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const deleteTransaction = await prisma.transaction.delete({
        where: { id: parseInt(req.params.id) },
      });
      return responseHandler.succes(
        res,
        `SUCCESSFULLY UPDATE TRANSACTION`,
        200,
        deleteTransaction
      );
    } catch (error: any) {
      return responseHandler.error(res, error.message, 500, error);
    }
  }
}
