"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./env/index");
const { PRODUCT_CATALOGUE_NODE_ENV } = process.env;
const config = PRODUCT_CATALOGUE_NODE_ENV === 'development' ? index_1.devEnv
    : PRODUCT_CATALOGUE_NODE_ENV === 'production' ? index_1.prodEnv
        : index_1.testEnv;
exports.default = config;
