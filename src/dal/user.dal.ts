import { prisma } from "../config/prisma";
import {
    ILogin,
    IUser,
    IUserUnique,
    IUserUpdate,
} from "../interfaces/user.interface";

// ? INTERFACE IF NEEDED

class DalUser {
    // ? YOUR METHODS HERE
    async dalUserRegister(dataUser: IUser): Promise<any> {
        try {
            // ? PEMANGGILAN DATABASE(PRISMA) HERE. CONTOH
            const result = await prisma.user.create({ data: dataUser });

            return result;
        } catch (error: any) {
            throw { rc: 400, message: `DAL failed to create new user` };
        }
    }

    async dalUserRegisterRefCode(dataUser: IUser): Promise<any> {
        try {
            // ? PEMANGGILAN DATABASE(PRISMA) HERE. CONTOH
            if (typeof dataUser.usingReferralCode === "string") {
                const bonusPoint = 10000;
                const ref: string = dataUser.usingReferralCode;
                const expdate = new Date(
                    new Date().setMonth(new Date().getMonth() + 3)
                );

                const result = await prisma.$transaction([
                    prisma.user.create({
                        data: {
                            ...dataUser,
                            coupon: true,
                            couponExpiredAt: expdate,
                        },
                    }),
                    prisma.user.update({
                        where: { referralCode: ref },
                        data: {
                            pointBalance: { increment: bonusPoint },
                            expiredDates: { push: expdate },
                        },
                    }),
                ]);
                return { result };
            }
        } catch (error: any) {
            throw { rc: 400, message: `DAL failed to create new user` };
        }
    }

    async dalUserLogin(dataUser: ILogin): Promise<any> {
        try {
            // ? PEMANGGILAN DATABASE(PRISMA) HERE. CONTOH
            const result = await prisma.user.findUnique({ where: dataUser });

            return result;
        } catch (error: any) {
            throw error;
        }
    }

    async dalUserUpdate(id: number, dataUser: IUserUpdate): Promise<any> {
        try {
            // ? PEMANGGILAN DATABASE(PRISMA) HERE. CONTOH
            const result = await prisma.user.update({
                where: { id },
                data: dataUser,
            });

            return result;
        } catch (error: any) {
            throw error;
        }
    }

    async dalUserDelete(id: number): Promise<any> {
        try {
            // ? PEMANGGILAN DATABASE(PRISMA) HERE. CONTOH
            const result = await prisma.user.delete({
                where: { id },
            });

            return result;
        } catch (error: any) {
            throw error;
        }
    }

    async dalUserUnique(dataUser: IUserUnique): Promise<any> {
        try {
            // ? PEMANGGILAN DATABASE(PRISMA) HERE. CONTOH
            const result = await prisma.user.findUnique({ where: dataUser });

            return result;
        } catch (error: any) {
            throw error;
        }
    }

    async dalUserId(dataUser: { id: number }): Promise<any> {
        try {
            // ? PEMANGGILAN DATABASE(PRISMA) HERE. CONTOH
            const result = await prisma.user.findUnique({
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
        } catch (error: any) {
            throw error;
        }
    }
}

export default new DalUser();
