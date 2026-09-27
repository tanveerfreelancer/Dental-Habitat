/**
 * Image pipeline. Turns the clinic's ORIGINAL photos into responsive AVIF / WebP / JPEG files.
 *
 *   npm run images        (also runs automatically before `npm run build`)
 *
 * What it does:  applies EXIF orientation, crops to the slot's ratio around a focal point (optionally tighter, with
 *                'zoom'), resizes to several
 *                widths (never enlarging), and re-encodes. Metadata such as GPS location is stripped.
 * What it never does:  sharpen, filter, recolour, retouch, or upscale. The photo keeps its authentic look.
 *
 * Slots are defined in images.config.json. A slot whose source file does not exist is skipped (not an error),
 * so the build works before any photos have been supplied.
 */
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const root = process.cwd();
const config = JSON.parse(fs.readFileSync(path.join(root, 'images.config.json'), 'utf8'));
const originals = path.join(root, 'src/assets/originals');
const outDir = path.join(root, 'public/images');
const manifestPath = path.join(root, 'src/content/imageManifest.json');
const clamp = (n, lo, hi) => Math.min(hi, Math.max(lo, n));
const hex = ({ r, g, b }) => `#${[r, g, b].map((v) => v.toString(16).padStart(2, '0')).join('')}`;

fs.mkdirSync(outDir, { recursive: true });
const manifest = {};
const made = [];

for (const [name, slot] of Object.entries(config)) {
  if (name.startsWith('_')) continue;
  const file = path.join(originals, slot.source);
  if (!fs.existsSync(file)) continue;

  // 1. orientation-corrected pixels
  const { data: upright, info } = await sharp(file).rotate().toBuffer({ resolveWithObject: true });
  const W = info.width;
  const H = info.height;

  // 2. crop box around the focal point
  const ratio = slot.size ? slot.size[0] / slot.size[1] : slot.ratio;
  const [fx, fy] = slot.focal ?? [0.5, 0.5];
  let cw = W;
  let ch = H;
  if (W / H > ratio) cw = Math.round(H * ratio);
  else ch = Math.round(W / ratio);
  // Optional tighter crop. Still cut from real pixels only (never enlarged).
  if (slot.zoom > 1) {
    cw = Math.round(cw / slot.zoom);
    ch = Math.round(ch / slot.zoom);
  }
  const left = Math.round(clamp(fx * W - cw / 2, 0, W - cw));
  const top = Math.round(clamp(fy * H - ch / 2, 0, H - ch));
  const cropped = await sharp(upright).extract({ left, top, width: cw, height: ch }).toBuffer();

  // 3. Open Graph image: one 1200x630 JPEG
  if (slot.ogOnly) {
    const [w, h] = slot.size;
    await sharp(cropped).resize(w, h, { withoutEnlargement: true }).jpeg({ quality: 82, mozjpeg: true }).toFile(path.join(outDir, `${name}.jpg`));
    manifest[name] = { src: `/images/${name}.jpg`, width: w, height: h };
    made.push(`${name}.jpg`);
    continue;
  }

  // 4. responsive set
  const widths = slot.widths.filter((w) => w <= cw);
  if (!widths.length) widths.push(cw);
  const sets = { avif: [], webp: [], jpeg: [] };
  for (const w of widths) {
    const h = Math.round(w / ratio);
    const base = sharp(cropped).resize(w, h, { withoutEnlargement: true });
    await base.clone().avif({ quality: 55, effort: 4 }).toFile(path.join(outDir, `${name}-${w}.avif`));
    await base.clone().webp({ quality: 78 }).toFile(path.join(outDir, `${name}-${w}.webp`));
    await base.clone().jpeg({ quality: 80, mozjpeg: true, progressive: true }).toFile(path.join(outDir, `${name}-${w}.jpg`));
    sets.avif.push(`/images/${name}-${w}.avif ${w}w`);
    sets.webp.push(`/images/${name}-${w}.webp ${w}w`);
    sets.jpeg.push(`/images/${name}-${w}.jpg ${w}w`);
    made.push(`${name}-${w}.{avif,webp,jpg}`);
  }
  const widest = widths[widths.length - 1];
  const { dominant } = await sharp(cropped).resize(64).stats();
  manifest[name] = {
    src: `/images/${name}-${widths[Math.min(2, widths.length - 1)]}.jpg`,
    srcSet: sets.jpeg.join(', '),
    sources: [
      { type: 'image/avif', srcSet: sets.avif.join(', ') },
      { type: 'image/webp', srcSet: sets.webp.join(', ') },
    ],
    width: widest,
    height: Math.round(widest / ratio),
    position: `${Math.round(fx * 100)}% ${Math.round(fy * 100)}%`,
    color: hex(dominant), // shown behind the image while it loads
  };
}

fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + '\n');
console.log(
  made.length
    ? `images: generated ${made.length} sets/files → public/images (${Object.keys(manifest).join(', ')})`
    : 'images: no source photos in src/assets/originals yet, nothing to generate (the illustrations are used).',
);
