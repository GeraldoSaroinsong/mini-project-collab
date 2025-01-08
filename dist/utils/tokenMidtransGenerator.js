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
exports.tokenMidtransGenerator = void 0;
const midtrans_node_client_1 = require("midtrans-node-client");
const tokenMidtransGenerator = (parameter) => __awaiter(void 0, void 0, void 0, function* () {
    let snap = new midtrans_node_client_1.MidtransClient.Snap({
        isProduction: false,
        serverKey: "SB-Mid-server-sQDfXDlqNKvrE8E7pAsJU8hi",
        clientKey: "SB-Mid-client-JuIn72sBaReyPMcG",
    });
    console.log(process.env.SECRET);
    console.log(process.env.NEXT_PUBLIC_CLIENT);
    try {
        const tokenMidtrans = yield snap.createTransactionToken(parameter);
        // console.log(tokenMidtrans);
        return tokenMidtrans;
    }
    catch (error) {
        console.log(error);
        return "Midtrans e error bang";
    }
});
exports.tokenMidtransGenerator = tokenMidtransGenerator;
