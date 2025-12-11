import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
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
