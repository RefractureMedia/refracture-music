# Refracture Music
Aiming to fix a fractured, limited, & inconsistent music experience; a modular, multi-platform, customizable, feature-rich, and modern music application.
## Packages

### [core](https://github.com/RefractureMedia/refracture-music/tree/main/packages/core)
All functionality code, emits all browse, library, profile, & session data for the app. Requires codec compatibility info and implemented native user input, ffmpeg, & playback hooks.
- Written in TypeScript.
- Releases will include compatible bundles for ES2020 QuickJS, Node 16 & Latest Deno.
- Will use Refracture [Intern](https://github.com/RefractureMedia/intern) to provide SponsorBlock style crowdsourced submissions to simplify, optimize, & enrich music metadata.

### [client-cli](https://github.com/RefractureMedia/refracture-music/tree/main/packages/client-cli)
Testing client for development of core.
### [client-desktop](https://github.com/RefractureMedia/refracture-music/tree/main/packages/client-desktop)
Desktop platforms UI.
- Written in [Vue](https://vuejs.org/guide/introduction.html)/[Nuxt](https://v3.nuxtjs.org/guide/concepts/introduction) 3.
- An Electron package.
- Once [Tauri](https://github.com/tauri-apps/tauri) feature set reaches maturity will move and use [Deno](https://deno.land/) bindings to run core.

### [client-mobile](https://github.com/RefractureMedia/refracture-music/tree/main/packages/client-mobile)
Mobile platforms UI.
- Written in [Flutter](https://docs.flutter.dev/get-started/codelab)/Dart.
- Will use [JS bindings](https://github.com/ekibun/flutter_qjs) to utilize core.

### [server](https://github.com/RefractureMedia/refracture-music/tree/main/packages/server)
A self-hosted session & library dameon/service. Provides a centralized location for syncing your profile between devices, distributing your saved library, and encoding streams for low-spec devices like Chromecasts.
- Written in TypeScript.
- A [Deno](https://deno.land/) CLI program.