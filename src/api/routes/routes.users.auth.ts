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

export default router