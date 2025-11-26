# 📝 Aide-mémoire des commandes - Licorne Rose

Guide de référence rapide pour toutes les commandes importantes du projet.

---

## 🚀 Démarrage rapide

```bash
# Installation automatique (recommandé)
./quick-start.sh

# Ou installation manuelle
npm install
npm run prisma:generate
npm run prisma:migrate
npm run dev
```

---

## 📦 NPM - Gestion du projet

### Installation et dépendances

```bash
# Installer toutes les dépendances
npm install

# Installer une nouvelle dépendance
npm install nom-du-package

# Installer une dépendance de développement
npm install --save-dev nom-du-package

# Mettre à jour les dépendances
npm update

# Vérifier les dépendances obsolètes
npm outdated
```

### Scripts du projet

```bash
# Lancer en mode développement (avec rechargement automatique)
npm run dev

# Compiler le TypeScript en JavaScript
npm run build

# Lancer en mode production (après build)
npm start

# Générer le client Prisma
npm run prisma:generate

# Créer et appliquer les migrations
npm run prisma:migrate

# Ouvrir Prisma Studio (interface graphique)
npm run prisma:studio
```

---

## 🗄️ Prisma - Gestion de la base de données

### Migrations

```bash
# Créer et appliquer une migration
npm run prisma:migrate

# Créer une migration sans l'appliquer
npx prisma migrate dev --create-only

# Appliquer les migrations en production
npx prisma migrate deploy

# Réinitialiser la base de données (⚠️ supprime toutes les données)
npx prisma migrate reset

# Voir le statut des migrations
npx prisma migrate status
```

### Client Prisma

```bash
# Générer le client Prisma (après modification du schéma)
npm run prisma:generate

# Valider le schéma Prisma
npx prisma validate

# Formater le schéma Prisma
npx prisma format
```

### Prisma Studio

```bash
# Ouvrir l'interface graphique
npm run prisma:studio

# Ouvrir sur un port spécifique
npx prisma studio --port 5555
```

### Seed (données de test)

```bash
# Créer un fichier seed
# prisma/seed.ts

# Exécuter le seed
npx prisma db seed
```

---

## 🐘 PostgreSQL - Commandes de base

### Connexion

```bash
# Se connecter à PostgreSQL
psql -U postgres

# Se connecter à une base spécifique
psql -U licorne_user -d licorne_rose

# Se connecter avec un hôte distant
psql -h localhost -U licorne_user -d licorne_rose
```

### Gestion des bases de données

```sql
-- Lister toutes les bases de données
\l

-- Se connecter à une base
\c licorne_rose

-- Lister les tables
\dt

-- Décrire une table
\d users

-- Quitter
\q
```

### Requêtes SQL courantes

```sql
-- Voir tous les utilisateurs
SELECT * FROM users;

-- Compter les utilisateurs
SELECT COUNT(*) FROM users;

-- Voir les sessions actives
SELECT * FROM session;

-- Supprimer un utilisateur par email
DELETE FROM users WHERE email = 'test@example.com';

-- Supprimer toutes les sessions expirées
DELETE FROM session WHERE expire < NOW();
```

### Sauvegarde et restauration

```bash
# Sauvegarder la base de données
pg_dump -U licorne_user licorne_rose > backup.sql

# Restaurer la base de données
psql -U licorne_user licorne_rose < backup.sql
```

---

## 🔧 Git - Gestion de version

### Configuration initiale

```bash
# Initialiser un dépôt Git
git init

# Configurer votre identité
git config --global user.name "Votre Nom"
git config --global user.email "votre@email.com"

# Voir la configuration
git config --list
```

### Commits et historique

```bash
# Voir le statut des fichiers
git status

# Ajouter tous les fichiers modifiés
git add .

# Ajouter un fichier spécifique
git add src/server.ts

# Faire un commit
git commit -m "Description des modifications"

# Modifier le dernier commit
git commit --amend

# Voir l'historique
git log

# Voir l'historique condensé
git log --oneline

# Voir les différences
git diff
```

### Branches

```bash
# Lister les branches
git branch

# Créer une nouvelle branche
git branch nom-de-la-branche

# Changer de branche
git checkout nom-de-la-branche

# Créer et changer de branche en une commande
git checkout -b nom-de-la-branche

# Fusionner une branche
git merge nom-de-la-branche

# Supprimer une branche
git branch -d nom-de-la-branche
```

### Dépôt distant

```bash
# Ajouter un dépôt distant
git remote add origin https://github.com/username/licorne-rose.git

# Voir les dépôts distants
git remote -v

# Pousser vers le dépôt distant
git push -u origin main

# Récupérer les modifications
git pull origin main

# Cloner un dépôt
git clone https://github.com/username/licorne-rose.git
```

### Annuler des modifications

```bash
# Annuler les modifications d'un fichier (non stagé)
git checkout -- fichier.ts

# Retirer un fichier du staging
git reset HEAD fichier.ts

# Annuler le dernier commit (garder les modifications)
git reset --soft HEAD~1

# Annuler le dernier commit (supprimer les modifications)
git reset --hard HEAD~1
```

---

## 🔍 Débogage et logs

### Logs du serveur

```bash
# Voir les logs en temps réel (mode dev)
npm run dev

# Rediriger les logs vers un fichier
npm run dev > logs.txt 2>&1

# Voir les dernières lignes d'un fichier de log
tail -f logs.txt
```

### Logs PostgreSQL

```bash
# Trouver le fichier de log PostgreSQL (macOS avec Homebrew)
tail -f /usr/local/var/log/postgresql@14.log

# Linux
tail -f /var/log/postgresql/postgresql-14-main.log
```

### Prisma logs

```typescript
// Dans src/config/database.ts
const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});
```

---

## 🧹 Nettoyage

### Supprimer les fichiers générés

```bash
# Supprimer node_modules
rm -rf node_modules

# Supprimer les fichiers compilés
rm -rf dist

# Supprimer le client Prisma généré
rm -rf node_modules/.prisma

# Tout nettoyer et réinstaller
rm -rf node_modules dist
npm install
npm run prisma:generate
```

### Réinitialiser la base de données

```bash
# Supprimer toutes les données et recréer les tables
npm run prisma:migrate reset

# Ou manuellement
psql -U postgres -c "DROP DATABASE licorne_rose;"
psql -U postgres -c "CREATE DATABASE licorne_rose;"
npm run prisma:migrate
```

---

## 🔐 Sécurité

### Générer des secrets

```bash
# Générer un secret de session
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Générer un UUID
node -e "console.log(require('crypto').randomUUID())"

# Générer un mot de passe aléatoire
node -e "console.log(require('crypto').randomBytes(16).toString('base64'))"
```

### Hasher un mot de passe (pour tests)

```bash
# Créer un script temporaire
node -e "const bcrypt = require('bcrypt'); bcrypt.hash('password123', 10).then(console.log)"
```

---

## 📊 Monitoring et performance

### Voir les processus Node.js

```bash
# Lister les processus Node
ps aux | grep node

# Tuer un processus Node
kill -9 <PID>

# Trouver le processus utilisant un port
lsof -i :3000

# Tuer le processus sur un port
kill -9 $(lsof -t -i:3000)
```

### Mesurer la performance

```bash
# Temps de réponse d'une route
curl -w "@-" -o /dev/null -s http://localhost:3000/dashboard <<'EOF'
time_namelookup:  %{time_namelookup}\n
time_connect:  %{time_connect}\n
time_total:  %{time_total}\n
EOF
```

---

## 🧪 Tests manuels avec curl

### Tester l'API

```bash
# Page d'accueil
curl http://localhost:3000/

# Inscription (POST)
curl -X POST http://localhost:3000/register \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "email=test@example.com&password=password123&confirmPassword=password123"

# Connexion (POST)
curl -X POST http://localhost:3000/login \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "email=test@example.com&password=password123" \
  -c cookies.txt

# Dashboard (avec cookies)
curl http://localhost:3000/dashboard -b cookies.txt

# Déconnexion
curl -X POST http://localhost:3000/logout -b cookies.txt
```

---

## 📦 Déploiement

### Préparer pour la production

```bash
# 1. Compiler le TypeScript
npm run build

# 2. Définir les variables d'environnement
export NODE_ENV=production
export DATABASE_URL="postgresql://..."
export SESSION_SECRET="..."
export PORT=3000

# 3. Appliquer les migrations
npx prisma migrate deploy

# 4. Lancer le serveur
npm start
```

### Avec PM2 (gestionnaire de processus)

```bash
# Installer PM2
npm install -g pm2

# Lancer l'application
pm2 start dist/server.js --name licorne-rose

# Voir les logs
pm2 logs licorne-rose

# Redémarrer
pm2 restart licorne-rose

# Arrêter
pm2 stop licorne-rose

# Configurer le démarrage automatique
pm2 startup
pm2 save
```

---

## 🆘 Dépannage rapide

### Le serveur ne démarre pas

```bash
# Vérifier que le port n'est pas utilisé
lsof -i :3000

# Vérifier les variables d'environnement
cat .env

# Tester la connexion à PostgreSQL
psql -U licorne_user -d licorne_rose -c "SELECT 1"
```

### Erreur Prisma

```bash
# Régénérer le client
npm run prisma:generate

# Vérifier le schéma
npx prisma validate

# Voir le statut des migrations
npx prisma migrate status
```

### Problèmes de dépendances

```bash
# Nettoyer et réinstaller
rm -rf node_modules package-lock.json
npm install

# Vérifier les versions
npm list
```

---

## 📚 Ressources

- [Documentation Express](https://expressjs.com/)
- [Documentation Prisma](https://www.prisma.io/docs/)
- [Documentation PostgreSQL](https://www.postgresql.org/docs/)
- [Documentation Git](https://git-scm.com/doc)

---

**💡 Astuce** : Ajoutez cette page à vos favoris pour un accès rapide !

