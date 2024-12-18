"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ResponseHandler {
    succes(res, message, rc = 200, result) {
        return res.status(rc).send({
            rc,
            message,
            success: true,
            result,
        });
    }
    error(res, message, rc = 500, error) {
        return res.status(rc).send({
            rc,
            message,
            success: false,
            error,
        });
    }
}
exports.default = new ResponseHandler();
