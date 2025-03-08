import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Tell Vite to resolve "events" from the npm package
      events: "events/"
    }
  }
});
