import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // local dev server port
    open: true, // auto open browser when running `npm run dev`
  },
  build: {
    outDir: 'dist', // Vercel expects output here
  },
  define: {
    'process.env': {}, // fixes "process is not defined" errors
  },
});
