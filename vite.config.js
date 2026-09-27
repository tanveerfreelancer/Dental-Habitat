import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';
import { seoPlugin } from './tools/vite-plugin-seo.js';

const at = (p) => fileURLToPath(new URL(p, import.meta.url));

/**
 * npm run dev              → site at /, living style guide at /design-system.html
 * npm run build            → production site only (the style guide is not shipped)
 * npm run build:styleguide → production site + style guide, for sharing internally
 */
export default defineConfig(({ mode }) => ({
  plugins: [react(), seoPlugin()],
  resolve: { alias: { '@': at('./src') } },
  build: {
    rollupOptions: {
      input: {
        main: at('./index.html'),
        privacy: at('./privacy/index.html'),
        terms: at('./terms/index.html'),
        ...(mode === 'styleguide' ? { 'design-system': at('./design-system.html') } : {}),
      },
    },
  },
}));
