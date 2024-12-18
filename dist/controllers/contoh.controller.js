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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContohController = void 0;
const response_1 = __importDefault(require("../utils/response"));
const contoh_service_1 = __importDefault(require("../services/contoh.service"));
// ? IMPORT SERVICE's HERE. CONTOH
// import { createNeWRole, updateRole } from "../services/role.service";
// CONTOH IMPORT LAIN
// import { hashPassword } from "../utils/hashPassword";
// import { compareSync } from "bcrypt";
// import { sign } from "jsonwebtoken";
class ContohController {
    // ? YOUR METHODS HERE
    contohMethod(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // ? YOUR CODE HERE
                const dataContoh = yield contoh_service_1.default.serviceCreateContohMethod({
                    propContoh: "valueContoh",
                });
                return response_1.default.succes(res, "THIS CONTROLLER IS WORKING", 201, { dataContoh });
            }
            catch (error) {
                // console.log(error);
                return response_1.default.error(res, "CONTROLLER FAILED", 500, error);
            }
        });
    }
}
exports.ContohController = ContohController;
