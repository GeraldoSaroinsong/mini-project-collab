"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const verifyToken = (req, res, next) => {
    var _a;
    try {
        // decrypt token from req.header
        console.log("from request header", req.headers);
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
        console.log(token);
        if (!token) {
            throw { rc: 404, status: false, pesanProteksi: "token not exist" };
        }
        const checkToken = (0, jsonwebtoken_1.verify)(token, process.env.TOKEN_KEY || "test");
        console.log(checkToken);
        // menggunakan penampung res.local nama selanjutnya adalah nama properti terserah
        res.locals.decrypt = checkToken;
        // meneruskan proses ke controller berikutnya
        next();
    }
    catch (error) {
        res.status(401).send({
            message: "Unauthorized token, is invalid",
            success: false,
            pesanSpesifikProteksi: error.pesanProteksi,
        });
    }
};
exports.verifyToken = verifyToken;
