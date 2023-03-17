"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
exports.default = {
    success: (res, message, code, data) => res.status(code).json({
        status: 'success',
        message,
        code,
        data: data || [],
    }),
    error: (res, message = '', code = 500) => {
        const msg = code === 500 ? 'Internal Server Error' : message;
        return res.status(code).json({
            status: 'error',
            error: http_status_1.default[`${code}_NAME`],
            message: msg,
            code,
        });
    },
};
