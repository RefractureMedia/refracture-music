-------

<p align="center">
  <img src="https://github.com/RefractureMedia/refracture-music/assets/12068027/0ff05b31-2a2d-49c4-96c0-6ce25b1b712f" alt="Logo"></img>
</p>

-------

### Aiming to fix a fractured, limited, & inconsistent music experience; a fast, modular, multi-platform, customizable, feature-rich, and modern music application.

-------

## Roadmap
-  **0.0.x - Version Minor 0: Hello World**
  - Desktop release of client with support for local media libraries and OTA updates of the JS app core.
  - ️ Q4 2024
-  **0.1.x - Version Minor 1: On the Go**
  - Mobile release of client with support for self hosted library server featuring rich player sync.
  - ️ Q2 2025
-  **0.2.x - Version Minor 2: Daily Driver**
  - Release of
    - Plugin support in client
    - Hypervisor; required plugin safety review & security authority
    - Official plugin repository 
    - Full Spotify integration plugin (Premium Users only)
  - ️ Q4 2025
-  **0.3.x - Version Minor 3: Better Together**
  - Release of
    - Library server updating featuring painless connection via provided routing service.
    - User networking in client; library share, listen along, play history, et. all.
    - Scrobbling via Last.fm plugin
    - Rich Presence/Activity Discord plugin
    - Full [Audius Music](https://audius.co/) integration plugin
  - ️ Q2 2025
-  **[Full Roadmap](/packages/docs/user/roadmap.md)**

## Packages

###  [addon-host](/packages/addon-host)
Hosting server for addons (plugins & themes).
- Written in TypeScript.
- Support for several deployments; CLI, Docker, NPM/Embedded, CloudFlare Worker/Edge, etc.

###  [client-cli](/packages/client-cli)
Testing client for development of core.

###  [client-flutter](/packages/client-flutter)
Cross-platform UI. (All platforms)

###  [core](/packages/core)
All internal functionality code. Requires codec compatibility info and implemented native user input & playback hooks.
- Written in TypeScript.
- Releases will include compatible bundles for Node 18 & Latest Deno/Bun.
- Will use Refracture [Intern](https://github.com/RefractureMedia/intern) to provide [SponsorBlock](https://github.com/ajayyy/SponsorBlock) style crowd-sourced submissions to simplify, optimize, & enrich music metadata.

###  [docs](/packages/docs)
Markdown documentation of the project.

###  [server](/packages/server)
A self-hosted session & library dameon/service. Provides a centralized location for syncing your profile between devices and streaming/distributing your saved library.
- Written in TypeScript.
- A runtime agnostic CLI with Linux tooling & windows support (through the app).

###  [web](/packages/addon-host)
Hosting server for the project.
- Written in TypeScript.
- Support for several deployments; Vercel, Docker, etc.
- Includes a website written in [Vue](https://vuejs.org/guide/introduction.html)/[Nuxt](https://v3.nuxtjs.org/guide/concepts/introduction) 3.

## Official Plugins

### [base](/packages/plugin-base)
Offline/self-hosted music.

### [spotify](/packages/plugin-spotify)
Full integration with Spotify. (Premium users only)

### [apple](/packages/plugin-apple)
Full integration with Apple Music. (Premium users only)

### [audius](/packages/plugin-audius)
Full integration with Audius. (free!)

### [discord](/packages/plugin-discord)
Rich Presence/Activity in Discord.

### [lastfm](/packages/plugin-lastfm)
Playback scrobbling.
