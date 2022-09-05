<template>
  <div>
    <el-card>
   <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
  <el-menu-item index="1">首页设置</el-menu-item>
  <el-menu-item index="2">快速注册管理</el-menu-item>
  <el-menu-item index="3">用户认证管理</el-menu-item>
  <el-menu-item index="4">快速审核管理</el-menu-item>
  <el-menu-item index="5">个人管理</el-menu-item>
  <el-menu-item index="6">活动管理</el-menu-item>
  <el-menu-item index="7">部门管理</el-menu-item>
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