import { NextFunction, Request, Response } from "express";
import { prisma } from "../config/prisma";
import responseHandler from "../utils/response";
import ServiceContoh from "../services/contoh.service";

// ? IMPORT SERVICE's HERE. CONTOH
// import { createNeWRole, updateRole } from "../services/role.service";

// CONTOH IMPORT LAIN
// import { hashPassword } from "../utils/hashPassword";
// import { compareSync } from "bcrypt";
// import { sign } from "jsonwebtoken";

export class ContohController {
    // ? YOUR METHODS HERE
    async contohMethod(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<any> {
        try {
            // ? YOUR CODE HERE
            const dataContoh = await ServiceContoh.serviceCreateContohMethod({
                propContoh: "valueContoh",
            });
            return responseHandler.succes(
                res,
                "THIS CONTROLLER IS WORKING",
                201,
                { dataContoh }
            );
        } catch (error: any) {
            // console.log(error);
            return responseHandler.error(res, "CONTROLLER FAILED", 500, error);
        }
    }
}
