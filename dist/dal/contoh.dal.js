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
Object.defineProperty(exports, "__esModule", { value: true });
// ? IMPORTS IF NEEDED
const prisma_1 = require("../config/prisma");
// ? INTERFACE IF NEEDED
// interface IContoh {}
class DalContoh {
    // ? YOUR METHODS HERE
    dalContohMethod(dataContoh) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // ? PEMANGGILAN DATABASE(PRISMA) HERE. CONTOH
                const newContoh = yield prisma_1.prisma.event.create({ data: dataContoh });
                return newContoh;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.default = new DalContoh();
