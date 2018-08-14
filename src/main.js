import Vue from 'vue';
import router from './router';
import './assets/0DA2B3/index.css';
import '../static/css/main.css';
import ElementUI from 'element-ui';
import axios from './util/axios';
import App from './App';
import 'babel-polyfill';
import cryptosha1 from 'crypto-js/sha1';
import moment from 'moment';


Vue.prototype.$ajax = axios;
Vue.prototype.$cryptosha1 = cryptosha1;
Vue.prototype.$moment = moment;
Vue.config.productionTip = false;
Vue.use(ElementUI, { size: 'medium' });

new Vue({
  el: '#app',
  router,
  render: h => h(App)
});
