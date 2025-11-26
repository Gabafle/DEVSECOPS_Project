import { Request, Response, NextFunction } from 'express';

/**
 * Middleware de protection des routes
 * Vérifie si l'utilisateur est authentifié via la session
 * Redirige vers la page de connexion si non authentifié
 */
export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  // Vérifier si l'utilisateur a une session active avec un userId
  if (req.session && req.session.userId) {
    // L'utilisateur est authentifié, continuer
    return next();
  }

  // L'utilisateur n'est pas authentifié, rediriger vers la page de connexion
  res.redirect('/login');
};

/**
 * Middleware pour rediriger les utilisateurs déjà connectés
 * Utile pour les pages de connexion/inscription
 */
export const redirectIfAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  if (req.session && req.session.userId) {
    // L'utilisateur est déjà connecté, rediriger vers le dashboard
    return res.redirect('/dashboard');
  }

  // L'utilisateur n'est pas connecté, continuer
  next();
};

