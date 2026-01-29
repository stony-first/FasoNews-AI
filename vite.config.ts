
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  define: {
    // Permet d'utiliser process.env.API_KEY dans le frontend comme requis
    'process.env': process.env
  },
  server: {
    port: 3000
  },
  build: {
    outDir: 'dist'
  }
});
