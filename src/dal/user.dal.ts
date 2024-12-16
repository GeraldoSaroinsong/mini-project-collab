// ? IMPORTS IF NEEDED
import { prisma } from "../config/prisma";
import { ILogin, IUser, IUserUnique, IUserUpdate } from "../interfaces/user.interface";

// ? INTERFACE IF NEEDED

class DalUser {
    // ? YOUR METHODS HERE
    async dalUserRegister(dataUser: IUser): Promise<any> {
        try {
            // ? PEMANGGILAN DATABASE(PRISMA) HERE. CONTOH
            const result = await prisma.user.create({ data: dataUser });

            return result;
        } catch (error: any) {
            throw error;
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
}


export default new DalUser();
