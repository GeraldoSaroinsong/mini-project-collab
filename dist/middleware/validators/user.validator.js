"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginValidation = exports.regisValidation = void 0;
const express_validator_1 = require("express-validator");
const response_1 = __importDefault(require("../../utils/response"));
exports.regisValidation = [
    (0, express_validator_1.body)("name").notEmpty().withMessage("name is required"),
    (0, express_validator_1.body)("username").notEmpty().withMessage("username is required"),
    (0, express_validator_1.body)("email").notEmpty().isEmail().withMessage("email is required"),
    (0, express_validator_1.body)("password")
        .notEmpty()
        .isStrongPassword({
        minLength: 4,
        minLowercase: 0,
        minNumbers: 0,
        minSymbols: 0,
        minUppercase: 0,
    })
        .withMessage("password is required"),
    (req, res, next) => {
        const errorValidation = (0, express_validator_1.validationResult)(req);
        if (!errorValidation.isEmpty()) {
            // jika ada error maka akan dikirim response
            return response_1.default.error(res, "Your data is invalid", 400, errorValidation);
        }
        next();
    },
];
exports.loginValidation = [
    (0, express_validator_1.body)("email").notEmpty().isEmail().withMessage("email is required"),
    (0, express_validator_1.body)("password").notEmpty().withMessage("password is required"),
    (req, res, next) => {
        const errorValidation = (0, express_validator_1.validationResult)(req);
        if (!errorValidation.isEmpty()) {
            // jika ada error maka akan dikirim response
            return response_1.default.error(res, "Your data is invalid", 400, errorValidation);
        }
        next();
    },
];
