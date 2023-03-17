"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importStar(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const index_1 = __importDefault(require("./config/index"));
require("dotenv/config");
const index_2 = __importDefault(require("./config/logger/index"));
const index_3 = __importDefault(require("./config/routes/index"));
const port = index_1.default.PRODUCT_CATALOGUE_PORT || 6000;
const app = (0, express_1.default)();
const logger = index_2.default;
logger('info', 'Application starting...');
app.use((0, express_1.urlencoded)({ extended: true }));
app.use((0, express_1.json)());
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)());
app.use((0, express_fileupload_1.default)());
app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Welcome to product catalogue',
    });
});
(0, index_3.default)(app);
// 404 error handling
app.use((req, res) => res.status(404).json({
    status: 'error',
    code: 404,
    label: 'NOT_FOUND',
    message: 'Route not found',
}));
// server related error handling
app.use((req, res) => res.status(500).json({
    status: 'error',
    code: 500,
    label: 'INTERNAL_SERVER_ERROR',
    message: 'Ooopppps! Server error, please try again later',
}));
app.listen(port);
logger('info', `Server is running on port ${port}`);
exports.default = app;
