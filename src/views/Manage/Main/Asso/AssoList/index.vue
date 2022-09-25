
    <template>
      <div>
        <h1>部门列表</h1>
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
				<el-button @click="getRoleListByName">搜索</el-button>
			</el-form-item>

			<el-form-item>
				<el-button type="primary" @click="dialogVisible = true">新增</el-button>
			</el-form-item>
			<el-form-item>
				<el-popconfirm title="这是确定批量删除吗？" @confirm="delHandle(null)">
					<el-button type="danger" slot="reference" :disabled="delBtlStatu">批量删除</el-button>
				</el-popconfirm>
			</el-form-item>
		</el-form>

		<el-table
				ref="multipleTable"
				:data="tableData"
				tooltip-effect="dark"
				style="width: 100%"
				
				stripe
				@selection-change="handleSelectionChange">

			<el-table-column
					type="selection"
					width="55">
			</el-table-column>

			<el-table-column
					prop="assoName"
					label="部门名称"
					width="120">
			</el-table-column>
			<el-table-column
					prop="assotypeId"
					label="部门类型"
					show-overflow-tooltip>
					<template slot-scope="scope">
						<el-tag v-for="item in assoTypeData" v-if="item.id==scope.row.assotypeId">
							{{item.assoTypeName}}
						</el-tag>
					</template>
			</el-table-column>
			
			<el-table-column
					prop="assoNumber"
					label="部门人数"
					show-overflow-tooltip>
			</el-table-column>

			

			
			<el-table-column
					prop="icon"
					label="操作"
					fixed="right">

				<template slot-scope="scope">
					<!-- <el-button type="text" @click="permHandle(scope.row.id)">分配权限</el-button>
					<el-divider direction="vertical"></el-divider> -->

					<el-button type="text" @click="editHandle(scope.row.id)">编辑</el-button>
					<el-divider direction="vertical"></el-divider>

					<template>
						<el-popconfirm title="这是一段内容确定删除吗？" @confirm="delHandle(scope.row.id)">
							<el-button type="text" slot="reference">删除</el-button>
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
				title="提示"
				:visible.sync="dialogVisible"
				width="600px"
				:before-close="handleClose">

			<el-form :model="editForm" :rules="editFormRules" ref="editForm" label-width="100px" class="demo-editForm">

				<el-form-item label="部门名称" prop="assoName" label-width="100px">
					<el-input v-model="editForm.assoName" autocomplete="off"></el-input>
				</el-form-item>

				<!-- <el-form-item label="部门类型" prop="assotypeId" label-width="100px">
					<el-input v-model="editForm.assotypeId" autocomplete="off"></el-input>
				</el-form-item> -->

				<el-form-item label="部门类型" prop="assotypeId" label-width="100px">
					<!-- <el-input v-model="editForm.assotypeId" autocomplete="off"></el-input> -->
					<template>
						<el-select v-model="editForm.assotypeId" placeholder="请选择">
						  <el-option
							v-for="item in assoTypeData"
							:label="item.assoTypeName"
							:value="item.id">
						  </el-option>
						</el-select>
					</template>
					
				</el-form-item>

				
				  
				<el-form-item label="部门人数" prop="assoNumber" label-width="100px">
					<el-input v-model="editForm.assoNumber" autocomplete="off"></el-input>
				</el-form-item>


				<el-form-item>
					<el-button type="primary" @click="submitForm('editForm')">立即创建</el-button>
					<el-button @click="resetForm('editForm')">重置</el-button>
				</el-form-item>
			</el-form>

		</el-dialog>

		<el-dialog
				title="分配权限"
				:visible.sync="permDialogVisible"
				width="600px">

			<el-form :model="permForm">

				<el-tree
						:data="permTreeData"
						show-checkbox
						ref="permTree"
						:default-expand-all=true
						node-key="id"
						:check-strictly=true
						:props="defaultProps">
				</el-tree>

			</el-form>

			<span slot="footer" class="dialog-footer">
			    <el-button @click="permDialogVisible = false">取 消</el-button>
			    <el-button type="primary" @click="submitPermFormHandle('permForm')">确 定</el-button>
			</span>
			

		</el-dialog>

	</div>
</template>

<script>
	import { getCoreAssoList } from '@/api/core_asso';
	import { getCoreAssoTypeList } from '@/api/core_asso_type'

	export default {
		name: "Role",
		data() {
			return {
				choose:[]
				,
				assoTypeData:[],
				searchForm: {
					
				},
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

				permDialogVisible: false,
				permForm: {},
				defaultProps: {
					children: 'children',
					label: 'menuName'
				},
				permTreeData: []
			}
		},
		created() {
			this.getCoreAssoTypeList();

			this.getCoreAssoList()
			this.delCoreAssoById(id)
		},
		methods: {
			getCoreAssoTypeList() {
				getCoreAssoTypeList().then(res => {
					console.log("获得部门类型");
					this.assoTypeData = res.data.data
					console.log(this.assoTypeData)

				})
			},
			getCoreAssoList(){
				getCoreAssoList().then(res=>{
					this.tableData=res.data.data;
				})
			},
			delCoreAssoById(id){
				delCoreAssoById(id).then(
					this.getCoreAssoList
				)
			},

			getRoleListByName(){
				
				if(this.searchForm.name!=null&&this.searchForm.name!=""){
					console.log(111)
					this.$axios.post("/coreAsso/getCoreAssoByName",(this.searchForm.name))
					.then(res=>{
						this.tableData=res.data.data;
					}
					)
				}else{
					console.log(222)
					this.$axios.get("/coreAsso/findAll")
					.then(res=>(
						this.tableData=res.data.data
					))
				}
			},
			// getRoleList() {
			// 	this.$axios.get("/sys/role/list", {
			// 		params: {
			// 			name: this.searchForm.name,
			// 			current: this.current,
			// 			size: this.size
			// 		}
			// 	}).then(res => {
				
			// 		this.tableData = res.data.data.records
			// 		this.size = res.data.data.size
			// 		this.current = res.data.data.current
			// 		this.total = res.data.data.total

			// 		console.log(this.tableData)
			// 	})
			// },
		


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
				this.getRoleList()
			},
			handleCurrentChange(val) {
				console.log(`当前页: ${val}`);
				this.current = val
				this.getRoleList()
			},

			resetForm(formName) {
				this.$refs[formName].resetFields();
				this.dialogVisible = false
				this.editForm = {}
			},
			handleClose() {
				this.resetForm('editForm')
			},

			

			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						this.$axios.post('/coreAsso/' + (this.editForm.id?'updateCoreAsso' : 'addCoreAsso'), this.editForm)
							.then(res => {

								this.$message({
									showClose: true,
									message: '恭喜你，操作成功',
									type: 'success',
									duration:1000,
									onClose:() => {
										this.getCoreAssoList()
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
				this.$axios.get('/coreAsso/getAsso/'+id).then(res => {
					this.editForm = res.data.data
					this.dialogVisible = true

					// this.$message({
					// 	showClose: true,
					// 	message: '恭喜你，操作成功',
					// 	type: 'success',
					// 	duration:1000,
					// 	onClose:() => {
					// 		this.getCoreAssoList()
					// 	}
					// });
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

				console.log(1)
				console.log(ids)

				this.$axios.post("/coreAsso/delById", ids).then(res => {
					this.$message({
						showClose: true,
						message: '恭喜你，操作成功',
						type: 'success',
						duration:1000,
						onClose:() => {
							this.getCoreAssoList()
						}
					});
				})
			},
			permHandle(id) {
				this.permDialogVisible = true

				this.$axios.get("/sys/role/info/" + id).then(res => {

					this.$refs.permTree.setCheckedKeys(res.data.data.menuIds)
					this.permForm = res.data.data
				})
			},

			submitPermFormHandle(formName) {
				var menuIds = this.$refs.permTree.getCheckedKeys()

				console.log(menuIds)

				this.$axios.post('/sys/role/perm/' + this.permForm.id, menuIds).then(res => {
					this.$message({
						showClose: true,
						message: '恭喜你，操作成功',
						type: 'success',
						duration:1000,
						onClose:() => {
							this.getRoleList()
						}
					});
					this.permDialogVisible = false
					this.resetForm(formName)
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

	.el-dropdown-link {
		cursor: pointer;
		color: #409EFF;
	}
	.el-icon-arrow-down {
		font-size: 12px;
	}

</style>