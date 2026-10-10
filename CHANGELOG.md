# Changelog

All notable changes to this project are documented here.

This changelog follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## Unreleased

### Changed

- Emit a Node.js deprecation warning when the CommonJS/UMD entry is loaded; retain the entry and API.
- Require Node.js 22 or newer and enable strict TypeScript checking.
- Harden the mock cloner against missing or unresolvable destination paths.
- Allow `ExecResult.error` to be `null`, matching successful command results.

### Added

- Add package smoke tests for the built ESM and UMD entry points.
