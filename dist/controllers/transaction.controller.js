"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionController = void 0;
const prisma_1 = require("../config/prisma");
const response_1 = __importDefault(require("../utils/response"));
const midtrans_node_client_1 = require("midtrans-node-client");
const tokenMidtransGenerator_1 = require("../utils/tokenMidtransGenerator");
class TransactionController {
    createTransaction(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const input = req.body.data;
                const total = input.subtotal * input.quantity;
                console.log("INPUT", input);
                const newTransaction = yield prisma_1.prisma.transaction.create({
                    data: Object.assign(Object.assign({}, input), { total }),
                });
                console.log("NEW TRANSACTION DATA", newTransaction);
                let snap = new midtrans_node_client_1.MidtransClient.Snap({
                    isProduction: false,
                    serverKey: process.env.SECRET,
                    clientKey: process.env.NEXT_PUBLIC_API,
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
                const tokenMidtrans = yield (0, tokenMidtransGenerator_1.tokenMidtransGenerator)(parameter);
                console.log("TOKEN MID DARI CONTROLLER", tokenMidtrans);
                return response_1.default.succes(res, `SUCCESSFULLY CREATED NEW TRANSACTION`, 200, { newTransaction, tokenMidtrans });
            }
            catch (error) {
                return response_1.default.error(res, error.message, 500, error);
            }
        });
    }
    getTransaction(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const findTransaction = yield prisma_1.prisma.transaction.findMany();
                return response_1.default.succes(res, `SUCCESSFULLY GET TRANSACTION`, 200, findTransaction);
            }
            catch (error) {
                return response_1.default.error(res, error.message, 500, error);
            }
        });
    }
    getTransactionById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const findTransaction = yield prisma_1.prisma.transaction.findUnique({
                    where: { id: parseInt(req.params.id) },
                });
                return response_1.default.succes(res, `SUCCESSFULLY GET TRANSACTION`, 200, findTransaction);
            }
            catch (error) {
                return response_1.default.error(res, error.message, 500, error);
            }
        });
    }
    getTransactionByUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const findTransaction = yield prisma_1.prisma.user.findMany({
                    select: {
                        transactions: true,
                    },
                    where: { id: parseInt(req.params.id) },
                });
                return response_1.default.succes(res, `SUCCESSFULLY GET USER TRANSACTION`, 200, findTransaction);
            }
            catch (error) {
                return response_1.default.error(res, error.message, 500, error);
            }
        });
    }
    updateTransaction(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updateTransaction = yield prisma_1.prisma.transaction.update({
                    where: { id: parseInt(req.params.id) },
                    data: req.body,
                });
                return response_1.default.succes(res, `SUCCESSFULLY UPDATE TRANSACTION`, 200, updateTransaction);
            }
            catch (error) {
                return response_1.default.error(res, error.message, 500, error);
            }
        });
    }
    deleteTransaction(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deleteTransaction = yield prisma_1.prisma.transaction.delete({
                    where: { id: parseInt(req.params.id) },
                });
                return response_1.default.succes(res, `SUCCESSFULLY UPDATE TRANSACTION`, 200, deleteTransaction);
            }
            catch (error) {
                return response_1.default.error(res, error.message, 500, error);
            }
        });
    }
}
exports.TransactionController = TransactionController;
