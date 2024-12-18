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
exports.CategoriesOnEventController = void 0;
const prisma_1 = require("../config/prisma");
const response_1 = __importDefault(require("../utils/response"));
class CategoriesOnEventController {
    createCategoriesOnEvent(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const categoriesOnEvents = yield prisma_1.prisma.categoriesOnEvents.create({
                    data: req.body,
                });
                return response_1.default.succes(res, "Created category succesfully", 201, categoriesOnEvents);
            }
            catch (error) {
                return response_1.default.error(res, "Failed to create category", 500, error);
                // next(error);
            }
        });
    }
    getCategoriesOnEvent(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const categoriesOnEvents = yield prisma_1.prisma.categoriesOnEvents.findMany();
                response_1.default.succes(res, "Succesfully updated category", 200, categoriesOnEvents);
            }
            catch (error) {
                // return responseHandler.error(res, "Failed top update event", 500, error);
                return response_1.default.error(res, "Failed to retrieve category data", 500, error);
            }
        });
    }
}
exports.CategoriesOnEventController = CategoriesOnEventController;
