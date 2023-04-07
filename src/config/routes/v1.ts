import { Router } from 'express';
import AuthRoute from '../../api/routes/routes.users.auth';
import ProductRoute from '../../api/routes/routes.products';

const router = Router();
router.use('/auth', AuthRoute)
router.use('/product', ProductRoute)


export default router;