import Vue from 'vue';
import Router from 'vue-router';

const _import = require('./_import_' + process.env.NODE_ENV);
Vue.use(Router);

const childlst = [
  { path: '/index', component: _import('home/Index') },                       //首页
  { path: '/user', component: _import('system/user/Index') },                //用户管理
  { path: '/user-updatepwd', component: _import('system/user/UpdatePwd') },  //修改密码
  { path: '/user/:id', component: _import('system/user/EditUser') },         //编辑用户
  { path: '/role', component: _import('system/role/Index') },                //角色管理
  { path: '/const', component: _import('system/const/Index') },              //常量管理
  { path: '/power', component: _import('system/power/Index') },              //权限管理
  { path: '/flow', component: _import('system/flow/Index') },                         //流程管理
  { path: '/flowstep/:id/:flowId', component: _import('system/flow/EditFlowStep') },  //编辑流程
  { path: '/power/:id', component: _import('system/power/EditPower') },               //流程管理
  { path: '/syslogs', component: _import('system/syslogs/Index') },                   //日志管理
];
let routerlst = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: _import('home/Login') },
  { path: '/default', component: _import('home/Default'), children: childlst },
  { path: '*', component: _import('home/NoPage') },
];

var router = new Router({ mode: 'hash', routes: routerlst });
export default router;