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
exports.CategoryController = void 0;
const prisma_1 = require("../config/prisma");
const response_1 = __importDefault(require("../utils/response"));
class CategoryController {
    createCategory(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const category = yield prisma_1.prisma.category.create({
                    data: req.body,
                });
                return response_1.default.succes(res, "Created category succesfully", 201, category);
            }
            catch (error) {
                return response_1.default.error(res, "Failed to create category", 500, error);
                // next(error);
            }
        });
    }
    getCategory(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const category = yield prisma_1.prisma.category.findMany();
                response_1.default.succes(res, "Succesfully updated category", 200, category);
            }
            catch (error) {
                // return responseHandler.error(res, "Failed top update category", 500, error);
                return response_1.default.error(res, "Failed to retrieve category data", 500, error);
            }
        });
    }
    getCategoryById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cateogry = yield prisma_1.prisma.category.findUnique({
                    where: {
                        id: parseInt(req.params.id),
                    },
                });
                return response_1.default.succes(res, "Succesfully retrieved cateogry data", 200, cateogry);
            }
            catch (error) {
                return response_1.default.error(res, "Failed to retrieve cateogry data", 500, error);
            }
        });
    }
    updateCategory(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const category = yield prisma_1.prisma.category.update({
                    data: req.body,
                    where: {
                        id: parseInt(req.params.id),
                    },
                });
                response_1.default.succes(res, "Succesfully updated category", 200, category);
            }
            catch (error) {
                return response_1.default.error(res, "Failed to update category", 500, error);
            }
        });
    }
    deleteCategory(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const category = yield prisma_1.prisma.category.delete({
                    where: {
                        id: parseInt(req.params.id),
                    },
                });
                response_1.default.succes(res, "Succesfully deleted category", 200, category);
            }
            catch (error) {
                return response_1.default.error(res, "Failed to delete category data", 500, error);
            }
        });
    }
}
exports.CategoryController = CategoryController;
