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
exports.PromotionController = void 0;
const response_1 = __importDefault(require("../utils/response"));
const prisma_1 = require("../config/prisma");
class PromotionController {
    createPromotion(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newPromotion = yield prisma_1.prisma.promotion.create({
                    data: req.body,
                });
                return response_1.default.succes(res, `SUCCESSFULLY CREATED NEW PROMOTION`, 200, newPromotion);
            }
            catch (error) {
                return response_1.default.error(res, error.message, 500, error);
            }
        });
    }
    getPromotion(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const findPromotion = yield prisma_1.prisma.promotion.findMany();
                return response_1.default.succes(res, `SUCCESSFULLY GET PROMOTIONS`, 200, findPromotion);
            }
            catch (error) {
                return response_1.default.error(res, error.message, 500, error);
            }
        });
    }
    getPromotionByEvent(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id_event = parseInt(req.params.id);
                const eventPromotion = yield prisma_1.prisma.promotion.findMany({
                    where: { id_event },
                });
                return response_1.default.succes(res, `SUCCESSFULLY GET PROMOTIONS`, 200, eventPromotion);
            }
            catch (error) {
                return response_1.default.error(res, error.message, 500, error);
            }
        });
    }
    updatePromotion(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params.id);
                const updatedPromotion = yield prisma_1.prisma.promotion.update({
                    where: { id },
                    data: req.body,
                });
                return response_1.default.succes(res, `SUCCESSFULLY CREATED NEW PROMOTION`, 200, updatedPromotion);
            }
            catch (error) {
                return response_1.default.error(res, error.message, 500, error);
            }
        });
    }
    deletePromotion(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newPromotion = yield prisma_1.prisma.promotion.delete({
                    where: { id: parseInt(req.params.id) },
                });
                return response_1.default.succes(res, `PROMOTION SUCCESSFULLY DELETED`, 200, newPromotion);
            }
            catch (error) {
                return response_1.default.error(res, error.message, 500, error);
            }
        });
    }
    togglePromotion(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params.id);
                const findPromotion = yield prisma_1.prisma.promotion.findUnique({
                    where: { id },
                });
                const updatedPromotion = yield prisma_1.prisma.promotion.update({
                    where: { id },
                    data: { status: !(findPromotion === null || findPromotion === void 0 ? void 0 : findPromotion.status) },
                });
                return response_1.default.succes(res, `SUCCESSFULLY CREATED NEW PROMOTION`, 200, updatedPromotion);
            }
            catch (error) {
                return response_1.default.error(res, error.message, 500, error);
            }
        });
    }
}
exports.PromotionController = PromotionController;
