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
exports.PaymentController = void 0;
const prisma_1 = require("../config/prisma");
const response_1 = __importDefault(require("../utils/response"));
class PaymentController {
    createPayment(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newPayment = yield prisma_1.prisma.payment.create(req.body);
                return response_1.default.succes(res, `SUCCESSFULLY CREATED NEW PAYMENT`, 200, newPayment);
            }
            catch (error) {
                return response_1.default.error(res, error.message, 500, error);
            }
        });
    }
    getPayment(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const findPayment = yield prisma_1.prisma.payment.findMany();
                return response_1.default.succes(res, `SUCCESSFULLY GET PAYMENT`, 200, findPayment);
            }
            catch (error) {
                return response_1.default.error(res, error.message, 500, error);
            }
        });
    }
    getPaymentById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const findPayment = yield prisma_1.prisma.payment.findUnique({
                    where: { id: parseInt(req.params.id) },
                });
                return response_1.default.succes(res, `SUCCESSFULLY GET PAYMENT`, 200, findPayment);
            }
            catch (error) {
                return response_1.default.error(res, error.message, 500, error);
            }
        });
    }
    getPaymentByUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const findPayment = yield prisma_1.prisma.user.findMany({
                    select: {
                        transactions: {
                            select: { payment: true },
                        },
                    },
                    where: { id: parseInt(req.params.id) },
                });
                return response_1.default.succes(res, `SUCCESSFULLY GET USER PAYMENT`, 200, findPayment);
            }
            catch (error) {
                return response_1.default.error(res, error.message, 500, error);
            }
        });
    }
    updatePayment(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatePayment = yield prisma_1.prisma.payment.update({
                    where: { id: parseInt(req.params.id) },
                    data: req.body,
                });
                return response_1.default.succes(res, `SUCCESSFULLY UPDATE PAYMENT`, 200, updatePayment);
            }
            catch (error) {
                return response_1.default.error(res, error.message, 500, error);
            }
        });
    }
    deletePayment(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deletePayment = yield prisma_1.prisma.payment.delete({
                    where: { id: parseInt(req.params.id) },
                });
                return response_1.default.succes(res, `SUCCESSFULLY UPDATE PAYMENT`, 200, deletePayment);
            }
            catch (error) {
                return response_1.default.error(res, error.message, 500, error);
            }
        });
    }
}
exports.PaymentController = PaymentController;
