<template>
    <div>
      <div style="margin: 10px 0">
        <el-input style="width: 200px" placeholder="请输入名称" suffix-icon="el-icon-search" v-model="name"></el-input>
        <el-button class="ml-5" type="primary" @click="load">搜索</el-button>
        <el-button type="warning" @click="reset">备份当前数据</el-button>
        <el-button @click="dialogFormVisible = true; getBackupTime()">定时备份</el-button>
        <span>下一次备份时间：{{count}}</span>
      </div>
      <div style="margin: 10px 0">
        <el-upload :action="'http://' + serverIp + ':18888/backup/upload'" :show-file-list="false"
                   :on-success="handleFileUploadSuccess" style="display: inline-block">
          <el-button type="primary" class="ml-5">上传文件 <i class="el-icon-top"></i></el-button>
        </el-upload>
        <el-popconfirm
            class="ml-5"
            confirm-button-text='确定'
            cancel-button-text='我再想想'
            icon="el-icon-info"
            icon-color="red"
            title="您确定批量删除这些数据吗？"
            @confirm="delBatch"
        >
          <el-button type="danger" slot="reference">批量删除 <i class="el-icon-remove-outline"></i></el-button>
        </el-popconfirm>
  
      </div>
      <el-table :data="tableData" border stripe :header-cell-class-name="'headerBg'"
                @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="id" label="ID" width="80"></el-table-column>
        <el-table-column prop="name" label="文件名称"></el-table-column>
        <el-table-column prop="type" label="文件类型"></el-table-column>
        <el-table-column prop="createTime" label="创建时间"></el-table-column>

        <el-table-column label="下载">
          <template slot-scope="scope">
            <el-button type="primary" @click="download(scope.row.url)">下载</el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="300" align="center">
          <template slot-scope="scope">
            <el-popconfirm
                class="ml-5"
                confirm-button-text='确定'
                cancel-button-text='我再想想'
                icon="el-icon-info"
                icon-color="red"
                title="您确定删除吗？"
                @confirm="del(scope.row.id)"
            >
            <el-button type="danger" slot="reference">删除 <i class="el-icon-remove-outline"></i></el-button>
            
            </el-popconfirm>
            <el-divider direction="vertical"></el-divider>
            <el-popconfirm
                class="ml-5"
                confirm-button-text='确定'
                cancel-button-text='我再想想'
                icon="el-icon-info"
                icon-color="red"
                title="您确定还原吗？"
                @confirm="restore(scope.row.name)"
            >
            <el-button type="success" slot="reference">还原 <i class="	el-icon-refresh-left"></i></el-button>
        </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
  
      <div style="padding: 10px 0">
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageNum"
            :page-sizes="[2, 5, 10, 20]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
        </el-pagination>
      </div>

<el-dialog title="定时备份" :visible.sync="dialogFormVisible">
  <el-form :model="form">
    <el-form-item label="备份时间（s）" :label-width="180">
      <el-input v-model="backupTime" autocomplete="off"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogFormVisible = false;setBackupTime()">确 定</el-button>
  </div>
</el-dialog>
    </div>
  </template>
  
  <script>
  export default {
    name: "File",
    data() {
      return {
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        dialogFormVisible: false,
        serverIp: 'localhost',
        tableData: [],
        name: '',
        multipleSelection: [],
        pageNum: 1,
        pageSize: 10,
        total: 0,
        count: '', //倒计时
        seconds: 999999999 ,// 10天的秒数864000
        backupTime:"",
        timeIs:false,
      }
    },
    mounted() {
    },
    created() {
      this.load()
      this.getBackupTime()
      this.backupByTime()
  
    },
    methods: {
        //获得过期时间
        backupByTime(){
        this.$axios.get("/backup/getTime").then(res => {
            this.seconds=res.data.data;
        })
        },
        //获得备份时间
         getBackupTime(){
        this.$axios.get("/backup/getBackupTime").then(res => {
            console.log("  //获得备份时间")
            console.log(res)
            this.backupTime=res.data.data;
            var self=this;
            if(this.backupTime!=null&&this.seconds>40&&!this.timeIs&& this.seconds>10){
                self.Time() //调用定时器
                self.timeIs=true
                this. backupByTime()
            }
        })
        },
        //设置备份时间
        setBackupTime(){
        this.$axios.post("/backup/setBackupTime/"+this.backupTime).then(res => {
            this.backupByTime(); 
        })
        },
      load() {
        this.$axios.get("/backup/page", {
          params: {
            pageNum: this.pageNum,
            pageSize: this.pageSize,
            name: this.name,
          }
        }).then(res => {
             console.log("res");
             console.log(res);
          this.tableData = res.data.data.records
          this.total = res.data.data.total
  
        })
      },
      changeEnable(row) {
        this.$axios.post("/backup/update", row).then(res => {
            this.$message.success("操作成功")
        })
      },
      del(id) {
        this.$axios.delete("/backup/" + id).then(res => {
            this.$message.success("删除成功")
            this.load()
        })
      },
      handleSelectionChange(val) {
        console.log(val)
        this.multipleSelection = val
      },
      delBatch() {
        let ids = this.multipleSelection.map(v => v.id)  // [{}, {}, {}] => [1,2,3]
        this.$axios.post("/backup/del/batch", ids).then(res => {
            this.$message.success("批量删除成功")
            this.load()
         
        })
      },
      reset() {
        this.name = ""
        this.$axios.post("/backup/doBackup").then(res => {
            
            this.$notify({
                title: '成功',
             message: '备份成功',
             type: 'success'
            });
            this.load()
         
        })
        
        this.load()
      },
      restore(name){
        this.$axios.post("/backup/restore",name).then(res => {
            this.$notify({
                title: '成功',
             message: '恭喜你还原成功',
             type: 'success'
            });
            this.load()
         
        })
      },
      handleSizeChange(pageSize) {
        console.log(pageSize)
        this.pageSize = pageSize
        this.load()
      },
      handleCurrentChange(pageNum) {
        console.log(pageNum)
        this.pageNum = pageNum
        this.load()
      },
      handleFileUploadSuccess(res) {
        console.log(res)
        this.$message.success("上传成功")
        this.load()
      },
      download(url) {
        let Base64 = require('js-base64').Base64;

        window.open(url)
      },
      preview(url) {
        let Base64 = require('js-base64').Base64;
        // window.open('https://file.keking.cn/onlinePreview?url=' + encodeURIComponent(((((url))))))
        // window.open('http://file.keking.cn/onlinePreview?url='+encodeURIComponent(Base64.encode(url)));
        console.log(url)
        window.open('https://file.keking.cn/onlinePreview?url=' + encodeURIComponent(window.btoa(encodeURI(url))))

      },
    // 天 时 分 秒 格式化函数
    countDown() {
        let d = parseInt(this.seconds / (24 * 60 * 60))
        d = d < 10 ? "0" + d : d
        let h = parseInt(this.seconds / (60 * 60) % 24);
        h = h < 10 ? "0" + h : h
        let m = parseInt(this.seconds / 60 % 60);
        m = m < 10 ? "0" + m : m
        let s = parseInt(this.seconds % 60);
        s = s < 10 ? "0" + s : s
        this.count = d + '天' + h + '时' + m + '分' + s + '秒'
    },
    //定时器没过1秒参数减1
    Time() {
        setInterval(() => {
            this.seconds -= 1
            this.countDown()
            if(this.seconds<=0){
               
                 this.setBackupTime()
                this.reset()
            }

        }, 1000)
    }
  }
}
  </script>
  
  <style scoped>
  
  </style>
  