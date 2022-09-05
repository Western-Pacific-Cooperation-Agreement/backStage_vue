
<template>
    <div>
    <el-card>
    <h1 style="text-align:center">服务器地图位置信息</h1>
    <div class="bmap" id="bmap" ref="bmap" style="width: 100%;height: 500px;"></div>
    </el-card>
    <el-card>
    <h1 style="text-align:center">服务器列表</h1>
    <el-table
    :data="tableData"
    border
    style="width: 100%">
    <el-table-column
      fixed
      prop="date"
      label="序号"
      width="150">
    </el-table-column>
    <el-table-column
      prop="name"
      label="姓名"
      width="120">
    </el-table-column>
    <el-table-column
      prop="province"
      label="省份"
      width="120">
    </el-table-column>
    <el-table-column
      prop="city"
      label="市区"
      width="120">
    </el-table-column>
    <el-table-column
      prop="address"
      label="地址"
      width="300">
    </el-table-column>
    <el-table-column
      prop="zip"
      label="邮编"
      width="120">
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width="300">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small">查看服务器位置</el-button>
        <el-button type="text" size="small">编辑</el-button>
      </template>
    </el-table-column>
  </el-table>
    </el-card>
    </div>
  </template>
  
  <script>
  // 这个必须引入
  import 'echarts/extension/bmap/bmap'
  
  export default {
    data(){
        return {
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-04',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1517 弄',
          zip: 200333
        }, {
          date: '2016-05-01',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1519 弄',
          zip: 200333
        }, {
          date: '2016-05-03',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1516 弄',
          zip: 200333
        }]
      }
    
    },
    name: 'BmapScatter',
    mounted () {
      this.initBmap()
    },
    methods: {
      initBmap () {
        const myChart = this.$echarts.init(this.$refs.bmap)


        console.log("加载中")
var option;

var data = [
  { name: '厦门理工集美校区', value: 100 },
  { name: '厦门理工思明校区', value: 100 },
  { name: '厦门理工厦软校区', value: 100 }
];
var geoCoordMap = {
  厦门理工集美校区: [118.093221, 24.630356],
  厦门理工思明校区: [118.09682, 24.444742],
  厦门理工厦软校区: [118.080766, 24.622277]
};
var convertData = function (data) {
  var res = [];
  for (var i = 0; i < data.length; i++) {
    var geoCoord = geoCoordMap[data[i].name];
    if (geoCoord) {
      res.push({
        name: data[i].name,
        value: geoCoord.concat(data[i].value)
      });
    }
  }
  return res;
};
function renderItem(params, api) {
  var coords = [
    [118.080766, 24.622277],
    [118.093221, 24.630356],
    [118.09682, 24.444742]
  ];
  var points = [];
  for (var i = 0; i < coords.length; i++) {
    points.push(api.coord(coords[i]));
  }
  var color = api.visual('color');
  return {
    type: 'polygon',
    shape: {
      points: echarts.graphic.clipPointsByRect(points, {
        x: params.coordSys.x,
        y: params.coordSys.y,
        width: params.coordSys.width,
        height: params.coordSys.height
      })
    },
    style: api.style({
      fill: color,
      stroke: echarts.color.lift(color)
    })
  };
}



var option = {
  backgroundColor: 'transparent',
 
  tooltip: {
    trigger: 'item'
  },
  bmap: {
    key: 'y4A1ynDvXtj9TofQ1XMCu5Z0XhnKKqta',
    center: [104.114129, 37.550339], // 当前视角中心位置的坐标
    zoom: 5,
    roam: true,
    mapStyle: {
    
    }
  },
  series: [  {
      name: 'pm2.5',
      type: 'scatter',
      coordinateSystem: 'bmap',
      data: convertData(data),
      encode: {
        value: 2
      },
      symbolSize: function (val) {
        return val[2] / 10;
      },
      label: {
        formatter: '{b}',
        position: 'right'
      },
      itemStyle: {
        color: '#ddb926'
      },
      emphasis: {
        label: {
          show: true
        }
      }
    },
    {
      name: 'Top 5',
      type: 'effectScatter',
      coordinateSystem: 'bmap',
      data: convertData(
        data
          .sort(function (a, b) {
            return b.value - a.value;
          })
          .slice(0, 6)
      ),
      encode: {
        value: 2
      },
      symbolSize: function (val) {
        return val[2] / 10;
      },
      showEffectOn: 'emphasis',
      rippleEffect: {
        brushType: 'stroke'
      },
      hoverAnimation: true,
      label: {
        formatter: '{b}',
        position: 'right',
        show: true
      },
      itemStyle: {
        color: '#f4e925',
        shadowBlur: 10,
        shadowColor: '#333'
      },
      zlevel: 1
    },
    {
      type: 'custom',
      coordinateSystem: 'bmap',
      renderItem: renderItem,
      itemStyle: {
        opacity: 0.5
      },
      animation: false,
      silent: true,
      data: [0],
      z: -10
    }
    
  ]
}




        myChart.setOption(option)
      }
    }
  }
  </script>




<!-- <template>
  <div>   
    <el-card>
        <div id="main">1111111111111</div>
    </el-card>
</div>
</template>
<script src="echarts-bmap.js"></script>
<script>
import {loadBMap } from '@/js/map.js'
import * as echarts from 'echarts';
require('echarts/extension/bmap/bmap');
// 请确保在引入百度地图扩展之前已经引入百度地图 JS API 脚本并成功加载
// https://api.map.baidu.com/api?v=3.0&ak=y4A1ynDvXtj9TofQ1XMCu5Z0XhnKKqta




export default {
data(){
    return{

    }
},
methods:{
    getMap(){
console.log("加载中")
var chartDom = document.getElementById('main');
var myChart = echarts.init(chartDom, null, {
  renderer: 'svg'
});
var option;

var data = [
  { name: '厦门理工集美校区', value: 100 },
  { name: '厦门理工思明校区', value: 100 },
  { name: '厦门理工厦软校区', value: 100 }
];
var geoCoordMap = {
  厦门理工集美校区: [118.093221, 24.630356],
  厦门理工思明校区: [118.09682, 24.444742],
  厦门理工厦软校区: [118.080766, 24.622277]
};
var convertData = function (data) {
  var res = [];
  for (var i = 0; i < data.length; i++) {
    var geoCoord = geoCoordMap[data[i].name];
    if (geoCoord) {
      res.push({
        name: data[i].name,
        value: geoCoord.concat(data[i].value)
      });
    }
  }
  return res;
};
function renderItem(params, api) {
  var coords = [
    [118.080766, 24.622277],
    [118.093221, 24.630356],
    [118.09682, 24.444742]
  ];
  var points = [];
  for (var i = 0; i < coords.length; i++) {
    points.push(api.coord(coords[i]));
  }
  var color = api.visual('color');
  return {
    type: 'polygon',
    shape: {
      points: echarts.graphic.clipPointsByRect(points, {
        x: params.coordSys.x,
        y: params.coordSys.y,
        width: params.coordSys.width,
        height: params.coordSys.height
      })
    },
    style: api.style({
      fill: color,
      stroke: echarts.color.lift(color)
    })
  };
}
option = {
  backgroundColor: 'transparent',
  title: {
    text: '服务器',
    subtext: 'data from PM25.in',
    sublink: 'http://www.pm25.in',
    left: 'center',
    textStyle: {
      color: '#fff'
    }
  },
  tooltip: {
    trigger: 'item'
  },
  bmap: {
    center: [104.114129, 37.550339],
    zoom: 5,
    roam: true,
    mapStyle: {
      styleJson: [
        {
          featureType: 'water',
          elementType: 'all',
          stylers: {
            color: '#044161'
          }
        },
        {
          featureType: 'land',
          elementType: 'all',
          stylers: {
            color: '#004981'
          }
        },
        {
          featureType: 'boundary',
          elementType: 'geometry',
          stylers: {
            color: '#064f85'
          }
        },
        {
          featureType: 'railway',
          elementType: 'all',
          stylers: {
            visibility: 'off'
          }
        },
        {
          featureType: 'highway',
          elementType: 'geometry',
          stylers: {
            color: '#004981'
          }
        },
        {
          featureType: 'highway',
          elementType: 'geometry.fill',
          stylers: {
            color: '#005b96',
            lightness: 1
          }
        },
        {
          featureType: 'highway',
          elementType: 'labels',
          stylers: {
            visibility: 'off'
          }
        },
        {
          featureType: 'arterial',
          elementType: 'geometry',
          stylers: {
            color: '#004981'
          }
        },
        {
          featureType: 'arterial',
          elementType: 'geometry.fill',
          stylers: {
            color: '#00508b'
          }
        },
        {
          featureType: 'poi',
          elementType: 'all',
          stylers: {
            visibility: 'off'
          }
        },
        {
          featureType: 'green',
          elementType: 'all',
          stylers: {
            color: '#056197',
            visibility: 'off'
          }
        },
        {
          featureType: 'subway',
          elementType: 'all',
          stylers: {
            visibility: 'off'
          }
        },
        {
          featureType: 'manmade',
          elementType: 'all',
          stylers: {
            visibility: 'off'
          }
        },
        {
          featureType: 'local',
          elementType: 'all',
          stylers: {
            visibility: 'off'
          }
        },
        {
          featureType: 'arterial',
          elementType: 'labels',
          stylers: {
            visibility: 'off'
          }
        },
        {
          featureType: 'boundary',
          elementType: 'geometry.fill',
          stylers: {
            color: '#029fd4'
          }
        },
        {
          featureType: 'building',
          elementType: 'all',
          stylers: {
            color: '#1a5787'
          }
        },
        {
          featureType: 'label',
          elementType: 'all',
          stylers: {
            visibility: 'off'
          }
        }
      ]
    }
  },
  series: [
    {
      name: 'pm2.5',
      type: 'scatter',
      coordinateSystem: 'bmap',
      data: convertData(data),
      encode: {
        value: 2
      },
      symbolSize: function (val) {
        return val[2] / 10;
      },
      label: {
        formatter: '{b}',
        position: 'right'
      },
      itemStyle: {
        color: '#ddb926'
      },
      emphasis: {
        label: {
          show: true
        }
      }
    },
    {
      name: 'Top 5',
      type: 'effectScatter',
      coordinateSystem: 'bmap',
      data: convertData(
        data
          .sort(function (a, b) {
            return b.value - a.value;
          })
          .slice(0, 6)
      ),
      encode: {
        value: 2
      },
      symbolSize: function (val) {
        return val[2] / 10;
      },
      showEffectOn: 'emphasis',
      rippleEffect: {
        brushType: 'stroke'
      },
      hoverAnimation: true,
      label: {
        formatter: '{b}',
        position: 'right',
        show: true
      },
      itemStyle: {
        color: '#f4e925',
        shadowBlur: 10,
        shadowColor: '#333'
      },
      zlevel: 1
    },
    {
      type: 'custom',
      coordinateSystem: 'bmap',
      renderItem: renderItem,
      itemStyle: {
        opacity: 0.5
      },
      animation: false,
      silent: true,
      data: [0],
      z: -10
    }
  ]
};
 myChart.setOption(option);
    }
},
created(){

},

mounted(){
    loadBMap("y4A1ynDvXtj9TofQ1XMCu5Z0XhnKKqta")
	   	.then(() => {
	   		// 配置option
               this.getMap();
		})
 
}


}
</script>

<style scoped>

</style> -->
