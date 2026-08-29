import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Build só para gerar o arquivo de demonstração autocontido: um único bundle
// IIFE, para a página funcionar aberta direto do disco (file://), sem servidor.
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: '.demo-build',
    emptyOutDir: true,
    target: 'es2020',
    cssCodeSplit: false,
    modulePreload: { polyfill: false },
    rollupOptions: {
      output: {
        format: 'iife',
        inlineDynamicImports: true,
        entryFileNames: 'app.js',
        assetFileNames: '[name][extname]',
      },
    },
  },
});
