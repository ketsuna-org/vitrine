// Import actual Flutter captures, preserving their aspect ratio at every size.
// Usage: node scripts/import-mobile-screenshots.js /absolute/capture-directory
const fs = require('node:fs');
const path = require('node:path');
const sharp = require('sharp');

const source = process.argv[2];
const output = path.join(__dirname, '../assets/images/screenshots/mobile');
const screens = ['home', 'blocks', 'commands', 'workflow', 'hosting'];

async function main() {
  if (!source) throw new Error('Provide a directory containing the Flutter PNG captures.');
  // Check all inputs before changing any assets.
  for (const screen of screens) {
    if (!fs.existsSync(path.join(source, `${screen}.png`))) {
      throw new Error(`Missing capture: ${screen}.png`);
    }
  }
  fs.mkdirSync(output, { recursive: true });
  const sizes = [{ suffix: '_small', width: 480 }, { suffix: '_medium', width: 800 }, { suffix: '', width: 1080 }];
  for (const screen of screens) {
    for (const { suffix, width } of sizes) {
      await sharp(path.join(source, `${screen}.png`))
        .resize({ width, withoutEnlargement: true })
        .webp({ quality: 90 })
        .toFile(path.join(output, `${screen}${suffix}.webp`));
    }
    console.log(`Imported ${screen}`);
  }
}

main().catch(error => { console.error(error.message); process.exitCode = 1; });
