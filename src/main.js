// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import {
  Plugins
} from '@capacitor/core';
import Vue from 'vue';
import App from './App';
import ShareDialog from "./assets/js/cordova/share";
import router from './router';
import VueKeybindings from 'vue-keybindings'

const {
  SplashScreen
} = Plugins;
document.addEventListener('deviceready', ShareDialog, false);

SplashScreen.hide();

Vue.config.productionTip = false

Vue.prototype.window_portal = window;

Vue.component('v-style', {
  render: function (createElement) {
    return createElement('style', this.$slots.default)
  }
});

Vue.use(VueKeybindings, {
  alias: {
      space: 'space',
      escape: 'esc'
  }
})


let store = {};

/* eslint-disable no-new */
window._VueInstance = new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
