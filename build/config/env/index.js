"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.testEnv = exports.prodEnv = exports.devEnv = void 0;
const development_1 = __importDefault(require("./development"));
exports.devEnv = development_1.default;
const production_1 = __importDefault(require("./production"));
exports.prodEnv = production_1.default;
const test_1 = __importDefault(require("./test"));
exports.testEnv = test_1.default;
