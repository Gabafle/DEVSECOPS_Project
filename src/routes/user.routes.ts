import { Router } from 'express';
import { showDashboard } from '../controllers/user.controller';
import { requireAuth } from '../middlewares/auth.middleware';

const router = Router();

// Route protégée du dashboard
router.get('/dashboard', requireAuth, showDashboard);

export default router;

