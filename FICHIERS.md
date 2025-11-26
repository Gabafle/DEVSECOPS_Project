# 📂 Liste des fichiers - Licorne Rose

Guide complet de tous les fichiers du projet et leur rôle.

---

## 📄 Fichiers de configuration

### `package.json`
**Rôle** : Manifeste du projet npm
- Liste toutes les dépendances (production et développement)
- Définit les scripts npm (`dev`, `build`, `start`, etc.)
- Métadonnées du projet (nom, version, description)

### `tsconfig.json`
**Rôle** : Configuration du compilateur TypeScript
- Options de compilation (target ES2020, module commonjs)
- Chemins des dossiers source (`src/`) et de sortie (`dist/`)
- Règles de typage strict

### `.env.example`
**Rôle** : Modèle de variables d'environnement
- Exemple de configuration pour `DATABASE_URL`
- Variables pour le port, l'environnement, le secret de session
- **À copier en `.env` et personnaliser**

### `.env` (non versionné)
**Rôle** : Variables d'environnement réelles
- Contient les secrets et configurations sensibles
- **Ne doit JAMAIS être commité dans Git**

### `.gitignore`
**Rôle** : Fichiers à ignorer par Git
- `node_modules/`, `dist/`, `.env`
- Fichiers système et IDE
- Logs et fichiers temporaires

---

## 🗄️ Base de données (Prisma)

### `prisma/schema.prisma`
**Rôle** : Schéma de la base de données
- Définit les modèles `User` et `Session`
- Configuration du générateur Prisma Client
- Configuration de la connexion PostgreSQL

**Modèles** :
```prisma
User {
  id, email, passwordHash, createdAt, updatedAt
}

Session {
  sid, sess, expire
}
```

### `prisma/migrations/` (généré)
**Rôle** : Historique des migrations
- Chaque migration = un dossier avec un fichier SQL
- Permet de versionner les changements de schéma
- Appliqué avec `npm run prisma:migrate`

---

## 🎨 Frontend (Fichiers statiques)

### `public/css/style.css`
**Rôle** : Feuille de styles CSS
- Définit le thème rose avec variables CSS
- Styles pour tous les composants (boutons, cartes, formulaires, etc.)
- Design responsive avec media queries

**Sections** :
- Variables de couleurs (palette rose)
- Reset et styles de base
- Navigation
- Cartes et formulaires
- Boutons et messages
- Tableaux
- Utilitaires

---

## 👁️ Vues (Templates EJS)

### `src/views/layout.ejs`
**Rôle** : Layout principal (non utilisé dans cette version)
- Structure HTML de base
- Navigation avec menu conditionnel
- Footer

### `src/views/home.ejs`
**Rôle** : Page d'accueil
- Présentation de l'application
- Liens vers inscription et connexion
- Cartes de fonctionnalités

### `src/views/register.ejs`
**Rôle** : Formulaire d'inscription
- Champs : email, mot de passe, confirmation
- Validation HTML5
- Messages d'erreur et de succès

### `src/views/login.ejs`
**Rôle** : Formulaire de connexion
- Champs : email, mot de passe
- Messages d'erreur et de succès
- Lien vers l'inscription

### `src/views/dashboard.ejs`
**Rôle** : Dashboard protégé
- Affiche la liste de tous les utilisateurs
- Tableau avec email et date d'inscription
- Accessible uniquement aux utilisateurs authentifiés

### `src/views/error.ejs`
**Rôle** : Page d'erreur
- Affichage des erreurs 404, 500, etc.
- Message d'erreur personnalisé
- Liens de retour

---

## ⚙️ Configuration (Backend)

### `src/config/database.ts`
**Rôle** : Configuration Prisma Client
- Instance unique de Prisma Client
- Fonction de test de connexion
- Fonction de fermeture propre
- Logs en mode développement

### `src/config/session.ts`
**Rôle** : Configuration des sessions
- Configuration du store PostgreSQL (`connect-pg-simple`)
- Options de sécurité des cookies (httpOnly, secure, sameSite)
- Durée de vie des sessions (7 jours)

---

## 🎮 Contrôleurs (Logique métier)

### `src/controllers/auth.controller.ts`
**Rôle** : Gestion de l'authentification

**Fonctions** :
- `showRegisterPage()` : Affiche le formulaire d'inscription
- `register()` : Traite l'inscription (validation, hashage, création)
- `showLoginPage()` : Affiche le formulaire de connexion
- `login()` : Traite la connexion (vérification, création de session)
- `logout()` : Déconnexion (destruction de session)

**Sécurité** :
- Hashage bcrypt avec 10 rounds
- Vérification de l'unicité de l'email
- Comparaison sécurisée des mots de passe

### `src/controllers/user.controller.ts`
**Rôle** : Gestion des utilisateurs

**Fonctions** :
- `showDashboard()` : Affiche le dashboard avec la liste des utilisateurs

**Requêtes** :
- Récupère tous les utilisateurs (sans les mots de passe)
- Tri par date de création décroissante

### `src/controllers/home.controller.ts`
**Rôle** : Page d'accueil

**Fonctions** :
- `showHomePage()` : Affiche la page d'accueil
- Vérifie si l'utilisateur est authentifié pour adapter l'affichage

---

## 🛡️ Middlewares

### `src/middlewares/auth.middleware.ts`
**Rôle** : Protection des routes

**Middlewares** :
- `requireAuth()` : Vérifie l'authentification, redirige vers `/login` si non authentifié
- `redirectIfAuthenticated()` : Redirige vers `/dashboard` si déjà authentifié

**Utilisation** :
- `requireAuth` sur `/dashboard`
- `redirectIfAuthenticated` sur `/login` et `/register`

---

## 🛣️ Routes

### `src/routes/auth.routes.ts`
**Rôle** : Routes d'authentification

**Routes** :
- `GET /register` : Affiche le formulaire d'inscription
- `POST /register` : Traite l'inscription (avec validation)
- `GET /login` : Affiche le formulaire de connexion
- `POST /login` : Traite la connexion (avec validation)
- `POST /logout` : Déconnexion

**Validation** :
- Email valide et normalisé
- Mot de passe minimum 6 caractères
- Confirmation de mot de passe

### `src/routes/user.routes.ts`
**Rôle** : Routes des utilisateurs

**Routes** :
- `GET /dashboard` : Affiche le dashboard (protégé par `requireAuth`)

### `src/routes/home.routes.ts`
**Rôle** : Route de la page d'accueil

**Routes** :
- `GET /` : Affiche la page d'accueil

---

## 🔧 Types TypeScript

### `src/types/session.d.ts`
**Rôle** : Extension du type Session

**Déclaration** :
```typescript
declare module 'express-session' {
  interface SessionData {
    userId?: string;
    userEmail?: string;
  }
}
```

**Permet** :
- Autocomplétion pour `req.session.userId`
- Typage fort des données de session

---

## 🚀 Serveur

### `src/server.ts`
**Rôle** : Point d'entrée de l'application

**Responsabilités** :
1. Chargement des variables d'environnement (dotenv)
2. Configuration d'Express (body parser, fichiers statiques)
3. Configuration du moteur de templates EJS
4. Configuration des sessions
5. Enregistrement des routes
6. Gestion des erreurs 404 et 500
7. Démarrage du serveur
8. Gestion de l'arrêt propre (SIGINT, SIGTERM)

**Middlewares globaux** :
- `express.urlencoded()` : Parse les formulaires
- `express.json()` : Parse le JSON
- `express.static()` : Sert les fichiers statiques
- `session()` : Gestion des sessions

---

## 📚 Documentation

### `README.md`
**Rôle** : Documentation principale
- Vue d'ensemble du projet
- Guide d'installation complet
- Structure du projet
- Commandes Git et npm
- Tests manuels
- Sécurité
- Dépannage

### `INSTALLATION.md`
**Rôle** : Guide d'installation pas à pas
- Instructions détaillées pour chaque étape
- Vérification des prérequis
- Configuration de PostgreSQL
- Création de la base de données
- Tests de l'application

### `DEMARRAGE_RAPIDE.md`
**Rôle** : Démarrage rapide (10 minutes)
- Checklist avant de commencer
- 6 étapes essentielles
- Premiers tests
- Dépannage rapide

### `ARCHITECTURE.md`
**Rôle** : Documentation de l'architecture
- Diagrammes de flux
- Structure détaillée
- Cycle de vie d'une requête
- Modèle de données
- Sécurité
- Évolutions futures

### `CHOIX_TECHNIQUES.md`
**Rôle** : Justification des choix techniques
- Express vs NestJS
- Prisma vs Sequelize
- Sessions vs JWT
- EJS vs SPA
- CSS vs Tailwind
- bcrypt pour le hashage

### `COMMANDES.md`
**Rôle** : Aide-mémoire des commandes
- Commandes npm
- Commandes Prisma
- Commandes PostgreSQL
- Commandes Git
- Débogage
- Déploiement

### `FICHIERS.md` (ce fichier)
**Rôle** : Liste et description de tous les fichiers

---

## 🛠️ Scripts

### `quick-start.sh`
**Rôle** : Script d'installation automatique
- Vérifie les prérequis (Node.js, PostgreSQL)
- Installe les dépendances
- Crée le fichier `.env` avec un secret généré
- Guide pour créer la base de données
- Génère le client Prisma
- Lance les migrations
- Initialise Git (optionnel)

**Utilisation** :
```bash
./quick-start.sh
```

---

## 📦 Fichiers générés (non versionnés)

### `node_modules/`
**Rôle** : Dépendances npm installées
- Généré par `npm install`
- Contient toutes les bibliothèques
- **Ne doit pas être versionné**

### `dist/`
**Rôle** : Code JavaScript compilé
- Généré par `npm run build`
- Contient les fichiers `.js` compilés depuis TypeScript
- **Ne doit pas être versionné**

### `package-lock.json`
**Rôle** : Versions exactes des dépendances
- Généré automatiquement par npm
- Garantit des installations reproductibles
- **Doit être versionné**

### `.env`
**Rôle** : Variables d'environnement
- Créé à partir de `.env.example`
- Contient les secrets (DATABASE_URL, SESSION_SECRET)
- **Ne doit JAMAIS être versionné**

---

## 📊 Récapitulatif par catégorie

### Configuration (6 fichiers)
- `package.json`, `tsconfig.json`
- `.env.example`, `.gitignore`
- `prisma/schema.prisma`
- `quick-start.sh`

### Backend (11 fichiers)
- `src/server.ts`
- `src/config/` (2 fichiers)
- `src/controllers/` (3 fichiers)
- `src/middlewares/` (1 fichier)
- `src/routes/` (3 fichiers)
- `src/types/` (1 fichier)

### Frontend (7 fichiers)
- `public/css/style.css`
- `src/views/` (6 fichiers)

### Documentation (7 fichiers)
- `README.md`
- `INSTALLATION.md`
- `DEMARRAGE_RAPIDE.md`
- `ARCHITECTURE.md`
- `CHOIX_TECHNIQUES.md`
- `COMMANDES.md`
- `FICHIERS.md`

### Total : 31 fichiers (hors générés)

---

## 🔍 Comment trouver ce que vous cherchez ?

| Je veux... | Fichier à consulter |
|------------|---------------------|
| Modifier les couleurs | `public/css/style.css` |
| Ajouter une route | `src/routes/*.routes.ts` |
| Modifier la logique métier | `src/controllers/*.controller.ts` |
| Changer le schéma de la base | `prisma/schema.prisma` |
| Modifier une page HTML | `src/views/*.ejs` |
| Configurer les sessions | `src/config/session.ts` |
| Protéger une route | `src/middlewares/auth.middleware.ts` |
| Ajouter une dépendance | `package.json` |
| Comprendre l'architecture | `ARCHITECTURE.md` |
| Installer le projet | `INSTALLATION.md` ou `quick-start.sh` |

---

## 📝 Conventions de nommage

### Fichiers
- **Controllers** : `nom.controller.ts`
- **Routes** : `nom.routes.ts`
- **Middlewares** : `nom.middleware.ts`
- **Vues** : `nom.ejs`
- **Config** : `nom.ts`
- **Documentation** : `NOM_EN_MAJUSCULES.md`

### Code
- **Variables** : `camelCase`
- **Fonctions** : `camelCase`
- **Classes** : `PascalCase`
- **Constantes** : `UPPER_SNAKE_CASE`
- **Types** : `PascalCase`

---

**Ce guide vous aide à naviguer dans le projet. Chaque fichier a un rôle précis et bien défini.**

