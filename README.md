![](/banner.png)

### Aiming to fix a fractured, limited, & inconsistent music experience; a fast, modular, multi-platform, customizable, feature-rich, and modern music application.

## Roadmap
- 🚧 **0.0.x - Version Minor 0: Hello World**
  - Desktop release of client with support for local media libraries and OTA updates of the JS app core.
  - 🕙️ Q4 2023
- 🤔 **0.1.x - Version Minor 1: On the Go**
  - Mobile release of client with support for self hosted library server featuring rich player sync.
  - 🕙️ Q1 2024
- 🔳 **0.2.x - Version Minor 2: Daily Driver**
  - Release of
    - Plugin support in client
    - Hypervisor; required plugin safety review & security authority
    - Official plugin repository 
    - Full Spotify integration plugin (Premium Users only)
  - 🕙️ Q2 2024
- 🔳 **0.3.x - Version Minor 3: Better Together**
  - Release of
    - Library server updating featuring painless connection via provided routing service.
    - User networking in client; library share, listen along, play history, et. all.
    - Scrobbling via Last.fm plugin
    - Rich Presence/Activity Discord plugin
    - Full [Audius Music](https://audius.co/) integration plugin
  - 🕙️ Q4 2024
- 🚀 **[Full Roadmap](/tree/main/packages/docs/user/roadmap.md)**

## Packages

### 🏬 [addon-host](/tree/main/packages/addon-host)
Hosting server for addons (plugins & themes).
- Written in TypeScript.
- Support for several deployments; CLI, Docker, NPM/Embedded, CloudFlare Worker/Edge, etc.

### 🚥 [client-cli](/tree/main/packages/client-cli)
Testing client for development of core.

### 🍃 [client-flutter](/tree/main/packages/client-flutter)
Cross-platform UI. (All platforms)

### ⚙️ [core](/tree/main/packages/core)
All internal functionality code. Requires codec compatibility info and implemented native user input & playback hooks.
- Written in TypeScript.
- Releases will include compatible bundles for Node 18 & Latest Deno/Bun.
- Will use Refracture [Intern](https://github.com/RefractureMedia/intern) to provide SponsorBlock style crowd-sourced submissions to simplify, optimize, & enrich music metadata.

### 📄 [docs](/tree/main/packages/docs)
Markdown documentation of the project.

### ☁️ [server](/tree/main/packages/server)
A self-hosted session & library dameon/service. Provides a centralized location for syncing your profile between devices and streaming/distributing your saved library.
- Written in TypeScript.
- A runtime agnostic CLI with Linux tooling & windows support (through the app).

### ❇️ [web](/tree/main/packages/addon-host)
Hosting server for the project.
- Written in TypeScript.
- Support for several deployments; Vercel, Docker, etc.
- Includes a website written in [Vue](https://vuejs.org/guide/introduction.html)/[Nuxt](https://v3.nuxtjs.org/guide/concepts/introduction) 3.

## Official Plugins

### [base](/tree/main/packages/plugin-base)
Offline/self-hosted music.

### [spotify](/tree/main/packages/plugin-spotify)
Full integration with Spotify. (Premium users only)

### [audius](/tree/main/packages/plugin-audius)
Full integration with Audius. (free!)

### [discord](/tree/main/packages/plugin-discord)
Rich Presence/Activity in Discord.

### [lastfm](/tree/main/packages/plugin-lastfm)
Playback scrobbling.