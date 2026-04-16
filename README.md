# Style et Mini - Backend

## Objectif du projet

Le projet "Style et Mini" vise à fournir une API backend pour la gestion d'un dressing virtuel. Cette API permet de gérer les vêtements, leurs caractéristiques, les types de vêtements, les tailles, les usages, et bien plus encore. L'application est construite en utilisant Express.js et TypeScript, et elle se connecte à une base de données MongoDB pour stocker les données.

## Description de l'application

L'application backend "Style et Mini" est une API RESTful développée avec Express.js et TypeScript. Elle offre plusieurs points de terminaison pour gérer les vêtements et leurs caractéristiques. Voici quelques fonctionnalités clés de l'application :

- **Gestion des paramètres de vêtements** : Ajout, modification et récupération des paramètres de vêtements.
    - ***types de vêtements***
    - ***tailles de vêtements***
    - ***usages de vêtements***
    - ***états des vêtements***  (neuf, usagé, etc.).
    - ***marques de vêtements***

- **Gestion des dressings** : Ajout, modification et récupération des dressings et des vêtements associés.
- **Gestion des tenues** : Création, modification et suppression de tenues composées de plusieurs vêtements.
- **Gestion des images des vêtements** : Téléchargement et stockage des images des vêtements.
- **Statistiques des vêtements** : Association des paramètres (types, tailles, usages, etc.) avec le nombre de vêtements correspondants.

L'application utilise des middlewares tels que `morgan` pour le logging des requêtes HTTP, `helmet` pour la sécurité, `cors` pour gérer les requêtes cross-origin, et `dotenv` pour la gestion des variables d'environnement.

## Installation

Pour installer les dépendances du projet, exécutez la commande suivante :

```sh
npm install
```

## Commandes disponibles

| Commande | Description |
|----------|-------------|
| `npm run dev` | Démarrer en mode développement (nodemon + `.env.dev`) |
| `npm run qua` | Démarrer en environnement qualification |
| `npm run prod` | Démarrer en environnement production |
| `npm run build` | Compiler TypeScript → JavaScript (`dist/`) |
| `npm run start:dist` | Démarrer depuis le build compilé |
| `npm run lint` | Lint + fix automatique avec ESLint |
| `npm run typecheck` | Vérification TypeScript sans compilation |
| `npm run test` | Exécuter les tests unitaires (Jest) |

## Configuration

Assurez-vous de configurer les variables d'environnement nécessaires dans un fichier `.env` à la racine du projet (`.env.dev`, `.env.qua`, `.env.prod` selon l'environnement). Voici un exemple de configuration :

```
PORT=3000
NODE_ENV=dev
VERSION=1.4.0
API_AUTH=user
API_PWD=password
MONGO_DB_URI=mongodb+srv://...
MONGO_DB_DATABASE=style-mini-app-dev
# AWS (optionnel — si images S3 utilisées)
AWS_REGION=eu-west-1
AWS_BUCKET_NAME=...
```

## Structure du projet

```
src/
  api/           → Routeurs Express (handlers HTTP, validation des requêtes)
  controllers/   → Logique CRUD MongoDB
  services/      → Connexion MongoDB, présignature S3
  models/        → Interfaces TypeScript + mappers MongoDB ↔ modèle
  constants/     → Enums, constantes applicatives, URLs et paramètres API
  index.ts       → Point d'entrée (Express local + handler AWS Lambda)
```

## Endpoints API

URL de base : `/api/v1/`

Authentification : **Basic Auth** sur toutes les routes (`API_AUTH` / `API_PWD`).

| Méthode | URL | Description |
|---------|-----|-------------|
| GET | `/api/v1/status` | Statut et version de l'API |
| GET | `/api/v1/dressing` | Liste tous les dressings |
| GET | `/api/v1/dressing/:idd` | Détail d'un dressing |
| GET | `/api/v1/dressing/:idd/vetements` | Liste les vêtements d'un dressing |
| POST | `/api/v1/dressing/:idd/vetements` | Crée un vêtement |
| POST | `/api/v1/dressing/:idd/vetements/:idv` | Modifie un vêtement |
| DELETE | `/api/v1/dressing/:idd/vetements/:idv` | Supprime un vêtement |
| PUT | `/api/v1/dressing/:idd/vetements/:idv/image` | Génère une URL S3 présignée pour upload image |
| GET | `/api/v1/dressing/:idd/tenues[?count]` | Liste les tenues (ou le nombre si `?count`) |
| POST | `/api/v1/dressing/:idd/tenues` | Crée une tenue |
| POST | `/api/v1/dressing/:idd/tenues/:idt` | Modifie une tenue |
| DELETE | `/api/v1/dressing/:idd/tenues/:idt` | Supprime une tenue |
| GET | `/api/v1/dressing/:idd/capsules[?count]` | Liste les capsules (ou le nombre si `?count`) |
| POST | `/api/v1/dressing/:idd/capsules` | Crée une capsule |
| POST | `/api/v1/dressing/:idd/capsules/:idc` | Modifie une capsule |
| DELETE | `/api/v1/dressing/:idd/capsules/:idc` | Supprime une capsule |
| GET | `/api/v1/params/vetements/:type` | Paramètres par type (TYPES, TAILLES, MARQUES, USAGES, ETATS) |
| POST | `/api/v1/params/vetements/:type` | Crée un paramètre |
| POST | `/api/v1/params/vetements/:type/:idp` | Modifie un paramètre |
| DELETE | `/api/v1/params/vetements/:type/:idp` | Supprime un paramètre |

## Déploiement dual

Le backend peut fonctionner dans deux modes :
- **Serveur Express local** : via `startServer()` — pour le développement, la qualification et la production on-premise
- **Fonction AWS Lambda** : via `lambdaHandler` — pour un déploiement serverless sur AWS

Avec ces informations, vous devriez être en mesure de configurer, construire et exécuter l'application backend "Style et Mini".

## Conventions clés

### Nommage des fichiers

- Controllers : `nom.controller.ts` (ex: `vetements.controller.ts`)
- Services : `nom.service.ts` (ex: `params.service.ts`) — ⚠️ `Mongodb.Service.ts` et `S3.Service.ts` utilisent encore le PascalCase (à corriger)
- Models : `nom.model.ts` avec mappers MongoDB intégrés
- Routes API : `apiNomDomaine.ts` (ex: `apiDressing.ts`)

### TypeScript

- Mode strict activé.
- Interfaces pour tous les modèles de données (pas de classes), avec le suffixe `Model`
- Enums avec suffixe `Enum` : `StatutVetementEnum`, `SaisonVetementEnum`
- Props de composants avec suffixe `Props` : `DressingComponentProps`
- Propriétés immuables marquées `readonly` dans les interfaces
- Pas de `any` sauf pour les objets MongoDB bruts (avec conversion immédiate)
- Éviter le type `Function` non typé — utiliser des signatures précises

## Tests

```sh
npm test
```

Framework : Jest + ts-jest + Supertest. Les tests sont dans le dossier `test/`.

| Suite | Description |
|-------|-------------|
| `test/models/paramGenericVetements.model.test.ts` | Fonctions de mapping MongoDB ↔ modèle paramètres (18 tests) |
| `test/models/vetements.model.test.ts` | Mapping `mongoModelToVetementModel` — champs optionnels, statuts (5 tests) |
| `test/models/dressing.model.test.ts` | Mapping `mongoModelToDressingModel` (4 tests) |
| `test/controllers/params.controller.test.ts` | `getParametresVetements` — collection correcte, type inconnu (7 tests) |
| `test/api/apiParamsVetements.test.ts` | Routes GET/POST/DELETE avec supertest + BasicAuth (5 tests) |