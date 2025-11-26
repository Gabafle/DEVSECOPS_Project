# 🏗️ Architecture - Licorne Rose

Documentation détaillée de l'architecture de l'application.

---

## 📊 Vue d'ensemble

```
┌─────────────────────────────────────────────────────────────┐
│                         NAVIGATEUR                          │
│                    (Client HTTP/HTML)                       │
└────────────────────────┬────────────────────────────────────┘
                         │
                         │ HTTP Request/Response
                         │ (HTML, CSS, Cookies)
                         │
┌────────────────────────▼────────────────────────────────────┐
│                      SERVEUR EXPRESS                        │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │              MIDDLEWARES GLOBAUX                    │   │
│  │  • express.urlencoded (parsing formulaires)         │   │
│  │  • express.static (fichiers CSS/JS)                 │   │
│  │  • express-session (gestion sessions)               │   │
│  └─────────────────────┬───────────────────────────────┘   │
│                        │                                    │
│  ┌─────────────────────▼───────────────────────────────┐   │
│  │                   ROUTES                            │   │
│  │  • / (home)                                         │   │
│  │  • /register (inscription)                          │   │
│  │  • /login (connexion)                               │   │
│  │  • /logout (déconnexion)                            │   │
│  │  • /dashboard (protégé)                             │   │
│  └─────────────────────┬───────────────────────────────┘   │
│                        │                                    │
│  ┌─────────────────────▼───────────────────────────────┐   │
│  │              MIDDLEWARES AUTH                       │   │
│  │  • requireAuth (protection routes)                  │   │
│  │  • redirectIfAuthenticated                          │   │
│  └─────────────────────┬───────────────────────────────┘   │
│                        │                                    │
│  ┌─────────────────────▼───────────────────────────────┐   │
│  │                CONTRÔLEURS                          │   │
│  │  • auth.controller (inscription, connexion)         │   │
│  │  • user.controller (dashboard)                      │   │
│  │  • home.controller (page d'accueil)                 │   │
│  └─────────────────────┬───────────────────────────────┘   │
│                        │                                    │
│  ┌─────────────────────▼───────────────────────────────┐   │
│  │              PRISMA CLIENT                          │   │
│  │  • findUnique, findMany, create, etc.               │   │
│  └─────────────────────┬───────────────────────────────┘   │
└────────────────────────┼────────────────────────────────────┘
                         │
                         │ SQL Queries
                         │
┌────────────────────────▼────────────────────────────────────┐
│                   POSTGRESQL                                │
│                                                             │
│  ┌──────────────┐         ┌──────────────┐                 │
│  │    users     │         │   session    │                 │
│  ├──────────────┤         ├──────────────┤                 │
│  │ id           │         │ sid          │                 │
│  │ email        │         │ sess         │                 │
│  │ passwordHash │         │ expire       │                 │
│  │ createdAt    │         └──────────────┘                 │
│  │ updatedAt    │                                          │
│  └──────────────┘                                          │
└─────────────────────────────────────────────────────────────┘
```

---

## 🔄 Flux de données

### 1. Inscription d'un utilisateur

```
┌─────────┐     POST /register      ┌──────────┐
│ Client  │ ────────────────────────>│  Routes  │
└─────────┘   email, password, etc.  └────┬─────┘
                                           │
                                           │ Validation
                                           ▼
                                    ┌──────────────┐
                                    │ Contrôleur   │
                                    │ (register)   │
                                    └──────┬───────┘
                                           │
                                           │ 1. Vérifier email unique
                                           │ 2. Hasher le mot de passe
                                           │ 3. Créer l'utilisateur
                                           ▼
                                    ┌──────────────┐
                                    │   Prisma     │
                                    └──────┬───────┘
                                           │
                                           │ INSERT INTO users
                                           ▼
                                    ┌──────────────┐
                                    │  PostgreSQL  │
                                    └──────┬───────┘
                                           │
                                           │ Utilisateur créé
                                           ▼
┌─────────┐     Redirect /login     ┌──────────────┐
│ Client  │ <───────────────────────│  Contrôleur  │
└─────────┘   Message de succès     └──────────────┘
```

### 2. Connexion d'un utilisateur

```
┌─────────┐     POST /login         ┌──────────┐
│ Client  │ ────────────────────────>│  Routes  │
└─────────┘   email, password        └────┬─────┘
                                           │
                                           │ Validation
                                           ▼
                                    ┌──────────────┐
                                    │ Contrôleur   │
                                    │ (login)      │
                                    └──────┬───────┘
                                           │
                                           │ 1. Trouver l'utilisateur
                                           ▼
                                    ┌──────────────┐
                                    │   Prisma     │
                                    └──────┬───────┘
                                           │
                                           │ SELECT * FROM users WHERE email = ?
                                           ▼
                                    ┌──────────────┐
                                    │  PostgreSQL  │
                                    └──────┬───────┘
                                           │
                                           │ Utilisateur trouvé
                                           ▼
                                    ┌──────────────┐
                                    │ Contrôleur   │
                                    │ 2. Vérifier  │
                                    │    bcrypt    │
                                    └──────┬───────┘
                                           │
                                           │ 3. Créer la session
                                           ▼
                                    ┌──────────────┐
                                    │   Session    │
                                    │   Store      │
                                    └──────┬───────┘
                                           │
                                           │ INSERT INTO session
                                           ▼
                                    ┌──────────────┐
                                    │  PostgreSQL  │
                                    └──────┬───────┘
                                           │
                                           │ Cookie de session
                                           ▼
┌─────────┐   Redirect /dashboard   ┌──────────────┐
│ Client  │ <───────────────────────│  Contrôleur  │
└─────────┘   Set-Cookie: sid=...   └──────────────┘
```

### 3. Accès à une page protégée

```
┌─────────┐     GET /dashboard      ┌──────────┐
│ Client  │ ────────────────────────>│  Routes  │
└─────────┘   Cookie: sid=...        └────┬─────┘
                                           │
                                           │ Middleware requireAuth
                                           ▼
                                    ┌──────────────┐
                                    │ Vérifier     │
                                    │ session      │
                                    └──────┬───────┘
                                           │
                                           │ SELECT * FROM session WHERE sid = ?
                                           ▼
                                    ┌──────────────┐
                                    │  PostgreSQL  │
                                    └──────┬───────┘
                                           │
                                           │ Session valide
                                           ▼
                                    ┌──────────────┐
                                    │ Contrôleur   │
                                    │ (dashboard)  │
                                    └──────┬───────┘
                                           │
                                           │ Récupérer tous les utilisateurs
                                           ▼
                                    ┌──────────────┐
                                    │   Prisma     │
                                    └──────┬───────┘
                                           │
                                           │ SELECT * FROM users
                                           ▼
                                    ┌──────────────┐
                                    │  PostgreSQL  │
                                    └──────┬───────┘
                                           │
                                           │ Liste des utilisateurs
                                           ▼
                                    ┌──────────────┐
                                    │   Vue EJS    │
                                    │ (dashboard)  │
                                    └──────┬───────┘
                                           │
                                           │ HTML généré
                                           ▼
┌─────────┐         HTML            ┌──────────────┐
│ Client  │ <───────────────────────│  Serveur     │
└─────────┘                         └──────────────┘
```

---

## 📁 Structure détaillée des dossiers

```
LicorneRose/
│
├── prisma/                          # Configuration Prisma
│   ├── schema.prisma                # Schéma de la base de données
│   └── migrations/                  # Historique des migrations
│       └── YYYYMMDDHHMMSS_init/
│           └── migration.sql
│
├── public/                          # Fichiers statiques (servis par Express)
│   └── css/
│       └── style.css                # Styles CSS avec thème rose
│
├── src/                             # Code source TypeScript
│   │
│   ├── config/                      # Configuration de l'application
│   │   ├── database.ts              # Configuration Prisma Client
│   │   └── session.ts               # Configuration des sessions
│   │
│   ├── controllers/                 # Logique métier (business logic)
│   │   ├── auth.controller.ts       # Inscription, connexion, déconnexion
│   │   ├── home.controller.ts       # Page d'accueil
│   │   └── user.controller.ts       # Dashboard, liste des utilisateurs
│   │
│   ├── middlewares/                 # Middlewares personnalisés
│   │   └── auth.middleware.ts       # Protection des routes, vérification auth
│   │
│   ├── routes/                      # Définition des routes HTTP
│   │   ├── auth.routes.ts           # Routes d'authentification
│   │   ├── home.routes.ts           # Route de la page d'accueil
│   │   └── user.routes.ts           # Routes du dashboard
│   │
│   ├── types/                       # Déclarations de types TypeScript
│   │   └── session.d.ts             # Extension du type Session
│   │
│   ├── views/                       # Templates EJS (rendu côté serveur)
│   │   ├── layout.ejs               # Layout principal (header, footer)
│   │   ├── home.ejs                 # Page d'accueil
│   │   ├── register.ejs             # Formulaire d'inscription
│   │   ├── login.ejs                # Formulaire de connexion
│   │   ├── dashboard.ejs            # Dashboard avec liste des utilisateurs
│   │   └── error.ejs                # Page d'erreur
│   │
│   └── server.ts                    # Point d'entrée du serveur Express
│
├── dist/                            # Fichiers JavaScript compilés (généré)
│   └── ...
│
├── node_modules/                    # Dépendances npm (généré)
│   └── ...
│
├── .env                             # Variables d'environnement (NON VERSIONNÉ)
├── .env.example                     # Exemple de variables d'environnement
├── .gitignore                       # Fichiers à ignorer par Git
├── package.json                     # Dépendances et scripts npm
├── package-lock.json                # Versions exactes des dépendances
├── tsconfig.json                    # Configuration TypeScript
├── quick-start.sh                   # Script d'installation automatique
│
├── README.md                        # Documentation principale
├── INSTALLATION.md                  # Guide d'installation détaillé
├── ARCHITECTURE.md                  # Ce fichier
├── CHOIX_TECHNIQUES.md              # Justification des choix techniques
└── COMMANDES.md                     # Aide-mémoire des commandes
```

---

## 🔌 Dépendances principales

### Production (`dependencies`)

| Package | Version | Rôle |
|---------|---------|------|
| `@prisma/client` | ^5.7.1 | Client Prisma pour interagir avec PostgreSQL |
| `bcrypt` | ^5.1.1 | Hashage sécurisé des mots de passe |
| `connect-pg-simple` | ^9.0.1 | Stockage des sessions dans PostgreSQL |
| `dotenv` | ^16.3.1 | Chargement des variables d'environnement |
| `ejs` | ^3.1.9 | Moteur de templates pour le rendu HTML |
| `express` | ^4.18.2 | Framework HTTP pour Node.js |
| `express-session` | ^1.17.3 | Gestion des sessions utilisateur |
| `express-validator` | ^7.0.1 | Validation des données côté serveur |
| `pg` | ^8.11.3 | Driver PostgreSQL pour Node.js |

### Développement (`devDependencies`)

| Package | Version | Rôle |
|---------|---------|------|
| `@types/bcrypt` | ^5.0.2 | Types TypeScript pour bcrypt |
| `@types/express` | ^4.17.21 | Types TypeScript pour Express |
| `@types/express-session` | ^1.17.10 | Types TypeScript pour express-session |
| `@types/node` | ^20.10.5 | Types TypeScript pour Node.js |
| `@types/pg` | ^8.10.9 | Types TypeScript pour pg |
| `prisma` | ^5.7.1 | CLI Prisma pour les migrations |
| `tsx` | ^4.7.0 | Exécuteur TypeScript avec rechargement automatique |
| `typescript` | ^5.3.3 | Compilateur TypeScript |

---

## 🔐 Sécurité - Couches de protection

### 1. Hashage des mots de passe

```typescript
// Dans auth.controller.ts
const passwordHash = await bcrypt.hash(password, 10);
// 10 rounds de salt = ~100ms de calcul
// Protège contre les attaques par force brute
```

**Protection contre** :
- ✅ Attaques par dictionnaire
- ✅ Attaques par force brute
- ✅ Rainbow tables
- ✅ Exposition de la base de données

### 2. Sessions sécurisées

```typescript
// Dans config/session.ts
cookie: {
  secure: process.env.NODE_ENV === 'production',  // HTTPS uniquement en prod
  httpOnly: true,                                  // Pas accessible en JS
  maxAge: 1000 * 60 * 60 * 24 * 7,                // 7 jours
  sameSite: 'lax',                                 // Protection CSRF
}
```

**Protection contre** :
- ✅ XSS (Cross-Site Scripting) via httpOnly
- ✅ CSRF (Cross-Site Request Forgery) via sameSite
- ✅ Man-in-the-middle via secure (HTTPS)
- ✅ Session fixation via regeneration

### 3. Validation des données

```typescript
// Dans auth.routes.ts
body('email')
  .isEmail()
  .withMessage('Email invalide')
  .normalizeEmail()
```

**Protection contre** :
- ✅ Injection SQL (via Prisma + validation)
- ✅ XSS (via échappement EJS)
- ✅ Données malformées
- ✅ Attaques par injection

### 4. Protection des routes

```typescript
// Dans auth.middleware.ts
export const requireAuth = (req, res, next) => {
  if (req.session && req.session.userId) {
    return next();
  }
  res.redirect('/login');
};
```

**Protection contre** :
- ✅ Accès non autorisé aux pages protégées
- ✅ Énumération des utilisateurs
- ✅ Escalade de privilèges

---

## 🎨 Architecture du frontend

### Moteur de templates : EJS

```
┌─────────────────────────────────────────┐
│         layout.ejs (Layout global)      │
│  ┌───────────────────────────────────┐  │
│  │         Navbar                    │  │
│  │  • Logo                           │  │
│  │  • Menu (conditionnel)            │  │
│  └───────────────────────────────────┘  │
│                                         │
│  ┌───────────────────────────────────┐  │
│  │         <%- body %>               │  │ <- Contenu dynamique
│  │  (home.ejs, login.ejs, etc.)      │  │
│  └───────────────────────────────────┘  │
│                                         │
│  ┌───────────────────────────────────┐  │
│  │         Footer                    │  │
│  └───────────────────────────────────┘  │
└─────────────────────────────────────────┘
```

**Note** : Dans cette version, nous n'utilisons pas de layout wrapper. Chaque vue est indépendante mais partage les mêmes styles.

### Thème rose - Variables CSS

```css
:root {
  --rose-primary: #ff69b4;      /* Boutons, liens */
  --rose-secondary: #ffb6c1;    /* Backgrounds secondaires */
  --rose-dark: #c71585;         /* Titres, texte important */
  --rose-light: #ffe4e1;        /* Backgrounds clairs */
  --rose-accent: #ff1493;       /* Accents, hover */
  --rose-pastel: #ffc0cb;       /* Dégradés */
}
```

---

## 🔄 Cycle de vie d'une requête

### Exemple : GET /dashboard

```
1. Client envoie GET /dashboard avec cookie de session
   ↓
2. Express reçoit la requête
   ↓
3. Middleware express-session
   • Lit le cookie sid
   • Récupère la session depuis PostgreSQL
   • Attache req.session à la requête
   ↓
4. Route /dashboard
   • Appelle le middleware requireAuth
   ↓
5. Middleware requireAuth
   • Vérifie req.session.userId
   • Si absent → redirect /login
   • Si présent → next()
   ↓
6. Contrôleur showDashboard
   • Récupère tous les utilisateurs via Prisma
   • Rend la vue dashboard.ejs avec les données
   ↓
7. EJS génère le HTML
   • Remplace les variables (users, currentUserEmail)
   • Applique les conditions et boucles
   ↓
8. Express envoie le HTML au client
   ↓
9. Navigateur affiche la page
   • Charge le CSS depuis /css/style.css
   • Applique le thème rose
```

---

## 📊 Modèle de données

### Schéma Prisma

```prisma
model User {
  id           String   @id @default(uuid())
  email        String   @unique
  passwordHash String
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt

  @@map("users")
}

model Session {
  sid    String   @id
  sess   Json
  expire DateTime

  @@index([expire])
  @@map("session")
}
```

### Relations

```
┌─────────────────┐
│      User       │
├─────────────────┤
│ id (PK)         │
│ email (UNIQUE)  │
│ passwordHash    │
│ createdAt       │
│ updatedAt       │
└─────────────────┘

┌─────────────────┐
│    Session      │
├─────────────────┤
│ sid (PK)        │
│ sess (JSON)     │  <- Contient { userId, userEmail }
│ expire          │
└─────────────────┘
```

**Note** : Pas de relation explicite entre User et Session dans Prisma, car la session est gérée par `connect-pg-simple`.

---

## 🚀 Déploiement

### Architecture de production recommandée

```
┌─────────────────────────────────────────────────────────┐
│                    INTERNET                             │
└────────────────────────┬────────────────────────────────┘
                         │
                         │ HTTPS
                         ▼
┌─────────────────────────────────────────────────────────┐
│              Reverse Proxy (Nginx)                      │
│  • Gestion SSL/TLS                                      │
│  • Compression gzip                                     │
│  • Cache des fichiers statiques                         │
└────────────────────────┬────────────────────────────────┘
                         │
                         │ HTTP (localhost)
                         ▼
┌─────────────────────────────────────────────────────────┐
│           Gestionnaire de processus (PM2)               │
│  • Redémarrage automatique                              │
│  • Clustering (plusieurs instances)                     │
│  • Logs                                                 │
└────────────────────────┬────────────────────────────────┘
                         │
                         │
                         ▼
┌─────────────────────────────────────────────────────────┐
│              Application Node.js                        │
│  • Express + TypeScript                                 │
│  • Prisma Client                                        │
└────────────────────────┬────────────────────────────────┘
                         │
                         │ SQL
                         ▼
┌─────────────────────────────────────────────────────────┐
│              PostgreSQL                                 │
│  • Base de données principale                           │
│  • Stockage des sessions                                │
└─────────────────────────────────────────────────────────┘
```

---

## 📈 Évolutions futures possibles

### Phase 1 : Améliorations de base
- [ ] Email de vérification
- [ ] Réinitialisation de mot de passe
- [ ] Upload d'avatar
- [ ] Profil utilisateur éditable

### Phase 2 : Fonctionnalités avancées
- [ ] Rôles et permissions (admin, user)
- [ ] OAuth (Google, GitHub)
- [ ] Authentification à deux facteurs (2FA)
- [ ] Logs d'activité

### Phase 3 : Performance et scalabilité
- [ ] Cache Redis pour les sessions
- [ ] CDN pour les fichiers statiques
- [ ] Pagination de la liste des utilisateurs
- [ ] Rate limiting (limitation du nombre de requêtes)

### Phase 4 : API REST
- [ ] Endpoints API REST
- [ ] JWT pour l'API
- [ ] Documentation Swagger
- [ ] Frontend SPA (React/Vue)

---

## 🧪 Tests (à implémenter)

### Tests unitaires
```typescript
// Exemple : tester le hashage de mot de passe
describe('Password hashing', () => {
  it('should hash password correctly', async () => {
    const password = 'password123';
    const hash = await bcrypt.hash(password, 10);
    const isValid = await bcrypt.compare(password, hash);
    expect(isValid).toBe(true);
  });
});
```

### Tests d'intégration
```typescript
// Exemple : tester l'inscription
describe('POST /register', () => {
  it('should create a new user', async () => {
    const res = await request(app)
      .post('/register')
      .send({
        email: 'test@example.com',
        password: 'password123',
        confirmPassword: 'password123'
      });
    expect(res.status).toBe(302); // Redirect
  });
});
```

### Tests E2E (End-to-End)
- Playwright ou Cypress pour tester le parcours utilisateur complet

---

## 📚 Ressources complémentaires

- [Express Best Practices](https://expressjs.com/en/advanced/best-practice-security.html)
- [Prisma Best Practices](https://www.prisma.io/docs/guides/performance-and-optimization)
- [Node.js Security Checklist](https://cheatsheetseries.owasp.org/cheatsheets/Nodejs_Security_Cheat_Sheet.html)
- [PostgreSQL Performance Tips](https://wiki.postgresql.org/wiki/Performance_Optimization)

---

**Cette architecture est conçue pour être simple, sécurisée et évolutive. Elle peut facilement s'adapter aux besoins futurs du projet.**

