import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), 
    },
  },
  build: {
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          // Ensuring the favicon remains in public folder
          if (assetInfo.name === 'Designer-removebg-preview.png') {
            return 'favicon.png';
          }
          return assetInfo.name;
        },
      },
    },
  },
  server: {
    open: true, // Automatically opens the app in the browser on start
  },
});
