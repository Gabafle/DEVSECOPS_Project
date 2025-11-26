import { Router } from 'express';
import { body } from 'express-validator';
import {
  showRegisterPage,
  register,
  showLoginPage,
  login,
  logout
} from '../controllers/auth.controller';
import { redirectIfAuthenticated } from '../middlewares/auth.middleware';

const router = Router();

// Validation pour l'inscription
const registerValidation = [
  body('email')
    .isEmail()
    .withMessage('Veuillez entrer une adresse email valide')
    .normalizeEmail(),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Le mot de passe doit contenir au moins 6 caractères'),
  body('confirmPassword')
    .notEmpty()
    .withMessage('Veuillez confirmer votre mot de passe')
];

// Validation pour la connexion
const loginValidation = [
  body('email')
    .isEmail()
    .withMessage('Veuillez entrer une adresse email valide')
    .normalizeEmail(),
  body('password')
    .notEmpty()
    .withMessage('Veuillez entrer votre mot de passe')
];

// Routes d'inscription
router.get('/register', redirectIfAuthenticated, showRegisterPage);
router.post('/register', redirectIfAuthenticated, registerValidation, register);

// Routes de connexion
router.get('/login', redirectIfAuthenticated, showLoginPage);
router.post('/login', redirectIfAuthenticated, loginValidation, login);

// Route de déconnexion
router.post('/logout', logout);

export default router;

