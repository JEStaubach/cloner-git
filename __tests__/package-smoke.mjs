import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import process from 'node:process';
import { test } from 'node:test';

const require = createRequire(import.meta.url);

test('CommonJS entry warns and retains the cloner API', async () => {
  const warnings = [];
  const originalEmitWarning = process.emitWarning;
  process.emitWarning = (...args) => warnings.push(args);

  try {
    const cloner = require('@jestaubach/cloner-git');
    const calls = [];
    const result = await cloner.use(async (args, cwd) => {
      calls.push({ args, cwd });
      return { error: null, stdout: 'ok', stderr: '' };
    })(['status'], 'repository');

    assert.deepEqual(calls, [{ args: ['status'], cwd: 'repository' }]);
    assert.equal(result.stdout, 'ok');
    assert.equal(typeof cloner.mock, 'function');
    assert.ok(warnings.some(([message, options]) =>
      String(message).includes('CommonJS/UMD entry is deprecated') &&
      options?.code === 'DEP_CLONER_GIT_CJS' &&
      options?.type === 'DeprecationWarning'));
  } finally {
    process.emitWarning = originalEmitWarning;
  }
});

test('ESM entry exposes the cloner API without a CommonJS deprecation warning', async () => {
  const warnings = [];
  const originalEmitWarning = process.emitWarning;
  process.emitWarning = (...args) => warnings.push(args);

  try {
    const cloner = await import('@jestaubach/cloner-git');
    assert.equal(typeof cloner.default.use, 'function');
    assert.equal(typeof cloner.default.mock, 'function');
    assert.equal(warnings.some(([, options]) => options?.code === 'DEP_CLONER_GIT_CJS'), false);
  } finally {
    process.emitWarning = originalEmitWarning;
  }
});
