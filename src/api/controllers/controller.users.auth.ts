import AuthQueries from '../queries/query.users';
import * as Hash from '../../lib/helpers/hash.auth';
import  ApiResponse from '../../lib/http/lib.http.response';
import Payload from '../../lib/payloads/lib.payload.users';
import logger from '../../config/logger';
import enums from '../../lib/enums/index';
import { db } from '../../config/db/index';
import { Request, Response, NextFunction } from 'express';
import { RequestWithToken, RequestWithUser } from '../../lib/types';


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

export const verifyEmail = async (req: RequestWithUser, res: Response, next: any ) => {
    try {
       const { user } = req;
       await db.none(AuthQueries.verifyUserEmail, user.user_id);
       logger('info', `${enums.CURRENT_TIME_STAMP}, successfully verified user email verifyEmail.controller.users.auth`);
       return ApiResponse.success(res, enums.EMAIL_VERIFIED_SUCCESSFULLY, enums.HTTP_OK, []);

    } catch (error) {
        error.label = enums.VERIFY_EMAIL_CONTROLLER
        logger('error', `verifying user email failed ${enums.VERIFY_EMAIL_CONTROLLER}::::error=>  ${error.message}`)
    }
}

export const regerateVerificationToken = async (req: RequestWithUser, res:Response, next:NextFunction) => {
    try {
       const { user, token, token_expiry } = req;
       await db.oneOrNone(AuthQueries.regenerateToken, ([ user.user_id, token, token_expiry ]));
       logger('info', `${enums.CURRENT_TIME_STAMP}, successfully verified user email regerateVerificationToken.controller.users.auth`);
       return ApiResponse.success(res, enums.TOKEN_REGENERATED_SUCCESSFULLY, enums.HTTP_OK, [])
    } catch (error) {
        error.label = enums.REGENERATE_TOKEN_CONTROLLER
        logger('error', `regerating verification token failed ${enums.REGENERATE_TOKEN_CONTROLLER}::::error=>  ${error.message}`)
    }
}

