import { Router } from "express";
import * as AuthMiddlewares from '../middlewares/middlewares.auth';
import * as ProductsMiddlewares from '../middlewares/middlewares.products';
import * as  AdminControllers from '../controllers/controller.admin.products';
import * as  UserControllers from '../controllers/controller.users.products';
import Model from '../middlewares/middlewares.model';
import * as Schema from '../../lib/schema/lib.schema.product';

const router = Router();

router.post(
    '/add-Products',
    AuthMiddlewares.validateAuthToken,
    ProductsMiddlewares.checkIfUserIsAdmin,
    Model(Schema.addProduct, 'payload'),
    AdminControllers.addProducts
);

router.get(
    '/products',
    AuthMiddlewares.validateAuthToken,
    Model(Schema.fetchAllProducts, 'query'),
    UserControllers.fetchAllProducts
);
router.get(
    '/:product_id/product',
    AuthMiddlewares.validateAuthToken,
    Model(Schema.productId, 'params'),
    UserControllers.fetchAProduct
);

export default router;
