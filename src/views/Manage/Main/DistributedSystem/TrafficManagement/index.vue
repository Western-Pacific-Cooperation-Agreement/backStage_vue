

<template>
  <div>
    <h1>流量分布</h1>
    <div ref="chart" style="width:100%;height:376px"></div>
    <div ref="chart1" id="chart1" style="width:100%;height:376px"></div>
  </div>

</template>

<script>

import * as echarts from 'echarts'  
import $ from 'jquery'

  export default {
    data() {
      return {
          
        }
    },
    mounted() {
      this.getEchartData()
      this.getEchartData1()

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

                ['订单', 43.3, 85.8],
                ['订单1', 83.1, 73.4],
                ['订单2', 86.4, 65.2],
                ['订单3', 72.4, 53.9],
                ['订单4', 82.4, 53.9],
                ['订单5', 42.4, 53.9],
                ['订单6', 72.4, 53.9],
                ['订单7', 72.4, 53.9]
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
        var ROOT_PATH = 'https://echarts.apache.org/examples';
        console.log("yes")
var chartDom = document.getElementById('chart1');
console.log("yes")
var myChart = echarts.init(chartDom);

var option;

myChart.showLoading();

$.getJSON(ROOT_PATH + '/data/asset/data/les-miserables.json', function (graph) {
  myChart.hideLoading();
  option = {
    tooltip: {},
    legend: [
      {
        data: graph.categories.map(function (a) {
          return a.name;
        })
      }
    ],
    series: [
      {
        name: 'Les Miserables',
        type: 'graph',
        layout: 'none',
        data: graph.nodes,
        links: graph.links,
        categories: graph.categories,
        roam: true,
        label: {
          show: true,
          position: 'right',
          formatter: '{b}'
        },
        labelLayout: {
          hideOverlap: true
        },
        scaleLimit: {
          min: 0.4,
          max: 2
        },
        lineStyle: {
          color: 'source',
          curveness: 0.3
        }
      }
    ]
  };
  myChart.setOption(option);
});
      
      
      },
 
    },
    watch: {},
    created() {
    }
  }
</script>



