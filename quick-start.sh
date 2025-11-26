#!/bin/bash

# Script de démarrage rapide pour Licorne Rose
# Ce script automatise l'installation et la configuration initiale

set -e  # Arrêter en cas d'erreur

echo "🦄 ════════════════════════════════════════════════════"
echo "🦄  Licorne Rose - Script de démarrage rapide"
echo "🦄 ════════════════════════════════════════════════════"
echo ""

# Couleurs pour les messages
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Fonction pour afficher les messages
info() {
    echo -e "${GREEN}✓${NC} $1"
}

warn() {
    echo -e "${YELLOW}⚠${NC} $1"
}

error() {
    echo -e "${RED}✗${NC} $1"
}

# Vérifier Node.js
echo "📦 Vérification des prérequis..."
if ! command -v node &> /dev/null; then
    error "Node.js n'est pas installé. Téléchargez-le sur https://nodejs.org/"
    exit 1
fi
info "Node.js $(node --version) détecté"

# Vérifier PostgreSQL
if ! command -v psql &> /dev/null; then
    error "PostgreSQL n'est pas installé. Téléchargez-le sur https://www.postgresql.org/"
    exit 1
fi
info "PostgreSQL détecté"

# Installer les dépendances
echo ""
echo "📦 Installation des dépendances..."
npm install
info "Dépendances installées"

# Créer le fichier .env s'il n'existe pas
if [ ! -f .env ]; then
    echo ""
    echo "⚙️  Configuration de l'environnement..."
    cp .env.example .env

    # Générer un secret de session
    SESSION_SECRET=$(node -e "console.log(require('crypto').randomBytes(32).toString('hex'))")

    # Remplacer le secret dans .env
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        sed -i '' "s/votre-secret-tres-securise-a-changer-en-production/$SESSION_SECRET/" .env
    else
        # Linux
        sed -i "s/votre-secret-tres-securise-a-changer-en-production/$SESSION_SECRET/" .env
    fi

    info "Fichier .env créé avec un secret de session sécurisé"
    warn "N'oubliez pas de modifier DATABASE_URL dans .env avec vos identifiants PostgreSQL !"
else
    info "Fichier .env déjà existant"
fi

# Demander si l'utilisateur veut créer la base de données
echo ""
read -p "Voulez-vous que je vous aide à créer la base de données PostgreSQL ? (o/n) " -n 1 -r
echo ""
if [[ $REPLY =~ ^[Oo]$ ]]; then
    echo ""
    echo "📝 Instructions pour créer la base de données :"
    echo ""
    echo "1. Ouvrez un nouveau terminal"
    echo "2. Exécutez : psql -U postgres"
    echo "3. Copiez-collez les commandes suivantes :"
    echo ""
    echo "   CREATE DATABASE licorne_rose;"
    echo "   CREATE USER licorne_user WITH PASSWORD 'VotreMotDePasse123!';"
    echo "   GRANT ALL PRIVILEGES ON DATABASE licorne_rose TO licorne_user;"
    echo "   \\q"
    echo ""
    echo "4. Mettez à jour DATABASE_URL dans .env avec vos identifiants"
    echo ""
    read -p "Appuyez sur Entrée une fois la base de données créée et .env configuré..."
fi

# Générer le client Prisma
echo ""
echo "🔧 Génération du client Prisma..."
npm run prisma:generate
info "Client Prisma généré"

# Créer les migrations
echo ""
echo "🗄️  Création des tables dans la base de données..."
echo ""
warn "Si vous voyez une erreur de connexion, vérifiez DATABASE_URL dans .env"
echo ""

# Demander confirmation avant de lancer les migrations
read -p "Lancer les migrations Prisma ? (o/n) " -n 1 -r
echo ""
if [[ $REPLY =~ ^[Oo]$ ]]; then
    npm run prisma:migrate
    info "Tables créées avec succès"
else
    warn "Migrations non exécutées. Lancez 'npm run prisma:migrate' manuellement."
fi

# Initialiser Git si ce n'est pas déjà fait
if [ ! -d .git ]; then
    echo ""
    read -p "Initialiser un dépôt Git ? (o/n) " -n 1 -r
    echo ""
    if [[ $REPLY =~ ^[Oo]$ ]]; then
        git init
        git add .
        git commit -m "Initial commit: Application Licorne Rose"
        info "Dépôt Git initialisé"
    fi
fi

# Résumé
echo ""
echo "🦄 ════════════════════════════════════════════════════"
echo "🦄  Installation terminée !"
echo "🦄 ════════════════════════════════════════════════════"
echo ""
echo "Pour lancer l'application :"
echo ""
echo "  npm run dev"
echo ""
echo "Puis ouvrez votre navigateur sur : http://localhost:3000"
echo ""
echo "Commandes utiles :"
echo "  npm run dev              - Lancer en mode développement"
echo "  npm run build            - Compiler le TypeScript"
echo "  npm start                - Lancer en mode production"
echo "  npm run prisma:studio    - Ouvrir l'interface graphique de la base de données"
echo ""
echo "📚 Documentation complète : README.md"
echo "📦 Guide d'installation : INSTALLATION.md"
echo ""
echo "🦄 Bon développement ! 💗"
echo ""

