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
const user_dal_1 = __importDefault(require("../dal/user.dal"));
const hashPassword_1 = require("../utils/hashPassword");
const referralGenerator_1 = require("../utils/referralGenerator");
const bcrypt_1 = require("bcrypt");
const tokenGenerator_1 = require("../utils/tokenGenerator");
class ServiceUser {
    // ? YOUR METHODS HERE
    serviceUserRegsiter(dataUser) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // ? YOUR BUSINESS CODE HERE
                const isExistUser = yield user_dal_1.default.dalUserUnique({
                    email: dataUser.email,
                });
                if (isExistUser) {
                    throw {
                        rc: 400,
                        message: `An account with this email address already exists`,
                    };
                }
                // ? atribut yg perlu diproses
                const hashedPassword = yield (0, hashPassword_1.hashPassword)(dataUser.password);
                const newRefferalCode = (0, referralGenerator_1.referralGenerator)(dataUser.username);
                let newUser;
                // ? refcode
                if (dataUser.usingReferralCode) {
                    // ? PEMANGGILAN DAL HERE
                    newUser = yield user_dal_1.default.dalUserRegisterRefCode(Object.assign(Object.assign({}, dataUser), { password: hashedPassword, referralCode: newRefferalCode }));
                }
                else {
                    // ? PEMANGGILAN DAL HERE
                    newUser = yield user_dal_1.default.dalUserRegister(Object.assign(Object.assign({}, dataUser), { password: hashedPassword, referralCode: newRefferalCode }));
                }
                const token = (0, tokenGenerator_1.tokenGenerator)(newUser);
                return { newUser, token };
            }
            catch (error) {
                throw { rc: 500, message: `register controller error` };
            }
        });
    }
    serviceUserLogin(dataUser) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const findUser = yield user_dal_1.default.dalUserUnique({
                    email: dataUser.email,
                });
                if (!findUser) {
                    throw {
                        rc: 400,
                        message: `user ${dataUser.email} is not exist`,
                    };
                }
                const comparePassword = (0, bcrypt_1.compareSync)(dataUser.password, findUser.password);
                if (!comparePassword) {
                    throw {
                        rc: 400,
                        message: `password is wrong`,
                    };
                }
                const token = (0, tokenGenerator_1.tokenGenerator)(findUser);
                return {
                    id: findUser.id,
                    name: findUser.name,
                    email: findUser.email,
                    username: findUser.username,
                    role: findUser.role,
                    token,
                };
            }
            catch (error) {
                throw error;
            }
        });
    }
    serviceUserUpdate(id, dataUser) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // ? PEMANGGILAN DAL HERE
                const updatedUser = yield user_dal_1.default.dalUserUpdate(id, dataUser);
                return updatedUser;
            }
            catch (error) {
                throw error;
            }
        });
    }
    serviceUserDelete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // ? PEMANGGILAN DAL HERE
                const deletedUser = yield user_dal_1.default.dalUserDelete(id);
                return deletedUser;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.default = new ServiceUser();
