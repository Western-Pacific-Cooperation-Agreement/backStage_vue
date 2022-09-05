<template>
  <div class="main">
     <h1>统计数据</h1>
          <el-row :gutter="12">
  <el-col :span="6">
    <el-card shadow="hover">
      <el-calendar v-model="value" id="fir"> 
      </el-calendar>
    </el-card>
  </el-col>
  <el-col :span="5">
    <el-card shadow="hover">
      <!--统计浏览器--><div id="pic"></div>
    </el-card>
  </el-col>
  <el-col :span="13">
    <el-card shadow="hover">
       <!--  访问量 --><div id="line"></div>
    </el-card>
  </el-col>
</el-row>
<el-row :gutter="12">
  <el-col :span="6">
    <el-row :gutter="12">
  <el-col :span="11"  v-for="item in click" style="margin:0 6px 20px 6px;padding: 0px;" >
    <el-card shadow="hover">
      <div style=""><el-link type="info" :underline="false">{{item.name}}</el-link></div>
      <h1 style="font-size:30px;text-align:center;font-weight: 500;">{{item.value}}</h1>
      <div style="font-size:30px;text-align:right" >
      <el-link :underline="false" type="danger" v-if="item.rate>=0"> {{item.rate}}% </el-link>
      <el-link :underline="false" type="success" v-else > {{item.rate}}% </el-link>
      </div>
    </el-card>
  </el-col>

</el-row>
  </el-col>
  <el-col :span="18">
    <el-card shadow="hover">
      <h1>操作记录</h1>
       <el-table :data="tableData" stripe style="width: 100%">
                  <el-table-column prop="date" label="日期" width="180">
                  </el-table-column>
                  <el-table-column prop="name" label="用户" width="180">
                  </el-table-column>
                  <el-table-column prop="address" label="ip地址">
                  </el-table-column>
                  <el-table-column prop="information" label="操作内容">
                  </el-table-column>
                </el-table>
    </el-card>
  </el-col>

</el-row>
  </div>
</template>


<script>
import * as echarts from 'echarts';
import { getPageParam} from '@/api/index'

  export default {
      components:{

      },
    data() {
    return {
      value: new Date(),
      input1: '',
      input2: '',
      input3: '',
      select: '',
      tableData: [
        {
          date: '2021-06-01 00:00:11',
          name: '张三',
          address: '127.0.0.1',
          information:'退出登入'
        },{
          date: '2021-06-01 00:00:10',
          name: '张三',
          address: '127.0.0.1',
          information:'登入'
        },{
          date: '2021-06-01 00:00:11',
          name: '张三',
          address: '127.0.0.1',
          information:'退出登入'
        },{
          date: '2021-06-01 00:00:10',
          name: '张三',
          address: '127.0.0.1',
          information:'登入'
        },{
          date: '2021-06-01 00:00:11',
          name: '张三',
          address: '127.0.0.1',
          information:'退出登入'
        },{
          date: '2021-06-01 00:00:10',
          name: '张三',
          address: '127.0.0.1',
          information:'登入'
        },{
          date: '2021-06-01 00:00:11',
          name: '张三',
          address: '127.0.0.1',
          information:'退出登入'
        },{
          date: '2021-06-01 00:00:10',
          name: '张三',
          address: '127.0.0.1',
          information:'登入'
        },{
          date: '2021-06-01 00:00:11',
          name: '张三',
          address: '127.0.0.1',
          information:'退出登入'
        },{
          date: '2021-06-01 00:00:10',
          name: '张三',
          address: '127.0.0.1',
          information:'登入'
        }
        ] , statics: [
                 { value: 1048, name: 'Chrome' },
                { value: 735, name: 'Firefox' },
                { value: 580, name: 'Edge' },
                { value: 484, name: '其他' },
            ],
            pageView: [820, 932, 901, 934, 1290, 1330, 1320],
            click: [{
              name:"日点击",
                value:"1,163",
                rate:-21.2
            },
            {
                name:"周点击",
                value:"1,163",
                rate:-11.2
            },
            {
                name:"平均停留时间",
                value:"21min",
                rate:-1.2
            },
            {
                name:"日活跃",
                value:"1,163",
                rate:4.2
            }],
            oper: [
        {
          date: '2021-06-01 00:00:11',
          name: '张三',
          address: '127.0.0.1',
          information:'退出登入'
        },{
          date: '2021-06-01 00:00:10',
          name: '张三',
          address: '127.0.0.1',
          information:'登入'
        },{
          date: '2021-06-01 00:00:11',
          name: '张三',
          address: '127.0.0.1',
          information:'退出登入'
        },{
          date: '2021-06-01 00:00:10',
          name: '张三',
          address: '127.0.0.1',
          information:'登入'
        },{
          date: '2021-06-01 00:00:11',
          name: '张三',
          address: '127.0.0.1',
          information:'退出登入'
        },{
          date: '2021-06-01 00:00:10',
          name: '张三',
          address: '127.0.0.1',
          information:'登入'
        },{
          date: '2021-06-01 00:00:11',
          name: '张三',
          address: '127.0.0.1',
          information:'退出登入'
        },{
          date: '2021-06-01 00:00:10',
          name: '张三',
          address: '127.0.0.1',
          information:'登入'
        },
        ],
    }
  },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      drawPic(){
        var chartDom = document.getElementById('pic');
        var myChart = echarts.init(chartDom);
        var option;
        option = {
          tooltip: {
            trigger: 'item'
          },
          legend: {
            top: '5%',
            left: 'center'
          },
          title: {
               text: '统计浏览器'
                 },
          series: [
            {
              
              name: 'Access From',
              type: 'pie',
              radius: ['40%', '70%'],
              avoidLabelOverlap: false,
              label: {
                show: false,
                position: 'center'
              },
              emphasis: {
                label: {
                  show: true,
                  fontSize: '40',
                  fontWeight: 'bold'
                }
              },
              labelLine: {
                show: false
              },
              data: this.statics
            }
          ]
        };
        myChart.setOption(option);

      }
      ,
      drawLine() {

        var chartDom = document.getElementById('line');
        var myChart = echarts.init(chartDom);
        var option;

        option = {
          xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
          },title: {
               text: '访问量'
                 },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              data:this.pageView,
              type: 'line',
              smooth: true
            }
          ]
        };

        myChart.setOption(option);
        console.log(chartDom)
      },getParam(){
        console.log(this.tableData);
        getPageParam().then(res=>{
           console.log("res");
          console.log(res);
          console.log(res.data.oper);
              
          this.tableData=res.data.oper;
          this.click=res.data.click;
          this.oper=res.data.oper;
          this.pageView=res.data.pageView;
          this.statics=res.data.statics;

          //重画图
          this.drawLine();
      this.drawPic();

        })
      }
    },
    mounted(){
      this.drawLine();
      this.drawPic();
    },created(){
      this.getParam();
    }
  }
</script>
<style scoped>
 .main{
    background: url("@/assets/outlineBackground.jpg");
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
    background-color: #555c55;
    text-align:left;
    width: 100vh;
  }
    .el-aside h5{
      color:white;
      background-color:  #555c55;
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
</style>
<style scoped>


#fir /deep/ .el-calendar-table .el-calendar-day {
    height: 45px;
}


</style>