
<template>
	<div>
    <h1>管理我的活动</h1>
	<el-form :inline="true">
			<el-form-item>
				<el-input
						v-model="searchForm.name"
						placeholder="名称"
						clearable
				>
				</el-input>
			</el-form-item>

			<el-form-item>
				<el-button @click="getMyApplyAct">搜索</el-button>
			</el-form-item>

			<el-form-item>
				<el-button type="primary" @click="dialogVisible = true">发起活动申请</el-button>
			</el-form-item>
			<el-form-item>
				<el-popconfirm title="这是确定批量删除吗？" @confirm="delHandle(null)">
					<el-button type="danger" slot="reference" :disabled="delBtlStatu">批量取消活动</el-button>
				</el-popconfirm>
			</el-form-item>

			<el-form-item>
			<el-button type="warning"  :disabled="delBtlStatu">导入</el-button>
			</el-form-item>

			<el-form-item>
				<el-button type="warning"  :disabled="delBtlStatu">导出</el-button>
			</el-form-item>

		</el-form>

		<el-table
				ref="multipleTable"
				:data="tableData"
				tooltip-effect="dark"
				style="width: 100%"
				border
				stripe
				@selection-change="handleSelectionChange">

			<el-table-column
					type="selection"
					width="55">
			</el-table-column>

			<el-table-column
					prop="actName"
					label="活动名称"
					width="120">
			</el-table-column>

			<el-table-column
					prop="id"
					label="活动编码"
					show-overflow-tooltip>
			</el-table-column>

			<el-table-column
					prop="actUrl"
					label="宣传海报"
					width="500"
					>

					<template slot-scope="scope">

						<img :src="scope.row.actUrl" class="image">

					</template>

			</el-table-column>

			<el-table-column
					prop="actNatureId"
					label="活动性质"
					show-overflow-tooltip>
					<template slot-scope="scope">
							<el-tag v-for="item in actActType" v-if="item.id==scope.row.actNatureId">
								{{item.actNatureName}}
							</el-tag>
					</template>
			</el-table-column>
			<el-table-column
					prop="actPlace"
					label="活动区域"
					width="200"
					show-overflow-tooltip>
			</el-table-column><el-table-column
					prop="actStartDate"
					label="活动时间"
					width="200"
					show-overflow-tooltip>
			</el-table-column><el-table-column
					prop="actDuration"
					label="活动时长"
					show-overflow-tooltip>
			</el-table-column>
			<el-table-column
					prop="assoId"
					label="活动部门"
					width="180"
					show-overflow-tooltip>
					<template slot-scope="scope">
							<el-tag v-for="item in actAsso" v-if="item.id==scope.row.assoId">
								{{item.assoName}}
							</el-tag>
					</template>
			</el-table-column>
			<el-table-column
					prop="actObjectId"
					label="活动对象"
					width="180"
					show-overflow-tooltip>

					<template slot-scope="scope">
							<el-tag v-for="item in actObject" v-if="item.id==scope.row.assoId">
								{{item.objectName}}
							</el-tag>
					</template>
			</el-table-column>
			<el-table-column
					prop="actNumber"
					label="活动人数"
					width="300"
					show-overflow-tooltip>
					<template slot-scope="scope">
						<el-tag  v-if="0==scope.row.assoId">
							100人以下
						</el-tag>
						<el-tag  v-if="1==scope.row.assoId">
							100-999人
						</el-tag>
						<el-tag  v-if="2==scope.row.assoId">
							1000人以上
						</el-tag>
					
					</template>
			</el-table-column>
			<el-table-column
					prop="actAim"
					label="活动目的"
					width="300"
					>
			</el-table-column>
			
			<el-table-column
					prop="actProcess"
					label="活动流程"
					width="300"
					>
			</el-table-column>
			<el-table-column
					prop="actMessage"
					label="活动简介"
					width="300"
					>
			</el-table-column>
			<el-table-column
					prop="actWarn"
					label="注意事项"
					width="300"
					>
			</el-table-column>
			<el-table-column
					prop="actIntegral"
					label="活动积分"
					show-overflow-tooltip>
			</el-table-column>
			<el-table-column
					prop="actReviewerDate"
					label="审核日期"
					width="200"
					show-overflow-tooltip>
			</el-table-column>
			<el-table-column
					prop="actReply"
					label="审核回复"
					width="200"
					>
			</el-table-column>
			<el-table-column
			
					prop="actReviewerStaus"
					label="状态"
					width="150"
					>
				<template v-slot="scope">
					 <el-tag type="warning" v-if="scope.row.actReviewerStaus==0">活动未审核</el-tag>
       				 <el-tag type="danger" v-if="scope.row.actReviewerStaus==1">报名中</el-tag>
       				 <el-tag type="info" v-if="scope.row.actReviewerStaus==2">活动结束</el-tag>
       				 <el-tag type="success" v-if="scope.row.actReviewerStaus==3">存档</el-tag>
					 <el-tag type="info" v-if="scope.row.actReviewerStaus==4">审核失败</el-tag>
				</template>
			</el-table-column>
			<el-table-column
			width="400"
			fixed="right"
					prop="icon"
					label="操作">

				<template slot-scope="scope">

					<el-button type="text" @click="editHandle(scope.row.id)">编辑</el-button>
					<el-divider direction="vertical"></el-divider>
					<el-button type="text" @click="managgeAct(scope.row.id)">管理报名</el-button>
					
					<el-divider direction="vertical"></el-divider>
					<el-button type="text" @click="editHandle(scope.row.id)">打印活动申请表</el-button>
					<el-divider direction="vertical"></el-divider>

					<template>
						<el-popconfirm title="这是一段内容确定删除吗？" @confirm="delHandle(scope.row.id)">
							<el-button type="text" slot="reference">取消活动</el-button>
						</el-popconfirm>
					</template>

				</template>
			</el-table-column>

		</el-table>


		<el-pagination
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
				layout="total, sizes, prev, pager, next, jumper"
				:page-sizes="[10, 20, 50, 100]"
				:current-page="current"
				:page-size="size"
				:total="total">
		</el-pagination>


		<!--新增对话框-->
		<el-dialog
				title="发起新的活动"
				:visible.sync="dialogVisible"
				width="800px"
				:before-close="handleClose">

			<el-form :model="editForm" :rules="editFormRules" ref="editForm" label-width="100px" class="demo-editForm">

				<el-form-item label="活动名称" prop="actName" label-width="100px">
					<el-input v-model="editForm.actName" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="宣传海报" prop="actUrl" label-width="100px">
					<el-input v-model="editForm.actUrl" autocomplete="off"></el-input>
				
				</el-form-item>
				
				<el-form-item label="活动性质" prop="actNatureId" label-width="100px">
					<el-select v-model="editForm.actNatureId" placeholder="请选择活动性质">
						<el-option v-for="item in actActType" :key="item.id" :label="item.actNatureName" :value="item.id">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="活动区域" prop="actPlace" label-width="100px">
					<el-input v-model="editForm.actPlace" type="textarea" autosize ></el-input>
				</el-form-item>


				<el-form-item   label="活动开始时间"   prop="actStartDate"   label-width="100px">
		
				<el-date-picker v-model="editForm.actStartDate" type="datetime" placeholder="选择日期时间"> </el-date-picker>
	</el-form-item>

	<el-form-item label="活动时长" prop="actDuration" label-width="100px">
					<el-input v-model="editForm.actDuration"  type="textarea" autosize ></el-input>
				</el-form-item>
			
				<el-form-item label="活动部门" prop="assoId" label-width="100px">
					<el-select v-model="editForm.assoId" placeholder="请选择活动部门">
						<el-option
						v-for="item in actAsso"
						:key="item.id"
						:label="item.assoName"
						:value="item.id">
						</el-option>
					</el-select>
				</el-form-item>

				<el-form-item label="活动对象" prop="actObjectId" label-width="100px">
						<el-select v-model="editForm.actObjectId" placeholder="请选择活动部门">
						<el-option
						v-for="item in actObject"
						:key="item.id"
						:label="item.objectName"
						:value="item.id">
						</el-option>
					</el-select>


				</el-form-item>
					<el-form-item label="活动人数" prop="actNumber" label-width="100px">
						<el-select v-model="editForm.actNumber" placeholder="请选择活动人数">
						<el-option
						v-for="item in actNumber"
						:key="item.id"
						:label="item.name"
						:value="item.id">
						</el-option>
					</el-select>
				</el-form-item>
			<el-form-item label="活动目的" prop="actAim" label-width="100px">
				<el-input v-model="editForm.actAim" type="textarea" autosize></el-input>
			</el-form-item>
				<el-form-item label="活动流程" prop="actProcess" label-width="100px">
					<el-input v-model="editForm.actProcess" type="textarea" autosize></el-input>
				</el-form-item>
				<el-form-item label="活动简介" prop="actMessage" label-width="100px">
					<el-input v-model="editForm.actMessage" type="textarea" autosize></el-input>
				</el-form-item>
				<el-form-item label="注意事项" prop="actWarn" label-width="100px">
					<el-input v-model="editForm.actWarn" type="textarea" autosize></el-input>
				</el-form-item>
				<el-form-item label="活动积分" prop="actIntegral" label-width="100px">
					<el-input v-model="editForm.actIntegral" type="textarea" autosize  ></el-input>
				</el-form-item>

				<el-form-item>
					<el-button type="primary" @click="submitForm('editForm')">立即创建</el-button>
					<el-button @click="resetForm('editForm')">重置</el-button>
				</el-form-item>
			</el-form>

		</el-dialog>
	</div>
</template>

<script>
	import {getMyApplyAct} from '@/api/person'
	import {getActAsso,getActObject,getActType,editAct} from '@/api/act'
	export default {
		name: "Role",
		data() {
			return{
				actIntegral:[{
					id:10,
				},{
					id:20,
				},{
					id:30,
				}],
				actNumber:[{
					id:0,
					name:"100人以下"
				},{
					id:1,
					name:"100人-999人"

				},{
					id:2,
					name:"1000人以上"

				}
				],
				actAsso:[],
				actObject:[],
				actActType:[],
				searchForm: {},
				delBtlStatu: true,
				total: 0,
				size: 10,
				current: 1,
				dialogVisible: false,
				editForm: {

				},

				tableData: [],

				editFormRules: {
					name: [
						{required: true, message: '请输入角色名称', trigger: 'blur'}
					],
					code: [
						{required: true, message: '请输入唯一编码', trigger: 'blur'}
					],
					statu: [
						{required: true, message: '请选择状态', trigger: 'blur'}
					]
				},
				multipleSelection: [],
			}
			},
			created() {
				this.getActAsso()
				this.getActObject()
				this.getActType()
				this.getMyApplyAct()
				console.log("获得角色")
			},
			methods: {
				getActAsso(){
					getActAsso().then(res=>{
						console.log("获得活动部门")
						console.log(res)
						this.actAsso=res.data.data

					})

				},getActObject(){
					getActObject().then(res=>{
						console.log("获得活动对象")
						console.log(res)
						this.actObject=res.data.data
				

					})

				},getActType(){
					getActType().then(res=>{
						console.log("获得活动类型")
						console.log(res)
						this.actActType=res.data.data
					})
				},
				toggleSelection(rows) {
					if (rows) {
						rows.forEach(row => {
							this.$refs.multipleTable.toggleRowSelection(row);
						});
					} else {
						this.$refs.multipleTable.clearSelection();
					}
				},
				handleSelectionChange(val) {
					console.log("勾选")
					console.log(val)
					this.multipleSelection = val;

					this.delBtlStatu = val.length == 0
				},
				handleSizeChange(val) {
					console.log(`每页 ${val} 条`);
					this.size = val
					this.getMyApplyAct()
				},
				handleCurrentChange(val) {
					console.log(`当前页: ${val}`);
					this.current = val
					this.getMyApplyAct()

				},
				resetForm(formName) {
					this.$refs[formName].resetFields();
					this.dialogVisible = false
					this.editForm = {}
				},
				handleClose() {
					this.resetForm('editForm')
				},
				getMyApplyAct(){
					getMyApplyAct({
						params: {
							name: this.searchForm.name,
							current: this.current,
							size: this.size
						}
					}).then(res => {
						console.log("获得我发起的活动")
						console.log(res)
						this.tableData = res.data.data.records
						this.size = res.data.data.size
						this.current = res.data.data.current
						this.total = res.data.data.total

						console.log(this.tableData)
					})
				},
				submitForm(formName) {
					this.$refs[formName].validate((valid) => {
						if (valid) {
							this.$axios.post('/act/post/' + (this.editForm.id?'updateApply' : 'saveApply'), this.editForm)
								.then(res => {

									this.$message({
										showClose: true,
										message: '恭喜你，操作成功',
										type: 'success',
										duration:1000,
										onClose:() => {
											this.getMyApplyAct()
										}
									});
									this.dialogVisible = false
									this.resetForm(formName)
								})
						} else {
							console.log('error submit!!');
							return false;
						}
					});
				},

				editHandle(id) {
					editAct(id).then(res => {
						this.editForm = res.data.data
						this.dialogVisible = true
					})
				},

				delHandle(id) {
					var ids = []

					if (id) {
						ids.push(id)
					} else {
						this.multipleSelection.forEach(row => {
							ids.push(row.id)
						})
					}

					console.log(ids)

					this.$axios.post("/act/post/deleteApply", ids).then(res => {
						this.$message({
							showClose: true,
							message: '恭喜你，操作成功',
							type: 'success',
							duration:1000,
							onClose:() => {
								this.getMyApplyAct()
							}
						});
					})
				}
			}
		}
</script>

<style scoped>
	.el-pagination {
		float: right;
		margin-top: 22px;
	}
</style>