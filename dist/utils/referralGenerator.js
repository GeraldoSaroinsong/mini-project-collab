"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.referralGenerator = void 0;
const referralGenerator = (username) => {
    const randomDigit = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
    const referralCode = username.substring(0, 3) + randomDigit.toString();
    return referralCode;
};
exports.referralGenerator = referralGenerator;
