# Plan d'Action : Migration ESM du Backend (Node.js 24 / Lambda)

**Document :** `.github/plans/001_migration_esm.plan.md`  
**Date de création :** 2026-05-30  
**Statut :** ⏳ Planifié  
**Objectif Prioritaire :** HIGH

---

## 🎯 Objectif Global

Le backend crash sur AWS Lambda Node.js 24 avec l'erreur `ERR_REQUIRE_ESM` causée par `uuid` v14 qui est ESM-only et incompatible avec un build CommonJS. Le `tsconfig.json` utilise déjà `"module": "NodeNext"` / `"moduleResolution": "nodenext"` qui supportent ESM nativement.

L'objectif est de **migrer le backend vers ES Modules** en ajoutant `"type": "module"` dans `package.json`, en renommant les fichiers CJS incompatibles, et en ajoutant les extensions `.js` obligatoires sur tous les imports relatifs — conformément aux exigences de NodeNext ESM.  
Critères de succès : `npm run typecheck` sans erreur, `npm test` 100% passant, build Lambda opérationnel sur Node.js 24.

---

## 📦 Phase 1 — Préparation infrastructure CJS/ESM

### Contexte
- `jest.config.js` utilise `module.exports` (CommonJS) : incompatible avec `"type": "module"`
- `scripts/generate-version.js` utilise `require()` (CommonJS) : incompatible avec `"type": "module"`
- `package.json` doit déclarer `"type": "module"` et adapter les scripts impactés
- Ces renommages sont des prérequis bloquants pour toute la migration

### Critères de Réussite
✅ `jest.config.cjs` existe et `jest.config.js` supprimé  
✅ `scripts/generate-version.cjs` existe et `scripts/generate-version.js` supprimé  
✅ `package.json` contient `"type": "module"`, script `test` avec `--experimental-vm-modules`, script `prebuild` référençant `generate-version.cjs`  
✅ `npm run typecheck` ne remonte pas d'erreur liée à la configuration  

### Tâches (Agent: Devon 🔵 DEV)

#### T1.1 — Renommer et adapter `jest.config.js` → `jest.config.cjs`
- **Fichier(s) :** `jest.config.js` (renommer en) `jest.config.cjs`
- **Implémenter :**
  - Conserver `module.exports` (syntaxe CJS valide dans `.cjs`)
  - Mettre à jour `preset` : `'ts-jest/presets/default-esm'`
  - Ajouter `useESM: true` dans le bloc `globals['ts-jest']`
  - Conserver `testEnvironment: 'node'`, `testMatch`, `modulePathIgnorePatterns`
- **Acceptation :**
  - ✓ Fichier `.cjs` présent, `.js` absent
  - ✓ `module.exports` intact
  - ✓ Clé `useESM: true` présente dans globals ts-jest

#### T1.2 — Renommer `scripts/generate-version.js` → `scripts/generate-version.cjs`
- **Fichier(s) :** `scripts/generate-version.js` (renommer en) `scripts/generate-version.cjs`
- **Implémenter :**
  - Aucune modification du contenu (déjà syntaxe CJS avec `require()`)
  - Seul le renommage est nécessaire
- **Acceptation :**
  - ✓ Fichier `generate-version.cjs` présent, `.js` absent
  - ✓ Contenu identique à l'original

#### T1.3 — Mettre à jour `package.json`
- **Fichier(s) :** `package.json`
- **Implémenter :**
  - Ajouter `"type": "module"` au niveau racine
  - Mettre à jour `"test"` : `"node --experimental-vm-modules node_modules/.bin/jest"`
  - Mettre à jour `"prebuild"` : `"node scripts/generate-version.cjs"`
- **Acceptation :**
  - ✓ Champ `"type": "module"` présent
  - ✓ Script `test` contient `--experimental-vm-modules`
  - ✓ Script `prebuild` référence `generate-version.cjs`

---

## 🔗 Phase 2 — Migration des imports relatifs vers ESM (`src/`)

### Contexte
- NodeNext ESM impose l'extension `.js` explicite sur **tous** les imports relatifs dans les fichiers `.ts`
- Les imports de modules npm (`express`, `mongodb`, `uuid`, etc.) ne sont pas concernés
- Tous les fichiers `src/**/*.ts` listés ci-dessous ont des imports relatifs sans extension
- Cette phase dépend de Phase 1 (le projet doit être en mode ESM avant de valider)

### Critères de Réussite
✅ Tous les imports relatifs dans `src/` ont l'extension `.js`  
✅ Aucun import relatif sans extension dans `src/**/*.ts`  
✅ `npm run typecheck` passe sans erreur sur les fichiers `src/`  

### Tâches (Agent: Devon 🔵 DEV)

#### T2.1 — Ajouter extensions `.js` dans `src/app.ts`
- **Fichier(s) :** `src/app.ts`
- **Implémenter :** Ajouter `.js` sur tous les imports relatifs (`from './...'`)
- **Acceptation :** ✓ Aucun import relatif sans `.js` dans le fichier

#### T2.2 — Ajouter extensions `.js` dans `src/api/`
- **Fichier(s) :**
  - `src/api/index.ts`
  - `src/api/apiDressing.ts`
  - `src/api/apiParamsVetements.ts`
  - `src/api/interfaces/ErrorResponse.ts`
  - `src/api/middlewares.ts`
- **Implémenter :** Ajouter `.js` sur tous les imports relatifs dans chacun de ces fichiers
- **Acceptation :** ✓ Aucun import relatif sans `.js` dans les 5 fichiers

#### T2.3 — Ajouter extensions `.js` dans `src/constants/`
- **Fichier(s) :** `src/constants/AppConstants.ts`
- **Implémenter :** Ajouter `.js` sur tous les imports relatifs
- **Acceptation :** ✓ Aucun import relatif sans `.js` dans le fichier

#### T2.4 — Ajouter extensions `.js` dans `src/controllers/`
- **Fichier(s) :**
  - `src/controllers/dressing.controller.ts`
  - `src/controllers/vetements.controller.ts`
  - `src/controllers/tenues.controller.ts`
  - `src/controllers/capsules.controller.ts`
  - `src/controllers/params.controller.ts`
- **Implémenter :** Ajouter `.js` sur tous les imports relatifs dans chacun des 5 fichiers
- **Acceptation :** ✓ Aucun import relatif sans `.js` dans les 5 fichiers

#### T2.5 — Ajouter extensions `.js` dans `src/services/`
- **Fichier(s) :**
  - `src/services/params.service.ts`
  - `src/services/mongodb.service.ts`
- **Implémenter :** Ajouter `.js` sur tous les imports relatifs
- **Acceptation :** ✓ Aucun import relatif sans `.js` dans les 2 fichiers

#### T2.6 — Ajouter extensions `.js` dans `src/models/`
- **Fichier(s) :**
  - `src/models/dressing.model.ts`
  - `src/models/capsules/capsules.model.ts`
  - `src/models/tenues/tenue.model.ts`
  - `src/models/tenues/tenue.vetements.model.ts`
  - `src/models/vetements/vetements.model.ts`
  - `src/models/params/paramGenericVetements.model.ts`
  - `src/models/apiResults/api.result.tenues.model.ts`
  - `src/models/apiResults/api.result.capsules.model.ts`
  - `src/models/apiResults/api.result.vetements.model.ts`
- **Implémenter :** Ajouter `.js` sur tous les imports relatifs dans chacun des 9 fichiers
- **Acceptation :** ✓ Aucun import relatif sans `.js` dans les 9 fichiers

---

## 🧪 Phase 3 — Migration des imports relatifs vers ESM (`test/`)

### Contexte
- Les fichiers de test `test/**/*.ts` ont également des imports relatifs sans extension
- La migration des tests est séparée de `src/` pour isoler les changements
- Dépend de Phase 2 (les fichiers sources doivent être migrés avant de valider les tests)

### Critères de Réussite
✅ Tous les imports relatifs dans `test/` ont l'extension `.js`  
✅ `npm test` passe sans erreur liée aux imports ESM  

### Tâches (Agent: Devon 🔵 DEV)

#### T3.1 — Ajouter extensions `.js` dans `test/api/`
- **Fichier(s) :** `test/api/apiParamsVetements.test.ts`
- **Implémenter :** Ajouter `.js` sur tous les imports relatifs
- **Acceptation :** ✓ Aucun import relatif sans `.js`

#### T3.2 — Ajouter extensions `.js` dans `test/models/`
- **Fichier(s) :**
  - `test/models/vetements.model.test.ts`
  - `test/models/paramGenericVetements.model.test.ts`
  - `test/models/dressing.model.test.ts`
- **Implémenter :** Ajouter `.js` sur tous les imports relatifs dans les 3 fichiers
- **Acceptation :** ✓ Aucun import relatif sans `.js` dans les 3 fichiers

#### T3.3 — Ajouter extensions `.js` dans `test/controllers/`
- **Fichier(s) :** `test/controllers/params.controller.test.ts`
- **Implémenter :** Ajouter `.js` sur tous les imports relatifs
- **Acceptation :** ✓ Aucun import relatif sans `.js`

---

## ✅ Phase 4 — Validation complète

### Contexte
- Toutes les phases de migration sont complètes (1, 2, 3)
- Cette phase vérifie que l'ensemble du projet compile et que tous les tests passent
- Elle constitue la gate finale avant déploiement Lambda

### Critères de Réussite
✅ `npm run typecheck` : 0 erreur TypeScript  
✅ `npm test` : 100% des tests passants (0 failure, 0 erreur ESM)  
✅ `npm run build` : build `dist/` généré sans erreur  
✅ Aucune régression fonctionnelle détectée  

### Tâches (Agent: QUALvin 🟢 QUAL)

#### T4.1 — Valider le typecheck TypeScript
- **Fichier(s) :** Ensemble du projet (`src/**/*.ts`)
- **Couvrir :**
  - Exécuter `npm run typecheck`
  - Vérifier 0 erreur TypeScript liée aux imports ou à la résolution de modules
  - Documenter toute erreur résiduelle si présente
- **Acceptation :**
  - ✓ `npm run typecheck` : exit code 0
  - ✓ Aucune erreur `TS2307`, `TS1479` ou similaire liée à ESM

#### T4.2 — Valider la suite de tests complète
- **Fichier(s) :** `test/**/*.test.ts`
- **Couvrir :**
  - Exécuter `npm test`
  - Vérifier que tous les tests passent (0 failure)
  - Vérifier l'absence d'erreurs `ERR_REQUIRE_ESM` ou `Cannot find module`
  - Documenter le nombre de tests passants et la couverture si disponible
- **Acceptation :**
  - ✓ `npm test` : exit code 0
  - ✓ 0 test en failure
  - ✓ 0 erreur de résolution de module ESM

#### T4.3 — Valider le build de production
- **Fichier(s) :** `dist/` (généré par `npm run build`)
- **Couvrir :**
  - Exécuter `npm run build`
  - Vérifier la présence des fichiers compilés dans `dist/`
  - Vérifier que `dist/app.js` est généré
- **Acceptation :**
  - ✓ `npm run build` : exit code 0
  - ✓ `dist/app.js` présent
  - ✓ Aucune erreur de compilation

---

## 📊 Résumé des Tâches par Agent

### Devon (🔵 DEV) Agent
- **Phase 1** — T1.1 à T1.3 : Renommages CJS + mise à jour `package.json`
- **Phase 2** — T2.1 à T2.6 : Migration imports `src/**/*.ts` (21 fichiers)
- **Phase 3** — T3.1 à T3.3 : Migration imports `test/**/*.ts` (5 fichiers)
- **Livrable :** Codebase entièrement migré ESM, `"type": "module"` actif, tous imports avec extensions `.js`
- **Durée estimée :** Faible (mécanique, pas de logique métier modifiée)

### QUALvin (🟢 QUAL) Agent
- **Phase 4** — T4.1 à T4.3 : Validation typecheck + tests + build
- **Livrable :** Rapport de validation avec résultats `typecheck`, `test` et `build`
- **Durée estimée :** Faible (exécution de commandes existantes)

---

## 📍 Dépendances entre Phases

```
Phase 1 (Préparation infrastructure)
    ↓
Phase 2 (Migration imports src/) ← [Phase 1 doit être ✅]
    ↓
Phase 3 (Migration imports test/) ← [Phase 2 doit être ✅]
    ↓
Phase 4 (Validation complète) ← [Phases 1, 2, 3 doivent être ✅]
```

**Règles :**
- Phase 2 ne peut démarrer qu'après Phase 1 ✅ (`"type": "module"` actif)
- Phase 3 peut démarrer en même temps que la fin de Phase 2 (test/ indépendant de src/)
- Phase 4 est le gate final : ne peut démarrer qu'après Phases 1 + 2 + 3 ✅

---

## ✅ Critères de Succès Globaux

1. **`"type": "module"` présent** dans `package.json` (Phase 1)
2. **Fichiers CJS renommés** : `jest.config.cjs`, `generate-version.cjs` (Phase 1)
3. **0 import relatif sans `.js`** dans `src/**/*.ts` (Phase 2)
4. **0 import relatif sans `.js`** dans `test/**/*.ts` (Phase 3)
5. **`npm run typecheck` : exit 0** — 0 erreur TypeScript (Phase 4)
6. **`npm test` : exit 0** — 100% tests passants, 0 erreur ESM (Phase 4)
7. **`npm run build` : exit 0** — `dist/` généré correctement (Phase 4)

---

## 🚀 Plan d'Exécution

1. **Étape 1 :** Lancer Phase 1 → Devon (🔵 DEV) — Prérequis bloquant
2. **Étape 2 :** Après Phase 1 ✅ → Lancer Phase 2 → Devon (🔵 DEV)
3. **Étape 3 :** Après Phase 2 ✅ → Lancer Phase 3 → Devon (🔵 DEV)
4. **Étape 4 :** Après Phases 1+2+3 ✅ → Lancer Phase 4 → QUALvin (🟢 QUAL) — Gate finale

**Triggers pour démarrer une phase :**
- Rapport de phase précédente rempli et marqué ✅ COMPLÉTÉE
- Tous les critères de réussite de la phase précédente atteints
- Aucun bloqueur signalé

---

## ⚠️ Risques et Mitigations

| Risque | Probabilité | Impact | Mitigation |
|--------|-------------|--------|------------|
| Import relatif oublié dans un fichier | Moyen | Élevé (crash runtime) | `npm run typecheck` détecte les imports non résolus |
| Dépendance npm tierce non compatible ESM | Faible | Élevé | Vérifier les `peerDependencies` de `ts-jest` v29 avec ESM |
| `ts-jest` + ESM + Node 24 incompatibilité | Faible | Moyen | `ts-jest/presets/default-esm` supporte ESM depuis v29 |
| Tests qui mockent des modules CJS | Moyen | Moyen | Adapter les mocks si `jest.mock()` sans `import` ESM |

---

**Fin du Plan d'Action AP-001 — Migration ESM**
