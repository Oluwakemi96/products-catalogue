import AuthQueries from '../queries/query.users';
import * as Hash from '../../lib/helpers/hash.auth';
import ApiResponse from '../../lib/http/lib.http.response';
import Payload from '../../lib/payloads/lib.payload.users';
import logger from '../../config/logger';
import enums from '../../lib/enums/index';
import { db } from '../../config/db/index';
import { Request, Response } from 'express';
import { RequestWithToken } from '../../lib/types';


export const signUpUser = async (req: RequestWithToken, res: Response, next: any) => {
    try {
        const { body, token, token_expiry } = req;
        const hashedPassword = Hash.hashUserPassword(body.password);
        const payload = Payload.signUpUser(body, token, token_expiry, hashedPassword);
        logger('info', `${enums.CURRENT_TIME_STAMP}, successfully hashed user password signUpUser.controller.users.auth`);
        const user = await db.oneOrNone(AuthQueries.registerUser, payload);
        logger('info', `${enums.CURRENT_TIME_STAMP}, successfully registered a user in the DB signUpUser.controller.users.auth`);
        return ApiResponse.success(res, enums.SIGNED_UP_USER_SUCCESSFULLY, enums.HTTP_CREATED, user);
    } catch (error) {
        error.label = enums.SIGN_UP_USER_CONTROLLER
        logger('error', `signing up user failed ${enums.SIGN_UP_USER_CONTROLLER}::::error=>  ${error.message}`)
    }
};