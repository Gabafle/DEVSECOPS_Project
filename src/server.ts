import express, { Request, Response, NextFunction } from 'express';
import session from 'express-session';
import path from 'path';
import dotenv from 'dotenv';
import { testDatabaseConnection, closeDatabaseConnection } from './config/database';
import { sessionConfig } from './config/session';

// Import des routes
import homeRoutes from './routes/home.routes';
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';

// Charger les variables d'environnement
dotenv.config();

// Créer l'application Express
const app = express();
const PORT = process.env.PORT || 3000;

/**
 * CONFIGURATION DU MOTEUR DE TEMPLATES
 */
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

/**
 * MIDDLEWARES GLOBAUX
 */

// Parser le corps des requêtes (formulaires)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Servir les fichiers statiques (CSS, JS, images)
app.use(express.static(path.join(__dirname, '../public')));

// Configuration des sessions
app.use(session(sessionConfig));

// Middleware pour rendre les données de session disponibles dans toutes les vues
app.use((req: Request, res: Response, next: NextFunction) => {
  res.locals.isAuthenticated = req.session && req.session.userId;
  res.locals.userEmail = req.session?.userEmail || null;
  next();
});

/**
 * ROUTES
 */
app.use('/', homeRoutes);
app.use('/', authRoutes);
app.use('/', userRoutes);

/**
 * GESTION DES ERREURS 404
 */
app.use((req: Request, res: Response) => {
  res.status(404).render('error', {
    message: 'Page non trouvée (404)'
  });
});

/**
 * GESTION DES ERREURS GLOBALES
 */
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('Erreur serveur:', err);
  res.status(500).render('error', {
    message: 'Une erreur serveur est survenue (500)'
  });
});

/**
 * DÉMARRAGE DU SERVEUR
 */
const startServer = async () => {
  try {
    // Tester la connexion à la base de données
    await testDatabaseConnection();

    // Démarrer le serveur
    app.listen(PORT, () => {
      console.log('');
      console.log('🦄 ═══════════════════════════════════════════════════════');
      console.log('🦄  Licorne Rose - Serveur démarré avec succès !');
      console.log('🦄 ═══════════════════════════════════════════════════════');
      console.log('');
      console.log(`   🌐 URL locale:        http://localhost:${PORT}`);
      console.log(`   📂 Environnement:     ${process.env.NODE_ENV || 'development'}`);
      console.log(`   🗄️  Base de données:   PostgreSQL (Prisma)`);
      console.log('');
      console.log('   📝 Routes disponibles:');
      console.log('      GET  /              - Page d\'accueil');
      console.log('      GET  /register      - Inscription');
      console.log('      POST /register      - Traiter l\'inscription');
      console.log('      GET  /login         - Connexion');
      console.log('      POST /login         - Traiter la connexion');
      console.log('      POST /logout        - Déconnexion');
      console.log('      GET  /dashboard     - Dashboard (protégé)');
      console.log('');
      console.log('🦄 ═══════════════════════════════════════════════════════');
      console.log('');
    });
  } catch (error) {
    console.error('❌ Erreur lors du démarrage du serveur:', error);
    process.exit(1);
  }
};

/**
 * GESTION DE L'ARRÊT PROPRE DU SERVEUR
 */
process.on('SIGINT', async () => {
  console.log('\n\n🛑 Arrêt du serveur en cours...');
  await closeDatabaseConnection();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('\n\n🛑 Arrêt du serveur en cours...');
  await closeDatabaseConnection();
  process.exit(0);
});

// Démarrer le serveur
startServer();

