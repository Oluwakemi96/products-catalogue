import dayjs from 'dayjs';
import logger from '../../config/logger/index';
import enums from '../../lib/enums';
import AuthQureies from '../queries/query.users.auth';
import ApiResponse from '../../lib/http/lib.http.response';
import { db } from '../../config/db';
import { Request, Response, NextFunction } from 'express';
import { RequestWithToken, users, RequestWithUser
 } from '../../lib/types';

 export const checkIfUserIsAdmin = async (req: RequestWithUser, res: Response, next:NextFunction) => {
    try {
        const { user: { user_id } } = req;
        const user = await db.oneOrNone(AuthQureies.fetchUserById, user_id);
        console.log(user);
        logger('info', `${enums.CURRENT_TIME_STAMP}, successfully fetched user from the DB checkIfUserIsAdmin.middleware.users.auth`);
        if(!user.is_admin){
            logger('info', `${enums.CURRENT_TIME_STAMP}, successfully confirms user is not an admin checkIfUserIsAdmin.middleware.users.auth`);
            return ApiResponse.error(res, enums.ACCESS_DENIED, enums.HTTP_FORBIDDEN);
        }
       return next();
    } catch (error) {
        error.label = enums.CHECK_IF_USER_IS_ADMIN_MIDDLEWARE
        logger('error', `${enums.CURRENT_TIME_STAMP}, checking if user is admin failed ${enums.CHECK_IF_USER_IS_ADMIN_MIDDLEWARE}, ::::error=>  ${error.message} `)    
    }
 }