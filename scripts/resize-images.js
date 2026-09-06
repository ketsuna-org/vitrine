const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const screenshotsDir = path.join(__dirname, '..', 'assets', 'images', 'screenshots');

const DEVICES = ['iphone', 'android', 'ipad', 'tablet'];
const SCREEN_IDS = [
  'screen-1-create-host',
  'screen-2-build-without-code',
  'screen-3-full-scripting',
  'screen-4-analytics',
  'screen-5-deploy-scale',
];

const SIZES = [
  { suffix: '_small', width: 480 },
  { suffix: '_medium', width: 800 },
];

async function resizeImages() {
  console.log('Starting screenshot variant generation...');

  for (const device of DEVICES) {
    for (const screenId of SCREEN_IDS) {
      const inputPath = path.join(screenshotsDir, device, `${screenId}.webp`);
      if (!fs.existsSync(inputPath)) {
        console.warn(`File not found: ${inputPath}`);
        continue;
      }

      for (const size of SIZES) {
        const outputPath = path.join(screenshotsDir, device, `${screenId}${size.suffix}.webp`);
        try {
          await sharp(inputPath)
            .resize({ width: size.width, withoutEnlargement: true })
            .toFile(outputPath);
          console.log(`Resized ${device}/${screenId} -> ${size.suffix}`);
        } catch (error) {
          console.error(`Error resizing ${inputPath}:`, error.message);
        }
      }
    }
  }

  console.log('Screenshot variant generation completed.');
}

resizeImages();
