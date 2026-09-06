const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const SOURCE_ROOT = process.env.SCREENSHOT_SOURCE || path.join(process.env.USERPROFILE || '', 'Downloads', 'app-screenshots');
const OUTPUT_ROOT = path.join(__dirname, '..', 'assets', 'images', 'screenshots');

const SCREEN_MAP = [
  { num: 1, id: 'screen-1-create-host' },
  { num: 2, id: 'screen-2-build-without-code' },
  { num: 3, id: 'screen-3-full-scripting' },
  { num: 4, id: 'screen-4-analytics' },
  { num: 5, id: 'screen-5-deploy-scale' },
];

const DEVICES = {
  iphone: 'iOS/English (en-US)/iPhone_14_Plus_(6.5)',
  android: 'Android/English (en-US)/Google_Pixel_8',
  ipad: 'iOS/English (en-US)/iPad_Pro_12.9_(Legacy)',
  tablet: 'Android/English (en-US)/Galaxy_Tab_S9',
};

const SIZES = [
  { suffix: '', width: null },
  { suffix: '_small', width: 480 },
  { suffix: '_medium', width: 800 },
];

function findSourceFile(deviceDir, screenNum) {
  const files = fs.readdirSync(deviceDir);
  const match = files.find(f => f.startsWith(`Screen_${screenNum}_`) && /\.jpe?g$/i.test(f));
  return match ? path.join(deviceDir, match) : null;
}

async function processImage(inputPath, outputPath, width) {
  let pipeline = sharp(inputPath);
  if (width) pipeline = pipeline.resize({ width, withoutEnlargement: true });
  await pipeline.webp({ quality: 85 }).toFile(outputPath);
}

async function main() {
  if (!fs.existsSync(SOURCE_ROOT)) {
    console.error('Source not found:', SOURCE_ROOT);
    process.exit(1);
  }

  for (const [device, relDir] of Object.entries(DEVICES)) {
    const deviceDir = path.join(SOURCE_ROOT, relDir);
    const outDir = path.join(OUTPUT_ROOT, device);
    fs.mkdirSync(outDir, { recursive: true });

    for (const screen of SCREEN_MAP) {
      const src = findSourceFile(deviceDir, screen.num);
      if (!src) {
        console.warn(`Missing: ${device} screen ${screen.num}`);
        continue;
      }
      for (const size of SIZES) {
        const outName = `${screen.id}${size.suffix}.webp`;
        const outPath = path.join(outDir, outName);
        await processImage(src, outPath, size.width);
        console.log(`Created ${path.relative(OUTPUT_ROOT, outPath)}`);
      }
    }
  }
  console.log('Screenshot import complete.');
}

main().catch(err => { console.error(err); process.exit(1); });
