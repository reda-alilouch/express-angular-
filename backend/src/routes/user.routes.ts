import { Router } from 'express';
import { createAdmin } from '../controllers/admin.controller';

const router = Router();

router.post('/admin', createAdmin);

export default router;
