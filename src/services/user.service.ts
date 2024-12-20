import DalUser from "../dal/user.dal";
import { ILogin, IUser, IUserUpdate } from "../interfaces/user.interface";
import { hashPassword } from "../utils/hashPassword";
import { referralGenerator } from "../utils/referralGenerator";
import { compareSync } from "bcrypt";
import { tokenGenerator } from "../utils/tokenGenerator";

class ServiceUser {
    // ? YOUR METHODS HERE
    async serviceUserRegsiter(
        dataUser: IUser
    ): Promise<{ newUser: any; token: string }> {
        try {
            // ? YOUR BUSINESS CODE HERE
            const isExistUser = await DalUser.dalUserUnique({
                email: dataUser.email,
            });

            if (isExistUser) {
                throw {
                    rc: 400,
                    message: `An account with this email address already exists`,
                };
            }

            // ? atribut yg perlu diproses
            const hashedPassword = await hashPassword(dataUser.password);
            const newRefferalCode = referralGenerator(dataUser.username);

            let newUser;
            // ? refcode
            if (dataUser.usingReferralCode) {
                // ? PEMANGGILAN DAL HERE
                newUser = await DalUser.dalUserRegisterRefCode({
                    ...dataUser,
                    password: hashedPassword,
                    referralCode: newRefferalCode,
                });
            } else {
                // ? PEMANGGILAN DAL HERE
                newUser = await DalUser.dalUserRegister({
                    ...dataUser,
                    password: hashedPassword,
                    referralCode: newRefferalCode,
                });
            }

            const token = tokenGenerator(newUser);

            return { newUser, token };
        } catch (error: any) {
            throw { rc: 500, message: `register controller error` };
        }
    }

    async serviceUserLogin(dataUser: ILogin): Promise<any> {
        try {
            const findUser = await DalUser.dalUserUnique({
                email: dataUser.email,
            });

            if (!findUser) {
                throw {
                    rc: 400,
                    message: `user ${dataUser.email} is not exist`,
                };
            }

            const comparePassword = compareSync(
                dataUser.password,
                findUser.password
            );

            if (!comparePassword) {
                throw {
                    rc: 400,
                    message: `password is wrong`,
                };
            }

            const token = tokenGenerator(findUser);

            return {
                name: findUser.name,
                email: findUser.email,
                username: findUser.username,
                token,
            };
        } catch (error: any) {
            throw error;
        }
    }

    async serviceUserUpdate(id: number, dataUser: IUserUpdate): Promise<any> {
        try {
            // ? PEMANGGILAN DAL HERE
            const updatedUser = await DalUser.dalUserUpdate(id, dataUser);

            return updatedUser;
        } catch (error: any) {
            throw error;
        }
    }

    async serviceUserDelete(id: number): Promise<any> {
        try {
            // ? PEMANGGILAN DAL HERE
            const deletedUser = await DalUser.dalUserDelete(id);

            return deletedUser;
        } catch (error: any) {
            throw error;
        }
    }
}

export default new ServiceUser();
