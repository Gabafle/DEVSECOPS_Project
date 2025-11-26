# 🚀 Configuration Kubernetes PostgreSQL

## Étapes pour déployer PostgreSQL sur Kubernetes

### 1️⃣ Appliquer les configurations

```bash
# ConfigMap (configuration de la base de données)
kubectl apply -f postgres-configmap.yaml

# Secret (credentials)
kubectl apply -f postgres-secret.yaml

# PVC (volume persistant)
kubectl apply -f postgres-pvc.yaml

# Pod PostgreSQL
kubectl apply -f postgres-pod.yaml
```

### 2️⃣ Vérifier que le pod est en cours d'exécution

```bash
kubectl get pods
# Attendez que postgres-pod soit en statut "Running"
```

### 3️⃣ Faire le port-forward

```bash
kubectl port-forward pod/postgres-pod 5432:5432
```

**⚠️ Important** : Laissez cette commande tourner dans un terminal séparé.

### 4️⃣ Créer la table pour Licorne Rose

Dans un nouveau terminal :

```bash
# Se connecter à PostgreSQL
psql -h localhost -U postgres -d mydatabase
# Mot de passe: secret

# Créer la base de données pour Licorne Rose (optionnel)
# Ou utiliser mydatabase directement
```

### 5️⃣ Lancer les migrations Prisma

```bash
cd /Users/admin/LicorneRose
npm run prisma:migrate
```

### 6️⃣ Lancer l'application

```bash
npm run dev
```

---

## Configuration actuelle

Le fichier `.env` est configuré pour :
- **Host**: localhost (via port-forward)
- **Port**: 5432
- **User**: postgres
- **Password**: secret
- **Database**: mydatabase

---

## Alternative : PostgreSQL local

Si vous préférez utiliser PostgreSQL en local sans Kubernetes :

```bash
# Installer PostgreSQL (macOS)
brew install postgresql@14
brew services start postgresql@14

# Créer la base de données
createdb licorne_rose

# Mettre à jour .env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/licorne_rose?schema=public"

# Lancer les migrations
npm run prisma:migrate

# Lancer l'app
npm run dev
```

