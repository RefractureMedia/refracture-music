# Refracture Music
Aiming to fix a fractured, limited, & inconsistent music experience; a modular, multi-platform, customizable, feature-rich, and modern music application.
## Packages


### [addon-host](https://github.com/RefractureMedia/refracture-music/tree/main/packages/addon-host)
Hosting server for addons (plugins & themes).
- Written in TypeScript.
- Support for several deployments; CLI, Docker, NPM/Embedded, CloudFlare Worker/Edge, etc.

### [client-cli](https://github.com/RefractureMedia/refracture-music/tree/main/packages/client-cli)
Testing client for development of core.

### [client-flutter](https://github.com/RefractureMedia/refracture-music/tree/main/packages/client-flutter)
Cross-platform UI. (All platforms)

### [core](https://github.com/RefractureMedia/refracture-music/tree/main/packages/core)
All internal functionality code. Requires codec compatibility info and implemented native user input & playback hooks.
- Written in TypeScript.
- Releases will include compatible bundles for Node 18 & Latest Deno/Bun.
- Will use Refracture [Intern](https://github.com/RefractureMedia/intern) to provide SponsorBlock style crowd-sourced submissions to simplify, optimize, & enrich music metadata.

### [docs](https://github.com/RefractureMedia/refracture-music/tree/main/packages/docs)
Markdown documentation of the project.

### [server](https://github.com/RefractureMedia/refracture-music/tree/main/packages/server)
A self-hosted session & library dameon/service. Provides a centralized location for syncing your profile between devices and streaming/distributing your saved library.
- Written in TypeScript.
- A runtime agnostic CLI with Linux tooling & windows support (through the app).
- Uses Docker on non-win32 OSes.
- Uses ElasticSearch for DB.

## [web](https://github.com/RefractureMedia/refracture-music/tree/main/packages/addon-host)
Hosting server for the project.
- Written in TypeScript.
- Support for several deployments; Vercel, Docker, etc.
- Includes a website written in [Vue](https://vuejs.org/guide/introduction.html)/[Nuxt](https://v3.nuxtjs.org/guide/concepts/introduction) 3.

## Core Plugins

### [base](https://github.com/RefractureMedia/refracture-music/tree/main/packages/plugin-base)
Offline/self-hosted music.

### [spotify](https://github.com/RefractureMedia/refracture-music/tree/main/packages/plugin-spotify)
Full integration with Spotify. (Premium users only)
