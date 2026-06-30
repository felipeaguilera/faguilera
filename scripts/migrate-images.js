#!/usr/bin/env node
/**
 * migrate-images.js — faguilera.com image migration
 *
 * Downloads ALL Substack images (covers + inline) from content MD files.
 * Saves originals to public/assets/images/ preserving format.
 * Updates every MD file reference to use the local path.
 *
 * After running this, use Netlify Image CDN (src/utils/images.js) to serve
 * optimized, responsive versions on the fly — no compression needed here.
 *
 * Usage (from web/ folder):
 *   node scripts/migrate-images.js
 *
 * Re-runnable: already-downloaded files are skipped automatically.
 */

const https = require('https');
const http  = require('http');
const fs    = require('fs');
const path  = require('path');
const { URL } = require('url');

// --- CONFIG ---
const CONTENT_DIR = path.join(__dirname, '../src/content/notebook');
const OUT_DIR     = path.join(__dirname, '../public/assets/images');
const DELAY_MS    = 200; // polite delay between requests

// --- URL UTILS ---

function extractUUID(url) {
  const m = url.match(/([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})/i);
  return m ? m[1] : null;
}

function extractExt(url) {
  // Try to get extension from the URL path segment before query string
  const pathname = url.split('?')[0].split('#')[0];
  const m = pathname.match(/\.(jpe?g|png|gif|webp|avif)$/i);
  if (!m) return '.jpg';
  const ext = m[1].toLowerCase();
  return ext === 'jpeg' ? '.jpg' : `.${ext}`;
}

/**
 * Decode the underlying S3 URL from a substackcdn.com proxy URL.
 * Proxy format: https://substackcdn.com/image/fetch/$s_!xxx!,f_auto,.../<encoded-url>
 */
function decodeSubstackProxy(url) {
  // Match the encoded URL after the last transformation param segment
  const m = url.match(/\/fetch\/[^/]*\/?(https?%3A.+?)(?:$|["'\s])/);
  if (m) return decodeURIComponent(m[1]);
  const m2 = url.match(/\/fetch\/(https?:\/\/.+)/);
  if (m2) return m2[1];
  return null;
}

function isSubstackS3(url) {
  return url.startsWith('https://substack-post-media.s3.amazonaws.com/');
}

function isSubstackCDN(url) {
  return url.startsWith('https://substackcdn.com/image/');
}

// --- DOWNLOAD ---

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

function downloadBuffer(rawUrl) {
  return new Promise((resolve, reject) => {
    let url = rawUrl;
    const parsed = new URL(url);
    const mod = parsed.protocol === 'https:' ? https : http;

    const req = mod.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) faguilera-image-migration/1.0',
        'Accept': 'image/*,*/*',
        'Referer': 'https://faguilera.com/',
      },
      timeout: 30000,
    }, (res) => {
      if ([301, 302, 303, 307, 308].includes(res.statusCode) && res.headers.location) {
        downloadBuffer(res.headers.location).then(resolve).catch(reject);
        return;
      }
      if (res.statusCode !== 200) {
        reject(new Error(`HTTP ${res.statusCode}`));
        return;
      }
      const chunks = [];
      res.on('data', c => chunks.push(c));
      res.on('end', () => resolve({ buf: Buffer.concat(chunks), contentType: res.headers['content-type'] || '' }));
      res.on('error', reject);
    });
    req.on('error', reject);
    req.on('timeout', () => { req.destroy(); reject(new Error('timeout')); });
  });
}

// --- FILE COLLECTION ---

function getAllMDFiles(dir) {
  const results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) results.push(...getAllMDFiles(full));
    else if (entry.name.endsWith('.md')) results.push(full);
  }
  return results;
}

function collectURLs(files) {
  const S3_PAT  = /https:\/\/substack-post-media\.s3\.amazonaws\.com\/public\/images\/[^\s)"'<>\]\n]+/g;
  const CDN_PAT = /https:\/\/substackcdn\.com\/image\/[^\s)"'<>\]\n]+/g;

  const s3Set  = new Set();
  const cdnSet = new Set();

  for (const f of files) {
    const text = fs.readFileSync(f, 'utf8');
    for (const m of text.matchAll(S3_PAT))  s3Set.add(m[0].replace(/[,;.)]+$/, ''));
    for (const m of text.matchAll(CDN_PAT)) cdnSet.add(m[0].replace(/[,;.)]+$/, ''));
  }

  return { s3: [...s3Set], cdn: [...cdnSet] };
}

// --- MAIN ---

async function main() {
  console.log('======================================');
  console.log('  faguilera.com — image migration');
  console.log('======================================\n');

  fs.mkdirSync(OUT_DIR, { recursive: true });

  const files = getAllMDFiles(CONTENT_DIR);
  console.log(`MD files found: ${files.length}`);

  const { s3: s3URLs, cdn: cdnURLs } = collectURLs(files);
  console.log(`Unique S3 image URLs:  ${s3URLs.length}`);
  console.log(`Unique CDN proxy URLs: ${cdnURLs.length}`);
  console.log('');

  // Maps: original URL string -> local web path (/assets/images/uuid.ext)
  const urlToLocal  = {};
  // Maps: uuid -> web path (for deduplication across S3 + CDN)
  const uuidToLocal = {};

  let downloaded = 0;
  let skipped    = 0;
  let errors     = 0;

  // ---- Phase 1: S3 direct URLs ----
  console.log('--- Phase 1: S3 images ---');
  for (const url of s3URLs) {
    const uuid = extractUUID(url);
    const ext  = extractExt(url);
    const name = uuid ? `${uuid}${ext}` : `s3_${Math.abs(hashStr(url)) % 1000000}${ext}`;
    const outPath = path.join(OUT_DIR, name);
    const webPath = `/assets/images/${name}`;

    urlToLocal[url] = webPath;
    if (uuid) uuidToLocal[uuid] = webPath;

    if (fs.existsSync(outPath)) {
      process.stdout.write('·');
      skipped++;
      continue;
    }

    try {
      const { buf } = await downloadBuffer(url);
      fs.writeFileSync(outPath, buf);
      const kb = Math.round(buf.length / 1024);
      console.log(`\n  + ${name}  (${kb} KB)`);
      downloaded++;
    } catch (e) {
      console.log(`\n  ! ${url.slice(70)}: ${e.message}`);
      errors++;
    }
    await sleep(DELAY_MS);
  }

  // ---- Phase 2: CDN proxy URLs ----
  console.log('\n\n--- Phase 2: CDN proxy images ---');
  for (const cdnUrl of cdnURLs) {
    const underlying = decodeSubstackProxy(cdnUrl);
    const targetUrl  = underlying || cdnUrl;
    const uuid = extractUUID(targetUrl);
    const ext  = extractExt(targetUrl);

    // If we already downloaded this via S3 URL, just map the proxy to the same file
    if (uuid && uuidToLocal[uuid]) {
      urlToLocal[cdnUrl] = uuidToLocal[uuid];
      process.stdout.write('·');
      continue;
    }

    const name = uuid ? `${uuid}${ext}` : `cdn_${Math.abs(hashStr(cdnUrl)) % 1000000}${ext}`;
    const outPath = path.join(OUT_DIR, name);
    const webPath = `/assets/images/${name}`;

    urlToLocal[cdnUrl] = webPath;
    if (uuid) uuidToLocal[uuid] = webPath;

    if (fs.existsSync(outPath)) {
      process.stdout.write('·');
      skipped++;
      continue;
    }

    try {
      const { buf } = await downloadBuffer(underlying || cdnUrl);
      fs.writeFileSync(outPath, buf);
      const kb = Math.round(buf.length / 1024);
      console.log(`\n  + [proxy] ${name}  (${kb} KB)`);
      downloaded++;
    } catch (e) {
      console.log(`\n  ! [proxy] ${(underlying || cdnUrl).slice(-60)}: ${e.message}`);
      errors++;
    }
    await sleep(DELAY_MS);
  }

  // ---- Phase 3: Update MD files ----
  console.log('\n\n--- Phase 3: Updating MD files ---');

  // Sort by length descending to avoid partial-URL replacements
  const sortedURLs = Object.keys(urlToLocal).sort((a, b) => b.length - a.length);

  let filesUpdated  = 0;
  let totalReplacements = 0;

  for (const file of files) {
    let text = fs.readFileSync(file, 'utf8');
    let updated = text;

    for (const orig of sortedURLs) {
      if (!updated.includes(orig)) continue;
      const local = urlToLocal[orig];
      updated = updated.split(orig).join(local);
    }

    if (updated !== text) {
      fs.writeFileSync(file, updated, 'utf8');
      const count = sortedURLs.reduce((n, u) => n + (text.split(u).length - 1), 0);
      totalReplacements += count;
      filesUpdated++;
      console.log(`  Updated: ${path.relative(CONTENT_DIR, file)} (${count} refs)`);
    }
  }

  // Save mapping for reference / debugging
  const mappingPath = path.join(__dirname, 'img-url-mapping.json');
  fs.writeFileSync(mappingPath, JSON.stringify(urlToLocal, null, 2));

  // ---- Summary ----
  const imageFiles = fs.readdirSync(OUT_DIR);
  const totalSize  = imageFiles.reduce((sum, f) => {
    try { return sum + fs.statSync(path.join(OUT_DIR, f)).size; } catch { return sum; }
  }, 0);

  console.log('\n======================================');
  console.log('  DONE');
  console.log('======================================');
  console.log(`Downloaded:        ${downloaded}`);
  console.log(`Skipped (cached):  ${skipped}`);
  console.log(`Errors:            ${errors}`);
  console.log(`MD files updated:  ${filesUpdated}`);
  console.log(`Replacements:      ${totalReplacements}`);
  console.log(`Images in folder:  ${imageFiles.length}`);
  console.log(`Total size:        ${(totalSize / (1024 * 1024)).toFixed(1)} MB`);
  console.log('');
  if (errors > 0) {
    console.log(`NOTE: ${errors} downloads failed. Re-run to retry (cached files are skipped).`);
  }
  console.log('Next: git add . && git commit -m "feat: self-host images" && git push origin main');
}

function hashStr(s) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (Math.imul(31, h) + s.charCodeAt(i)) | 0;
  return h;
}

main().catch(err => { console.error(err); process.exit(1); });
