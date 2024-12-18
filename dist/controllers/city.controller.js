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
exports.CityController = void 0;
const prisma_1 = require("../config/prisma");
const response_1 = __importDefault(require("../utils/response"));
class CityController {
    addCity(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const city = yield prisma_1.prisma.city.create({
                    data: req.body,
                });
                return response_1.default.succes(res, "Succesfully added city", 201, city);
            }
            catch (error) {
                return response_1.default.error(res, "Failed to add city", 500, error);
            }
        });
    }
    getCityById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const city = yield prisma_1.prisma.city.findUnique({
                    where: {
                        id: parseInt(req.params.id),
                    },
                });
                return response_1.default.succes(res, "Succesfully retrieved city data", 200, city);
            }
            catch (error) {
                return response_1.default.error(res, "Failed to retrieve city data", 500, error);
            }
        });
    }
    updateCity(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const city = yield prisma_1.prisma.city.update({
                    data: req.body,
                    where: {
                        id: parseInt(req.params.id),
                    },
                });
                response_1.default.succes(res, "Succesfully updated city", 200, city);
            }
            catch (error) {
                return response_1.default.error(res, "Failed to update event", 500, error);
            }
        });
    }
    deleteCity(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const city = yield prisma_1.prisma.city.delete({
                    where: {
                        id: parseInt(req.params.id),
                    },
                });
                response_1.default.succes(res, "Succesfully deleted city", 200, city);
            }
            catch (error) {
                return response_1.default.error(res, "Failed to delete city data", 500, error);
            }
        });
    }
}
exports.CityController = CityController;
