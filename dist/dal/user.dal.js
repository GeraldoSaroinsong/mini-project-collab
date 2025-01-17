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
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("../config/prisma");
// ? INTERFACE IF NEEDED
class DalUser {
    // ? YOUR METHODS HERE
    dalUserRegister(dataUser) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // ? PEMANGGILAN DATABASE(PRISMA) HERE. CONTOH
                const result = yield prisma_1.prisma.user.create({ data: dataUser });
                return result;
            }
            catch (error) {
                throw { rc: 400, message: `DAL failed to create new user` };
            }
        });
    }
    dalUserRegisterRefCode(dataUser) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // ? PEMANGGILAN DATABASE(PRISMA) HERE. CONTOH
                if (typeof dataUser.usingReferralCode === "string") {
                    const bonusPoint = 10000;
                    const ref = dataUser.usingReferralCode;
                    const expdate = new Date(new Date().setMonth(new Date().getMonth() + 3));
                    const result = yield prisma_1.prisma.$transaction([
                        prisma_1.prisma.user.create({
                            data: Object.assign(Object.assign({}, dataUser), { coupon: true, couponExpiredAt: expdate }),
                        }),
                        prisma_1.prisma.user.update({
                            where: { referralCode: ref },
                            data: {
                                pointBalance: { increment: bonusPoint },
                                expiredDates: { push: expdate },
                            },
                        }),
                    ]);
                    return { result };
                }
            }
            catch (error) {
                throw { rc: 400, message: `DAL failed to create new user` };
            }
        });
    }
    dalUserLogin(dataUser) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // ? PEMANGGILAN DATABASE(PRISMA) HERE. CONTOH
                const result = yield prisma_1.prisma.user.findUnique({ where: dataUser });
                return result;
            }
            catch (error) {
                throw error;
            }
        });
    }
    dalUserUpdate(id, dataUser) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // ? PEMANGGILAN DATABASE(PRISMA) HERE. CONTOH
                const result = yield prisma_1.prisma.user.update({
                    where: { id },
                    data: dataUser,
                });
                return result;
            }
            catch (error) {
                throw error;
            }
        });
    }
    dalUserDelete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // ? PEMANGGILAN DATABASE(PRISMA) HERE. CONTOH
                const result = yield prisma_1.prisma.user.delete({
                    where: { id },
                });
                return result;
            }
            catch (error) {
                throw error;
            }
        });
    }
    dalUserUnique(dataUser) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // ? PEMANGGILAN DATABASE(PRISMA) HERE. CONTOH
                const result = yield prisma_1.prisma.user.findUnique({ where: dataUser });
                return result;
            }
            catch (error) {
                throw error;
            }
        });
    }
    dalUserId(dataUser) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // ? PEMANGGILAN DATABASE(PRISMA) HERE. CONTOH
                const result = yield prisma_1.prisma.user.findUnique({
                    where: dataUser,
                    select: {
                        name: true,
                        email: true,
                        username: true,
                        phone: true,
                        role: true,
                        image: true,
                        pointBalance: true,
                    },
                });
                return result;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.default = new DalUser();
