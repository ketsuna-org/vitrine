// Regenerate local icons from the official reicon@1.2.5 package (https://reicon.dev).
// Usage: node scripts/import-reicon-icons.mjs /path/to/unpacked/reicon/package
// Paths are preserved verbatim from the package's Outline assets; no runtime dependency.
import { readFile, writeFile } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';
const packageRoot = process.argv[2];
if (!packageRoot) throw new Error('Provide the extracted official reicon package directory.');
const metadata = JSON.parse(await readFile(resolve(packageRoot, 'package.json'), 'utf8'));
if (metadata.name !== 'reicon' || metadata.version !== '1.2.5') throw new Error('Expected official reicon@1.2.5.');
const mapUrl = new URL('../assets/icons/reicon-map.json', import.meta.url);
const aliases = JSON.parse(await readFile(mapUrl, 'utf8'));
const symbols = [];
for (const [alias, name] of Object.entries(aliases)) {
  const { default: icon } = await import(pathToFileURL(resolve(packageRoot, 'icons', `${name}.js`)));
  if (!icon.iconData.O) throw new Error(`Missing Outline icon ${name}`);
  symbols.push(`<symbol id="${alias}" viewBox="0 0 24 24">${icon.iconData.O}</symbol>`);
}
await writeFile(new URL('../assets/icons/reicon.svg', import.meta.url),
  `<!-- Reicon 1.2.5, Outline. https://reicon.dev | MIT | https://github.com/dqev/reicon -->\n` +
  `<svg xmlns="http://www.w3.org/2000/svg">\n${symbols.join('\n')}\n</svg>\n`);
console.log(`Generated ${symbols.length} Reicon symbols.`);
