# Pages
 ## Library
    - Songs
    - Albums
    - Artists
    - Playlists
 ## Browse
    - Search
    - Feed
    - Popular
 - Visualize

# Components
 - Preloader 
 - Header
 - Window Control Bar (rf-win-ctrl)
    - Window Control Button (rf-win-ctrl-btn)
 - Sidebar <rf-sidebar>
    - Sidebar Item <rf-sidebar-item></rf-sidebar-item>
 - Control Bar <rf-media-controls>
    - Control Button <rf-media-btn icon="" background=""/>
 - Album <rf-album data="{object}"/>
 - List <rf-list></rf-list>
    - List Item <rf-list-item data="{object}"/>
 - Context Menu <rf-context-menu items="[{ name: ''}, ...}]" v-bind:click="" /> 
 - Modal
    - Content View <rf-modal page="content_view" data="{object}"> // Artist, Album, 
    - Now Playing <rf-modal fullscreen page="now_playing">
    - Settings <rf-modal fullscreen page="settings">
    - Google Account <rf-fsmodel fullscreen page="account">