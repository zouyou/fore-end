import Vue from 'vue';
import Router from 'vue-router';

const _import = require('./_import_' + process.env.NODE_ENV);
Vue.use(Router);

const childlst = [
  { path: '/index', component: _import('home/Index') },                       //首页
  { path: '/users', component: _import('users/Index') },                      //用户管理
];
let routerlst = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: _import('home/Login') },
  { path: '/default', component: _import('home/Default'), children: childlst },
  { path: '*', component: _import('home/NoPage') },
];

var router = new Router({ mode: 'hash', routes: routerlst });
export default router;