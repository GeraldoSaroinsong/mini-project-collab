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
exports.UserController = void 0;
const response_1 = __importDefault(require("../utils/response"));
const user_service_1 = __importDefault(require("../services/user.service"));
const user_dal_1 = __importDefault(require("../dal/user.dal"));
const tokenGenerator_1 = require("../utils/tokenGenerator");
// CONTOH IMPORT LAIN
// import { hashPassword } from "../utils/hashPassword";
// import { compareSync } from "bcrypt";
// import { sign } from "jsonwebtoken";
class UserController {
    // ? YOUR METHODS HERE
    registerUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // ? YOUR CODE HERE
                const result = yield user_service_1.default.serviceUserRegsiter(req.body);
                return response_1.default.succes(res, "SUCCESSFULLY CREATED NEW USER", 201, { result });
            }
            catch (error) {
                // console.log(error);
                return response_1.default.error(res, error.message, 500, error);
            }
        });
    }
    loginUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // ? YOUR CODE HERE
                const result = yield user_service_1.default.serviceUserLogin(req.body);
                return response_1.default.succes(res, "THIS CONTROLLER IS WORKING", 201, { result });
            }
            catch (error) {
                // console.log(error);
                return response_1.default.error(res, "CONTROLLER FAILED", 500, error);
            }
        });
    }
    updateUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // ? YOUR CODE HERE
                const result = yield user_service_1.default.serviceUserUpdate(parseInt(req.params.id), req.body);
                return response_1.default.succes(res, "THIS CONTROLLER IS WORKING", 201, { result });
            }
            catch (error) {
                // console.log(error);
                return response_1.default.error(res, "CONTROLLER FAILED", 500, error);
            }
        });
    }
    deleteUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // ? YOUR CODE HERE
                const result = yield user_service_1.default.serviceUserDelete(parseInt(req.params.id));
                return response_1.default.succes(res, "THIS CONTROLLER IS WORKING", 201, { result });
            }
            catch (error) {
                // console.log(error);
                return response_1.default.error(res, "CONTROLLER FAILED", 500, error);
            }
        });
    }
    keepLoginUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // ? YOUR CODE HERE
                const findUser = yield user_dal_1.default.dalUserUnique({
                    id: res.locals.decrypt.id,
                    email: res.locals.decrypt.email,
                });
                if (!findUser) {
                    throw { rc: 400, message: `user is not exist` };
                }
                const token = (0, tokenGenerator_1.tokenGenerator)(findUser);
                return response_1.default.succes(res, "USER FOUND, KEEPLOGIN", 201, {
                    name: findUser.name,
                    email: findUser.email,
                    username: findUser.username,
                    token: token,
                });
            }
            catch (error) {
                // console.log(error);
                return response_1.default.error(res, "CONTROLLER FAILED", 500, error);
            }
        });
    }
    uniqueUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // ? YOUR CODE HERE
                const result = yield user_service_1.default.serviceUserLogin(req.body);
                return response_1.default.succes(res, "THIS CONTROLLER IS WORKING", 201, { result });
            }
            catch (error) {
                // console.log(error);
                return response_1.default.error(res, "CONTROLLER FAILED", 500, error);
            }
        });
    }
}
exports.UserController = UserController;
