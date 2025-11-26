# 🤝 Guide de contribution - Licorne Rose

Merci de votre intérêt pour contribuer à Licorne Rose ! Ce guide vous aidera à démarrer.

---

## 🚀 Démarrage rapide

### 1. Forker le projet

Cliquez sur le bouton "Fork" en haut à droite de la page GitHub.

### 2. Cloner votre fork

```bash
git clone https://github.com/VOTRE-USERNAME/Cloud_Computing_Project.git
cd Cloud_Computing_Project
```

### 3. Ajouter le dépôt original comme remote

```bash
git remote add upstream https://github.com/Gabafle/Cloud_Computing_Project.git
```

### 4. Installer les dépendances

```bash
npm install
```

### 5. Configurer l'environnement

```bash
# Créer la base de données
createdb licorne_rose

# Copier et configurer .env
cp .env.example .env
# Éditez .env avec vos identifiants

# Créer les tables
npm run prisma:generate
npx prisma db push
```

### 6. Lancer en mode développement

```bash
npm run dev
```

---

## 🌿 Workflow de contribution

### 1. Créer une branche

```bash
# Mettre à jour votre fork
git checkout main
git pull upstream main

# Créer une nouvelle branche
git checkout -b feature/ma-fonctionnalite
# ou
git checkout -b fix/correction-bug
```

### 2. Faire vos modifications

- Écrivez du code propre et commenté
- Suivez les conventions de nommage du projet
- Testez vos modifications localement

### 3. Commiter vos changements

```bash
git add .
git commit -m "✨ Ajout de ma fonctionnalité"
```

**Conventions de commit** :
- `✨ feat:` Nouvelle fonctionnalité
- `🐛 fix:` Correction de bug
- `📚 docs:` Documentation
- `🎨 style:` Formatage, CSS
- `♻️ refactor:` Refactoring
- `🧪 test:` Tests
- `⚡ perf:` Performance

### 4. Pousser vers votre fork

```bash
git push origin feature/ma-fonctionnalite
```

### 5. Créer une Pull Request

1. Allez sur votre fork sur GitHub
2. Cliquez sur "Compare & pull request"
3. Remplissez le template de PR
4. Soumettez la PR

---

## 📋 Checklist avant de soumettre

- [ ] Le code compile sans erreur (`npm run build`)
- [ ] Le serveur démarre correctement (`npm run dev`)
- [ ] Les modifications sont testées manuellement
- [ ] Le code suit les conventions du projet
- [ ] Les commentaires sont clairs et utiles
- [ ] La documentation est mise à jour si nécessaire
- [ ] Les fichiers sensibles (`.env`) ne sont pas inclus

---

## 🎨 Standards de code

### TypeScript

```typescript
// ✅ Bon
export const getUserById = async (id: string): Promise<User | null> => {
  return await prisma.user.findUnique({ where: { id } });
};

// ❌ Mauvais
export const getUserById = async (id) => {
  return await prisma.user.findUnique({ where: { id } });
};
```

### Nommage

- **Variables et fonctions** : `camelCase`
- **Classes et types** : `PascalCase`
- **Constantes** : `UPPER_SNAKE_CASE`
- **Fichiers** : `kebab-case.ts` ou `camelCase.ts`

### Commentaires

```typescript
/**
 * Récupère un utilisateur par son ID
 * @param id - L'ID de l'utilisateur
 * @returns L'utilisateur ou null si non trouvé
 */
export const getUserById = async (id: string): Promise<User | null> => {
  // Recherche dans la base de données
  return await prisma.user.findUnique({ where: { id } });
};
```

---

## 🧪 Tests

Actuellement, le projet utilise des tests manuels. Pour tester :

1. Lancez `npm run dev`
2. Testez toutes les fonctionnalités :
   - Inscription
   - Connexion
   - Dashboard
   - Déconnexion
   - Protection des routes

---

## 🐛 Signaler un bug

Pour signaler un bug, [créez une issue](https://github.com/Gabafle/Cloud_Computing_Project/issues/new) avec :

1. **Titre clair** : "Bug: Description courte"
2. **Description** : Ce qui ne fonctionne pas
3. **Étapes pour reproduire** :
   - Étape 1
   - Étape 2
   - Étape 3
4. **Comportement attendu** : Ce qui devrait se passer
5. **Comportement actuel** : Ce qui se passe réellement
6. **Environnement** :
   - OS : macOS / Windows / Linux
   - Node.js : version
   - PostgreSQL : version

---

## 💡 Proposer une fonctionnalité

Pour proposer une nouvelle fonctionnalité, [créez une issue](https://github.com/Gabafle/Cloud_Computing_Project/issues/new) avec :

1. **Titre** : "Feature: Description de la fonctionnalité"
2. **Description** : Pourquoi cette fonctionnalité est utile
3. **Cas d'usage** : Comment elle serait utilisée
4. **Proposition d'implémentation** (optionnel)

---

## 📚 Ressources utiles

- [Documentation Express](https://expressjs.com/)
- [Documentation Prisma](https://www.prisma.io/docs/)
- [Documentation TypeScript](https://www.typescriptlang.org/docs/)
- [Guide PostgreSQL](https://www.postgresql.org/docs/)

---

## ❓ Questions ?

Si vous avez des questions :
- Ouvrez une [issue](https://github.com/Gabafle/Cloud_Computing_Project/issues)
- Consultez la [documentation](README.md)

---

## 🙏 Merci !

Merci de contribuer à Licorne Rose ! Chaque contribution, grande ou petite, est appréciée.

---

**Happy coding ! 🦄💗**

