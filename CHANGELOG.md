# Changelog

## [0.2.4](https://github.com/JEStaubach/cloner-git/compare/cloner-git-v0.2.2...cloner-git-v0.2.4) (2026-10-12)


### Bug Fixes

* **coderabbit:** bump pkg version ([#54](https://github.com/JEStaubach/cloner-git/issues/54)) ([b61ce3a](https://github.com/JEStaubach/cloner-git/commit/b61ce3a3944b699dace190252ba39dcd54aa303c))

## [0.2.2](https://github.com/JEStaubach/cloner-git/compare/cloner-git-v0.2.1...cloner-git-v0.2.2) (2026-10-11)


### Bug Fixes

* **mock:** use ESM path imports ([#50](https://github.com/JEStaubach/cloner-git/issues/50)) ([6a92a04](https://github.com/JEStaubach/cloner-git/commit/6a92a042ca871d8d345eba01707f2c466a667229))

## [0.2.1](https://github.com/JEStaubach/cloner-git/compare/cloner-git-v0.2.0...cloner-git-v0.2.1) (2026-10-11)

### Bug Fixes

* **deps:** require @jestaubach/fs-helpers ^0.2.32 ([#41](https://github.com/JEStaubach/cloner-git/issues/41)) ([e026ecf](https://github.com/JEStaubach/cloner-git/commit/e026ecf746b1c369274cdde12bff6fcaa84dc433))

## [0.2.0](https://github.com/JEStaubach/cloner-git/compare/cloner-git-v0.1.14...cloner-git-v0.2.0) (2026-10-10)
### ⚠ BREAKING CHANGES

* **types:** harden clone result and path handling

### Bug Fixes

* address cloner-git analysis findings ([c729ca2](https://github.com/JEStaubach/cloner-git/commit/c729ca29275cbed8f37baf68d98f3d57eeb84fad))
* **ci:** correct Sonar project and restore coverage ([051377b](https://github.com/JEStaubach/cloner-git/commit/051377b920fcb7e0783a2b0efb89da38ed1d061a))
* **ci:** pin trusted publishing npm version ([fcbc74a](https://github.com/JEStaubach/cloner-git/commit/fcbc74a79c80d8f40af64848a6d6a6388f26daa1))
* **ci:** repair Snyk policy and report handling ([694ac49](https://github.com/JEStaubach/cloner-git/commit/694ac494e1ff02fd1f3640ba317791b1a84c7f19))
* **types:** harden clone result and path handling ([3a42c4c](https://github.com/JEStaubach/cloner-git/commit/3a42c4ca021162552d688e982b07b14e134796da))

All notable changes to this project are documented here.

This changelog follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## Unreleased

### Changed

* Emit a Node.js deprecation warning when the CommonJS/UMD entry is loaded; retain the entry and API.
* Require Node.js 22 or newer and enable strict TypeScript checking.
* Harden the mock cloner against missing or unresolvable destination paths.
* Allow `ExecResult.error` to be `null`, matching successful command results.

### Added

* Add package smoke tests for the built ESM and UMD entry points.
