<template>
  <div>
    <el-row class="tac">
          <el-col :span="12">
            <h5>大学生活动后台管理系统</h5>
            <el-menu 
     
            class="el-menu-vertical-demo"
             @open="handleOpen()" 
             @close="handleClose()"
              background-color="#222e3c" 
              text-color="#fff" 
              active-text-color="grey"
              >          
     <el-submenu  :index="String(keys)" v-for="(items,keys) in Menus" :key="keys">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>{{items.menuName}}</span>
        </template>
   
        <el-menu-item-group>


          <router-link :to="item.menuUrl" v-for="(item,key) in items.children" :key="key">
          <el-menu-item :index="keys+'-'+key">{{item.menuName}}</el-menu-item>
          </router-link>


        </el-menu-item-group>

        </el-submenu>
      </el-menu>
          </el-col>
        </el-row>
  </div>
</template>

<script>

export default {
    data(){
      return{
        Menus:[
          {
          menuName:'首页',
          menuIcon:'el-icon-location',
          menuUrl:'/',
          children:[{
            menuName:'首页展示',
            menuIcon:'el-icon-location',
            menuUrl:'/',
          },
        ]
        },{
          menuName:'活动负责管理',
          menuIcon:'el-icon-location',
          menuUrl:'',
          children:[{
            menuName:'管理我的活动',
            menuIcon:'el-icon-location',
            menuUrl:'/manageMyActivity',
          },{
            menuName:'审核报名',
            menuIcon:'el-icon-location',
            menuUrl:'/reviewRegistration',
          }
        ]
        },{
          menuName:'活动申请管理',
          menuIcon:'el-icon-location',
          menuUrl:'/',
          children:[{
            menuName:'审核申请活动',
            menuIcon:'el-icon-location',
            menuUrl:'/reviewApplicationActivity',
          }
        ]
        },{
          menuName:'活动管理',
          menuIcon:'el-icon-location',
          menuUrl:'/',
          children:[{
            menuName:'活动类型列表',
            menuIcon:'el-icon-location',
            menuUrl:'/actType',
          },{
            menuName:'活动列表',
            menuIcon:'el-icon-location',
            menuUrl:'/actList',
          }
        ]
        },{
          menuName:'部门管理',
          menuIcon:'el-icon-location',
          menuUrl:'/',
          children:[{
            menuName:'部门类型列表',
            menuIcon:'el-icon-location',
            menuUrl:'/deptType',
          },{
            menuName:'部门列表',
            menuIcon:'el-icon-location',
            menuUrl:'/deptList',
          }
        ]
        }
        ,{
          menuName:'系统管理',
          menuIcon:'el-icon-location',
          menuUrl:'/',
          children:[{
            menuName:'用户管理',
            menuIcon:'el-icon-location',
            menuUrl:'/user',
          },
          {
            menuName:'角色管理',
            menuIcon:'el-icon-location',
            menuUrl:'/role',
          },
          {
            menuName:'菜单管理',
            menuIcon:'el-icon-location',
            menuUrl:'/menu',
          }
        ]
        }
        
        ,{
          menuName:'数据字典',
          menuIcon:'el-icon-location',
          menuUrl:'/',
          children:[{
            menuName:'数据字典列表',
            menuIcon:'el-icon-location',
            menuUrl:'/dataDictionary',
          }
          
        ]
        }        
      ]

      }
    },
    
}
</script>

<style scoped>
  a{
    text-decoration-line: none;
  }
.el-input-group{
  width: 500px;
}
.el-input-group__append button.el-button, .el-input-group__append div.el-select  .el-input-group__append div.el-select:hover .el-input__inner, .el-input-group__prepend button.el-button, .el-input-group__prepend div.el-select .el-input__inner, .el-input-group__prepend div.el-select:hover .el-input__inner {
    background-color: white;

}
.el-input__inner {
  height: 20px;
}

 .el-select .el-input {
    width: 230px;
  }
  .input-with-select .el-input-group__prepend {
    background-color: #fff;
    width: 20px;
  }
.el-col-12{
  width: 100%;
}
 .el-menu-vertical-demo{
      height: 1000px;
      margin: 0;
    }
.el-col{
      height:150%;
}
  .tac{
    width: 100%;
  }
.el-calendar .el-calendar-day {
 height: auto;
}
  .home{
    height: 100%;
  }
 .el-header, .el-footer {
    background-color: #ffffff;
    color: #555c55;
    text-align: center;
    line-height: 60px;
    border:1px solid #D3DCE6;
  }
  
  .el-aside {
    background-color: #222e3c;
    text-align:left;
    width: 100vh;
  }
    .el-aside h5{
      color:white;
      background-color:  #222e3c;
      height: 60px;
      margin:0;
      font-size: 15px;
      position: relative;
      width:90%;
      top: 20px;
      left: 20px;
    }
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: left;
  
    line-height: 10px;
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }
  .el-container{
      width: 100%;
  }
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }

.el-menu .el-menu-item.is-active {
  /**设置nav点击后变色组件 */
    background: #51E0B4!important;
}

</style>