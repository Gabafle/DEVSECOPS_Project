# Étape 1 : Build
FROM node:18

# Créer le dossier app
WORKDIR /app

# Copier package.json
COPY package.json package-lock.json ./

# Installer les dépendances
RUN npm install

# Copier le code du projet
COPY . .

# Exposer le port
EXPOSE 3000

# Lancer le serveur
CMD ["node", "server.js"]

