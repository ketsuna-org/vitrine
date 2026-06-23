const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const screenshotsDir = path.join(__dirname, '..', 'assets', 'images', 'screenshots');

const filesToResize = [
  'screen1.webp',
  'screen2.webp',
  'screen3.webp'
];

async function resizeImages() {
  console.log('Starting image resizing...');
  
  for (const filename of filesToResize) {
    const inputPath = path.join(screenshotsDir, filename);
    const ext = path.extname(filename);
    const baseName = path.basename(filename, ext);
    const outputPath = path.join(screenshotsDir, `${baseName}_small${ext}`);
    
    if (!fs.existsSync(inputPath)) {
      console.warn(`File not found: ${inputPath}`);
      continue;
    }
    
    try {
      await sharp(inputPath)
        .resize({ width: 660 })
        .toFile(outputPath);
      
      const inputStats = fs.statSync(inputPath);
      const outputStats = fs.statSync(outputPath);
      
      const inputSizeKb = (inputStats.size / 1024).toFixed(1);
      const outputSizeKb = (outputStats.size / 1024).toFixed(1);
      const savingsKb = (inputStats.size - outputStats.size) / 1024;
      const savingsPct = (((inputStats.size - outputStats.size) / inputStats.size) * 100).toFixed(0);
      
      console.log(`Resized ${filename} to ${baseName}_small.webp`);
      console.log(`  Original: ${inputSizeKb} KB`);
      console.log(`  New:      ${outputSizeKb} KB`);
      console.log(`  Saved:    ${savingsKb.toFixed(1)} KB (${savingsPct}%)`);
    } catch (error) {
      console.error(`Error resizing ${filename}:`, error);
    }
  }
  
  console.log('Image resizing completed.');
}

resizeImages();
