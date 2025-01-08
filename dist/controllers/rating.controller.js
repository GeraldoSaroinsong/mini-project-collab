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
exports.RatingController = void 0;
const response_1 = __importDefault(require("../utils/response"));
const prisma_1 = require("../config/prisma");
class RatingController {
    createRating(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id_user = res.locals.decrypt.id;
                const newRating = yield prisma_1.prisma.rating.create({
                    data: Object.assign(Object.assign({}, req.body), { id_user }),
                });
                return response_1.default.succes(res, `SUCCESSFULLY CREATED NEW RATING`, 200, newRating);
            }
            catch (error) {
                return response_1.default.error(res, error.message, 500, error);
            }
        });
    }
    getRating(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const findRating = yield prisma_1.prisma.rating.findMany();
                return response_1.default.succes(res, `SUCCESSFULLY GET RATINGS`, 200, findRating);
            }
            catch (error) {
                return response_1.default.error(res, error.message, 500, error);
            }
        });
    }
    getRatingByEvent(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id_event = parseInt(req.params.id);
                const eventRatings = yield prisma_1.prisma.event.findUnique({
                    where: { id: id_event },
                    select: { transactions: { select: { rating: true } } },
                });
                return response_1.default.succes(res, `SUCCESSFULLY GET EVENT RATINGS`, 200, eventRatings);
            }
            catch (error) {
                return response_1.default.error(res, error.message, 500, error);
            }
        });
    }
    updateRating(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params.id);
                const updatedRating = yield prisma_1.prisma.rating.update({
                    where: { id },
                    data: req.body,
                });
                return response_1.default.succes(res, `SUCCESSFULLY UPDATED RATING`, 200, updatedRating);
            }
            catch (error) {
                return response_1.default.error(res, error.message, 500, error);
            }
        });
    }
    deleteRating(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deletedRating = yield prisma_1.prisma.rating.delete({
                    where: { id: parseInt(req.params.id) },
                });
                return response_1.default.succes(res, `RATING SUCCESSFULLY DELETED`, 200, deletedRating);
            }
            catch (error) {
                return response_1.default.error(res, error.message, 500, error);
            }
        });
    }
}
exports.RatingController = RatingController;
