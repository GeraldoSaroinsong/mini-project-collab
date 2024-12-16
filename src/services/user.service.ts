// ? IMPORT DAL's HERE. CONTOH
import { sign } from "jsonwebtoken";
import DalUser from "../dal/user.dal";
import { ILogin, IUser, IUserUpdate } from "../interfaces/user.interface";
import { hashPassword } from "../utils/hashPassword";

// ? INTERFACE IF NEEDED

class ServiceUser {
    // ? YOUR METHODS HERE
    async serviceUserRegsiter(dataUser: IUser): Promise<any> {
        try {
            // ? YOUR BUSINESS CODE HERE
            const isExistUser = await DalUser.dalUserUnique(dataUser);
            if (isExistUser) {
                throw {
                    rc: 400,
                    message: `An account with this email address already exists`,
                };
            }

            const hashedPassword = await hashPassword(dataUser.password);

            // ? PEMANGGILAN DAL HERE
            const newUser = await DalUser.dalUserRegister({
                ...dataUser,
                password: hashedPassword,
            });

            const token = sign(
                { id: newUser.id, email: newUser.email, role: newUser.role },
                process.env.TOKEN_KEY || "test",
                { expiresIn: "1h" }
            );

            return newUser;
        } catch (error: any) {
            throw error;
        }
    }

    async serviceUserLogin(dataUser: ILogin): Promise<any> {
        try {
            // ? YOUR BUSINESS CODE HERE
            if (true) {
                console.log("INI ADALAH PERKONDISIAN DI DALAM SERVICE");
            } else {
                throw { rc: 400, message: "Error di perkondisian service" };
            }

            // ? PEMANGGILAN DAL HERE
            const loginUser = await DalUser.dalUserLogin(dataUser);

            return loginUser;
        } catch (error: any) {
            throw error;
        }
    }

    async serviceUserUpdate(id: number, dataUser: IUserUpdate): Promise<any> {
        try {
            // ? YOUR BUSINESS CODE HERE
            if (true) {
                console.log("INI ADALAH PERKONDISIAN DI DALAM SERVICE");
            } else {
                throw { rc: 400, message: "Error di perkondisian service" };
            }

            // ? PEMANGGILAN DAL HERE
            const updatedUser = await DalUser.dalUserUpdate(id, dataUser);

            return updatedUser;
        } catch (error: any) {
            throw error;
        }
    }

    async serviceUserDelete(id: number): Promise<any> {
        try {
            // ? YOUR BUSINESS CODE HERE
            if (true) {
                console.log("INI ADALAH PERKONDISIAN DI DALAM SERVICE");
            } else {
                throw { rc: 400, message: "Error di perkondisian service" };
            }

            // ? PEMANGGILAN DAL HERE
            const deletedUser = await DalUser.dalUserDelete(id);

            return deletedUser;
        } catch (error: any) {
            throw error;
        }
    }
}

export default new ServiceUser();
