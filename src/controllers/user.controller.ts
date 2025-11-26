import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Affiche le dashboard avec la liste de tous les utilisateurs
 * Route protégée - accessible uniquement aux utilisateurs authentifiés
 */
export const showDashboard = async (req: Request, res: Response) => {
  try {
    // Récupérer tous les utilisateurs (sans les mots de passe)
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        createdAt: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    // Récupérer l'email de l'utilisateur connecté depuis la session
    const currentUserEmail = req.session.userEmail;

    res.render('dashboard', {
      users,
      currentUserEmail
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des utilisateurs:', error);
    res.status(500).render('error', {
      message: 'Une erreur est survenue lors du chargement du dashboard'
    });
  }
};

