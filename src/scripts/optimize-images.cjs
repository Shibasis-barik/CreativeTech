#!/usr/bin/env node
/**
 * Convert referenced PNG/JPEG files under src/assets to WebP and update
 * matching local source references. Original images are kept for rollback.
 * Run from the Vite project root after: npm install --save-dev sharp
 */
const fs = require('node:fs/promises');
const path = require('node:path');

const root = process.cwd();
const srcDir = path.join(root, 'src');
const assetsDir = path.join(srcDir, 'assets');
const sourceExtensions = new Set(['.ts', '.tsx', '.js', '.jsx', '.css', '.scss']);
const imageExtensions = new Set(['.png', '.jpg', '.jpeg']);
const MIN_SIZE_BYTES = 80 * 1024; // Skip tiny assets where WebP may not help.

async function walk(dir) {
  let entries;
  try {
    entries = await fs.readdir(dir, { withFileTypes: true });
  } catch {
    return [];
  }
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...await walk(full));
    else if (entry.isFile()) files.push(full);
  }
  return files;
}

function resolveLocalReference(sourceFile, specifier) {
  let candidate;
  if (specifier.startsWith('@/')) {
    candidate = path.resolve(srcDir, specifier.slice(2));
  } else if (specifier.startsWith('/src/')) {
    candidate = path.resolve(root, `.${specifier}`);
  } else if (specifier.startsWith('.')) {
    candidate = path.resolve(path.dirname(sourceFile), specifier);
  } else {
    return null;
  }
  const relative = path.relative(assetsDir, candidate);
  if (relative.startsWith('..') || path.isAbsolute(relative)) return null;
  return candidate;
}

async function main() {
  try {
    require.resolve('sharp', { paths: [root] });
  } catch {
    console.error(' sharp is not installed. Run: npm install --save-dev sharp');
    process.exitCode = 1;
    return;
  }

  let sharp;
  try {
    sharp = require(require.resolve('sharp', { paths: [root] }));
  } catch (error) {
    console.error('Unable to load sharp:', error.message);
    process.exitCode = 1;
    return;
  }

  try {
    await fs.access(assetsDir);
  } catch {
    console.error(`Cannot find ${path.relative(root, assetsDir)}. Run this script from your Vite project root.`);
    process.exitCode = 1;
    return;
  }

  const sourceFiles = (await walk(srcDir)).filter((file) =>
    sourceExtensions.has(path.extname(file).toLowerCase())
  );

  // Capture quoted local image paths used by imports, new URL(), and CSS url().
  const referenceRegex = /(['"])([^'"\n]+\.(?:png|jpe?g))(\?[^'"]*)?\1/gi;
  const referenced = new Map(); // absolute original path -> Set of source files

  for (const sourceFile of sourceFiles) {
    const text = await fs.readFile(sourceFile, 'utf8');
    for (const match of text.matchAll(referenceRegex)) {
      const specifier = match[2];
      const original = resolveLocalReference(sourceFile, specifier);
      if (!original) continue;
      try {
        const stat = await fs.stat(original);
        if (!stat.isFile() || stat.size < MIN_SIZE_BYTES) continue;
      } catch {
        continue;
      }
      if (!referenced.has(original)) referenced.set(original, new Set());
      referenced.get(original).add(sourceFile);
    }
  }

  if (referenced.size === 0) {
    console.log('No referenced PNG/JPEG assets larger than 80 KB were found under src/assets.');
    return;
  }

  const replacementsByFile = new Map();
  let converted = 0;
  let totalOriginal = 0;
  let totalWebp = 0;

  for (const [original, files] of referenced) {
    const webpPath = original.replace(/\.(png|jpe?g)$/i, '.webp');
    const originalStat = await fs.stat(original);
    const originalBytes = originalStat.size;

    // Keep an existing WebP unless the source image is newer.
    let shouldConvert = true;
    try {
      const webpStat = await fs.stat(webpPath);
      shouldConvert = originalStat.mtimeMs > webpStat.mtimeMs;
    } catch {}

    if (shouldConvert) {
      await sharp(original)
        .webp({ quality: 82, effort: 6, smartSubsample: true })
        .toFile(webpPath);
    }

    const webpStat = await fs.stat(webpPath);
    const webpBytes = webpStat.size;
    totalOriginal += originalBytes;
    totalWebp += webpBytes;
    converted += 1;

    const relativeOriginal = path.relative(root, original);
    const relativeWebp = path.relative(root, webpPath);
    const reduction = originalBytes > 0
      ? ((1 - webpBytes / originalBytes) * 100).toFixed(1)
      : '0.0';
    console.log(`${relativeOriginal} -> ${relativeWebp} | ${(originalBytes / 1024).toFixed(0)} KB -> ${(webpBytes / 1024).toFixed(0)} KB (${reduction}% smaller)`);

    for (const sourceFile of files) {
      if (!replacementsByFile.has(sourceFile)) replacementsByFile.set(sourceFile, []);
      replacementsByFile.get(sourceFile).push({ original, webpPath });
    }
  }

  let updatedReferences = 0;
  for (const [sourceFile, replacements] of replacementsByFile) {
    let text = await fs.readFile(sourceFile, 'utf8');
    const before = text;

    // Replacing the extension within the quoted specifier keeps relative paths intact.
    for (const { original, webpPath } of replacements) {
      const oldExt = path.extname(original);
      const newExt = path.extname(webpPath);
      const sourceDirName = path.dirname(sourceFile);
      const relativeSpecifier = path.relative(sourceDirName, original).split(path.sep).join('/');
      const normalizedSpecifier = relativeSpecifier.startsWith('.')
        ? relativeSpecifier
        : `./${relativeSpecifier}`;
      const pathWithoutExtension = normalizedSpecifier.replace(
        /\.(?:png|jpe?g)$/i,
        ""
        );

        const escapedPath = pathWithoutExtension.replace(
        /[.*+?^${}()|[\]\\]/g,
        "\\$&"
        );

        const exactPathRegex = new RegExp(
        `(['"])${escapedPath}\\.(?:png|jpe?g)(\\?[^'"]*)?\\1`,
        "gi"
        );
      text = text.replace(exactPathRegex, (whole) => {
        updatedReferences += 1;
        return whole.replace(/\.(png|jpe?g)(?=\?|['"])/i, '.webp');
      });

      // Also handle @/ and /src/ aliases by replacing the exact source literal.
      const candidates = [
        `@/${path.relative(srcDir, original).split(path.sep).join('/')}`,
        `/${path.relative(root, original).split(path.sep).join('/')}`,
      ];
      for (const candidate of candidates) {
        const candidateEscaped = candidate.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const aliasRegex = new RegExp(`(['"])${candidateEscaped}(\\?[^'"]*)?\\1`, 'g');
        text = text.replace(aliasRegex, (whole) => {
          updatedReferences += 1;
          return whole.replace(oldExt, newExt);
        });
      }
    }

    if (text !== before) await fs.writeFile(sourceFile, text, 'utf8');
  }

  const overallReduction = totalOriginal > 0
    ? ((1 - totalWebp / totalOriginal) * 100).toFixed(1)
    : '0.0';
  console.log('\nOptimization summary');
  console.log(`Images converted/reused: ${converted}`);
  console.log(`Source files updated: ${replacementsByFile.size}`);
  console.log(`References updated: ${updatedReferences}`);
  console.log(`Combined original size: ${(totalOriginal / 1024 / 1024).toFixed(2)} MB`);
  console.log(`Combined WebP size: ${(totalWebp / 1024 / 1024).toFixed(2)} MB`);
  console.log(`Combined reduction: ${overallReduction}%`);
  console.log('\nOriginal PNG/JPEG files were kept. Run npm run build and inspect the site before deleting any originals.');
}

main().catch((error) => {
  console.error('\nImage optimization failed:', error);
  process.exitCode = 1;
});
