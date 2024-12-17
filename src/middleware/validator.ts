import { body, validationResult } from "express-validator";
import { NextFunction, Request, Response } from "express";
import response from "../utils/response";

export const regisValidation = [
    body("name").notEmpty().withMessage("name is required"),
    body("username").notEmpty().withMessage("username is required"),
    body("email").notEmpty().isEmail().withMessage("email is required"),
    body("password")
        .notEmpty()
        .isStrongPassword({
            minLength: 4,
            minLowercase: 0,
            minNumbers: 0,
            minSymbols: 0,
            minUppercase: 0,
        })
        .withMessage("password is required"),
    (req: Request, res: Response, next: NextFunction): any => {
        const errorValidation = validationResult(req);
        if (!errorValidation.isEmpty()) {
            // jika ada error maka akan dikirim response
            return response.error(
                res,
                "Your data is invalid",
                400,
                errorValidation
            );
        }

        next();
    },
];
export const loginValidation = [
    body("email").notEmpty().isEmail().withMessage("email is required"),
    body("password").notEmpty().withMessage("password is required"),
    (req: Request, res: Response, next: NextFunction): any => {
        const errorValidation = validationResult(req);
        if (!errorValidation.isEmpty()) {
            // jika ada error maka akan dikirim response
            return response.error(
                res,
                "Your data is invalid",
                400,
                errorValidation
            );
        }

        next();
    },
];
