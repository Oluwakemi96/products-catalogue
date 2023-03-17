"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const { PRODUCT_CATALOGUE_NODE_ENV, PRODUCT_CATALOGUE_PORT, PRODUCT_CATALOGUE_TEST_URL } = process.env;
exports.default = {
    PRODUCT_CATALOGUE_NODE_ENV,
    PRODUCT_CATALOGUE_PORT,
    PRODUCT_CATALOGUE_URL: PRODUCT_CATALOGUE_TEST_URL
};
