"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_promise_1 = __importDefault(require("pg-promise"));
const bluebird_1 = __importDefault(require("bluebird"));
const index_1 = __importDefault(require("../index"));
const pg = (0, pg_promise_1.default)({ promiseLib: bluebird_1.default, noWarnings: true });
const db = pg(index_1.default.PRODUCT_CATALOGUE_URL);
