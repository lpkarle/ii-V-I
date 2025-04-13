/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/ii-V-I/',
  test: {
    globals: true,
    environment: 'jsdom',
    css: true,
    setupFiles: ['./src/setupTests.ts'],
  },
});
