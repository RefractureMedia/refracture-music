// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import {
  Plugins
} from '@capacitor/core';
import Vue from 'vue';
import App from './App';
import ShareDialog from "./assets/js/Share.js";
import router from './router';

const {
  SplashScreen
} = Plugins;
document.addEventListener('deviceready', ShareDialog, false);

SplashScreen.hide();

Vue.config.productionTip = false

Vue.component('v-style', {
  render: function (createElement) {
    return createElement('style', this.$slots.default)
  }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
