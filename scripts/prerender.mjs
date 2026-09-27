/**
 * Pre-renders the React app into static HTML so the page's content is in the file crawlers and browsers
 * receive first (better SEO, faster first paint). React then hydrates it in the browser.
 *
 * Runs after `vite build` and the SSR build (see the "build" script in package.json).
 */
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const root = process.cwd();
const ssrEntry = path.join(root, 'dist-ssr', 'entry-server.js');
const { render } = await import(pathToFileURL(ssrEntry).href);

const inlinedCss = new Set();
const pages = [
  { file: 'index.html', page: 'home' },
  { file: 'privacy/index.html', page: 'privacy' },
  { file: 'terms/index.html', page: 'terms' },
];
for (const { file, page } of pages) {
  const target = path.join(root, 'dist', file);
  const html = fs.readFileSync(target, 'utf8');
  const marker = '<div id="root"></div>';
  if (!html.includes(marker)) throw new Error(`prerender: "${marker}" not found in dist/${file}`);
  const app = render(page);
  let out = html.replace(marker, `<div id="root">${app}</div>`);

  // Inline the stylesheet. The page needs all of it to paint, and one fewer request means the first paint no
  // longer waits on a second round trip. (About 9 kB gzipped.)
  out = out.replace(/<link rel="stylesheet"[^>]*href="(\/assets\/[^"]+\.css)"[^>]*>/g, (_, href) => {
    inlinedCss.add(href);
    const css = fs.readFileSync(path.join(root, 'dist', href), 'utf8');
    return `<style>${css}</style>`;
  });

  fs.writeFileSync(target, out);
  console.log(`prerendered dist/${file}  (${(app.length / 1024).toFixed(1)} kB of HTML, stylesheet inlined)`);
}

// The inlined stylesheet no longer needs to ship as a separate file, and the SSR scratch build is not deployed.
for (const href of inlinedCss) fs.rmSync(path.join(root, 'dist', href), { force: true });
fs.rmSync(path.join(root, 'dist-ssr'), { recursive: true, force: true });
const images = path.join(root, 'dist', 'images');
if (fs.existsSync(images) && fs.readdirSync(images).every((f) => f.startsWith('.'))) fs.rmSync(images, { recursive: true, force: true });
