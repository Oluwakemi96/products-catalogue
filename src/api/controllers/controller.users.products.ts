import UserQueries from '../queries/queries.users';
import  ApiResponse from '../../lib/http/lib.http.response';
import Payload from '../../lib/payloads/lib.payload.users';
import * as Helpers from '../../lib/helpers/helpers';
import logger from '../../config/logger';
import enums from '../../lib/enums/index';
import { db } from '../../config/db/index';
import { Request, Response, NextFunction } from 'express';
import { RequestWithUser } from '../../lib/types';


export const fetchAllProducts = async (req:Request, res:Response, next:NextFunction) => {
    try {
        const { query } = req;
        const payload = Payload.fetchAllProducts(query);
        const [ products, [ productCount ] ] = await Promise.all([
            db.any(UserQueries.fetchAllProducts, payload),
            db.any(UserQueries.productsCount, payload)
        ]);
        logger('info', `${enums.CURRENT_TIME_STAMP}, 'successfully fetched all products from the DB fetchAllProducts.controllers.auth`);
        const data = {
            page: Number(req.query.page) || 1,
            total_count: Number(productCount.total_count),
            total_pages: Helpers.calculatePages(Number(productCount.total_count), Number(req.query.per_page) || 10),
            products 
          };
        return ApiResponse.success(res, enums.PRODUCTS_FETCHED_SUCCESSFULLY, enums.HTTP_OK, data);
    } catch (error) {
        error.label = enums.FETCH_ALL_PRODUCTS_CONTROLLER
        logger('error', `${enums.CURRENT_TIME_STAMP}, fetching all products failed ${enums.FETCH_ALL_PRODUCTS_CONTROLLER}, ::::error=>  ${error.message} `)    
    }
};

export const fetchAProduct = async (req:Request, res:Response, next:NextFunction) => {
    try {
       const { product_id } = req.params; 
       const product = await db.one(UserQueries.fetchAProductById, product_id);
       logger('info', `${enums.CURRENT_TIME_STAMP}, 'successfully fetched a product from the DB fetchAProduct.controllers.auth`);
        return ApiResponse.success(res, enums.PRODUCT_FETCHED_SUCCESSFULLY, enums.HTTP_OK, product);
    } catch (error) {
        error.label = enums.FETCH_A_PRODUCT_CONTROLLER
        logger('error', `${enums.CURRENT_TIME_STAMP}, fetching single product failed ${enums.FETCH_A_PRODUCT_CONTROLLER}, ::::error=>  ${error.message} `)    
    }
};

export const orderAProduct = async (req: RequestWithUser, res:Response, next:NextFunction) => {
    try {
        const { body:{ product_id, size, quantity }, user} = req;
        const order = await db.oneOrNone(UserQueries.orderAProduct, [ user.user_id, product_id, size, quantity ])
        logger('info', `${enums.CURRENT_TIME_STAMP}, 'user successfully orders a product orderAProduct.controllers.auth`);
        await db.none(UserQueries.decreamentProducts, product_id);
        logger('info', `${enums.CURRENT_TIME_STAMP}, 'successfully decreaments the product quantity in the DB orderAProduct.controllers.auth`);
        const product = await db.oneOrNone(UserQueries.checkProductStatus, product_id);
        if (product.quantity <= 0) {
            logger('info', `${enums.CURRENT_TIME_STAMP}, successfully confirms that product quantity is less than or equal to zero checkProductStatus.middleware.users.auth`);
            await db.none(UserQueries.updateProductStatus, product_id);
        }
        return ApiResponse.success(res, enums.PRODUCT_ORDERED_SUCCESSFULLY, enums.HTTP_OK, order)
    } catch (error) {
        error.label = enums.ORDER_A_PRODUCT_CONTROLLER
        logger('error', `${enums.CURRENT_TIME_STAMP}, ordering a product failed ${enums.ORDER_A_PRODUCT_CONTROLLER}, ::::error=>  ${error.message} `);
    }
};