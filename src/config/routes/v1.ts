import { Router } from 'express';
import AuthRoute from '../../api/routes/routes.users.auth';

const router = Router();
router.use('/auth', AuthRoute)



export default router;