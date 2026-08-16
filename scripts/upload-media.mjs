#!/usr/bin/env node

/**
 * GEC Palakkad College Union - Media Uploader & Data Sync Tool
 * 
 * Usage:
 *   npm run upload-media
 *   npm run upload-media -- --auto-sync
 */

import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// 1. Load .env variables
function loadEnv() {
  const envPath = path.join(rootDir, '.env');
  if (!fs.existsSync(envPath)) return {};
  const content = fs.readFileSync(envPath, 'utf8');
  const env = {};
  for (const line of content.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eqIdx = trimmed.indexOf('=');
    if (eqIdx !== -1) {
      const key = trimmed.slice(0, eqIdx).trim();
      const val = trimmed.slice(eqIdx + 1).trim();
      env[key] = val;
    }
  }
  return env;
}

const env = loadEnv();
let cloudName = env.CLOUDINARY_CLOUD_NAME || 'gec-palakkad';
let apiKey = env.CLOUDINARY_API_KEY;
let apiSecret = env.CLOUDINARY_API_SECRET;

// Parse CLOUDINARY_URL if present: cloudinary://apiKey:apiSecret@cloudName
if (env.CLOUDINARY_URL) {
  const match = env.CLOUDINARY_URL.match(/cloudinary:\/\/([^:]+):([^@]+)@(.+)/);
  if (match) {
    apiKey = match[1];
    apiSecret = match[2];
    cloudName = match[3];
  }
}

if (!apiKey || !apiSecret) {
  console.error('\x1b[31m[ERROR]\x1b[0m Missing Cloudinary credentials in .env.');
  console.error('Please ensure CLOUDINARY_URL or CLOUDINARY_API_KEY + CLOUDINARY_API_SECRET are set.');
  process.exit(1);
}

const rawDir = path.join(rootDir, 'raw_images');
const categories = ['gallery', 'impact', 'events'];

// Ensure raw directories exist
categories.forEach(cat => {
  const dir = path.join(rawDir, cat);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

async function uploadFile(filePath, category) {
  const timestamp = Math.floor(Date.now() / 1000);
  const baseName = path.parse(filePath).name
    .toLowerCase()
    .replace(/[^a-z0-9_-]/g, '_')
    .replace(/_+/g, '_')
    .replace(/^_|_$/g, '');

  const folder = 'union';
  const prefix = category === 'impact' ? 'impact_' : category === 'events' ? 'event_' : '';
  const publicId = `${folder}/${prefix}${baseName}`;

  const strToSign = `folder=${folder}&overwrite=true&public_id=${publicId}&timestamp=${timestamp}${apiSecret}`;
  const signature = crypto.createHash('sha1').update(strToSign).digest('hex');

  const fileBuffer = fs.readFileSync(filePath);
  const blob = new Blob([fileBuffer]);

  const formData = new FormData();
  formData.append('file', blob, path.basename(filePath));
  formData.append('api_key', apiKey);
  formData.append('timestamp', timestamp.toString());
  formData.append('folder', folder);
  formData.append('public_id', publicId);
  formData.append('overwrite', 'true');
  formData.append('signature', signature);

  const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
    method: 'POST',
    body: formData
  });

  const data = await res.json();
  if (!res.ok || data.error) {
    throw new Error(data.error?.message || `HTTP ${res.status}`);
  }

  return {
    originalFile: path.basename(filePath),
    category,
    publicId: data.public_id,
    url: data.secure_url,
    width: data.width,
    height: data.height,
    format: data.format
  };
}

async function main() {
  console.log('\n======================================================');
  console.log(' 🎓 GEC Palakkad Union - Media Uploader & Optimizer');
  console.log('======================================================\n');
  console.log(`Cloud Account: \x1b[36m${cloudName}\x1b[0m`);
  console.log(`Scanning raw_images/ folders: ${categories.join(', ')}...\n`);

  let filesToProcess = [];
  for (const cat of categories) {
    const catDir = path.join(rawDir, cat);
    const files = fs.readdirSync(catDir).filter(f => !f.startsWith('.'));
    for (const f of files) {
      const fullPath = path.join(catDir, f);
      if (fs.statSync(fullPath).isFile()) {
        filesToProcess.push({ fullPath, category: cat, file: f });
      }
    }
  }

  if (filesToProcess.length === 0) {
    console.log('\x1b[33m[NOTICE]\x1b[0m No files found in raw_images/ to upload.');
    console.log('\nHow to use:');
    console.log('  1. Place event images in:  \x1b[32mraw_images/events/\x1b[0m');
    console.log('  2. Place impact images in: \x1b[32mraw_images/impact/\x1b[0m');
    console.log('  3. Place gallery photos in: \x1b[32mraw_images/gallery/\x1b[0m');
    console.log('  4. Run: \x1b[36mnpm run upload-media\x1b[0m\n');
    return;
  }

  console.log(`Found \x1b[32m${filesToProcess.length}\x1b[0m file(s) to upload.\n`);

  const results = [];
  for (const item of filesToProcess) {
    process.stdout.write(`  ⏳ Uploading [${item.category}] ${item.file}... `);
    try {
      const res = await uploadFile(item.fullPath, item.category);
      results.push(res);
      console.log('\x1b[32m✓ Uploaded\x1b[0m');
      console.log(`     ↳ ${res.url}`);
      // Remove raw file after successful upload
      fs.unlinkSync(item.fullPath);
    } catch (e) {
      console.log('\x1b[31m✗ Failed\x1b[0m');
      console.error(`     ↳ Error: ${e.message}`);
    }
  }

  console.log('\n======================================================');
  console.log(` ✅ Successfully uploaded ${results.length} of ${filesToProcess.length} file(s)!`);
  console.log('======================================================\n');

  // Auto-sync into datasets if flag passed
  const autoSync = process.argv.includes('--auto-sync');

  if (results.some(r => r.category === 'gallery')) {
    console.log('\x1b[1m--- Ready-to-use Gallery JSON snippet ---\x1b[0m');
    const galleryItems = results.filter(r => r.category === 'gallery').map((r, i) => ({
      id: `photo-${Date.now()}-${i + 1}`,
      src: r.url,
      eventName: r.originalFile.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' '),
      year: '2026-27',
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: '2-digit', year: 'numeric' })
    }));
    console.log(JSON.stringify(galleryItems, null, 2));

    if (autoSync) {
      const galleryPath = path.join(rootDir, 'src', 'data', 'gallery.json');
      const current = JSON.parse(fs.readFileSync(galleryPath, 'utf8'));
      const updated = [...current, ...galleryItems];
      fs.writeFileSync(galleryPath, JSON.stringify(updated, null, 2));
      console.log('\x1b[32m✓ Automatically appended to src/data/gallery.json\x1b[0m');
    }
  }

  console.log('\nDone!\n');
}

main().catch(err => {
  console.error('\x1b[31m[FATAL ERROR]\x1b[0m', err);
  process.exit(1);
});
