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
exports.EventController = void 0;
const prisma_1 = require("../config/prisma");
const response_1 = __importDefault(require("../utils/response"));
class EventController {
    createEvent(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id_organizer = parseInt(res.locals.decrypt.id);
                const event = yield prisma_1.prisma.event.create({
                    data: Object.assign(Object.assign({}, req.body), { id_organizer }),
                });
                return response_1.default.succes(res, "Created event succesfully", 201, event);
            }
            catch (error) {
                return response_1.default.error(res, "Failed to create event", 500, error);
                // next(error);
            }
        });
    }
    getEvent(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { city, title, isPaidEvent, category, sortBy, order = "asc", limit, skip, } = req.query;
                const filters = {};
                if (city) {
                    filters.city = {
                        name: {
                            contains: city,
                        },
                    };
                }
                if (title) {
                    filters.title = { contains: title };
                }
                if (category) {
                    filters.category = {
                        name: {
                            contains: category,
                        },
                    };
                }
                if (isPaidEvent !== undefined) {
                    filters.isPaidEvent = isPaidEvent === "true";
                }
                const sorting = {};
                if (sortBy) {
                    sorting[sortBy] = order;
                }
                const event = yield prisma_1.prisma.event.findMany({
                    where: filters,
                    include: {
                        city: true,
                        category: true,
                    },
                });
                console.log(event);
                response_1.default.succes(res, "Succesfully retrived event", 200, event);
            }
            catch (error) {
                // return responseHandler.error(res, "Failed top update event", 500, error);
                return response_1.default.error(res, "Failed to retrieve event data", 500, error);
            }
        });
    }
    getEventMany(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const event = yield prisma_1.prisma.event.findMany();
                return response_1.default.succes(res, "Succesfully retrieved event data", 200, event);
            }
            catch (error) {
                return response_1.default.error(res, "Failed to retrieve event data", 500, error);
            }
        });
    }
    getEventByTitle(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const event = yield prisma_1.prisma.event.findUnique({
                    where: {
                        title: req.params.title,
                    },
                });
                return response_1.default.succes(res, "Succesfully retrieved event data", 200, event);
            }
            catch (error) {
                return response_1.default.error(res, "Failed to retrieve event data", 500, error);
            }
        });
    }
    updateEvent(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const event = yield prisma_1.prisma.event.update({
                    data: req.body,
                    where: {
                        id: parseInt(req.params.id),
                    },
                });
                response_1.default.succes(res, "Succesfully updated event", 200, event);
            }
            catch (error) {
                return response_1.default.error(res, "Failed to update event", 500, error);
            }
        });
    }
    deleteEvent(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const event = yield prisma_1.prisma.event.delete({
                    where: {
                        id: parseInt(req.params.id),
                    },
                });
                response_1.default.succes(res, "Succesfully deleted event", 200, event);
            }
            catch (error) {
                return response_1.default.error(res, "Failed to delete event data", 500, error);
            }
        });
    }
}
exports.EventController = EventController;
