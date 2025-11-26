import { Router } from 'express';
import { showHomePage } from '../controllers/home.controller';

const router = Router();

// Route de la page d'accueil
router.get('/', showHomePage);

export default router;

