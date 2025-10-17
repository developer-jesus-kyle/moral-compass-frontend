import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env variables from .env file in the root directory.
  const env = loadEnv(mode, process.cwd(), '');

  return {
    server: {
      port: 3000
    },
    plugins: [react()],
    define: {
      // This explicitly replaces `import.meta.env.VITE_API_KEY` in your code
      // with the value from your .env file.
      'import.meta.env.VITE_API_KEY': JSON.stringify(env.VITE_API_KEY)
    }
  }
});
