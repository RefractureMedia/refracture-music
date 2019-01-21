import axios from 'axios';
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';

Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

new Vue({
  components: {
    App
  },
  router,
  store,
  template: '<App/>'
}).$mount('#app')