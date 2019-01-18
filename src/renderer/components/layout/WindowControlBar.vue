<template>
  <header class="titlebar">
    <div class="sidebar sidebar-top"></div>
    <div class="window_control">
      <li class="window-controls not-mac" onclick="win_minimize();">
        <i class="min-btn window-controls">─</i>
      </li>
      <li class="window-controls not-mac" onclick="win_maximize();">
        <i class="max-btn window-controls">
          <svg
            width="45"
            height="20"
            viewBox="0 0 45 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M17 5H27V15H17V5ZM18 14V6H26V14H18Z"
              fill="currentColor"
            ></path>
          </svg>
        </i>
      </li>
      <li class="window-controls not-mac" onclick="window.close();">
        <i class="exit-btn window-controls">
          <svg
            width="45"
            height="20"
            viewBox="0 0 45 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M17 5V6H18V5H17ZM20 7H19V8H20V7ZM23 9H21V11H20V12H19V13H18V14H17V15H18V14H19V13H20V12H21V11H23V12H24V13H25V14H26V15H27V14H26V13H25V12H24V11H23V9ZM24 8H23V9H24V8ZM25 7H24V8H25V7ZM26 6H25V7H26V6ZM26 6H27V5H26V6Z"
              fill="currentColor"
            ></path>
            <path d="M21 8H20V9H21V8Z" fill="currentColor"></path>
            <path d="M19 6H18V7H19V6Z" fill="currentColor"></path>
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M18 5V6H17V7H18V8H19V9H20V11H19V12H18V13H17V14H18V15H19V14H20V13H21V12H23V13H24V14H25V15H26V14H27V13H26V12H25V11H24V9H25V8H26V7H27V6H26V5H25V6H24V7H23V8H21V7H20V6H19V5H18ZM19 7V8H20V9H21V11H20V12H19V13H18V14H19V13H20V12H21V11H23V12H24V13H25V14H26V13H25V12H24V11H23V9H24V8H25V7H26V6H25V7H24V8H23V9H21V8H20V7H19ZM19 7V6H18V7H19Z"
              fill="currentColor"
              fill-opacity="0.4"
            ></path>
          </svg>
        </i>
      </li>
    </div>
  </header>
</template>

<style lang="less" scoped>
@dark: hsl(215, 30%, 8%);
@red: hsla(0, 100%, 50%, 65%);
@titlebar-height: 1.8rem;
@titlebar-color: @dark;

@window-controls-color-hover: rgba(88, 88, 88, 0.63);
@window-controls-width: 8.8rem;

header {
  -webkit-app-region: drag;
  grid-area: header;
  overflow: hidden;
  white-space: nowrap;
  & > * {
    display: inline-block;
    -webkit-app-region: no-drag;
  }
}
.window_control {
  float: right;
  & li {
    display: inline-block;
    height: 1.8rem;
    font-size: 1.1em;
    margin-left: 1px;
    margin-right: 1px;
    overflow: hidden;
    padding-top: 1px;
  }
}

li.window-controls {
  margin-left: -7px !important;
}

i.window-controls {
  height: -webkit-fill-available;
  padding: 0em 0rem;
  float: right;
  &:hover {
    background: @window-controls-color-hover;
  }
  &.min-btn {
    padding-right: 1rem;
    padding-left: 1rem;
    padding-top: 0.23rem;
    font-size: 1.2rem;
    user-select: none;
    font-family: Cambria;
  }
  &.max-btn {
    padding-top: 0.34rem;
    font-size: 0.75rem;
  }
  &.exit-btn {
    padding-top: 0.33rem;
    font-size: 1.2rem;
    &:hover {
      background: rgba(255, 0, 0, 0.65);
      opacity: 0.65;
      &::before {
        opacity: 1;
      }
    }
  }
}
</style>

<script>
// const remote = require("electron").remote;
import { remote } from "electron";

export default {
  name: "window-control-bar",
  methods: {
    win_minimize() {
      remote.BrowserWindow.getFocusedWindow().minimize();
    },
    win_maximize() {
      remote.BrowserWindow.getFocusedWindow().isMaximized()
        ? remote.BrowserWindow.getFocusedWindow().unmaximize()
        : remote.BrowserWindow.getFocusedWindow().maximize();
    }
  }
};
</script>

