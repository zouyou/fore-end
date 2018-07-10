import Vue from 'vue';
import router from './router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from './util/axios';
import App from './App';

Vue.prototype.$ajax = axios;
Vue.config.productionTip = false;
Vue.use(ElementUI, { size: 'medium' });

new Vue({
  el: '#app',
  router,
  render: h => h(App)
});
