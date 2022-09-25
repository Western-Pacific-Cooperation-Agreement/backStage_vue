import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/index.vue'


import axios from "../utils/axios";
import store from "../store"

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Copyright',
    meta:{
      name:'版权'
    },
    component: HomeView,
    children:[
    {
      path: '/',
      name: 'Home',
      meta:{
        name:'首页'
      },
      component: () => import('../views/Manage/Main/Home/index.vue')
    },
    {
      path: '/setting',
      name: 'Setting',
      meta:{
        name:'个人设置'
      },
      component: () => import('../views/Manage/Main/Setting/index.vue')
    },
    {
      path: '/manageMyActivity',
      name: 'ManageMyActivity',
      meta:{
        name:'管理我的活动'
      },
      component: () => import('../views/Manage/Main/ActivityLeadManagement/ManageMyActivity/index.vue')
    },
    {
      path: '/reviewRegistration',
      name: 'ReviewRegistration',
      meta:{
        name:'审核报名'
      },
      component: () => import('../views/Manage/Main/ActivityLeadManagement/ReviewRegistration/index.vue')
    },
    {
      path: '/reviewApplicationActivity',
      name: 'ReviewApplicationActivity',
      meta:{
        name:'审核申请活动'
      },
      component: () => import('../views/Manage/Main/ActivityApplicationManagement/ReviewApplicationActivity/index.vue')
    },
    {
      path: '/deptType',
      name: 'AssoType',
      meta:{
        name:'部门类型列表'
      },
      component: () => import('../views/Manage/Main/Asso/AssoType/index.vue')
    },
    {
      path: '/deptList',
      name: 'DeptList',
      meta:{
        name:'部门类型列表'
      },
      component: () => import('../views/Manage/Main/Asso/AssoList/index.vue')
    },  
    {
      path: '/user',
      name: 'User',
      meta:{
        name:'用户管理'
      },
      component: () => import('../views/Manage/Main/Sys/User/index.vue')
    },
    {
      path: '/role',
      name: 'Role',
      meta:{
        name:'角色管理'
      },
      component: () => import('../views/Manage/Main/Sys/Role/index.vue')
    }
,
    {
      path: '/menu',
      name: 'Menu',
      meta:{
        name:'菜单管理'
      },
      component: () => import('../views/Manage/Main/Sys/Menu/index.vue')
    },
    {
      path: '/dataDictionary',
      name: 'DataDictionary',
      meta:{
        name:'数据字典'
      },
      component: () => import('../views/Manage/Main/DataDictionary/index.vue')
    },
  ]
  }
  , {
    path: '/login',
    name: 'Login',
    meta:{
      name:'基础'
    },
    component:()=> import('../views/Login/index.vue'),
    
  }
 
]


const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})





export default router
