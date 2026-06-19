const fs = require('fs');
const path = require('path');

const docsDir = '/home/jeremy/Code/vitrine/_docs';

const files = fs.readdirSync(docsDir)
  .filter(f => f.endsWith('.md'))
  .sort()
  .filter(f => f >= 'addactionrow.md' && f <= 'executiontime.md');

console.log(`Found ${files.length} files to process`);

function isAlreadyEnglish(content) {
  const frenchIndicators = [
    /^## Syntaxe\b/m,
    /^## Paramètres\b/m,
    /^## Retourne\b/m,
    /^## Exemples\b/m,
    /^## Fonctions liées\b/m,
    /^## Valeur de retour\b/m,
    /^## Comportement\b/m,
    /^## Utilisation\b/m,
    /^## Gestion /m,
  ];
  return !frenchIndicators.some(r => r.test(content));
}

function applyStructuralReplacements(content) {
  let result = content;
  
  // Section headers
  result = result.replace(/^## Syntaxe\b/gm, '## Syntax');
  result = result.replace(/^## Paramètres\b/gm, '## Parameters');
  result = result.replace(/^## Retourne\b/gm, '## Returns');
  result = result.replace(/^## Exemples\b/gm, '## Examples');
  result = result.replace(/^## Fonctions liées\b/gm, '## Related Functions');
  result = result.replace(/^## Valeur de retour\b/gm, '## Return value');
  result = result.replace(/^## Comportement\b/gm, '## Behavior');
  result = result.replace(/^## Utilisation\b/gm, '## Usage');
  result = result.replace(/^## Différence avec (.+)/gm, '## Difference from $1');
  result = result.replace(/^## Gestion des interactions\b/gm, '## Handling interactions');
  result = result.replace(/^## Gestion de l'interaction\b/gm, '## Handling the interaction');
  result = result.replace(/^## Styles disponibles\b/gm, '## Available styles');
  result = result.replace(/^## Types de salons \(channelTypes\)/gm, '## Channel types (channelTypes)');
  result = result.replace(/^## Types de fichiers supportés\b/gm, '## Supported file types');
  result = result.replace(/^## Types de\b/gm, '## Types of');
  result = result.replace(/^## Notes\b/gm, '## Notes');
  result = result.replace(/^## Description\b/gm, '## Description');
  
  // Table headers
  result = result.replace(/\| Paramètre \|/g, '| Parameter |');
  result = result.replace(/\| Obligatoire \|/g, '| Required |');
  result = result.replace(/\| Défaut \|/g, '| Default |');
  
  // Table content
  result = result.replace(/\| Non \|/g, '| No |');
  result = result.replace(/\| Oui \|/g, '| Yes |');
  result = result.replace(/\| Dernier groupe \|/g, '| Last group |');
  result = result.replace(/\| Dernière galerie \|/g, '| Last gallery |');
  
  return result;
}

let skipped = 0;
let done = 0;

for (const file of files) {
  const filePath = path.join(docsDir, file);
  const content = fs.readFileSync(filePath, 'utf8');
  
  if (isAlreadyEnglish(content)) {
    console.log(`SKIP (already English): ${file}`);
    skipped++;
    continue;
  }
  
  const newContent = applyStructuralReplacements(content);
  
  if (newContent !== content) {
    fs.writeFileSync(filePath, newContent, 'utf8');
  }
  
  done++;
  console.log(`DONE: ${file}`);
}

console.log(`\nStructural changes: ${done} files modified, ${skipped} skipped (already English)`);
console.log(`${files.length - done - skipped} files still need attention`);
