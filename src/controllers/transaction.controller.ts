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
        serverKey: "SB-Mid-server-sQDfXDlqNKvrE8E7pAsJU8hi",
        clientKey: "SB-Mid-client-JuIn72sBaReyPMcG",
      });

      let parameter = {
        transaction_details: {
          order_id: newTransaction.id.toString(),
          gross_amount: newTransaction.total,
        },
        // item_details: {
        //   id: newTransaction.id_event,
        //   price: newTransaction.subtotal,
        //   quantity: newTransaction.quantity,
        // },
        // credit_card: {
        //   secure: true,
        // },
      };

      let parameterBener = {
        transaction_details: {
          order_id: "YOUR-ORDERID-123456",
          gross_amount: 10000,
        },
        credit_card: {
          secure: true,
        },
        customer_details: {
          first_name: "budi",
          last_name: "pratama",
          email: "budi.pra@example.com",
          phone: "08111222333",
        },
      };

      console.log("PARAMETER", parameter);

      const tokenMidtrans = await tokenMidtransGenerator(parameter);

      console.log("TOKEN MID DARI CONTROLLER", tokenMidtrans);

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
