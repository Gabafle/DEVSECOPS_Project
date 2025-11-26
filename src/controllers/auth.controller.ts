import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Affiche la page d'inscription
 */
export const showRegisterPage = (req: Request, res: Response) => {
  res.render('register', { error: null, success: null });
};

/**
 * Traite l'inscription d'un nouvel utilisateur
 */
export const register = async (req: Request, res: Response) => {
  // Validation des données
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.render('register', {
      error: errors.array()[0].msg,
      success: null
    });
  }

  const { email, password, confirmPassword } = req.body;

  // Vérifier que les mots de passe correspondent
  if (password !== confirmPassword) {
    return res.render('register', {
      error: 'Les mots de passe ne correspondent pas',
      success: null
    });
  }

  try {
    // Vérifier si l'email existe déjà
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return res.render('register', {
        error: 'Cet email est déjà utilisé',
        success: null
      });
    }

    // Hasher le mot de passe (10 rounds de salt)
    const passwordHash = await bcrypt.hash(password, 10);

    // Créer l'utilisateur
    await prisma.user.create({
      data: {
        email,
        passwordHash
      }
    });

    // Rediriger vers la page de connexion avec un message de succès
    res.render('login', {
      error: null,
      success: 'Inscription réussie ! Vous pouvez maintenant vous connecter.'
    });
  } catch (error) {
    console.error('Erreur lors de l\'inscription:', error);
    res.render('register', {
      error: 'Une erreur est survenue lors de l\'inscription',
      success: null
    });
  }
};

/**
 * Affiche la page de connexion
 */
export const showLoginPage = (req: Request, res: Response) => {
  res.render('login', { error: null, success: null });
};

/**
 * Traite la connexion d'un utilisateur
 */
export const login = async (req: Request, res: Response) => {
  // Validation des données
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.render('login', {
      error: errors.array()[0].msg,
      success: null
    });
  }

  const { email, password } = req.body;

  try {
    // Rechercher l'utilisateur par email
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      return res.render('login', {
        error: 'Email ou mot de passe incorrect',
        success: null
      });
    }

    // Vérifier le mot de passe
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

    if (!isPasswordValid) {
      return res.render('login', {
        error: 'Email ou mot de passe incorrect',
        success: null
      });
    }

    // Créer la session utilisateur
    req.session.userId = user.id;
    req.session.userEmail = user.email;

    // Rediriger vers le dashboard
    res.redirect('/dashboard');
  } catch (error) {
    console.error('Erreur lors de la connexion:', error);
    res.render('login', {
      error: 'Une erreur est survenue lors de la connexion',
      success: null
    });
  }
};

/**
 * Déconnecte l'utilisateur
 */
export const logout = (req: Request, res: Response) => {
  // Détruire la session
  req.session.destroy((err) => {
    if (err) {
      console.error('Erreur lors de la déconnexion:', err);
      return res.redirect('/dashboard');
    }

    // Rediriger vers la page d'accueil
    res.redirect('/');
  });
};

