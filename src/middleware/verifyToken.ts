import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

export const verifyToken = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        // decrypt token from req.header
        const token = req.headers.authorization?.split(" ")[1];
        console.log(token);

        if (!token) {
            throw { rc: 404, status: false, pesanProteksi: "token not exist" };
        }

        const checkToken = verify(token, process.env.TOKEN_KEY || "test");
        // console.log(checkToken);

        // menggunakan penampung res.local nama selanjutnya adalah nama properti terserah
        res.locals.decrypt = checkToken;

        // meneruskan proses ke controller berikutnya
        next();
    } catch (error: any) {
        res.status(401).send({
            message: "Unauthorized token, is invalid",
            success: false,
            pesanSpesifikProteksi: error.pesanProteksi,
        });
    }
};

export const verifyTokenUser = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        // decrypt token from req.header
        const token = req.headers.authorization?.split(" ")[1];
        console.log(token);

        if (!token) {
            throw { rc: 404, status: false, pesanProteksi: "token not exist" };
        }

        const checkToken = verify(token, process.env.TOKEN_KEY || "test");
        // console.log(checkToken);

        // menggunakan penampung res.local nama selanjutnya adalah nama properti terserah
        res.locals.decrypt = checkToken;

        if (res.locals.decrypt.role !== "user") {
            throw {
                rc: 401,
                status: false,
                pesanProteksi: "user is not authorized. not a user",
            };
        }

        // meneruskan proses ke controller berikutnya
        next();
    } catch (error: any) {
        res.status(401).send({
            message: "Unauthorized token, is invalid",
            success: false,
            pesanSpesifikProteksi: error.pesanProteksi,
        });
    }
};

export const verifyTokenOrganizer = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        // decrypt token from req.header
        const token = req.headers.authorization?.split(" ")[1];
        console.log(token);

        if (!token) {
            throw { rc: 404, status: false, pesanProteksi: "token not exist" };
        }

        const checkToken = verify(token, process.env.TOKEN_KEY || "test");
        // console.log(checkToken);

        // menggunakan penampung res.local nama selanjutnya adalah nama properti terserah
        res.locals.decrypt = checkToken;

        if (res.locals.decrypt.role !== "organizer") {
            throw {
                rc: 401,
                status: false,
                pesanProteksi: "user is not authorized. not an organizer",
            };
        }

        // meneruskan proses ke controller berikutnya
        next();
    } catch (error: any) {
        res.status(401).send({
            message: "Unauthorized token, is invalid",
            success: false,
            pesanSpesifikProteksi: error.pesanProteksi,
        });
    }
};
