# 🎯 Choix techniques - Licorne Rose

Ce document explique et justifie les choix techniques effectués pour ce projet.

---

## 🏗️ Architecture générale

### Framework HTTP : Express vs NestJS

**Choix : Express**

**Justification** :
- ✅ **Simplicité** : Express est léger et facile à comprendre pour un projet de cette taille
- ✅ **Flexibilité** : Permet une structure personnalisée adaptée aux besoins
- ✅ **Performance** : Overhead minimal, idéal pour une application de taille moyenne
- ✅ **Écosystème mature** : Énorme communauté et nombreuses bibliothèques compatibles
- ✅ **Courbe d'apprentissage** : Plus accessible que NestJS pour les débutants

**Quand choisir NestJS ?**
- Projets de grande envergure avec de nombreux modules
- Équipes habituées à Angular (syntaxe similaire)
- Besoin de structure stricte imposée par le framework
- Architecture microservices

---

## 🗄️ ORM : Prisma vs Sequelize

**Choix : Prisma**

**Justification** :
- ✅ **Type-safety** : Génération automatique de types TypeScript parfaitement synchronisés avec le schéma
- ✅ **Developer Experience** : Autocomplétion excellente, erreurs claires, migrations simples
- ✅ **Moderne** : Conçu pour TypeScript dès le départ (pas un port depuis JavaScript)
- ✅ **Prisma Studio** : Interface graphique intégrée pour visualiser et modifier les données
- ✅ **Schéma déclaratif** : Plus lisible et maintenable que les modèles Sequelize
- ✅ **Performance** : Requêtes optimisées et support natif des relations

**Exemple de différence** :

**Avec Prisma** :
```typescript
const user = await prisma.user.findUnique({
  where: { email: 'test@example.com' }
});
// Type de 'user' automatiquement inféré !
```

**Avec Sequelize** :
```typescript
const user = await User.findOne({
  where: { email: 'test@example.com' }
});
// Type de 'user' nécessite des définitions manuelles
```

**Quand choisir Sequelize ?**
- Projet existant déjà sur Sequelize
- Besoin de fonctionnalités très spécifiques non supportées par Prisma
- Équipe déjà experte en Sequelize

---

## 🔐 Authentification : Sessions vs JWT

**Choix : Sessions (avec stockage PostgreSQL)**

**Justification** :
- ✅ **Sécurité** : Plus facile de révoquer une session côté serveur
- ✅ **Simplicité** : Pas besoin de gérer le refresh token
- ✅ **Adapté au use case** : Application web classique avec rendu côté serveur
- ✅ **Stateful** : Parfait pour une application monolithique
- ✅ **Stockage PostgreSQL** : Sessions persistantes même après redémarrage du serveur

**Comparaison Sessions vs JWT** :

| Critère | Sessions | JWT |
|---------|----------|-----|
| **Révocation** | ✅ Facile (destruction côté serveur) | ❌ Difficile (nécessite une blacklist) |
| **Scalabilité** | ⚠️ Nécessite un store partagé | ✅ Stateless, facile à scaler |
| **Taille** | ✅ Petit cookie (ID de session) | ❌ Token volumineux |
| **Sécurité** | ✅ Données côté serveur | ⚠️ Données dans le token (visible) |
| **Use case** | Web app classique | API REST, microservices, mobile |

**Quand choisir JWT ?**
- API REST consommée par plusieurs clients (mobile, SPA, etc.)
- Architecture microservices
- Besoin de scalabilité horizontale sans store partagé
- Authentification cross-domain

**Notre implémentation des sessions** :
- Stockage dans PostgreSQL (via `connect-pg-simple`)
- Cookie httpOnly (protection XSS)
- Cookie secure en production (HTTPS uniquement)
- Cookie sameSite (protection CSRF)
- Expiration après 7 jours

---

## 🎨 Frontend : Rendu côté serveur (EJS) vs SPA

**Choix : EJS (Server-Side Rendering)**

**Justification** :
- ✅ **Simplicité** : Pas besoin de gérer un build frontend séparé
- ✅ **SEO-friendly** : HTML généré côté serveur
- ✅ **Performance initiale** : Pas de chargement de gros bundles JavaScript
- ✅ **Adapté au projet** : Application simple sans interactions complexes
- ✅ **Maintenance** : Un seul codebase à gérer

**Quand choisir un SPA (React, Vue, Angular) ?**
- Application avec beaucoup d'interactions dynamiques
- Besoin d'une expérience utilisateur très fluide
- Réutilisation du frontend sur mobile (React Native)
- Équipe frontend/backend séparée

---

## 🎨 CSS : Framework vs CSS personnalisé

**Choix : CSS personnalisé**

**Justification** :
- ✅ **Contrôle total** : Design unique et personnalisé
- ✅ **Performance** : Pas de CSS inutilisé
- ✅ **Apprentissage** : Meilleure compréhension des fondamentaux CSS
- ✅ **Thème cohérent** : Variables CSS pour une palette harmonieuse
- ✅ **Légèreté** : Pas de dépendance externe

**Alternatives considérées** :

**Tailwind CSS** :
- ✅ Rapide à développer
- ✅ Utilitaire et flexible
- ❌ Classes HTML verbeuses
- ❌ Courbe d'apprentissage
- ❌ Nécessite un build

**Bootstrap** :
- ✅ Composants prêts à l'emploi
- ❌ Design générique
- ❌ Lourd (beaucoup de CSS inutilisé)
- ❌ Difficile de personnaliser profondément

**Notre approche** :
- Variables CSS pour les couleurs (facile à modifier)
- Classes utilitaires simples (`.btn`, `.card`, etc.)
- Design responsive avec media queries
- Animations et transitions CSS

---

## 🔒 Sécurité : bcrypt pour le hashage

**Choix : bcrypt**

**Justification** :
- ✅ **Standard de l'industrie** : Éprouvé et recommandé
- ✅ **Résistant aux attaques** : Algorithme lent par design (protection brute-force)
- ✅ **Salt automatique** : Chaque hash est unique
- ✅ **Configurable** : Nombre de rounds ajustable (nous utilisons 10)

**Alternatives** :

**Argon2** :
- ✅ Plus moderne et sécurisé
- ❌ Moins de support dans l'écosystème Node.js
- ❌ Plus complexe à configurer

**PBKDF2** :
- ✅ Standard NIST
- ❌ Moins résistant aux attaques GPU que bcrypt

**Scrypt** :
- ✅ Résistant aux attaques matérielles
- ❌ Moins populaire que bcrypt

---

## 📊 Base de données : PostgreSQL

**Choix : PostgreSQL**

**Justification** :
- ✅ **Robustesse** : Base de données relationnelle mature et fiable
- ✅ **ACID** : Transactions garanties
- ✅ **Performance** : Excellente pour les lectures et écritures
- ✅ **Fonctionnalités avancées** : JSON, full-text search, etc.
- ✅ **Open source** : Gratuit et communauté active
- ✅ **Support Prisma** : Excellent support et intégration

**Alternatives** :

**MySQL** :
- ✅ Populaire et bien supporté
- ❌ Moins de fonctionnalités avancées
- ❌ Licence plus restrictive (Oracle)

**MongoDB** :
- ✅ Flexible (NoSQL)
- ❌ Pas de relations strictes
- ❌ Moins adapté pour l'authentification

**SQLite** :
- ✅ Simple, pas de serveur
- ❌ Pas adapté pour la production
- ❌ Pas de concurrence

---

## 🧪 Validation : express-validator

**Choix : express-validator**

**Justification** :
- ✅ **Intégration Express** : Middleware natif
- ✅ **Basé sur validator.js** : Bibliothèque de validation éprouvée
- ✅ **Chaînable** : Syntaxe fluide et lisible
- ✅ **Messages personnalisés** : Facile de personnaliser les erreurs

**Exemple** :
```typescript
body('email')
  .isEmail()
  .withMessage('Email invalide')
  .normalizeEmail()
```

---

## 📦 Structure du projet

**Choix : Architecture MVC modulaire**

**Justification** :
- ✅ **Séparation des responsabilités** : Routes, contrôleurs, vues séparés
- ✅ **Maintenabilité** : Facile de trouver et modifier du code
- ✅ **Scalabilité** : Facile d'ajouter de nouvelles fonctionnalités
- ✅ **Testabilité** : Logique métier isolée dans les contrôleurs

**Structure** :
```
src/
├── config/       # Configuration (DB, sessions)
├── controllers/  # Logique métier
├── middlewares/  # Middlewares personnalisés
├── routes/       # Définition des routes
├── types/        # Types TypeScript
├── views/        # Templates EJS
└── server.ts     # Point d'entrée
```

---

## 🚀 Outils de développement

### TypeScript

**Justification** :
- ✅ **Type safety** : Détection d'erreurs à la compilation
- ✅ **Autocomplétion** : Meilleure DX
- ✅ **Refactoring** : Plus sûr et facile
- ✅ **Documentation** : Types = documentation

### tsx (pour le développement)

**Justification** :
- ✅ **Rechargement automatique** : Pas besoin de redémarrer le serveur
- ✅ **Exécution directe** : Pas besoin de compiler avant de tester
- ✅ **Rapide** : Utilise esbuild en interne

### Prisma Studio

**Justification** :
- ✅ **Interface graphique** : Visualiser les données facilement
- ✅ **Modification rapide** : Éditer les données sans SQL
- ✅ **Intégré** : Pas besoin d'outil externe

---

## 📝 Résumé des choix

| Aspect | Choix | Raison principale |
|--------|-------|-------------------|
| **Framework** | Express | Simplicité et flexibilité |
| **ORM** | Prisma | Type-safety et DX |
| **Auth** | Sessions | Sécurité et simplicité |
| **Frontend** | EJS (SSR) | Adapté au projet |
| **CSS** | Personnalisé | Contrôle et légèreté |
| **Hashage** | bcrypt | Standard de l'industrie |
| **BDD** | PostgreSQL | Robustesse et fonctionnalités |
| **Validation** | express-validator | Intégration Express |
| **Langage** | TypeScript | Type safety |

---

## 🔮 Évolutions possibles

Si le projet devait évoluer, voici les changements à considérer :

### Passage à une API REST + SPA
- Remplacer les sessions par JWT
- Créer un frontend React/Vue
- Séparer backend et frontend

### Ajout de fonctionnalités
- OAuth (Google, GitHub)
- Email de vérification
- Réinitialisation de mot de passe
- Rôles et permissions
- Upload d'avatar

### Scalabilité
- Redis pour les sessions (plus rapide que PostgreSQL)
- Cache avec Redis
- Load balancer
- Déploiement containerisé (Docker)

---

**Ces choix sont adaptés au contexte actuel du projet. Ils peuvent évoluer selon les besoins futurs.**

