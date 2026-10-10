# Migration Guide

## Unreleased

### Node.js requirement

This package now requires Node.js 22 or newer. Upgrade the runtime used by your application and CI before updating this package.

### TypeScript result handling

`ExecResult.error` may now be `null` as well as `undefined` when a command succeeds. Check for a non-null value before using it:

```ts
if (result.error != null) {
  // Handle the command error.
}
```

The exported `Path` type alias has been removed. Use `string` for path values.

The mock cloner also rejects missing or unresolvable destination paths instead of continuing with an invalid path.

### CommonJS deprecation

Loading the CommonJS entry with `require('@jestaubach/cloner-git')` now emits a `DeprecationWarning` with code `DEP_CLONER_GIT_CJS`. The entry and API remain available; no removal version is announced.

Migrate to ESM to avoid the warning:

```js
import cloner from '@jestaubach/cloner-git';
```

The ESM entry does not emit the warning.
