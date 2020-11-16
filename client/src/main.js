import Vue from 'vue';
import App from './App';
import router from './router';
import './plugins/element.js';
import axios from 'axios';

console.log('process', process.env);

Vue.prototype.$http = axios.create({
  baseURL: process.env.VUE_APP_API_URL || '/web/api'
})

Vue.config.productionTip = false;

new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  router
})
