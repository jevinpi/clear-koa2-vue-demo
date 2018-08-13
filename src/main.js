// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import axios from 'axios'
import store from './store/store'
import router from './router'

Vue.config.productionTip = false
Vue.prototype.$http = axios


axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response.status === 401) {
      console.log('401 error');
    } else {
      console.log('系统出现错误')
    }
    return Promise.reject(error);
  }
);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
