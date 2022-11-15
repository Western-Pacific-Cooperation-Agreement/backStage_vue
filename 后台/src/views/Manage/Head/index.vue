<template>
    <div>
      <!--头部部分-->
        <span style="float:left">
    <el-input placeholder="搜索..." class="input-with-select">
      <el-button slot="append" icon="el-icon-search"> </el-button>
    </el-input>
    </span>
  <div style="float:right">
    <router-link to="/setting">
    
      <span >
       <i class="el-icon-setting">{{username}} </i> 
      </span>
      <span style="position: relative;top:10px;margin-left: 10px;">
        <el-avatar :src="avatar"></el-avatar>
      </span>
    </router-link>
    <span  style="margin-left: 10px;">
        <el-button @click="logout()" type="danger" plain>退出登入</el-button>
      </span>
  </div>
 
    </div>
  </template>
  
  <script>
  export default {
      data(){
        return{
          username:"",
          avatar:""
        }
      },
      created(){
        this.getUserInfo();
      },
      methods:{
        getUserInfo(){
          this.$axios.get("/sys/userInfo").then(res=>{
            console.log("res")
            console.log(res)
              this.username=res.data.data.username;
              this.avatar=res.data.data.avater;
          })
        },
        logout(){
          this.$axios.post("/logout").then(res=>{
              this.$message({
                type:'success',
                message:'退出登入'
              })
              this.$router.push("/login")
            
          })
        }

      }
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