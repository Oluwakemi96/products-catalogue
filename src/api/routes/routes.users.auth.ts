import { Router } from "express";
import * as AuthMiddlewares from '../middlewares/middlewares.auth';
import * as AuthControllers from '../controllers/controller.users.auth';
import Model from '../middlewares/middlewares.model';
import * as Schema from '../../lib/schema/lib.schema.auth';

const router = Router();

router.post(
    '/signup',
    Model(Schema.signUp, 'payload'),
    AuthMiddlewares.checkIfEmailAlreadyExists,
    AuthMiddlewares.generateVerificationToken,
    AuthMiddlewares.setTokenExpiry,
    AuthControllers.signUpUser
);

router.patch(
    '/verify-email',
    Model(Schema.tokenParams, 'query'),
    AuthMiddlewares.checkIfTokenIsValid,
    AuthControllers.verifyEmail
)

router.patch(
    '/regenerate-token',
    Model(Schema.userEmail, 'payload'),
    AuthMiddlewares.checkIfEmailExists,
    AuthMiddlewares.generateVerificationToken,
    AuthMiddlewares.setTokenExpiry,
    AuthControllers.regerateVerificationToken
)

router.patch(
    '/forgot-password',
    Model(Schema.userEmail, 'payload'),
    AuthMiddlewares.checkIfEmailExists,
    AuthMiddlewares.generateVerificationToken,
    AuthMiddlewares.setTokenExpiry,
    AuthControllers.forgotPassword
);

router.patch(
    '/reset-password',
    Model(Schema.tokenParams, 'query'),
    Model(Schema.resetPassword, 'payload'),
    AuthMiddlewares.checkIfTokenIsValid,
    AuthControllers.resetPassword
);

router.post(
    '/login',
    Model(Schema.login, 'payload'),
    AuthMiddlewares.checkIfEmailExists,
    AuthMiddlewares.checkIfPasswordIsValid,
    AuthControllers.login
);


export default router