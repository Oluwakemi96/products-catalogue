import dayjs from 'dayjs';
import logger from '../../config/logger/index';
import enums from '../../lib/enums';
import AuthQureies from '../queries/query.users.auth';
import UserQueries from '../queries/queries.users';
import ApiResponse from '../../lib/http/lib.http.response';
import { db } from '../../config/db';
import { Request, Response, NextFunction } from 'express';
import { RequestWithToken, users, RequestWithUser
 } from '../../lib/types';

 export const checkIfUserIsAdmin = async (req: RequestWithUser, res: Response, next:NextFunction) => {
    try {
        const { user: { user_id } } = req;
        const user = await db.oneOrNone(AuthQureies.fetchUserById, user_id);
        logger('info', `${enums.CURRENT_TIME_STAMP}, successfully fetched user from the DB checkIfUserIsAdmin.middleware.users.auth`);
        if(!user.is_admin){
            logger('info', `${enums.CURRENT_TIME_STAMP}, successfully confirms user is not an admin checkIfUserIsAdmin.middleware.users.auth`);
            return ApiResponse.error(res, enums.ACCESS_DENIED, enums.HTTP_UNAUTHORIZED);
        }
       return next();
    } catch (error) {
        error.label = enums.CHECK_IF_USER_IS_ADMIN_MIDDLEWARE
        logger('error', `${enums.CURRENT_TIME_STAMP}, checking if user is admin failed ${enums.CHECK_IF_USER_IS_ADMIN_MIDDLEWARE}, ::::error=>  ${error.message} `)    
    }
 };

 export const checkIfProductIsAvailable = async (req: RequestWithUser, res: Response, next:NextFunction) => {
    try {
        const { product_id, quantity } = req.body;
        const product = await db.oneOrNone(UserQueries.checkProductStatus, product_id);
        logger('info', `${enums.CURRENT_TIME_STAMP}, successfully fetched product status checkIfProductIsAvailable.middleware.users.auth`);
        if (product.status === 'sold out') {
            logger('info', `${enums.CURRENT_TIME_STAMP}, successfully confirms the product is sold out checkIfProductIsAvailable.middleware.users.auth`);
            return ApiResponse.error(res, enums.PRODUCT_IS_SOLD_OUT, enums.HTTP_FORBIDDEN)
        };
        if(product.quantity < quantity) {
            logger('info', `${enums.CURRENT_TIME_STAMP}, successfully confirms the quantity requested is less than the quantity available for sale.middleware.users.auth`);
            return ApiResponse.error(res, enums.FEW_QUANTITY_LEFT(product.quantity), enums.HTTP_FORBIDDEN)
        }
        return next()
    } catch (error) {
            error.label = enums.CHECK_IF_PRODUCT_IS_AVAILABLE_MIDDLEWARE
            logger('error', `${enums.CURRENT_TIME_STAMP}, checking if product is available failed ${enums.CHECK_IF_PRODUCT_IS_AVAILABLE_MIDDLEWARE}, ::::error=>  ${error.message} `)    
    }
 };

 export const checkIfProductExists = async (req: Request, res: Response, next:NextFunction) => {
    try {
        const { product_id } = req.query
        const product = await db.oneOrNone(UserQueries.checkProductStatus, product_id);
        if(!product) {
             logger('info', `${enums.CURRENT_TIME_STAMP}, successfully confirms product does not exist checkIfProductExists.middleware.users.auth`);
            return ApiResponse.error(res, enums.PRODUCT_DOES_NOT_EXIST, enums.HTTP_OK);
        }
        return next();
    } catch (error) {
        error.label = enums.CHECK_IF_PRODUCT_EXISTS_MIDDLEWARE
        logger('error', `${enums.CURRENT_TIME_STAMP}, checking if product is exists failed ${enums.CHECK_IF_PRODUCT_EXISTS_MIDDLEWARE}, ::::error=>  ${error.message} `)
    }
 }


