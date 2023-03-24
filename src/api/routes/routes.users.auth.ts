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
    Model(Schema.regerateToken, 'body'),
    AuthMiddlewares.checkIfEmailExists,
    AuthMiddlewares.generateVerificationToken,
    AuthMiddlewares.setTokenExpiry,
    AuthControllers.regerateVerificationToken
)

export default router