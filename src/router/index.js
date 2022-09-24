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
    // {
    //   path: '/myReviewActivity',
    //   name: 'MyReviewActivity',
    //   meta:{
    //     name:'我审核的活动'
    //   },
    //   component: () => import('../views/Manage/Main/ActivityApplicationManagement/MyReviewActivity/index.vue')
    // },
    {
      path: '/actType',
      name: 'ActType',
      meta:{
        name:'活动类型列表'
      },
      component: () => import('../views/Manage/Main/ActivityManagement/ActType')
    },
    {
      path: '/actList',
      name: 'ActList',
      meta:{
        name:'活动列表'
      },
      component: () => import('../views/Manage/Main/ActivityManagement/ActList')
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
//     {
//       path: '/frontStage',
//       name: 'FrontStage',
//       meta:{
//         name:'前台功能管理列表'
//       },
//       component: () => import('../views/Manage/Main/FrontStage/index.vue')
//     }
// ,
//     {
//       path: '/backStage',
//       name: 'BackStage',
//       meta:{
//         name:'后台功能管理列表'
//       },
//       component: () => import('../views/Manage/Main/BackStage/index.vue')
//     },   
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
    // {
    //   path: '/recommend',
    //   name: 'Recommend',
    //   meta:{
    //     name:'推荐系统'
    //   },
    //   component: () => import('../views/Manage/Main/Recommend/index.vue')
    // },
    // {
    //   path: '/query',
    //   name: 'Query',
    //   meta:{
    //     name:'推荐系统'
    //   },
    //   component: () => import('../views/Manage/Main/Query/index.vue')
    // },
    // {
    //   path: '/deepLearning',
    //   name: 'DeepLearning',
    //   meta:{
    //     name:'深度学习'
    //   },
    //   component: () => import('../views/Manage/Main/DeepLearning/index.vue')
    // }
    // ,
    // {
    //   path: '/basicConfig',
    //   name: 'BasicConfig',
    //   meta:{
    //     name:'系统基础配置'
    //   },
    //   component: () => import('../views/Manage/Main/BasicConfig/index.vue')
    // },
    // {
    //   path: '/trafficManagement',
    //   name: 'TrafficManagement',
    //   meta:{
    //     name:'流量分布'
    //   },
    //   component: () => import('../views/Manage/Main/DistributedSystem/TrafficManagement')
    // },
    // {
    //   path: '/serverList',
    //   name: 'ServerList',
    //   meta:{
    //     name:'服务器列表'
    //   },
    //   component: () => import('../views/Manage/Main/DistributedSystem/ServerList/index.vue')
    // },
    // {
    //   path: '/serverStatu',
    //   name: 'ServerStatu',
    //   meta:{
    //     name:'服务器列表'
    //   },
    //   component: () => import('../views/Manage/Main/DistributedSystem/ServerStatu/index.vue')
    // }
    // ,
    // {
    //   path: '/serverColony',
    //   name: 'ServerColony',
    //   meta:{
    //     name:'服务器集群'
    //   },
    //   component: () => import('../views/Manage/Main/DistributedSystem/ServerColony/index.vue')
    // },
    {
      path: '/dataDictionary',
      name: 'DataDictionary',
      meta:{
        name:'数据字典'
      },
      component: () => import('../views/Manage/Main/DataDictionary/index.vue')
    },
    // {
    //   path: '/dataBaseTable',
    //   name: 'DataBaseTable',
    //   meta:{
    //     name:'数据管理'
    //   },
    //   component: () => import('../views/Manage/Main/DataBaseTable/index.vue')
    // },
    // {
    //   path: '/systemLog',
    //   name: 'SystemLog',
    //   meta:{
    //     name:'数据管理'
    //   },
    //   component: () => import('../views/Manage/Main/SystemLog/index.vue')
    // }
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
