#!/usr/bin/env node
/**
 * Génère src/constants/version.generated.ts à partir de package.json.
 * Exécuté automatiquement via le script "prebuild" avant chaque compilation TypeScript.
 */
const { version } = require('../package.json');
const fs = require('fs');
const path = require('path');

const outputPath = path.resolve(__dirname, '../src/constants/version.generated.ts');
const content = `// Fichier généré automatiquement par scripts/generate-version.js — NE PAS MODIFIER
export const PACKAGE_VERSION = '${version}';\n`;

fs.writeFileSync(outputPath, content, 'utf-8');
console.log(`[generate-version] version.generated.ts → ${version}`);
