# 🦄 Licorne Rose

Application web d'authentification moderne avec un thème rose élégant, construite avec Node.js, TypeScript, Express et PostgreSQL.

## 📋 Table des matières

- [Fonctionnalités](#-fonctionnalités)
- [Stack technique](#-stack-technique)
- [Prérequis](#-prérequis)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Lancement de l'application](#-lancement-de-lapplication)
- [Structure du projet](#-structure-du-projet)
- [Tests manuels](#-tests-manuels)
- [Sécurité](#-sécurité)
- [Commandes Git](#-commandes-git)

## ✨ Fonctionnalités

- ✅ **Inscription** : Création de compte avec validation des données
- ✅ **Connexion** : Authentification sécurisée par email et mot de passe
- ✅ **Déconnexion** : Destruction propre des sessions
- ✅ **Dashboard protégé** : Affichage de la liste des utilisateurs (accessible uniquement aux utilisateurs authentifiés)
- ✅ **Thème rose** : Interface élégante avec une palette de couleurs roses harmonieuses
- ✅ **Sécurité** : Hashage des mots de passe avec bcrypt, sessions sécurisées, protection CSRF

## 🛠 Stack technique

### Backend
- **Node.js** avec **TypeScript** : Pour un code typé et maintenable
- **Express** : Framework HTTP léger et flexible
- **PostgreSQL** : Base de données relationnelle robuste
- **Prisma** : ORM moderne avec excellent support TypeScript

### Authentification
- **Sessions** : Stockées dans PostgreSQL via `connect-pg-simple`
- **bcrypt** : Hashage sécurisé des mots de passe (10 rounds de salt)

### Frontend
- **EJS** : Moteur de templates côté serveur
- **CSS personnalisé** : Thème rose avec dégradés et animations

### Validation
- **express-validator** : Validation des données côté serveur

## 📦 Prérequis

Avant de commencer, assurez-vous d'avoir installé :

- **Node.js** (version 18 ou supérieure) : [Télécharger Node.js](https://nodejs.org/)
- **PostgreSQL** (version 14 ou supérieure) : [Télécharger PostgreSQL](https://www.postgresql.org/download/)
- **npm** ou **yarn** (inclus avec Node.js)
- **Git** : [Télécharger Git](https://git-scm.com/)

## 🚀 Installation

### 1. Cloner ou initialiser le projet

Si vous partez de zéro :

```bash
# Créer le dossier du projet
mkdir LicorneRose
cd LicorneRose

# Initialiser Git
git init
```

Si vous clonez depuis un dépôt :

```bash
git clone <url-du-depot>
cd LicorneRose
```

### 2. Installer les dépendances

```bash
npm install
```

Cette commande installe toutes les dépendances listées dans `package.json`.

### 3. Créer la base de données PostgreSQL

Ouvrez un terminal PostgreSQL (psql) ou utilisez un client graphique comme pgAdmin :

```sql
-- Se connecter à PostgreSQL
psql -U postgres

-- Créer la base de données
CREATE DATABASE licorne_rose;

-- Créer un utilisateur (optionnel mais recommandé)
CREATE USER licorne_user WITH PASSWORD 'votre_mot_de_passe_securise';

-- Donner les permissions
GRANT ALL PRIVILEGES ON DATABASE licorne_rose TO licorne_user;

-- Quitter
\q
```

### 4. Configurer les variables d'environnement

Créez un fichier `.env` à la racine du projet (utilisez `.env.example` comme modèle) :

```bash
cp .env.example .env
```

Modifiez le fichier `.env` avec vos informations :

```env
# Base de données PostgreSQL
DATABASE_URL="postgresql://licorne_user:votre_mot_de_passe_securise@localhost:5432/licorne_rose?schema=public"

# Configuration du serveur
PORT=3000
NODE_ENV=development

# Secret pour les sessions (générer une chaîne aléatoire sécurisée)
SESSION_SECRET="votre-secret-tres-securise-a-changer-en-production"
```

**Important** : Pour générer un secret de session sécurisé, vous pouvez utiliser :

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 5. Générer le client Prisma et créer les tables

```bash
# Générer le client Prisma
npm run prisma:generate

# Créer les migrations et appliquer le schéma à la base de données
npm run prisma:migrate
```

Lorsque Prisma vous demande un nom pour la migration, vous pouvez entrer : `init`

## ⚙️ Configuration

### Variables d'environnement

| Variable | Description | Valeur par défaut |
|----------|-------------|-------------------|
| `DATABASE_URL` | URL de connexion PostgreSQL | - |
| `PORT` | Port du serveur | 3000 |
| `NODE_ENV` | Environnement (development/production) | development |
| `SESSION_SECRET` | Secret pour signer les sessions | - |

### Structure de la base de données

Le schéma Prisma définit deux tables :

**Table `users`** :
- `id` : UUID (clé primaire)
- `email` : String (unique)
- `passwordHash` : String
- `createdAt` : DateTime
- `updatedAt` : DateTime

**Table `session`** :
- `sid` : String (clé primaire)
- `sess` : JSON
- `expire` : DateTime

## 🎯 Lancement de l'application

### Mode développement (avec rechargement automatique)

```bash
npm run dev
```

Le serveur démarre sur `http://localhost:3000` et se recharge automatiquement à chaque modification du code.

### Mode production

```bash
# Compiler le TypeScript en JavaScript
npm run build

# Lancer le serveur en production
npm start
```

### Autres commandes utiles

```bash
# Ouvrir Prisma Studio (interface graphique pour la base de données)
npm run prisma:studio

# Générer le client Prisma après modification du schéma
npm run prisma:generate

# Créer une nouvelle migration
npm run prisma:migrate
```

## 📁 Structure du projet

```
LicorneRose/
├── prisma/
│   └── schema.prisma          # Schéma de la base de données
├── public/
│   └── css/
│       └── style.css          # Styles CSS avec thème rose
├── src/
│   ├── config/
│   │   ├── database.ts        # Configuration Prisma
│   │   └── session.ts         # Configuration des sessions
│   ├── controllers/
│   │   ├── auth.controller.ts # Logique d'authentification
│   │   ├── home.controller.ts # Logique de la page d'accueil
│   │   └── user.controller.ts # Logique du dashboard
│   ├── middlewares/
│   │   └── auth.middleware.ts # Protection des routes
│   ├── routes/
│   │   ├── auth.routes.ts     # Routes d'authentification
│   │   ├── home.routes.ts     # Route de la page d'accueil
│   │   └── user.routes.ts     # Routes du dashboard
│   ├── types/
│   │   └── session.d.ts       # Types TypeScript pour les sessions
│   ├── views/
│   │   ├── dashboard.ejs      # Vue du dashboard
│   │   ├── error.ejs          # Vue d'erreur
│   │   ├── home.ejs           # Vue de la page d'accueil
│   │   ├── layout.ejs         # Layout principal
│   │   ├── login.ejs          # Vue de connexion
│   │   └── register.ejs       # Vue d'inscription
│   └── server.ts              # Point d'entrée du serveur
├── .env                       # Variables d'environnement (non versionné)
├── .env.example               # Exemple de variables d'environnement
├── .gitignore                 # Fichiers à ignorer par Git
├── package.json               # Dépendances et scripts
├── tsconfig.json              # Configuration TypeScript
└── README.md                  # Documentation

```

### Rôle de chaque dossier

- **`prisma/`** : Contient le schéma de la base de données et les migrations
- **`public/`** : Fichiers statiques (CSS, JS, images) servis par Express
- **`src/config/`** : Configuration de la base de données et des sessions
- **`src/controllers/`** : Logique métier de l'application
- **`src/middlewares/`** : Middlewares personnalisés (authentification, etc.)
- **`src/routes/`** : Définition des routes HTTP
- **`src/types/`** : Déclarations de types TypeScript
- **`src/views/`** : Templates EJS pour le rendu HTML
- **`src/server.ts`** : Point d'entrée principal du serveur Express

## 🧪 Tests manuels

Une fois l'application lancée, vous pouvez tester les fonctionnalités suivantes :

### 1. Page d'accueil
- Ouvrez `http://localhost:3000`
- Vérifiez que la page s'affiche avec le thème rose
- Cliquez sur "Créer un compte" ou "Se connecter"

### 2. Inscription
- Allez sur `http://localhost:3000/register`
- Testez les validations :
  - Email invalide → Message d'erreur
  - Mot de passe trop court (< 6 caractères) → Message d'erreur
  - Mots de passe différents → Message d'erreur
- Créez un compte valide :
  - Email : `test@example.com`
  - Mot de passe : `password123`
- Vérifiez la redirection vers la page de connexion avec un message de succès

### 3. Connexion
- Allez sur `http://localhost:3000/login`
- Testez avec des identifiants incorrects → Message d'erreur
- Connectez-vous avec le compte créé précédemment
- Vérifiez la redirection vers le dashboard

### 4. Dashboard (page protégée)
- Une fois connecté, vous devriez voir :
  - Votre email dans la barre de navigation
  - La liste de tous les utilisateurs inscrits
  - Un bouton "Déconnexion"
- Créez plusieurs comptes pour voir la liste s'agrandir

### 5. Protection des routes
- Déconnectez-vous
- Essayez d'accéder à `http://localhost:3000/dashboard`
- Vous devriez être redirigé vers la page de connexion

### 6. Déconnexion
- Connectez-vous
- Cliquez sur "Déconnexion"
- Vérifiez que vous êtes redirigé vers la page d'accueil
- Essayez d'accéder au dashboard → Redirection vers la connexion

## 🔒 Sécurité

Cette application implémente plusieurs mesures de sécurité :

### Hashage des mots de passe
- Utilisation de **bcrypt** avec 10 rounds de salt
- Les mots de passe ne sont **jamais stockés en clair**
- Comparaison sécurisée lors de la connexion

### Sessions sécurisées
- Stockage des sessions dans PostgreSQL (plus sécurisé que la mémoire)
- Cookie httpOnly (protection contre XSS)
- Cookie secure en production (HTTPS uniquement)
- Cookie sameSite (protection CSRF)
- Secret de session fort et configurable

### Validation des données
- Validation côté serveur avec `express-validator`
- Normalisation des emails
- Vérification de la longueur des mots de passe
- Protection contre les injections SQL (Prisma)

### Protection des routes
- Middleware `requireAuth` pour les routes protégées
- Vérification de la session avant chaque requête
- Redirection automatique si non authentifié

### Bonnes pratiques
- Variables d'environnement pour les secrets
- Gestion propre des erreurs
- Logs des erreurs côté serveur
- Pas d'exposition des détails techniques aux utilisateurs

## 📝 Commandes Git

### Initialiser le dépôt

```bash
# Initialiser Git
git init

# Ajouter tous les fichiers (sauf ceux dans .gitignore)
git add .

# Premier commit
git commit -m "Initial commit: Application Licorne Rose"
```

### Commandes de base

```bash
# Voir le statut des fichiers
git status

# Ajouter des fichiers modifiés
git add .

# Faire un commit
git commit -m "Description des modifications"

# Voir l'historique
git log --oneline

# Créer une branche
git branch nom-de-la-branche

# Changer de branche
git checkout nom-de-la-branche

# Créer et changer de branche en une commande
git checkout -b nom-de-la-branche
```

### Fichiers ignorés par Git

Le fichier `.gitignore` exclut automatiquement :
- `node_modules/` : Dépendances npm
- `.env` : Variables d'environnement (secrets)
- `dist/` : Fichiers compilés
- Fichiers système (`.DS_Store`, etc.)
- Fichiers IDE (`.vscode/`, `.idea/`, etc.)

**⚠️ Important** : Ne **jamais** commit le fichier `.env` qui contient vos secrets !

### Connexion à un dépôt distant (GitHub, GitLab, etc.)

```bash
# Ajouter un dépôt distant
git remote add origin https://github.com/votre-username/licorne-rose.git

# Pousser le code
git push -u origin main

# Récupérer les modifications
git pull origin main
```

## 🎨 Personnalisation du thème

Le thème rose est défini dans `/public/css/style.css` avec des variables CSS :

```css
:root {
  --rose-primary: #ff69b4;      /* Rose vif */
  --rose-secondary: #ffb6c1;    /* Rose clair */
  --rose-dark: #c71585;         /* Rose foncé */
  --rose-light: #ffe4e1;        /* Rose très clair */
  --rose-accent: #ff1493;       /* Rose profond */
  --rose-pastel: #ffc0cb;       /* Rose pastel */
}
```

Vous pouvez facilement modifier ces couleurs pour personnaliser le thème.

## 🐛 Dépannage

### Erreur de connexion à la base de données

```
❌ Erreur de connexion à la base de données
```

**Solutions** :
- Vérifiez que PostgreSQL est démarré
- Vérifiez la variable `DATABASE_URL` dans `.env`
- Vérifiez que la base de données existe
- Vérifiez les identifiants de connexion

### Erreur lors des migrations Prisma

```
Error: P1001: Can't reach database server
```

**Solutions** :
- Vérifiez que PostgreSQL est accessible
- Vérifiez le format de `DATABASE_URL`
- Testez la connexion avec `psql`

### Port déjà utilisé

```
Error: listen EADDRINUSE: address already in use :::3000
```

**Solutions** :
- Changez le port dans `.env` : `PORT=3001`
- Ou arrêtez le processus utilisant le port 3000

### Erreur de session

```
Error: Failed to lookup session
```

**Solutions** :
- Vérifiez que la table `session` existe dans la base de données
- Relancez les migrations : `npm run prisma:migrate`

## 📚 Ressources

- [Documentation Express](https://expressjs.com/)
- [Documentation Prisma](https://www.prisma.io/docs/)
- [Documentation TypeScript](https://www.typescriptlang.org/docs/)
- [Documentation PostgreSQL](https://www.postgresql.org/docs/)
- [Documentation EJS](https://ejs.co/)
- [Documentation bcrypt](https://github.com/kelektiv/node.bcrypt.js)

## 📄 Licence

MIT

## 👨‍💻 Auteur

Projet créé pour démontrer une application web complète avec authentification sécurisée et thème personnalisé.

---

**Bon développement ! 🦄💗**

