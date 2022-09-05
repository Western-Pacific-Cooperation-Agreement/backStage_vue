<template>
  <div>
<el-card>
                <ul>
                <li><el-link  :underline="false">
                    积分商城</el-link>
                </li>
                  <li><el-link  :underline="false">
                    活动中心</el-link>
                </li>
                  <li><el-link  :underline="false">
                    社区</el-link>
                </li>
                  <li>
                </li>
                  <li><el-link  :underline="false">
                    个人中心</el-link>
                </li>
        </ul>
</el-card>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.el-card{
    background-color: rgb(30, 30, 30);
    text-align: right;
}
ul li{
    list-style: none;
    display: inline-block;
    padding:0 30px 0 0px;
    line-height: 20px;
    color:white;
    white-space: nowrap;
}
.el-link.el-link--default{
        color:white;
}
div /deep/ .el-card__body{
    padding: 5px;

}

</style>