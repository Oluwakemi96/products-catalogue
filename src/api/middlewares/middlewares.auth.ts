import * as Helpers from '../../lib/helpers/helpers';
import * as Hash from '../../lib/helpers/hash.auth';
import dayjs from 'dayjs';
import logger from '../../config/logger/index';
import enums from '../../lib/enums';
import AuthQureies from '../queries/query.users.auth';
import ApiResponse from '../../lib/http/lib.http.response';
import { db } from '../../config/db';
import { Request, Response, NextFunction } from 'express';
import { RequestWithToken, users, RequestWithUser
 } from '../../lib/types';

export const validateAuthToken = async (req: RequestWithUser, res: Response, next:NextFunction) => {
    try {
        let token = req.headers.authorization;
        if (!token) {
            logger('info', `${enums.CURRENT_TIME_STAMP}, 'successfully confirms token does not exist in the headers validateAuthToken.middlewares.auth`)
            return ApiResponse.error(res, enums.NO_TOKEN, enums.HTTP_UNAUTHORIZED);
        }
        if (!token.startsWith('Bearer ')) {
            return ApiResponse.error(res, enums.INVALID_TOKEN, enums.HTTP_UNAUTHORIZED);
          }
          if (token.startsWith('Bearer ')) {
            token = token.slice(7, token.length);
            logger('info', `${enums.CURRENT_TIME_STAMP}, 'successfully extracts token validateAuthToken.middlewares.auth`)
            const decoded = Hash.decodeToken(token)
            logger('info', `${enums.CURRENT_TIME_STAMP}, 'successfully decoded the token validateAuthToken.middlewares.auth`)
        if (decoded.message){
            if (decoded.message === 'jwt expired'){
               return ApiResponse.error(res, enums.SESSION_EXPIRED, enums.HTTP_UNAUTHORIZED);  
            }
            logger('info', `${enums.CURRENT_TIME_STAMP}, 'successfully confirms that the decoded has a message validateAuthToken.middlewares.auth`)
            return ApiResponse.error(res, decoded.message, enums.HTTP_UNAUTHORIZED);
        }   
        const user = await db.oneOrNone(AuthQureies.fetchUserById, decoded.user_id);
        logger('info', `${enums.CURRENT_TIME_STAMP}, 'successfully fetched user by its id validateAuthToken.middlewares.auth`)
        if(!user) {
         logger('info', `${enums.CURRENT_TIME_STAMP}, 'successfully confirms user does not exist in the DB validateAuthToken.middlewares.auth`)
         return ApiResponse.error(res, enums.INVALID_TOKEN, enums.HTTP_UNAUTHORIZED);
        }
        if (user && (user.is_deleted || user.status === 'suspended' || user.status === 'deactivated')) {
            const userStatus = user.is_deleted ? 'deleted, kindly contact support team'  : `${user.status}, kindly contact support team`;
            logger('info', `${enums.CURRENT_TIME_STAMP}, ${decoded.user_id}:::Info: successfully confirms that user account is ${userStatus} in the database 
            validateAuthToken.middlewares.auth.js`);
            return ApiResponse.error(res, enums.USER_ACCOUNT_STATUS(userStatus), enums.HTTP_UNAUTHORIZED);
          }
          req.user = user;
          return next();


          }
    } catch (error) {
        
    }
}


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

export const checkIfPasswordIsValid = async (req: RequestWithUser, res: Response, next: NextFunction) => {
 try {
    const { body: { password }, user } = req;
    const passwordMatch = await Hash.comparePassword(password, user.password);
    if(!passwordMatch){
       logger('info', `${enums.CURRENT_TIME_STAMP}, 'successfully confirms passwords do not match checkIfPasswordIsValid.middlewares.auth`)
        return ApiResponse.error(res, enums.INVALID_PASSWORD, enums.HTTP_FORBIDDEN);
    }
    return next()
 } catch (error) {
    error.label = enums.CHECK_IF_PASSWORD_IS_VALID_MIDDLEWARE 
     logger('error', `${enums.CURRENT_TIME_STAMP}, checking if password is valid failed ${enums.CHECK_IF_PASSWORD_IS_VALID_MIDDLEWARE},
      ::::error=>  ${error.message} `)
 }
}