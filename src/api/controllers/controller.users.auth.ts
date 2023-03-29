import AuthQueries from '../queries/query.users';
import * as Hash from '../../lib/helpers/hash.auth';
import  ApiResponse from '../../lib/http/lib.http.response';
import Payload from '../../lib/payloads/lib.payload.users';
import logger from '../../config/logger';
import enums from '../../lib/enums/index';
import { db } from '../../config/db/index';
import { Request, Response, NextFunction } from 'express';
import { RequestWithToken, RequestWithUser } from '../../lib/types';
import * as Mails from '../../config/email';
import JWT from 'jsonwebtoken';
import config from '../../config/index';


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
};

export const regerateVerificationToken = async (req: RequestWithUser, res:Response, next:NextFunction) => {
    try {
       const { user, token, token_expiry } = req;
       await db.oneOrNone(AuthQueries.updateUserToken, ([ user.user_id, token, token_expiry ]));
       logger('info', `${enums.CURRENT_TIME_STAMP}, successfully verified user email regerateVerificationToken.controller.users.auth`);
       return ApiResponse.success(res, enums.TOKEN_REGENERATED_SUCCESSFULLY, enums.HTTP_OK, [])
    } catch (error) {
        error.label = enums.REGENERATE_TOKEN_CONTROLLER
        logger('error', `regenerating verification token failed ${enums.REGENERATE_TOKEN_CONTROLLER}::::error=>  ${error.message}`)
    }
};

export const forgotPassword = async (req: RequestWithUser, res:Response, next:NextFunction) => {
    try {
       const { user, token, token_expiry } = req;
       await db.none(AuthQueries.updateUserToken, ([ user.user_id, token, token_expiry ]) )
       logger('info', `${enums.CURRENT_TIME_STAMP}, successfully updated token for forgot password forgotPassword.controller.users.auth`);
       const url = `https:www.productscatalogue.com?=${token}`
        if(config.PRODUCT_CATALOGUE_NODE_ENV === 'test' ){
            return ApiResponse.success(res, enums.TOKEN_SENT_TO_USER_SUCCESSFULLY, enums.HTTP_OK, []);
        }
       await Mails.forgotPassword(user, url);
        return ApiResponse.success(res, enums.TOKEN_SENT_TO_USER_SUCCESSFULLY, enums.HTTP_OK, []);
    } catch (error) {
        error.label = enums.FORGOT_PASSWORD_CONTROLLER
        logger('error', `sending password token failed ${enums.FORGOT_PASSWORD_CONTROLLER}::::error=>  ${error.message}`)
    }

};

export const resetPassword = async (req: RequestWithUser, res:Response, next:NextFunction) => {
    try {
        const { user, body:{ password } } = req;
        const hashedPassword = Hash.hashUserPassword(password);
        await db.none(AuthQueries.resetPassword, ([ user.user_id, hashedPassword ]))
        logger('info', `${enums.CURRENT_TIME_STAMP}, successfully successfully reset user's password resetPassword.controller.users.auth`);
        return ApiResponse.success(res, enums.PASSWORD_RESET_SUCCESSFULLY, enums.HTTP_OK, []);
    } catch (error) {
        error.label = enums.RESET_PASSWORD_CONTROLLER
        logger('error', `sending password token failed ${enums.RESET_PASSWORD_CONTROLLER}::::error=>  ${error.message}`)
    }    
};

export const login = async (req: RequestWithUser, res:Response, next:NextFunction) => {
    try {
        const { user, user: { user_id } } = req;
        const token = JWT.sign({
           user_id
        }, config.PRODUCT_CATALOGUE_JWT_SECRET_KEY, {
            expiresIn: '20min'
        });
        logger('info', `${enums.CURRENT_TIME_STAMP}, successfully successfully generate a JWT token login.controller.users.auth`);
        delete user.password
        const data = {
            ...user,
            token
        }
        return ApiResponse.success( res, enums.USER_LOGIN_SUCCESSFULLY, enums.HTTP_OK, data );
    } catch (error) {
        error.label = enums.LOGIN_CONTROLLER
        logger('error', `logging in failed ${enums.LOGIN_CONTROLLER}::::error=>  ${error.message}`)
    }
}
