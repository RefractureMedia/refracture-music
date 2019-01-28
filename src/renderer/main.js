import axios from 'axios';
import Vue from 'vue';
import App from './App';
import router from './router';

Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

new Vue({
  components: {
    App
  },
  router,
  template: '<App/>'
}).$mount('#app')