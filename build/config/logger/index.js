"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = __importDefault(require("winston"));
const { PRODUCT_CATALOGUE_NODE_ENV } = process.env;
const myformat = winston_1.default.format.combine(winston_1.default.format.colorize(), winston_1.default.format.timestamp(), winston_1.default.format.printf((info) => `${info.level} ${info.message || info.stack}`));
const devLogger = winston_1.default.createLogger({
    // level: K loggerLevel,
    transports: [
        new winston_1.default.transports.File({
            filename: 'logs/error.log',
            maxsize: 500,
            format: myformat,
        }),
        new winston_1.default.transports.Console({
            format: myformat,
        }),
    ],
});
const prodLogger = winston_1.default.createLogger({
    transports: [
        new winston_1.default.transports.File({
            filename: 'logs/error.log',
            maxsize: 500,
            format: myformat,
        }),
    ],
});
//   type loggerLevel = 'warning' | 'error' | 'info'
// export globalThis = true; 
function logger(level, logInfo) {
    if (PRODUCT_CATALOGUE_NODE_ENV === 'development') {
        return devLogger.log(level, logInfo);
    }
    return prodLogger.log(level, logInfo);
}
exports.default = logger;
