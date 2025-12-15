import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  // TUS DATOS DE GITHUB PAGES (DESCOMENTAR Y EDITAR):
  site: 'https://DRTX2.github.io', 
  base: import.meta.env.PROD ? '/portfolio/' : '/', // En desarrollo local usa '/', en producción usa '/portfolio/'
  
  integrations: [react()],
  vite: {
    server: {
      watch: {
        // Watch css directory for changes
        ignored: ['!**/css/**']
      }
    }
  }
});
