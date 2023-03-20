# Refracture Music
Aiming to fix a fractured, limited, & inconsistent music experience; a modular, multi-platform, customizable, feature-rich, and modern music application.
## Packages

### [core](https://github.com/RefractureMedia/refracture-music/tree/main/packages/core)
All internal functionality code. Requires codec compatibility info and implemented native user input & playback hooks.
- Written in TypeScript.
- Releases will include compatible bundles for Node 18 & Latest Deno/Bun.
- Will use Refracture [Intern](https://github.com/RefractureMedia/intern) to provide SponsorBlock style crowdsourced submissions to simplify, optimize, & enrich music metadata.

### [client-cli](https://github.com/RefractureMedia/refracture-music/tree/main/packages/client-cli)
Testing client for development of core.
### [client-desktop](https://github.com/RefractureMedia/refracture-music/tree/main/packages/client-desktop)
Desktop platforms UI.
- Written in [Vue](https://vuejs.org/guide/introduction.html)/[Nuxt](https://v3.nuxtjs.org/guide/concepts/introduction) 3.
- A Gluon app.

### [client-mobile](https://github.com/RefractureMedia/refracture-music/tree/main/packages/client-mobile)
Mobile platforms UI.
- A React Native app.
- Will use react-native-webview & audio-encode wasm libraries on iOS. (Android browsers support streaming opus & flac)

### [server](https://github.com/RefractureMedia/refracture-music/tree/main/packages/server)
A self-hosted session & library dameon/service. Provides a centralized location for syncing your profile between devices and streaming/distributing your saved library.
- Written in TypeScript.
- A runtime agnostic CLI with Linux tooling & windows support (through the app).
- Uses Docker on non-win32 OSes.

## Client Plugins

### [base]()
User-facing UI & local/self-hosted music.

## Server Plugins

### [cast]()

### [discord]()