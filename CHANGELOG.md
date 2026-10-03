## [1.0.1](https://github.com/WYRE-AI/node-axcient/compare/v1.0.0...v1.0.1) (2026-08-25)


### Bug Fixes

* migrate to WYRE-AI org (npm scope, ghcr namespace, registry) ([#1](https://github.com/WYRE-AI/node-axcient/issues/1)) ([82dcf50](https://github.com/WYRE-AI/node-axcient/commit/82dcf50723173cfe2d0b7b1def1c27e7bf45fb40))

# 1.0.0 (2026-08-19)


### Features

* initial Axcient x360Recover API client ([9a9b6f2](https://github.com/WYRE-AI/node-axcient/commit/9a9b6f25bba12c078423d47c61a6984df1394c39))

# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Changed

- **Release workflow no longer persists a write-scoped git credential across `npm install`.** The release job declares `contents: write`, which overrides this repo's read-only default workflow permission, so `actions/checkout`'s default persisted credential was write-scoped and lived in `.git/config` through dependency install and build — readable by any compromised dependency lifecycle script. `persist-credentials: false` is semantic-release's own documented GitHub Actions recipe; it authenticates its pushes from `GITHUB_TOKEN` directly and never needed the persisted credential. (CWE-250)
