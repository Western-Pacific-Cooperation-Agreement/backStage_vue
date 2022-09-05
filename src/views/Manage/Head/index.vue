<template>
    <div>
      <!--头部部分-->
        <span style="float:left">
    <el-input placeholder="搜索..." class="input-with-select">
      <el-button slot="append" icon="el-icon-search"></el-button>
    </el-input>
    </span>
  <router-link to="/setting">
      <span style="float:right">
       <i class="el-icon-setting"></i> GitXulti(WPCA)
      </span>
  </router-link>
    </div>
  </template>
  
  <script>
  export default {
  
  }
  </script>
  
  <style scoped>
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
  
  </style>