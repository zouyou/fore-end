import Vue from 'vue';
import router from './router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App';

Vue.config.productionTip = false;
Vue.use(ElementUI, { size: 'medium' });

new Vue({
  el: '#app',
  router,
  render: h => h(App)
});
