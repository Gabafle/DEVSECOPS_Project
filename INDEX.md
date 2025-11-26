# 📚 Index de la documentation - Licorne Rose

**Bienvenue dans le projet Licorne Rose !** 🦄

Ce fichier vous guide vers la bonne documentation selon vos besoins.

---

## 🚀 Je veux démarrer rapidement

**→ [DEMARRAGE_RAPIDE.md](DEMARRAGE_RAPIDE.md)**

Guide ultra-rapide en 6 étapes (10 minutes) :
1. Installer les dépendances
2. Créer la base de données
3. Configurer `.env`
4. Lancer les migrations
5. Démarrer le serveur
6. Tester dans le navigateur

**Ou utilisez le script automatique** :
```bash
./quick-start.sh
```

---

## 📖 Je veux une installation détaillée

**→ [INSTALLATION.md](INSTALLATION.md)**

Guide d'installation complet avec :
- Vérification des prérequis
- Instructions détaillées pour PostgreSQL
- Configuration pas à pas
- Tests manuels de toutes les fonctionnalités
- Dépannage des problèmes courants

---

## 🏗️ Je veux comprendre l'architecture

**→ [ARCHITECTURE.md](ARCHITECTURE.md)**

Documentation technique complète :
- Diagrammes de flux de données
- Structure détaillée des dossiers
- Cycle de vie d'une requête
- Modèle de données
- Couches de sécurité
- Évolutions futures possibles

---

## 🤔 Je veux comprendre les choix techniques

**→ [CHOIX_TECHNIQUES.md](CHOIX_TECHNIQUES.md)**

Justification de tous les choix :
- Pourquoi Express et pas NestJS ?
- Pourquoi Prisma et pas Sequelize ?
- Pourquoi Sessions et pas JWT ?
- Pourquoi EJS et pas React ?
- Pourquoi CSS personnalisé et pas Tailwind ?
- Comparaisons détaillées avec alternatives

---

## 📝 Je cherche une commande spécifique

**→ [COMMANDES.md](COMMANDES.md)**

Aide-mémoire complet de toutes les commandes :
- npm (installation, scripts)
- Prisma (migrations, studio)
- PostgreSQL (connexion, requêtes SQL)
- Git (commits, branches, remote)
- Débogage et logs
- Déploiement

---

## 📂 Je veux savoir à quoi sert un fichier

**→ [FICHIERS.md](FICHIERS.md)**

Liste exhaustive de tous les fichiers du projet :
- Rôle de chaque fichier
- Organisation par catégorie
- Conventions de nommage
- Comment trouver ce que vous cherchez

---

## 📚 Je veux une vue d'ensemble complète

**→ [README.md](README.md)**

Documentation principale du projet :
- Présentation des fonctionnalités
- Stack technique
- Guide d'installation
- Structure du projet
- Tests manuels
- Sécurité
- Commandes Git
- Dépannage

---

## 🎯 Guide selon votre profil

### 👨‍💻 Développeur débutant
1. Lisez [DEMARRAGE_RAPIDE.md](DEMARRAGE_RAPIDE.md)
2. Suivez [INSTALLATION.md](INSTALLATION.md) si vous bloquez
3. Explorez [FICHIERS.md](FICHIERS.md) pour comprendre l'organisation
4. Consultez [COMMANDES.md](COMMANDES.md) quand vous avez besoin d'une commande

### 👨‍🔬 Développeur expérimenté
1. Lancez `./quick-start.sh` pour installer rapidement
2. Lisez [ARCHITECTURE.md](ARCHITECTURE.md) pour comprendre la structure
3. Consultez [CHOIX_TECHNIQUES.md](CHOIX_TECHNIQUES.md) pour les décisions d'architecture
4. Utilisez [COMMANDES.md](COMMANDES.md) comme référence

### 🎓 Étudiant / Apprentissage
1. Commencez par [README.md](README.md) pour la vue d'ensemble
2. Suivez [INSTALLATION.md](INSTALLATION.md) pas à pas
3. Lisez [ARCHITECTURE.md](ARCHITECTURE.md) pour comprendre le fonctionnement
4. Étudiez [CHOIX_TECHNIQUES.md](CHOIX_TECHNIQUES.md) pour apprendre les bonnes pratiques

### 🔍 Auditeur de code / Recruteur
1. Lisez [README.md](README.md) pour la présentation
2. Consultez [CHOIX_TECHNIQUES.md](CHOIX_TECHNIQUES.md) pour les décisions techniques
3. Explorez [ARCHITECTURE.md](ARCHITECTURE.md) pour l'architecture
4. Parcourez [FICHIERS.md](FICHIERS.md) pour la structure du code

---

## 🗺️ Plan du projet

```
📦 LicorneRose/
│
├── 📚 Documentation (7 fichiers)
│   ├── 📄 INDEX.md                    ← Vous êtes ici
│   ├── 📄 README.md                   ← Documentation principale
│   ├── 📄 DEMARRAGE_RAPIDE.md         ← Guide rapide (10 min)
│   ├── 📄 INSTALLATION.md             ← Installation détaillée
│   ├── 📄 ARCHITECTURE.md             ← Architecture technique
│   ├── 📄 CHOIX_TECHNIQUES.md         ← Justifications
│   ├── 📄 COMMANDES.md                ← Aide-mémoire
│   └── 📄 FICHIERS.md                 ← Liste des fichiers
│
├── ⚙️ Configuration (4 fichiers)
│   ├── package.json                   ← Dépendances npm
│   ├── tsconfig.json                  ← Config TypeScript
│   ├── .env.example                   ← Exemple de config
│   └── .gitignore                     ← Fichiers ignorés
│
├── 🗄️ Base de données
│   └── prisma/
│       └── schema.prisma              ← Schéma Prisma
│
├── 🎨 Frontend
│   └── public/
│       └── css/
│           └── style.css              ← Thème rose
│
├── 🖥️ Backend
│   └── src/
│       ├── server.ts                  ← Point d'entrée
│       ├── config/                    ← Configuration
│       ├── controllers/               ← Logique métier
│       ├── middlewares/               ← Middlewares
│       ├── routes/                    ← Routes HTTP
│       ├── types/                     ← Types TypeScript
│       └── views/                     ← Templates EJS
│
└── 🛠️ Scripts
    └── quick-start.sh                 ← Installation auto
```

---

## 🔍 Recherche rapide

### Par fonctionnalité

| Fonctionnalité | Fichiers concernés |
|----------------|-------------------|
| **Inscription** | `auth.controller.ts`, `register.ejs`, `auth.routes.ts` |
| **Connexion** | `auth.controller.ts`, `login.ejs`, `auth.routes.ts` |
| **Dashboard** | `user.controller.ts`, `dashboard.ejs`, `user.routes.ts` |
| **Sécurité** | `auth.middleware.ts`, `session.ts`, `auth.controller.ts` |
| **Base de données** | `schema.prisma`, `database.ts` |
| **Styles** | `style.css` |

### Par tâche

| Je veux... | Fichier à consulter |
|------------|---------------------|
| Installer le projet | [DEMARRAGE_RAPIDE.md](DEMARRAGE_RAPIDE.md) |
| Comprendre une erreur | [INSTALLATION.md](INSTALLATION.md) (section Dépannage) |
| Ajouter une fonctionnalité | [ARCHITECTURE.md](ARCHITECTURE.md) |
| Modifier les couleurs | `public/css/style.css` |
| Changer la base de données | `prisma/schema.prisma` |
| Trouver une commande | [COMMANDES.md](COMMANDES.md) |

---

## 📞 Support

### Documentation en ligne
- [Express](https://expressjs.com/)
- [Prisma](https://www.prisma.io/docs/)
- [TypeScript](https://www.typescriptlang.org/docs/)
- [PostgreSQL](https://www.postgresql.org/docs/)

### Fichiers du projet
- Questions d'installation → [INSTALLATION.md](INSTALLATION.md)
- Questions techniques → [ARCHITECTURE.md](ARCHITECTURE.md)
- Questions sur les commandes → [COMMANDES.md](COMMANDES.md)

---

## 🎯 Prochaines étapes

### Pour commencer
1. ✅ Lisez ce fichier (vous y êtes !)
2. 🚀 Suivez [DEMARRAGE_RAPIDE.md](DEMARRAGE_RAPIDE.md)
3. 🧪 Testez l'application
4. 📖 Explorez le code source

### Pour approfondir
1. 📚 Lisez [ARCHITECTURE.md](ARCHITECTURE.md)
2. 🤔 Comprenez [CHOIX_TECHNIQUES.md](CHOIX_TECHNIQUES.md)
3. 🛠️ Personnalisez l'application
4. 🚀 Déployez en production

---

## 📊 Statistiques du projet

- **Lignes de code** : ~2000 lignes
- **Fichiers source** : 31 fichiers
- **Dépendances** : 9 production + 8 développement
- **Documentation** : 7 fichiers markdown
- **Temps d'installation** : 10-15 minutes
- **Stack** : Node.js, TypeScript, Express, PostgreSQL, Prisma

---

## 🦄 Philosophie du projet

**Licorne Rose** est conçu pour être :

- ✨ **Simple** : Architecture claire et compréhensible
- 🔒 **Sécurisé** : Bonnes pratiques de sécurité
- 📚 **Documenté** : Documentation complète et accessible
- 🎨 **Élégant** : Interface soignée avec thème rose
- 🚀 **Évolutif** : Facile à étendre et personnaliser

---

**Bon développement ! 🦄💗**

*Si vous avez des questions, consultez d'abord la documentation appropriée ci-dessus.*

