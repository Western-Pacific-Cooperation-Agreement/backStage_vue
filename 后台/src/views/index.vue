<template>
  <div class="home">
    <el-container>
      <el-aside width="250px">
        <Side></Side>
      </el-aside>
      <el-container>
        <el-header>
          <!--头部部分-->
          
          <Head></Head>

        </el-header>

        <!--主体部分-->
        <el-main>

  
    <div class="first-loading-wrp" v-if="isRouter">
      <div class="loading-wrp">
        <span class="dot dot-spin">
          <i></i>
          <i></i>
          <i></i>
          <i></i>
        </span>
      </div>
      <h2>努力加载中...</h2>
  </div>

         <router-view v-show="!isRouter" />
        </el-main>

      </el-container>
    </el-container>

  </div>
</template>

<style scoped>
   .first-loading-wrp {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 90vh;
      min-height: 90vh;
    }
 
    .first-loading-wrp>h1 {
      font-size: 30px;
      font-weight: bolder;
    }
 
    .first-loading-wrp .loading-wrp {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 98px;
    }
 
    .dot {
      position: relative;
      box-sizing: border-box;
      display: inline-block;
      width: 64px;
      height: 64px;
      font-size: 64px;
      transform: rotate(45deg);
      animation: antRotate 1.2s infinite linear;
    }
 
    .dot i {
      position: absolute;
      display: block;
      width: 28px;
      height: 28px;
      background-color: #1890ff;
      border-radius: 100%;
      opacity: 0.3;
      transform: scale(0.75);
      transform-origin: 50% 50%;
      animation: antSpinMove 1s infinite linear alternate;
    }
 
    .dot i:nth-child(1) {
      top: 0;
      left: 0;
    }
 
    .dot i:nth-child(2) {
      top: 0;
      right: 0;
      -webkit-animation-delay: 0.4s;
      animation-delay: 0.4s;
    }
 
    .dot i:nth-child(3) {
      right: 0;
      bottom: 0;
      -webkit-animation-delay: 0.8s;
      animation-delay: 0.8s;
    }
 
    .dot i:nth-child(4) {
      bottom: 0;
      left: 0;
      -webkit-animation-delay: 1.2s;
      animation-delay: 1.2s;
    }
 
    @keyframes antRotate {
      to {
        -webkit-transform: rotate(405deg);
        transform: rotate(405deg);
      }
    }
 
    @-webkit-keyframes antRotate {
      to {
        -webkit-transform: rotate(405deg);
        transform: rotate(405deg);
      }
    }
 
    @keyframes antSpinMove {
      to {
        opacity: 1;
      }
    }
 
    @-webkit-keyframes antSpinMove {
      to {
        opacity: 1;
      }
    }


  
a{
  text-decoration-line: none;
}
#pic{
  height:400px;
}
#line{
  height:400px;
}
#fir{
  height:460px;
  line-height: 20px;
  padding: 0;
  margin: 0;
}


.el-row {
    margin-bottom: 20px;

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

<script>
    import * as echarts from 'echarts'
  import Side from './Manage/Side/index.vue'
  import Head from './Manage/Head/index.vue'
export default {
  //路由守卫
  beforeRouteEnter(to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建
    next()
  },
  beforeRouteUpdate(to, from, next) {
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
    this.isRouter=true;
    this.routerPic();
    //console("1111")
    next()
  },
  beforeRouteLeave(to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
    this.isRouter=false;
     next()
  }
    ,components:{
      Side,
      Head
      },
    data() {
    return {
      isRouter:true,
      newNav:'1',
      value: new Date(),
      input1: '',
      input2: '',
      input3: '',
      select: '',
      
     
    }
  },
    methods: {
      routerPic(){
     
      var self=this;
     setTimeout(function(){
	    	self.isRouter=false;
	    },1000);
  
      },
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
  
    
    },
    created(){
    this.routerPic();
 
    },
    mounted(){

      
    }
  }
</script>
