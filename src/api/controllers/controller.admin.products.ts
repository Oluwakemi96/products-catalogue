import AdminQueries from '../queries/query.admin.products';
import  ApiResponse from '../../lib/http/lib.http.response';
import Payload from '../../lib/payloads/lib.payload.users';
import logger from '../../config/logger';
import enums from '../../lib/enums/index';
import { db } from '../../config/db/index';
import { Response, NextFunction } from 'express';
import { RequestWithUser } from '../../lib/types';

export const addProducts = async (req:RequestWithUser, res:Response, next:NextFunction) => {
    try {
        const { body } = req;
        const payload = Payload.addProducts(body);
        const product = await db.oneOrNone(AdminQueries.addProducts, payload);
        logger('info', `${enums.CURRENT_TIME_STAMP}, successfully added a product to the DB addProducts.controller.users.auth`);
        return ApiResponse.success(res, enums.PRODUCT_ADDED_SUCCESSFULLY, enums.HTTP_CREATED, product);
    } catch (error) {
        error.label = enums.ADD_PRODUCT_CONTROLLER
        logger('error', `adding a product failed ${enums.ADD_PRODUCT_CONTROLLER}::::error=>  ${error.message}`)
    }
};