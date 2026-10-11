/// <reference types="vitest" />

import { resolve } from "node:path";
import { defineConfig } from "vitest/config";
import dts from "unplugin-dts/vite";
import builtinModules from "builtin-modules";
import pkg from "./package.json";

const dependencyNames = Object.keys(pkg.dependencies);
const externalNames = [
  "child_process",
  ...builtinModules,
  ...builtinModules.map((module) => `node:${module}`),
  ...dependencyNames,
];
const isExternal = (id: string) =>
  externalNames.includes(id) ||
  dependencyNames.some((name) => id.startsWith(`${name}/`));

export default defineConfig({
  build: {
    lib: {
      entry: resolve(import.meta.dirname, "src/index.ts"),
      name: "cloner-git",
      fileName: "cloner-git",
    },
    rolldownOptions: {
      external: isExternal,
      output: {
        banner: `if (typeof module !== 'undefined' && module.exports && typeof process !== 'undefined' && typeof process.emitWarning === 'function') { process.emitWarning('@jestaubach/cloner-git: The CommonJS/UMD entry is deprecated; migrate to the ESM entry.', { code: 'DEP_CLONER_GIT_CJS', type: 'DeprecationWarning' }); }`,
      },
    },
  },
  optimizeDeps: {
    exclude: externalNames,
  },
  plugins: [dts()],
  test: {
    coverage: {
      provider: "v8",
      reporter: [`text`, `json`, `html`, `lcov`],
      include: ["src"],
      exclude: ["src/**/*.d.ts", "src/**/__tests__/**"],
    },
    environment: "node",
    testTimeout: 20000,
  },
});
