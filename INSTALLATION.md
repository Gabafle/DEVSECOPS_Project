# 📦 Guide d'installation - Licorne Rose

Ce guide vous accompagne pas à pas pour installer et lancer l'application Licorne Rose.

## ⏱️ Temps estimé : 15-20 minutes

---

## Étape 1 : Vérifier les prérequis

### 1.1 Vérifier Node.js

Ouvrez un terminal et exécutez :

```bash
node --version
```

Vous devriez voir une version >= 18.x.x. Si ce n'est pas le cas, [téléchargez Node.js](https://nodejs.org/).

### 1.2 Vérifier PostgreSQL

```bash
psql --version
```

Vous devriez voir une version >= 14.x. Si ce n'est pas le cas, [téléchargez PostgreSQL](https://www.postgresql.org/download/).

### 1.3 Vérifier Git

```bash
git --version
```

Si Git n'est pas installé, [téléchargez-le](https://git-scm.com/).

---

## Étape 2 : Récupérer le projet

### Option A : Cloner depuis un dépôt Git

```bash
git clone <url-du-depot>
cd LicorneRose
```

### Option B : Partir du code existant

Si vous avez déjà les fichiers :

```bash
cd LicorneRose
git init
```

---

## Étape 3 : Installer les dépendances

```bash
npm install
```

Cette commande peut prendre 2-3 minutes. Elle installe toutes les bibliothèques nécessaires.

---

## Étape 4 : Configurer PostgreSQL

### 4.1 Démarrer PostgreSQL

**Sur macOS (avec Homebrew)** :
```bash
brew services start postgresql@14
```

**Sur Linux** :
```bash
sudo systemctl start postgresql
```

**Sur Windows** :
Démarrez PostgreSQL depuis le menu Démarrer ou les Services.

### 4.2 Créer la base de données

Ouvrez un terminal PostgreSQL :

```bash
psql -U postgres
```

Exécutez les commandes SQL suivantes :

```sql
-- Créer la base de données
CREATE DATABASE licorne_rose;

-- Créer un utilisateur dédié (optionnel mais recommandé)
CREATE USER licorne_user WITH PASSWORD 'MotDePasseSecurise123!';

-- Donner les permissions
GRANT ALL PRIVILEGES ON DATABASE licorne_rose TO licorne_user;

-- Quitter
\q
```

**Note** : Remplacez `MotDePasseSecurise123!` par un mot de passe fort de votre choix.

---

## Étape 5 : Configurer les variables d'environnement

### 5.1 Copier le fichier d'exemple

```bash
cp .env.example .env
```

### 5.2 Éditer le fichier .env

Ouvrez le fichier `.env` avec votre éditeur de texte préféré et modifiez les valeurs :

```env
# Base de données PostgreSQL
# Format : postgresql://UTILISATEUR:MOT_DE_PASSE@HOTE:PORT/NOM_BASE
DATABASE_URL="postgresql://licorne_user:MotDePasseSecurise123!@localhost:5432/licorne_rose?schema=public"

# Configuration du serveur
PORT=3000
NODE_ENV=development

# Secret pour les sessions (générer une chaîne aléatoire)
SESSION_SECRET="votre-secret-genere-ci-dessous"
```

### 5.3 Générer un secret de session

Exécutez cette commande pour générer un secret sécurisé :

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Copiez le résultat et remplacez `votre-secret-genere-ci-dessous` dans le fichier `.env`.

---

## Étape 6 : Initialiser la base de données avec Prisma

### 6.1 Générer le client Prisma

```bash
npm run prisma:generate
```

### 6.2 Créer les tables dans la base de données

```bash
npm run prisma:migrate
```

Quand Prisma vous demande un nom pour la migration, entrez : `init`

Vous devriez voir :

```
✔ Generated Prisma Client
✔ Your database is now in sync with your schema
```

---

## Étape 7 : Lancer l'application

### Mode développement (recommandé pour tester)

```bash
npm run dev
```

Vous devriez voir :

```
🦄 ═══════════════════════════════════════════════════════
🦄  Licorne Rose - Serveur démarré avec succès !
🦄 ═══════════════════════════════════════════════════════

   🌐 URL locale:        http://localhost:3000
   📂 Environnement:     development
   🗄️  Base de données:   PostgreSQL (Prisma)
```

---

## Étape 8 : Tester l'application

### 8.1 Ouvrir l'application

Ouvrez votre navigateur et allez sur : **http://localhost:3000**

Vous devriez voir la page d'accueil avec le thème rose et la licorne 🦄.

### 8.2 Créer un compte

1. Cliquez sur **"Créer un compte"**
2. Remplissez le formulaire :
   - Email : `test@example.com`
   - Mot de passe : `password123`
   - Confirmation : `password123`
3. Cliquez sur **"S'inscrire"**

Vous devriez être redirigé vers la page de connexion avec un message de succès.

### 8.3 Se connecter

1. Entrez vos identifiants :
   - Email : `test@example.com`
   - Mot de passe : `password123`
2. Cliquez sur **"Se connecter"**

Vous devriez être redirigé vers le **Dashboard** affichant la liste des utilisateurs.

### 8.4 Tester la protection des routes

1. Cliquez sur **"Déconnexion"**
2. Essayez d'accéder directement à : **http://localhost:3000/dashboard**
3. Vous devriez être redirigé vers la page de connexion

✅ **Félicitations ! L'application fonctionne correctement.**

---

## Étape 9 : Initialiser Git (optionnel)

Si vous voulez versionner votre code avec Git :

```bash
# Initialiser le dépôt
git init

# Ajouter tous les fichiers
git add .

# Premier commit
git commit -m "Initial commit: Application Licorne Rose"
```

---

## 🎉 Installation terminée !

Votre application Licorne Rose est maintenant opérationnelle.

### Commandes utiles

```bash
# Lancer en mode développement (avec rechargement automatique)
npm run dev

# Compiler le TypeScript
npm run build

# Lancer en mode production
npm start

# Ouvrir Prisma Studio (interface graphique pour la base de données)
npm run prisma:studio
```

---

## ❓ Problèmes courants

### Erreur : "Can't reach database server"

**Solution** :
- Vérifiez que PostgreSQL est démarré
- Vérifiez la variable `DATABASE_URL` dans `.env`
- Testez la connexion : `psql -U licorne_user -d licorne_rose`

### Erreur : "Port 3000 already in use"

**Solution** :
- Changez le port dans `.env` : `PORT=3001`
- Ou arrêtez le processus utilisant le port 3000

### Erreur : "Cannot find module 'xxx'"

**Solution** :
- Supprimez `node_modules` et réinstallez : `rm -rf node_modules && npm install`

### Les styles CSS ne s'affichent pas

**Solution** :
- Vérifiez que le dossier `public/css/` existe
- Redémarrez le serveur : `Ctrl+C` puis `npm run dev`

---

## 📚 Prochaines étapes

- Lisez le [README.md](README.md) pour plus de détails
- Explorez le code dans le dossier `src/`
- Personnalisez le thème dans `public/css/style.css`
- Ajoutez de nouvelles fonctionnalités !

---

**Besoin d'aide ?** Consultez la section "Dépannage" du README.md ou les ressources en ligne.

**Bon développement ! 🦄💗**

