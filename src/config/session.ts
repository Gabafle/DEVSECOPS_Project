import session from 'express-session';
import connectPgSimple from 'connect-pg-simple';
import { Pool } from 'pg';

const PgSession = connectPgSimple(session);

/**
 * Configuration du pool de connexions PostgreSQL pour les sessions
 */
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

/**
 * Configuration du middleware de session
 * Utilise PostgreSQL pour stocker les sessions (plus sécurisé et scalable)
 */
export const sessionConfig: session.SessionOptions = {
  store: new PgSession({
    pool,
    tableName: 'session', // Doit correspondre au modèle dans schema.prisma
    createTableIfMissing: false, // La table est gérée par Prisma
  }),
  secret: process.env.SESSION_SECRET || 'votre-secret-par-defaut-a-changer',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production', // HTTPS uniquement en production
    httpOnly: true, // Protection contre XSS
    maxAge: 1000 * 60 * 60 * 24 * 7, // 7 jours
    sameSite: 'lax', // Protection CSRF
  },
  name: 'licorne.sid', // Nom personnalisé du cookie de session
};

