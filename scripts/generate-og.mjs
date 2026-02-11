// scripts/generate-og.mjs — Run with: node scripts/generate-og.mjs
import sharp from 'sharp';
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');

const svg = readFileSync(resolve(root, 'public/og-image.svg'));

await sharp(svg)
  .resize(1200, 630)
  .png()
  .toFile(resolve(root, 'public/og-image.png'));

console.log('✓ Generated public/og-image.png (1200×630)');

// Also generate favicon PNGs
const faviconSvg = readFileSync(resolve(root, 'public/favicon.svg'));

await sharp(faviconSvg).resize(32, 32).png().toFile(resolve(root, 'public/favicon-32.png'));
await sharp(faviconSvg).resize(180, 180).png().toFile(resolve(root, 'public/apple-touch-icon.png'));

console.log('✓ Generated favicon-32.png & apple-touch-icon.png');
