import { NextFunction, Request, Response } from "express";
import responseHandler from "../utils/response";
import userService from "../services/user.service";
import { parse } from "path";
import { sign } from "jsonwebtoken";
import userDal from "../dal/user.dal";
import { tokenGenerator } from "../utils/tokenGenerator";
import { prisma } from "../config/prisma";

export class UserController {
    async registerUser(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<any> {
        try {
            // ? YOUR CODE HERE
            const data = await userService.serviceUserRegsiter(req.body);
            return responseHandler.succes(
                res,
                "SUCCESSFULLY CREATED NEW USER",
                201,
                { data }
            );
        } catch (error: any) {
            // console.log(error);
            return responseHandler.error(res, error.message, 500, error);
        }
    }

    async loginUser(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<any> {
        try {
            // ? YOUR CODE HERE
            const data = await userService.serviceUserLogin(req.body);
            return responseHandler.succes(
                res,
                "THIS CONTROLLER IS WORKING",
                201,
                { data }
            );
        } catch (error: any) {
            // console.log(error);
            return responseHandler.error(res, "CONTROLLER FAILED", 500, error);
        }
    }

    async updateUser(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<any> {
        try {
            const id = parseInt(res.locals.decrypt.id);
            const data = await userService.serviceUserUpdate(id, req.body);
            return responseHandler.succes(
                res,
                "THIS CONTROLLER IS WORKING",
                201,
                { data }
            );
        } catch (error: any) {
            // console.log(error);
            return responseHandler.error(res, "CONTROLLER FAILED", 500, error);
        }
    }

    async deleteUser(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<any> {
        try {
            // ? YOUR CODE HERE
            const data = await userService.serviceUserDelete(
                parseInt(req.params.id)
            );
            return responseHandler.succes(
                res,
                "THIS CONTROLLER IS WORKING",
                201,
                { data }
            );
        } catch (error: any) {
            // console.log(error);
            return responseHandler.error(res, "CONTROLLER FAILED", 500, error);
        }
    }

    async keepLoginUser(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<any> {
        try {
            // ? YOUR CODE HERE
            const findUser = await userDal.dalUserUnique({
                id: res.locals.decrypt.id,
                email: res.locals.decrypt.email,
            });

            if (!findUser) {
                throw { rc: 400, message: `user is not exist` };
            }

            const token = tokenGenerator(findUser);

            return responseHandler.succes(res, "USER FOUND, KEEPLOGIN", 201, {
                name: findUser.name,
                email: findUser.email,
                username: findUser.username,
                role: findUser.role,
                token: token,
            });
        } catch (error: any) {
            // console.log(error);
            return responseHandler.error(res, "CONTROLLER FAILED", 500, error);
        }
    }

    async uniqueUser(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<any> {
        try {
            // ? YOUR CODE HERE
            const data = await userDal.dalUserId({
                id: parseInt(req.params.id),
            });
            return responseHandler.succes(
                res,
                "THIS CONTROLLER IS WORKING",
                201,
                { data }
            );
        } catch (error: any) {
            // console.log(error);
            return responseHandler.error(res, "CONTROLLER FAILED", 500, error);
        }
    }

    async refCode(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<any> {
        try {
            // ? YOUR CODE HERE
            const data = await prisma.user.findMany({
                select: { referralCode: true },
            });
            return responseHandler.succes(
                res,
                "THIS CONTROLLER IS WORKING",
                201,
                { data }
            );
        } catch (error: any) {
            // console.log(error);
            return responseHandler.error(res, "CONTROLLER FAILED", 500, error);
        }
    }

    async duit(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            // ? YOUR CODE HERE
            const id = parseInt(req.params.id);
            const data = await prisma.user.findUnique({
                where: { id },
                select: { pointBalance: true, coupon: true },
            });
            return responseHandler.succes(
                res,
                "THIS CONTROLLER IS WORKING",
                201,
                { data }
            );
        } catch (error: any) {
            // console.log(error);
            return responseHandler.error(res, "CONTROLLER FAILED", 500, error);
        }
    }
}
