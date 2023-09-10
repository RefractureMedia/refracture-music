### 0.0.x - Version Minor 0: Hello World
- ✅ Setup bundling of Core
- ✅ Setup mono-repo release CI
- ✅ Add sqflite, create transparent initialize/query shims
- ✅ Setup loading of Core through GitHub release
- 🚧 Setup hot-loading of Core during development via a local webserver
- Check Core bundle hash (haha funny app injection)
- Add settings view & components, add settings manager to Core
- Add theming API and implement primary themes
- Setup bundling/release of Base
- Integrate Prisma & refactor Core
- Setup PluginProvider class in Core and create BaseProvider
- Add printing API and test Hello world from Base
- Add native fs API and implement recursive content hash index in Base
- Add library provider API and implement basic support in Base from content index w/ setting for adding native locations
- Add metadata provider API and implement ID3 stream
- Implement track metadata propagation (artists, albums)
- Add player API, implement in Base
- Add flutter builds to CI
- Let friends know they can test it out


### 0.1.x - Version Minor 1: On the Go
- Create project layout for /music-server
- Get Server building to docker in dev & CI
- Add database to Server and primary routes
- Integrate Core with Server
- Adapt client UI to mobile
- Get mobile building in dev and CI
- Test & integrate media handling on mobile
- Stress test mobile's connection to Server


### 0.2.x - Version Minor 2: Daily Driver
- Create /music-web
- Add basic routing
- Deploy & host
- Add Hypervisor
- Create /music-addon-host
- Add Official plugin repo to Web
- Add addon repo support to /client-flutter and switch loading of Base
- Create /plugin-spotify
- Add homepage
- Deploy and host


### 0.3.x - Version Minor 3: Better Together
- Add Netbroker API to Web; uses Cloudflare Workers & tokenized links to implement pain free & private networking between hosts
- Add Netbroker integration option to the flutter client - server connection, make it the default
- Create listen along feature using Netbroker
- Create user networking; share recent track history & open listen along sessions with other users, automatically available to users in your Server with privacy options
- Create library sharing; share playlists & individual library items with users in your Server (tip: you can share your entire library too)
- Create addon sharing; share your set of addons with other users, automatically available to users on your Server with privacy options
- Create Discord plugin
- Create Last.fm plugin
- Setup Patreon & Discord server


### 0.4.x - Version Minor 4: Free Data
- Create Intern


### 0.5.x - Version Minor 5: State of Mind
- Add Moods


### 0.6.x - Version Minor 6: Spring Cleaning
- Fix
- Polish
- Finish backlog


### 0.7.x - Version Minor 7: Design is my Passion
- Add Themes


### 1.0.x - Version Major 1: Electric Rhumba
- Add Cast (Chromecast/Airplay) support
- Create /client-flutter-wear
- Add Car integration (Auto/Carplay)
- Adapt client UI to TV
- Create Server hosting options

...

### 2.0.x - Version Major 2: Lets Fucking Go (Working title)
- If there's enough interest in Refracture
- Setup company LLC
- Establish game plan on paid service and concept expansion
- Find someone to take on as a business partner to help find Seed and start the company
- Quit my job
- Hire staff (likely including existing contributors)
- Develop paid service and hire on industry professionals to setup contacts and license music
- Sign on title/label-independent artists to directly (but not exclusively) publish onto and promote the platform.
- ADVERTISE