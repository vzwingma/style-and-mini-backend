# Style et Mini - Backend

## Objectif du projet

Le projet "Style et Mini" vise à fournir une API backend pour la gestion d'un dressing virtuel. Cette API permet de gérer les vêtements, leurs caractéristiques, les types de vêtements, les tailles, les usages, et bien plus encore. L'application est construite en utilisant Express.js et TypeScript, et elle se connecte à une base de données MongoDB pour stocker les données.

## Description de l'application

L'application backend "Style et Mini" est une API RESTful développée avec Express.js et TypeScript. Elle offre plusieurs points de terminaison pour gérer les vêtements et leurs caractéristiques. Voici quelques fonctionnalités clés de l'application :

- **Gestion des types de vêtements** : Ajout, modification et récupération des types de vêtements.
- **Gestion des tailles de vêtements** : Ajout, modification et récupération des tailles de vêtements.
- **Gestion des usages de vêtements** : Ajout, modification et récupération des usages de vêtements.
- **Gestion des dressings** : Ajout, modification et récupération des dressings et des vêtements associés.

L'application utilise des middlewares tels que `morgan` pour le logging des requêtes HTTP, `helmet` pour la sécurité, `cors` pour gérer les requêtes cross-origin, et `dotenv` pour la gestion des variables d'environnement.

## Installation

Pour installer les dépendances du projet, exécutez la commande suivante :

```sh
npm install
```

## Lint

Pour vérifier et corriger les erreurs de linting dans le code, exécutez la commande suivante :

```sh
npm run lint
```

## Tests

Pour exécuter les tests unitaires, utilisez la commande suivante :

```sh
npm run test
```

## Développement

Pour démarrer l'application en mode développement avec rechargement automatique, utilisez la commande suivante :

```sh
npm run dev
```

## Build

Pour compiler le projet TypeScript en JavaScript, exécutez la commande suivante :

```sh
npm run build
```

## Exécution

Pour démarrer l'application compilée, utilisez la commande suivante :

```sh
npm run start:dist
```

## Configuration

Assurez-vous de configurer les variables d'environnement nécessaires dans un fichier `.env` à la racine du projet. Voici un exemple de configuration :

```
PORT=3000
MONGO_DB_URI=mongodb://localhost:27017/style-mini-app-dev
MONGO_DB_DATABASE=style-mini-app-dev
```

Avec ces informations, vous devriez être en mesure de configurer, construire et exécuter l'application backend "Style et Mini".
