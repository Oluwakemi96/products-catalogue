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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lib_http_response_js_1 = __importDefault(require("../../lib/http/lib.http.response.js"));
/**
 * Joi validation of request parameters
 * @param {function} schema - the Joi schema
 * @param {string} type - the request type
 * @returns {object} - Returns an object (error or response).
 * @memberof ModelMiddleware
 */
const validateData = (schema, type) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getType = {
            payload: req.body,
            params: req.params,
            query: req.query,
            headers: req.headers,
            files: req.files,
        };
        const data = getType[type];
        const options = { language: { key: '{{key}} ' } };
        const valid = yield schema.validate(data, options);
        if (valid.error) {
            const { message } = valid.error.details[0];
            return lib_http_response_js_1.default.error(res, message.replace(/["]/gi, ''), 422);
        }
    }
    catch (error) {
        return error;
    }
    return next();
});
exports.default = validateData;
