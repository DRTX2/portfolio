import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  // TUS DATOS DE GITHUB PAGES (DESCOMENTAR Y EDITAR):
  // site: 'https://DRTX2.github.io', 
  // base: '/portfolio', // Si tu repo se llama 'portfolio', mantén esto. Si es raíz, bórralo.
  
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
