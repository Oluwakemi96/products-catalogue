import * as Helpers from '../../lib/helpers/helpers';
import dayjs from 'dayjs';
import logger from '../../config/logger/index';
import enums from '../../lib/enums';
import AuthQureies from '../queries/query.users';
import ApiResponse from '../../lib/http/lib.http.response';
import { db } from '../../config/db';
import { Request, Response, NextFunction } from 'express';
import { RequestWithToken, users, RequestWithUser
 } from '../../lib/types';
import { date } from 'joi';

export const generateVerificationToken = async (req: RequestWithToken, res: Response, next: NextFunction) => {
    try {
        const verificationToken = Helpers.generateRandomString(10);
        logger('info', `${enums.CURRENT_TIME_STAMP}, 'successfully generated verification token generateVerificationToken.middlewares.auth`)
        req.token = verificationToken;
        return next();     
    } catch (error) {
      error.label = enums.GENERATE_VERIFICATION_TOKEN_MIDDLEWARE
      logger('error', `${enums.CURRENT_TIME_STAMP}, generating verification token failed ${enums.GENERATE_VERIFICATION_TOKEN_MIDDLEWARE} :::error=>  ${error.message}`)  
    }
};

export const setTokenExpiry = async (req: RequestWithToken, res: Response, next: NextFunction) => {
    try {
        const token_expiry = Helpers.setTokenExpire(10);
        logger('info', `${enums.CURRENT_TIME_STAMP}, 'successfully set token expiry time setTokenExpiry.middlewares.auth`)
        req.token_expiry = token_expiry;
        return next();
    } catch (error) {
     error.label = enums.SET_TOKEN_EXPIRY_MIDDLEWARE
     logger('error', `${enums.CURRENT_TIME_STAMP}, setting token expiry failed ${enums.SET_TOKEN_EXPIRY_MIDDLEWARE} ::::error=> ${error.message}`)
    }
};

export const checkIfEmailAlreadyExists = async (req: RequestWithUser, res: Response, next:NextFunction) => {
    try {
        const { email } = req.body;
        const user:users = await db.oneOrNone(AuthQureies.fetchUserByEmail, email);
        req.user = user;
        logger('info', `${enums.CURRENT_TIME_STAMP}, 'successfully checked if user with the email exists checkIfEmailAlreadyExists.middlewares.auth`)
        if (user) {
            logger('info', `${enums.CURRENT_TIME_STAMP}, 'successfully confirms user with the email already exists checkIfEmailAlreadyExists.middlewares.auth`)
            return ApiResponse.error(res, enums.USER_ALREADY_EXIST, enums.HTTP_FORBIDDEN)
        }
        return next();
    } catch (error) {
        error.label = enums.CHECK_IF_EMAIL_ALREADY_EXISTS_MIDDLEWARE
        logger('error', `${enums.CURRENT_TIME_STAMP}, checking if email already exists failed ${enums.CHECK_IF_EMAIL_ALREADY_EXISTS_MIDDLEWARE}, ::::error=>  ${error.message} `)
    }
};

export const checkIfEmailExists = async  (req: RequestWithUser, res: Response, next:NextFunction) => {
    try {
      const { email } = req.body;
      const user:users = await db.oneOrNone(AuthQureies.fetchUserByEmail, email);
      req.user = user;
      logger('info', `${enums.CURRENT_TIME_STAMP}, 'successfully checked if user with the email exists checkIfEmailExists.middlewares.auth`)
      if (!user){
        logger('info', `${enums.CURRENT_TIME_STAMP}, 'successfully confirms email does not exist checkIfEmailExists.middlewares.auth`)
        return ApiResponse.error(res, enums.USER_DOES_NOT_EXIST, enums.HTTP_FORBIDDEN)
        }    
        return next();
    } catch (error) {
        error.label = enums.CHECK_IF_EMAIL_EXISTS_MIDDLEWARE
        logger('error', `${enums.CURRENT_TIME_STAMP}, checking if email already exists failed ${enums.CHECK_IF_EMAIL_EXISTS_MIDDLEWARE}, ::::error=>  ${error.message} `)

    }
}

export const checkIfTokenIsValid = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
       const { query: { token } } = req;
       const user:users = await db.oneOrNone(AuthQureies.fetchUserByToken, token);
       console.log(user);
       logger('info', `${enums.CURRENT_TIME_STAMP}, 'successfully fetched user with the user token checkIfTokenIsValid.middlewares.auth`)
        req.user = user;
       if(!user){
        logger('info', `${enums.CURRENT_TIME_STAMP}, 'successfully confirms there is no user with the token checkIfTokenIsValid.middlewares.auth`)
        return ApiResponse.error(res, enums.INVALID_TOKEN, enums.HTTP_FORBIDDEN)
       }
       if((user.token_expiry) < dayjs().format() ){
        logger('info', `${enums.CURRENT_TIME_STAMP}, 'successfully confirms the token has expired checkIfTokenIsValid.middlewares.auth`)
        return ApiResponse.error(res, enums.TOKEN_EXPIRED, enums.HTTP_FORBIDDEN)
       }
       return next()
    } catch (error) {
     error.label = enums.CHECK_IF_TOKEN_IS_VALID_MIDDLEWARE 
     logger('error', `${enums.CURRENT_TIME_STAMP}, checking if email already exists failed ${enums.CHECK_IF_TOKEN_IS_VALID_MIDDLEWARE},
      ::::error=>  ${error.message} `)
    }
}