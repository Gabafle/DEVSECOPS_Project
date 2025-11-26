import { Request, Response } from 'express';

/**
 * Affiche la page d'accueil
 */
export const showHomePage = (req: Request, res: Response) => {
  // Vérifier si l'utilisateur est déjà connecté
  const isAuthenticated = req.session && req.session.userId;

  res.render('home', {
    isAuthenticated,
    userEmail: req.session?.userEmail
  });
};

