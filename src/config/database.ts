import { PrismaClient } from '@prisma/client';

/**
 * Instance unique de Prisma Client
 * Utilisée pour toutes les interactions avec la base de données
 */
const prisma = new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
});

/**
 * Fonction pour tester la connexion à la base de données
 */
export const testDatabaseConnection = async () => {
  try {
    await prisma.$connect();
    console.log('✅ Connexion à la base de données PostgreSQL réussie');
  } catch (error) {
    console.error('❌ Erreur de connexion à la base de données:', error);
    process.exit(1);
  }
};

/**
 * Fonction pour fermer proprement la connexion à la base de données
 */
export const closeDatabaseConnection = async () => {
  await prisma.$disconnect();
  console.log('🔌 Connexion à la base de données fermée');
};

export default prisma;

