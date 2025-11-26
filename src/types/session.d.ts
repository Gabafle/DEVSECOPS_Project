// Extension du type Session pour inclure les données utilisateur
import 'express-session';

declare module 'express-session' {
  interface SessionData {
    userId?: string;
    userEmail?: string;
  }
}

