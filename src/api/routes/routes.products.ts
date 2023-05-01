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

router.post(
    '/order',
    AuthMiddlewares.validateAuthToken,
    Model(Schema.orderProduct, 'payload'),
    ProductsMiddlewares.checkIfProductIsAvailable,
    UserControllers.orderAProduct
);

router.patch(
    '/update-quantity',
    AuthMiddlewares.validateAuthToken,
    ProductsMiddlewares.checkIfUserIsAdmin,
    Model(Schema.productId, 'query'),
    Model(Schema.updateProductQuantity, 'payload'),
    ProductsMiddlewares.checkIfProductExists,
    AdminControllers.updateProduct
);

router.get(
    '/:order_id/orders',
    AuthMiddlewares.validateAuthToken,
    UserControllers.fetchUserOrder
);

router.get(
    '/:order_id/order-status',
    AuthMiddlewares.validateAuthToken,
    Model(Schema.orderId, 'params'),
    UserControllers.trackOrder
);

router.patch(
    '/:order_id/cancel-order',
    AuthMiddlewares.validateAuthToken,
    Model(Schema.orderId, 'params'),
    UserControllers.cancelOrder
);

router.patch(
    '/:order_id/delete-order',
    AuthMiddlewares.validateAuthToken,
    Model(Schema.orderId, 'params'),
    UserControllers.deleteOrder
);




export default router;
