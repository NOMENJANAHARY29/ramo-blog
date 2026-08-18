# Ramo Blog — Digital Journal

Micro-blog permettant de consulter et publier des articles (React + Vite + Express + MySQL).

## Stack

- **Frontend** : React 19 + Vite + Tailwind CSS
- **Backend** : Express (API `GET /articles`, `POST /articles`, likes, commentaires)
- **Base de données** : MySQL — les articles publiés sont persistés et survivent aux redémarrages.

## Lancer le projet en local

**Prérequis** : Node.js 18+

1. Installer les dépendances :
   ```bash
   npm install
   ```

2. Créer une base MySQL gratuite (recommandé : **Aiven**, gratuit, sans carte bancaire) :
   - Va sur https://aiven.io/free-tier → crée un compte.
   - Crée un service **MySQL** (plan gratuit "Free").
   - Sur la page du service, section **Connection information**, note : `Host`, `Port`, `User`, `Password`, `Database name` (souvent `defaultdb`).
   - Construis ta chaîne de connexion :
     `mysql://USER:PASSWORD@HOST:PORT/DATABASE_NAME`

   *(Alternatives : Railway, Clever Cloud — même principe, il te faut juste une chaîne `mysql://user:password@host:port/dbname`.)*

3. Créer un fichier `.env.local` à la racine :
   ```bash
   cp .env.example .env.local
   ```
   Remplace `DATABASE_URL` par ta vraie chaîne de connexion MySQL.

4. Lancer le serveur de dev (frontend + API sur le même port, avec hot-reload) :
   ```bash
   npm run dev
   ```
   Ouvre http://localhost:3000

Au premier démarrage, la table `articles` est créée automatiquement et pré-remplie avec quelques articles de démo (uniquement si la base est vide) — voir `server/db.ts`.

## Structure

```
src/                  Frontend React (composants, types, données de démo initiales)
server/app.ts         Routes Express (API) — partagées entre dev local et Vercel
server/db.ts          Accès base de données (MySQL, via mysql2)
server.ts             Point d'entrée du serveur en LOCAL (Vite middleware + Express)
api/index.ts          Point d'entrée serverless pour VERCEL (même app Express)
vercel.json           Config de routage Vercel (API + SPA)
```

## Déployer sur Vercel

1. **Pousse le code sur GitHub** (crée un repo et fais `git push`).

2. **Importe le projet sur Vercel** : https://vercel.com/new → sélectionne ton repo GitHub.
   Vercel détecte Vite automatiquement ; `vercel.json` force déjà `buildCommand: vite build` et `outputDirectory: dist`, donc rien à configurer manuellement pour le build.

3. **Ajoute la variable d'environnement `DATABASE_URL`** (MySQL n'a pas d'intégration automatique dans le Storage Vercel, contrairement à Postgres — il faut la coller à la main) :
   - Dans le dashboard du projet Vercel → **Settings** → **Environment Variables**.
   - Nom : `DATABASE_URL`, Valeur : ta chaîne de connexion MySQL (ex: `mysql://user:password@host:port/dbname`).
   - Coche les 3 environnements (Production, Preview, Development), clique **Save**.

4. **Redéploie** pour que la variable soit prise en compte : onglet **Deployments** → `⋯` sur le dernier déploiement → **Redeploy**.

5. Ton site est en ligne à l'URL fournie par Vercel (`https://ton-projet.vercel.app`). Teste :
   - `GET https://ton-projet.vercel.app/articles` → doit renvoyer la liste JSON.
   - Publie un article depuis le formulaire, rafraîchis : il reste bien présent (persistance en base, plus de perte au redémarrage).

⚠️ **Important pour Aiven (plan gratuit)** : le service se met en pause après une période d'inactivité prolongée. S'il ne répond plus, reconnecte-toi sur aiven.io et relance-le depuis le dashboard — les données ne sont pas perdues.

## Fonctionnalités

- Interface responsive (header + grille d'articles en cartes)
- `GET /articles` (alias `/api/articles`) — liste dynamique, filtrable par catégorie/recherche
- `POST /articles` (alias `/api/articles`) — publication avec validation des champs obligatoires (titre, catégorie, contenu ; image URL optionnelle)
- États de chargement (skeleton) et d'erreur (avec retry) gérés côté frontend
- Likes, commentaires, mode sombre, recherche, filtres par catégorie
- Aucun article codé en dur dans le HTML — tout provient de l'API/la base de données
