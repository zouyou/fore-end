import Vue from 'vue';
import Router from 'vue-router';

const _import = require('./_import_' + process.env.NODE_ENV);
Vue.use(Router);

const childlst = [
  { path: '/index', component: _import('home/Index') },                     //首页
  { path: '/user-index', component: _import('system/User-Index') },         //用户管理
  { path: '/role', component: _import('system/Role-Index') },               //角色管理
  { path: '/const', component: _import('system/Const-Index') },             //常量管理
  { path: '/func', component: _import('system/Func-Index') },               //功能管理
  { path: '/flow', component: _import('system/Flow-Index') },               //流程管理
  { path: '/syslog', component: _import('system/Syslog-Index') },           //日志管理
  { path: '/student', component: _import('student/Index') },                //学生管理
];
let routerlst = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: _import('home/Login') },
  { path: '/default', component: _import('home/Default'), children: childlst },
  { path: '*', component: _import('home/NoPage') },
];

var router = new Router({ mode: 'hash', routes: routerlst });
export default router;