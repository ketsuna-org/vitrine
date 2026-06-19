const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const docsDir = '/home/jeremy/Code/vitrine/_docs';

// Get sorted file list from addactionrow.md to executiontime.md
const files = fs.readdirSync(docsDir)
  .filter(f => f.endsWith('.md'))
  .sort()
  .filter(f => f >= 'addactionrow.md' && f <= 'executiontime.md');

console.log(`Found ${files.length} files to process`);

// Translation cache
const translationCache = {};

async function translateText(text) {
  if (!text || text.trim().length === 0) return text;
  if (translationCache[text]) return translationCache[text];
  
  // Skip if already mostly English (simple heuristic)
  const frenchPatterns = /[éeèêëàâîïôûùçÉÈÊËÀÂÎÏÔÛÙÇ]|\\b(le |la |les |un |une |des |du |de |et |ou |est |sont |dans |sur |avec |pour |par |pas |que |qui |ce |cette |ces |mon |ton |son |notre |votre |leur)\\b/i;
  
  // Actually let's just translate everything via the API
  try {
    const encoded = encodeURIComponent(text);
    const url = `https://api.mymemory.translated.net/get?q=${encoded}&langpair=fr|en`;
    const result = execSync(`curl -s "${url}"`, { encoding: 'utf8', maxBuffer: 1024 * 1024 });
    const parsed = JSON.parse(result);
    if (parsed.responseStatus === 200 && parsed.responseData) {
      const translated = parsed.responseData.translatedText;
      translationCache[text] = translated;
      return translated;
    }
  } catch (e) {
    // Fall through to return original
  }
  return text;
}

function isAlreadyEnglish(content) {
  // Check for French characters and common French words
  const frenchChars = /[éèêëàâîïôûùçÉÈÊËÀÂÎÏÔÛÙÇ]/;
  const frenchWords = /\b(Syntaxe|Paramètres|Obligatoire|Retourne|Exemples|Fonctions liées|Valeur de retour|Comportement|Utilisation|Différence|Gestion des|Styles disponibles|Types de)\b/;
  
  return !frenchChars.test(content) && !frenchWords.test(content);
}

function processStructural(content) {
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
  result = result.replace(/^## Différence avec\b/gm, '## Difference from');
  result = result.replace(/^## Gestion des interactions\b/gm, '## Handling interactions');
  result = result.replace(/^## Gestion de l'interaction\b/gm, '## Handling the interaction');
  result = result.replace(/^## Styles disponibles\b/gm, '## Available styles');
  result = result.replace(/^## Types de salons\b/gm, '## Channel types');
  result = result.replace(/^## Types de fichiers supportés\b/gm, '## Supported file types');
  result = result.replace(/^## Types de\b/gm, '## Types of');
  
  // Table headers - handle various formats
  result = result.replace(/\| Paramètre \|/g, '| Parameter |');
  result = result.replace(/\| Obligatoire \|/g, '| Required |');
  result = result.replace(/\| Défaut \|/g, '| Default |');
  result = result.replace(/\| Description \|/g, '| Description |');
  
  // Table content: Non → No, Oui → Yes
  result = result.replace(/\| Non \|/g, '| No |');
  result = result.replace(/\| Oui \|/g, '| Yes |');
  
  // Common table phrases
  result = result.replace(/\| Dernier groupe \|/g, '| Last group |');
  result = result.replace(/\| Dernière galerie \|/g, '| Last gallery |');
  
  return result;
}

async function processFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const fileName = path.basename(filePath);
  
  if (isAlreadyEnglish(content)) {
    console.log(`  SKIP (already English): ${fileName}`);
    return;
  }
  
  // First do structural changes
  let processed = processStructural(content);
  
  // Split into lines for translation
  const lines = processed.split('\n');
  const translatedLines = [];
  
  for (const line of lines) {
    // Skip code blocks, frontmatter, empty lines, horizontal rules
    if (line.startsWith('```') || line.startsWith('---') || 
        line.trim() === '' || line.match(/^\|[-| ]+\|$/) ||
        line.match(/^layout:/) || line.match(/^translation_key:/) ||
        line.match(/^category:/) || line.match(/^function_name:/) ||
        line.match(/^syntax:/) || line.match(/^title:/)) {
      translatedLines.push(line);
      continue;
    }
    
    // Skip lines that are purely code or already English headers
    if (line.startsWith('$') || line.startsWith('# $') || 
        line.match(/^#{1,6} /) && !line.match(/[éèêëàâîïôûùç]/i)) {
      // Section headers are already handled, but h1 descriptions need translation
      if (line.match(/^# \$/) && line.includes(' — ')) {
        // Has French in the h1 title
        const translated = await translateText(line);
        translatedLines.push(translated);
        continue;
      }
      translatedLines.push(line);
      continue;
    }
    
    // Skip pure table formatting lines
    if (line.match(/^\|[-| :]+\|$/)) {
      translatedLines.push(line);
      continue;
    }
    
    // For table rows, only translate the content cells, not the first column (param name)
    if (line.startsWith('|') && line.endsWith('|') && !line.startsWith('| Parameter') && !line.startsWith('| Required') && !line.startsWith('| Default') && !line.startsWith('|---')) {
      // Table row - translate only description parts
      const parts = line.split('|');
      if (parts.length >= 3) {
        // parts[0] is empty (leading |), parts[1] is param name, rest are descriptions
        const paramName = parts[1];
        const restParts = parts.slice(2);
        const translatedRest = [];
        for (let i = 0; i < restParts.length; i++) {
          const part = restParts[i].trim();
          if (part && part !== '—' && part !== '' && 
              !part.match(/^`.*`$/) && 
              part !== 'Yes' && part !== 'No' &&
              part !== 'yes' && part !== 'no') {
            const translated = await translateText(part);
            translatedRest.push(` ${translated} `);
          } else {
            translatedRest.push(` ${restParts[i]} `);
          }
        }
        translatedLines.push(`| ${paramName}|${translatedRest.join('|')}|`);
        continue;
      }
    }
    
    // Translate French text if it contains French characters
    if (/[éèêëàâîïôûùçÉÈÊËÀÂÎÏÔÛÙÇ]/.test(line)) {
      const translated = await translateText(line);
      translatedLines.push(translated);
    } else {
      translatedLines.push(line);
    }
  }
  
  const finalContent = translatedLines.join('\n');
  fs.writeFileSync(filePath, finalContent, 'utf8');
  console.log(`  DONE: ${fileName}`);
}

async function main() {
  console.log(`Processing ${files.length} files...\n`);
  
  for (const file of files) {
    const filePath = path.join(docsDir, file);
    await processFile(filePath);
  }
  
  console.log(`\nAll ${files.length} files processed.`);
}

main().catch(console.error);
