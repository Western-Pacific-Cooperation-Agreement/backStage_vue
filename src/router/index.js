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
      path: '/file',
      name: 'File',
      meta:{
        name:'文件列表'
      },
      component: () => import('../views/Manage/Main/Print/File/index.vue')
    },
    {
      path: '/backupAndRestore',
      name: 'BackupAndRestore',
      meta:{
        name:'备份列表'
      },
      component: () => import('../views/Manage/Main/BackupAndRestore/index.vue')
    },
    {
      path: '/dataDictionary',
      name: 'DataDictionary',
      meta:{
        name:'数据字典'
      },
      component: () => import('../views/Manage/Main/DataDictionary/index.vue')
    }
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


router.beforeEach((to, from, next) => {

	let hasRoute = store.state.menus.hasRoutes

	let token = localStorage.getItem("token")

	if (to.path == '/login') {
		next()

	} else if (!token) {
		next({path: '/login'})


	} else if(token && !hasRoute) {
		axios.get("/sys/menu/nav", {
			headers: {
				Authorization: localStorage.getItem("token")
			}
		}).then(res => {

      console.log("获得参数")
			console.log(res.data.data)
      console.log("菜單")
      console.log(store.state.menus.menuList)

			// 拿到menuList
			store.commit("setMenuList", res.data.data.navs)
      
			// 拿到用户权限
			store.commit("setPermList", res.data.data.authoritys)

			console.log(store.state.menus.menuList)

			// 动态绑定路由
			let newRoutes = router.options.routes

			res.data.data.navs.forEach(menu => {
				if (menu.children) {
					menu.children.forEach(e => {

						// 转成路由
						let route = menuToRoute(e)

						// 吧路由添加到路由管理中
						if (route) {
							newRoutes[0].children.push(route)
						}

					})
				}
			})

			console.log("newRoutes")
			console.log(newRoutes)
			router.addRoutes(newRoutes)

			hasRoute = true
			store.commit("changeRouteStatus", hasRoute)
		})
	}



	next()
})


// 导航转成路由
const menuToRoute = (menu) => {

	if (!menu.component) {
		return null
	}

	let route = {
		name: menu.name,
		path: menu.path,
		meta: {
			icon: menu.icon,
			title: menu.title
		}
	}
	route.component = () => import('@/views/' + menu.component +'.vue')

	return route
}


export default router
