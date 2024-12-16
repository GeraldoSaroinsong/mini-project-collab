import { NextFunction, Request, Response } from "express";
import responseHandler from "../utils/response";
import userService from "../services/user.service";
import { parse } from "path";
import { sign } from "jsonwebtoken";

// CONTOH IMPORT LAIN
// import { hashPassword } from "../utils/hashPassword";
// import { compareSync } from "bcrypt";
// import { sign } from "jsonwebtoken";

export class UserController {
    // ? YOUR METHODS HERE

    async registerUser(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<any> {
        try {
            // ? YOUR CODE HERE
            const result = await userService.serviceUserRegsiter(req.body);
            return responseHandler.succes(
                res,
                "THIS CONTROLLER IS WORKING",
                201,
                { result }
            );
        } catch (error: any) {
            // console.log(error);
            return responseHandler.error(res, "CONTROLLER FAILED", 500, error);
        }
    }

    async loginUser(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<any> {
        try {
            // ? YOUR CODE HERE
            const result = await userService.serviceUserLogin(req.body);
            return responseHandler.succes(
                res,
                "THIS CONTROLLER IS WORKING",
                201,
                { result }
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
            // ? YOUR CODE HERE
            const result = await userService.serviceUserUpdate(
                parseInt(req.params.id),
                req.body
            );
            return responseHandler.succes(
                res,
                "THIS CONTROLLER IS WORKING",
                201,
                { result }
            );
        } catch (error: any) {
            // console.log(error);
            return responseHandler.error(res, "CONTROLLER FAILED", 500, error);
        }
    }

    async daleteUser(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<any> {
        try {
            // ? YOUR CODE HERE
            const result = await userService.serviceUserDelete(
                parseInt(req.params.id)
            );
            return responseHandler.succes(
                res,
                "THIS CONTROLLER IS WORKING",
                201,
                { result }
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
            // const result = await userService.serviceUserDelete(
            //     parseInt(req.params.id)
            // );

            const token = sign(
                { id: req.body.id, email: req.body.email },
                process.env.TOKEN_KEY || "test"
            );

            return responseHandler.succes(
                res,
                "THIS CONTROLLER IS WORKING",
                201,
                { token }
            );
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
            const result = await userService.serviceUserLogin(req.body);
            return responseHandler.succes(
                res,
                "THIS CONTROLLER IS WORKING",
                201,
                { result }
            );
        } catch (error: any) {
            // console.log(error);
            return responseHandler.error(res, "CONTROLLER FAILED", 500, error);
        }
    }
}
