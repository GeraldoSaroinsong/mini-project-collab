"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenGenerator = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const tokenGenerator = (dataUser) => {
    const token = (0, jsonwebtoken_1.sign)({ id: dataUser.id, email: dataUser.email, role: dataUser.role }, process.env.TOKEN_KEY || "test", { expiresIn: "1h" });
    return token;
};
exports.tokenGenerator = tokenGenerator;
