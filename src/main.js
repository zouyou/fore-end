import Vue from 'vue';
import router from './router';
import './assets/0DA2B3/index.css';
import '../static/css/main.css';
import ElementUI from 'element-ui';
import axios from './util/axios';
import App from './App';
import 'babel-polyfill';
import cryptosha1 from 'crypto-js/sha1';
import accounting from 'accounting';
import moment from 'moment';
import 'font-awesome/css/font-awesome.min.css';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import spantxt from '@/views/components/SpanTxt';


Vue.prototype.$ajax = axios;
Vue.prototype.$cryptosha1 = cryptosha1;
Vue.prototype.$moment = moment;
Vue.prototype.$accounting = accounting;

router.beforeEach((to, from, next) => {
  if (to.path == '/login') {
    sessionStorage.removeItem('zsylocalInfo');
  }
  let user = sessionStorage.getItem('zsylocalInfo');
  if (!user && to.path != '/login') {
    next({ path: '/login' })
  } else {
    NProgress.start();
    next()
  }
});

router.afterEach(transition => {
  NProgress.done();
});


Vue.config.productionTip = false;
Vue.use(ElementUI, { size: 'medium' });
Vue.component("span-txt", spantxt);

new Vue({
  el: '#app',
  router,
  render: h => h(App)
});
