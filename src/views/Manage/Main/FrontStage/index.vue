<template>
  <div>
    <el-card>
   <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
  <el-menu-item index="1">注册管理</el-menu-item>
  <el-menu-item index="2">用户认证管理</el-menu-item>
  <el-menu-item index="3">首页管理</el-menu-item>
  <el-menu-item index="4">网站公告管理</el-menu-item>
  <el-menu-item index="5">资讯管理</el-menu-item>
  <el-menu-item index="6">论坛管理</el-menu-item>
  <el-menu-item index="7">留言板管理</el-menu-item>
  <el-menu-item index="8">个人中心管理</el-menu-item>
  <el-menu-item index="9">个人中心管理</el-menu-item>


</el-menu>
</el-card>
<el-card>
  111<router-view></router-view>
</el-card>
</div>
</template>
  
<script>
export default {
      data() {
        return {
          activeIndex: '1',
          activeIndex2: '1'
        };
      },
      methods: {
        handleSelect(key, keyPath) {
          console.log(key, keyPath);
        }
      }
}
</script>
  
<style scoped>
  
  </style>