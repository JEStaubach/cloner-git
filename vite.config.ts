//import { defineConfig } from 'vitest/config'
/// <reference types="vitest" />

import { resolve } from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'cloner-git',
      fileName: 'cloner-git',
    },
    rollupOptions: {
      external: ['child_process'],
      output: {
        globals: {
          child_process: 'child_process',
        },
      },
    }
  },
  plugins: [dts()],
  test: {
    coverage: {
      provider: 'istanbul'
    },
    environment: 'node',
    testTimeout: 20000
  },
});
