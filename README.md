# 🦄 Licorne Rose

**Plateforme de gestion des utilisateurs professionnelle avec thème rose et blanc**

![Node.js](https://img.shields.io/badge/Node.js-18+-green)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-14+-blue)
![License](https://img.shields.io/badge/License-MIT-yellow)

---

## 📋 Description

Licorne Rose est une application web moderne de gestion des utilisateurs construite avec :
- **Backend** : Node.js, TypeScript, Express
- **Base de données** : PostgreSQL avec Prisma ORM
- **Frontend** : EJS avec design rose et blanc professionnel
- **Sécurité** : Authentification par sessions, hashage bcrypt

---

## ✨ Fonctionnalités

- ✅ **Inscription** avec validation des données
- ✅ **Connexion** sécurisée avec sessions PostgreSQL
- ✅ **Dashboard** protégé affichant tous les utilisateurs
- ✅ **Déconnexion** propre
- ✅ **Design professionnel** rose et blanc
- ✅ **Sécurité robuste** (bcrypt, sessions, protection XSS/CSRF)

---

## 🚀 Installation rapide

### Prérequis

- Node.js 18+ ([Télécharger](https://nodejs.org/))
- PostgreSQL 14+ ([Télécharger](https://www.postgresql.org/download/))
- Git ([Télécharger](https://git-scm.com/))

### Étapes d'installation

```bash
# 1. Cloner le dépôt
git clone https://github.com/Gabafle/Cloud_Computing_Project.git
cd Cloud_Computing_Project

# 2. Installer les dépendances
npm install

# 3. Créer la base de données PostgreSQL
createdb licorne_rose

# 4. Configurer les variables d'environnement
cp .env.example .env
# Éditez .env avec vos identifiants PostgreSQL

# 5. Créer les tables
npm run prisma:generate
npx prisma db push

# 6. Lancer l'application
npm run dev
```

**Ouvrez** : http://localhost:3000

---

## ⚙️ Configuration

### Fichier `.env`

Créez un fichier `.env` à la racine du projet :

```env
# Base de données PostgreSQL
DATABASE_URL="postgresql://UTILISATEUR:MOT_DE_PASSE@localhost:5432/licorne_rose?schema=public"

# Configuration du serveur
PORT=3000
NODE_ENV=development

# Secret pour les sessions (générer avec: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))")
SESSION_SECRET="votre-secret-securise-ici"
```

### Générer un secret de session

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

---

## 📦 Scripts disponibles

```bash
# Développement (avec rechargement automatique)
npm run dev

# Compiler TypeScript
npm run build

# Production
npm start

# Générer le client Prisma
npm run prisma:generate

# Créer les tables (sans migration)
npx prisma db push

# Migrations (avec historique)
npm run prisma:migrate

# Interface graphique de la base de données
npm run prisma:studio
```

---

## 🏗️ Structure du projet

```
Cloud_Computing_Project/
├── prisma/
│   └── schema.prisma          # Schéma de la base de données
├── public/
│   └── css/
│       └── style.css          # Design rose et blanc
├── src/
│   ├── config/
│   │   ├── database.ts        # Configuration Prisma
│   │   └── session.ts         # Configuration sessions
│   ├── controllers/
│   │   ├── auth.controller.ts # Logique authentification
│   │   ├── home.controller.ts # Page d'accueil
│   │   └── user.controller.ts # Dashboard
│   ├── middlewares/
│   │   └── auth.middleware.ts # Protection des routes
│   ├── routes/
│   │   ├── auth.routes.ts     # Routes auth
│   │   ├── home.routes.ts     # Route home
│   │   └── user.routes.ts     # Routes users
│   ├── types/
│   │   └── session.d.ts       # Types TypeScript
│   ├── views/
│   │   ├── home.ejs           # Page d'accueil
│   │   ├── login.ejs          # Connexion
│   │   ├── register.ejs       # Inscription
│   │   ├── dashboard.ejs      # Dashboard
│   │   └── error.ejs          # Erreurs
│   └── server.ts              # Point d'entrée
├── package.json
├── tsconfig.json
└── .env.example
```

---

## 🎨 Design

Le projet utilise un **thème rose et blanc professionnel** avec :
- Navbar blanche avec bordure rose
- Cartes blanches avec ombres subtiles
- Boutons roses avec effets au survol
- Tableau avec en-tête rose
- Design responsive

### Palette de couleurs

```css
--rose-primary: #e91e63    /* Rose principal */
--rose-secondary: #f48fb1  /* Rose secondaire */
--rose-dark: #c2185b       /* Rose foncé */
--white: #ffffff           /* Blanc */
--gray-50: #fafafa         /* Fond */
```

---

## 🔒 Sécurité

- ✅ **Hashage bcrypt** des mots de passe (10 rounds)
- ✅ **Sessions PostgreSQL** sécurisées
- ✅ **Cookies httpOnly** (protection XSS)
- ✅ **Protection CSRF** (sameSite)
- ✅ **Validation** côté serveur (express-validator)
- ✅ **Protection SQL injection** (Prisma ORM)

---

## 🧪 Tests manuels

### 1. Inscription
- Allez sur http://localhost:3000/register
- Créez un compte avec email et mot de passe (min 6 caractères)

### 2. Connexion
- Allez sur http://localhost:3000/login
- Connectez-vous avec vos identifiants

### 3. Dashboard
- Une fois connecté, vous verrez la liste des utilisateurs
- Votre compte sera marqué avec un badge "Vous"

### 4. Déconnexion
- Cliquez sur "Déconnexion" dans la navbar
- Essayez d'accéder au dashboard → redirection vers login

---

## 🐳 Déploiement Kubernetes (optionnel)

Le projet inclut des fichiers de configuration Kubernetes pour PostgreSQL :

```bash
# Déployer PostgreSQL
kubectl apply -f postgres-configmap.yaml
kubectl apply -f postgres-secret.yaml
kubectl apply -f postgres-pvc.yaml
kubectl apply -f postgres-pod.yaml

# Port-forward
kubectl port-forward pod/postgres-pod 5432:5432

# Mettre à jour .env
DATABASE_URL="postgresql://postgres:secret@localhost:5432/mydatabase?schema=public"
```

Voir [KUBERNETES_SETUP.md](KUBERNETES_SETUP.md) pour plus de détails.

---

## 📚 Documentation

- **[INSTALLATION.md](INSTALLATION.md)** - Guide d'installation détaillé
- **[ARCHITECTURE.md](ARCHITECTURE.md)** - Architecture du projet
- **[CHOIX_TECHNIQUES.md](CHOIX_TECHNIQUES.md)** - Justification des choix
- **[COMMANDES.md](COMMANDES.md)** - Aide-mémoire des commandes
- **[KUBERNETES_SETUP.md](KUBERNETES_SETUP.md)** - Configuration Kubernetes

---

## 🤝 Contribution

Les contributions sont les bienvenues ! Pour contribuer :

1. Forkez le projet
2. Créez une branche (`git checkout -b feature/amelioration`)
3. Committez vos changements (`git commit -m 'Ajout d'une fonctionnalité'`)
4. Poussez vers la branche (`git push origin feature/amelioration`)
5. Ouvrez une Pull Request

---

## 📝 Licence

MIT License - voir le fichier [LICENSE](LICENSE) pour plus de détails.

---

## 👥 Auteurs

- Projet créé pour le cours de Cloud Computing
- Design et développement : Équipe Licorne Rose

---

## 🐛 Problèmes courants

### Erreur de connexion PostgreSQL

```bash
# Vérifier que PostgreSQL est démarré
brew services list | grep postgresql

# Démarrer PostgreSQL
brew services start postgresql@14
```

### Port 3000 déjà utilisé

```bash
# Changer le port dans .env
PORT=3001
```

### CSS non chargé

- Videz le cache du navigateur (Ctrl+Shift+Delete)
- Rechargement forcé (Ctrl+F5)

---

## 📞 Support

Pour toute question ou problème :
- Ouvrez une [issue](https://github.com/Gabafle/Cloud_Computing_Project/issues)
- Consultez la [documentation](README.md)

---

<div align="center">

**Fait avec 💗 et beaucoup de ☕**

🦄 **Licorne Rose** - Plateforme de gestion des utilisateurs

[⭐ Star ce projet](https://github.com/Gabafle/Cloud_Computing_Project) si vous l'aimez !

</div>

