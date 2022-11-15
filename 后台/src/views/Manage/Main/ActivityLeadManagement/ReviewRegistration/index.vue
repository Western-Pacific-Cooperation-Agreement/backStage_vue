<template>
	<div>
    <h1>审核报名</h1>
	<el-form :inline="true">
			<el-form-item>
				<el-input
						v-model="searchForm.username"
						placeholder="用户名"
						clearable
				>
				</el-input>
			</el-form-item>

			<el-form-item>
				<el-button @click="getUserList">搜索</el-button>
			</el-form-item>

			<el-form-item>
				<el-button type="primary" @click="dialogVisible = true" v-if="hasAuth('sys:user:save')">新增</el-button>
			</el-form-item>
			<el-form-item>
				<el-popconfirm title="这是确定批量删除吗？" @confirm="delHandle(null)">
					<el-button type="danger" slot="reference" :disabled="delBtlStatu" v-if="hasAuth('sys:user:delete')">批量删除</el-button>
				</el-popconfirm>
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

					label="头像"
					width="50">
				<template slot-scope="scope">
					<el-avatar size="small" :src="scope.row.sysUser.avatar"></el-avatar>
				</template>
			</el-table-column>

			<el-table-column
					prop="sysUser.username"
					label="用户名"
					width="120">
			</el-table-column>
			<el-table-column
					prop="sysUser.roles"
					label="角色名称">


					<template slot-scope="scope">
					<el-tag size="small" type="info" v-for="item in scope.row.sysUser.roles" >
						{{item.roleName}}
					</el-tag>
				
				</template>

			</el-table-column>
			<el-table-column
					prop="sysUser.email"
					label="邮箱">
			</el-table-column>
			<el-table-column
					prop="sysUser.phone"
					label="手机号">
			</el-table-column>

			<el-table-column
					prop="coreUserAct.userActCreateTime"
					width="200"
					label="报名时间"
			>
			</el-table-column>
			<el-table-column
					prop="coreUserAct.userActStatu"
					width="200"
					label="审核状态"
			>
			<template slot-scope="scope">
				<el-tag v-if="scope.row.coreUserAct.userActStatu===0">
          未审核报名
        </el-tag>
        <el-tag  type="success"  v-if="scope.row.coreUserAct.userActStatu===1">
          报名通过
        </el-tag>
        <el-tag  type="danger"  v-if="scope.row.coreUserAct.userActStatu===2">
          报名未通过
        </el-tag>
        <el-tag  type="danger"  v-if="scope.row.coreUserAct.userActStatu===3">
          存档
        </el-tag>
			</template>

			</el-table-column>
			<el-table-column
					prop="coreUserAct.userActReview"
					width="200"
					label="审核回复"
			>
			</el-table-column>
			<el-table-column
					prop="coreUserAct.userActReviewDate"
					width="200"
					label="审核时间"
			>
			</el-table-column>



			<el-table-column
					prop="icon"
					width="100px"
					label="操作">

				<template slot-scope="scope">
					<el-button type="text" @click="editHandle(scope.row.coreUserAct.id)">审核</el-button></template>
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
				title="提示"
				:visible.sync="dialogVisible"
				width="600px"
				:before-close="handleClose">

			<el-form :model="editForm" :rules="editFormRules" ref="editForm">
			

		

				<el-form-item label="审核状态"  prop="userActStatu" label-width="100px">
					<el-radio-group v-model="editForm.userActStatu">
						<el-radio :label="1">通过</el-radio>
						<el-radio :label="2">不通过</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="审核回复" prop="userActReview" label-width="100px">
					<el-input v-model="editForm.userActReview"  autosize></el-input>
				</el-form-item>

			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="resetForm('editForm')">取 消</el-button>
				<el-button type="primary" @click="submitForm('editForm')">确 定</el-button>
			</div>
		</el-dialog>

		
	
	</div>
</template>

<script>
	export default {
		name: "Role",
		data() {
			return {
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
					username: [
						{required: true, message: '请输入用户名称', trigger: 'blur'}
					],
					email: [
						{required: true, message: '请输入邮箱', trigger: 'blur'}
					],
					statu: [
						{required: true, message: '请选择状态', trigger: 'blur'}
					]
				},

				multipleSelection: [],

				roleDialogFormVisible: false,
		
				roleForm: {},
				roleTreeData:  [],
				checkStrictly: true

			}
		},
		created() {
			this.getUserList()

			this.$axios.get("/sys/role/list").then(res => {
				console.log(res);
				this.roleTreeData = res.data.data.records
			})
		},
		methods: {
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
				this.getUserList()
			},
			handleCurrentChange(val) {
				console.log(`当前页: ${val}`);
				this.current = val
				this.getUserList()
			},

			resetForm(formName) {
				this.$refs[formName].resetFields();
				this.dialogVisible = false
				this.editForm = {}
			},
			handleClose() {
				this.resetForm('editForm')
			},

			getUserList() {
				this.$axios.get("/userAct/get/actSignUpByActId/"+this.$route.query.id, {
					params: {
						username: this.searchForm.username,
						current: this.current,
						size: this.size
					}
				}).then(res => {
					console.log("getUserList")
					console.log(res)
					this.tableData = res.data.data.records
					this.size = res.data.data.size
					this.current = res.data.data.current
					this.total = res.data.data.total
				})

			},

			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						this.$axios.post(('/userAct/post/reviewSignUp'), this.editForm ).then(res => {
								this.$message({
									showClose: true,
									message: '恭喜你，操作成功',
									type: 'success',
									duration:1000,
									onClose:() => {
										this.getUserList()
									}
								});

								this.dialogVisible = false
							})
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			editHandle(id) {
				this.$axios.get('/userAct/get/editInfo/' + id).then(res => {
					this.editForm = res.data.data
					this.dialogVisible = true
				})
			},
			delHandle(id) {
				//删除用户
				var ids = []

				if (id) {
					ids.push(id)
				} else {
					this.multipleSelection.forEach(row => {
						ids.push(row.id)
					})
				}

				console.log(ids)

				this.$axios.post("/sys/user/delete", ids).then(res => {
					this.$message({
						showClose: true,
						message: '恭喜你，操作成功',
						type: 'success',
						duration:1000,
						onClose:() => {
							this.getUserList()
						}
					});
				})
			},

			roleHandle (id) {
				//设置了分配角色的时候能够自动导入数据
				this.roleDialogFormVisible = true

				this.$axios.get('/sys/user/info/' + id).then(res => {
					this.roleForm = res.data.data

					let roleIds = []
					res.data.data.roles.forEach(row => {
						roleIds.push(row.id)
					})

					this.$refs.roleTree.setCheckedKeys(roleIds)
				})
			},
			submitRoleHandle(formName) {
				//提交角色分配
				var roleIds = this.$refs.roleTree.getCheckedKeys()

				console.log(roleIds)

				this.$axios.post('/sys/user/role/' + this.roleForm.id, roleIds).then(res => {
					this.$message({
						showClose: true,
						message: '恭喜你，操作成功',
						type: 'success',
						duration:1000,
						onClose:() => {
							
							this.getUserList()
						}
					});

					this.roleDialogFormVisible = false
				})
			},
			
		}
	}
</script>

<style scoped>

	.el-pagination {
		float: right;
		margin-top: 22px;
	}

</style>