# 🚀 Démarrage rapide - Licorne Rose

**Temps estimé : 10 minutes**

---

## ✅ Checklist avant de commencer

- [ ] Node.js 18+ installé
- [ ] PostgreSQL 14+ installé et démarré
- [ ] Un terminal ouvert dans le dossier du projet

---

## 📋 Étapes rapides

### 1️⃣ Installer les dépendances

```bash
npm install
```

### 2️⃣ Créer la base de données PostgreSQL

Ouvrez un nouveau terminal et exécutez :

```bash
psql -U postgres
```

Puis dans psql :

```sql
CREATE DATABASE licorne_rose;
CREATE USER licorne_user WITH PASSWORD 'VotreMotDePasse123!';
GRANT ALL PRIVILEGES ON DATABASE licorne_rose TO licorne_user;
\q
```

### 3️⃣ Configurer les variables d'environnement

```bash
# Copier le fichier d'exemple
cp .env.example .env

# Générer un secret de session
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Éditez `.env` et remplacez :
- `username:password` par vos identifiants PostgreSQL
- `votre-secret-tres-securise-a-changer-en-production` par le secret généré

### 4️⃣ Initialiser la base de données

```bash
npm run prisma:generate
npm run prisma:migrate
```

Quand demandé, entrez le nom de migration : `init`

### 5️⃣ Lancer l'application

```bash
npm run dev
```

### 6️⃣ Ouvrir dans le navigateur

Allez sur : **http://localhost:3000**

---

## 🎉 C'est prêt !

Vous devriez voir la page d'accueil avec le thème rose et la licorne 🦄.

### Premiers tests

1. **Créer un compte** : Cliquez sur "Créer un compte"
2. **Se connecter** : Utilisez vos identifiants
3. **Voir le dashboard** : Vous verrez la liste des utilisateurs

---

## 🆘 Problème ?

### Le serveur ne démarre pas
```bash
# Vérifier que PostgreSQL est démarré
psql -U postgres -c "SELECT 1"

# Vérifier le fichier .env
cat .env
```

### Erreur de connexion à la base de données
```bash
# Tester la connexion
psql -U licorne_user -d licorne_rose

# Si ça ne fonctionne pas, vérifiez DATABASE_URL dans .env
```

### Port 3000 déjà utilisé
```bash
# Changer le port dans .env
echo "PORT=3001" >> .env
```

---

## 📚 Documentation complète

- **[README.md](README.md)** - Documentation principale
- **[INSTALLATION.md](INSTALLATION.md)** - Guide d'installation détaillé
- **[ARCHITECTURE.md](ARCHITECTURE.md)** - Architecture du projet
- **[CHOIX_TECHNIQUES.md](CHOIX_TECHNIQUES.md)** - Justification des choix
- **[COMMANDES.md](COMMANDES.md)** - Aide-mémoire des commandes

---

## 🛠️ Commandes utiles

```bash
# Mode développement (rechargement automatique)
npm run dev

# Compiler TypeScript
npm run build

# Mode production
npm start

# Interface graphique de la base de données
npm run prisma:studio

# Voir les logs PostgreSQL
tail -f /usr/local/var/log/postgresql@14.log  # macOS
```

---

## 🦄 Bon développement !

**Questions ?** Consultez la documentation complète dans les fichiers `.md` du projet.

