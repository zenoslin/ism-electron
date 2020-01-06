import 'element-ui/lib/theme-chalk/index.css';
import Vue from 'vue';
import axios from 'axios';
import db from './datastore';
import ElementUI from 'element-ui';

import App from './App';
import router from './router';
import store from './store';
import './utils/filters'; // 过滤器

if (!process.env.IS_WEB) Vue.use(require('vue-electron'));
Vue.http = Vue.prototype.$http = axios;
Vue.config.productionTip = false;

Vue.use(ElementUI);
Vue.prototype.$db = db;

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app');
