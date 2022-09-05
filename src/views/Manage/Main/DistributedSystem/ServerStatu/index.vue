
<template>
    <div>
      <h1>存储容量</h1>
      <div ref="chart" style="width:100%;height:376px"></div>
     
      <table style="width:100%;height:376px" >
        <tr>
          <td>      <h1>主存占用率</h1>
      <div ref="chart1"  id="main" style="width:500px;height:500px"></div></td>
          <td> 
               <h1>CPU占用率</h1>
              <div ref="chart2"  id="main2" style="width:500px;height:500px"></div>
         </td>

        </tr>

  
    </table>
    </div>
  
  </template>
  
  <script>
  import * as echarts from 'echarts'
    export default {
      data() {
        return {
          
        }
      },
      mounted() {
        this.getEchartData()
        this.getEchartData1()
        this.getEchartData2() 
  
      },
      methods: {
        getEchartData() {
          const chart = this.$refs.chart
          if (chart) {
            const myChart = this.$echarts.init(chart)
            const option = { legend: {},
              tooltip: {},
              dataset: {
                source: [
  
                  ['总空间', 512, 73.4+65.2+53.9],
                  ['C盘', 256, 73.4],
                  ['D盘', 128, 65.2],
                  ['E盘', 128, 53.9],
               
                ]
              },
              xAxis: { type: 'category' },
              yAxis: {},
  
              series: [ { type: 'bar' }, { type: 'bar' }]}
            myChart.setOption(option)
            window.addEventListener("resize", function() {
              myChart.resize()
            })
          }
          this.$on('hook:destroyed',()=>{
            window.removeEventListener("resize", function() {
              myChart.resize();
            });
          })
        },
        getEchartData1() {
            var chartDom = document.getElementById('main');
var myChart = echarts.init(chartDom);
var option;

option = {
  series: [
    {
      type: 'gauge',
      axisLine: {
        lineStyle: {
          width: 30,
          color: [
            [0.3, '#67e0e3'],
            [0.7, '#37a2da'],
            [1, '#fd666d']
          ]
        }
      },
      pointer: {
        itemStyle: {
          color: 'auto'
        }
      },
      axisTick: {
        distance: -30,
        length: 8,
        lineStyle: {
          color: '#fff',
          width: 2
        }
      },
      splitLine: {
        distance: -30,
        length: 30,
        lineStyle: {
          color: '#fff',
          width: 4
        }
      },
      axisLabel: {
        color: 'auto',
        distance: 40,
        fontSize: 20
      },
      detail: {
        valueAnimation: true,
        formatter: '{value} %',
        color: 'auto'
      },
      data: [
        {
          value: 70
        }
      ]
    }
  ]
};
setInterval(function () {
  myChart.setOption({
    series: [
      {
        data: [
          {
            value: +(Math.random() * 100).toFixed(2)
          }
        ]
      }
    ]
  });
}, 2000);

myChart.setOption(option);
        },  getEchartData2() {
            var chartDom = document.getElementById('main2');
var myChart = echarts.init(chartDom);
var option;

option = {
  series: [
    {
      type: 'gauge',
      axisLine: {
        lineStyle: {
          width: 30,
          color: [
            [0.3, '#67e0e3'],
            [0.7, '#37a2da'],
            [1, '#fd666d']
          ]
        }
      },
      pointer: {
        itemStyle: {
          color: 'auto'
        }
      },
      axisTick: {
        distance: -30,
        length: 8,
        lineStyle: {
          color: '#fff',
          width: 2
        }
      },
      splitLine: {
        distance: -30,
        length: 30,
        lineStyle: {
          color: '#fff',
          width: 4
        }
      },
      axisLabel: {
        color: 'auto',
        distance: 40,
        fontSize: 20
      },
      detail: {
        valueAnimation: true,
        formatter: '{value} %',
        color: 'auto'
      },
      data: [
        {
          value: 70
        }
      ]
    }
  ]
};
setInterval(function () {
  myChart.setOption({
    series: [
      {
        data: [
          {
            value: +(Math.random() * 100).toFixed(2)
          }
        ]
      }
    ]
  });
}, 2000);

myChart.setOption(option);
        }
       
   
      },
      created() {
      }
    }
  </script>
  
  
  
  