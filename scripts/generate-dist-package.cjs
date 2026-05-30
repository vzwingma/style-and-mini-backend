#!/usr/bin/env node
/**
 * Génère dist/package.json avec "type":"module" après chaque build TypeScript.
 * Requis pour que Lambda Node.js charge dist/app.js comme ES Module.
 * Exécuté automatiquement via le script "postbuild".
 */
const fs   = require('fs');
const path = require('path');

const outputPath = path.resolve(__dirname, '../dist/package.json');
const content    = JSON.stringify({ type: 'module' }, null, 2) + '\n';

fs.writeFileSync(outputPath, content, 'utf-8');
console.log('[generate-dist-package] dist/package.json → { "type": "module" }');
