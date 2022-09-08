<template>
	<div>

		<el-form :inline="true">
			<el-form-item>
				<el-button type="primary" @click="dialogVisible = true">新增</el-button>
			</el-form-item>
		</el-form>

		<el-table
				:data="tableData"
				style="width: 100%;margin-bottom: 20px;"
				row-key="id"
				border
				stripe
				default-expand-all
				:tree-props="{children: 'children', hasChildren: 'hasChildren'}">

			<el-table-column
					prop="menuName"
					label="名称"
					sortable
					width="180">
			</el-table-column>
			<el-table-column
					prop="menuPerms"
					label="权限编码"
					sortable
					width="180">
			</el-table-column>

			<el-table-column
					prop="menuIcon"
					label="图标">
			</el-table-column>

			<el-table-column
					prop="menuType"
					label="类型">
				<template slot-scope="scope">
					<el-tag size="small" v-if="scope.row.menuType === 0">目录</el-tag>
					<el-tag size="small" v-else-if="scope.row.menuType === 1" type="success">菜单</el-tag>
					<el-tag size="small" v-else-if="scope.row.menuType === 2" type="info">按钮</el-tag>
				</template>

			</el-table-column>

			<el-table-column
					prop="menuPath"
					label="菜单URL">
			</el-table-column>

			<el-table-column
					prop="menuComponent"
					label="菜单组件">
			</el-table-column>

			<el-table-column
					prop="menuOrdernum"
					label="排序号">
			</el-table-column>
			<el-table-column
					prop="menuStatu"
					label="状态">
				<template slot-scope="scope">
					<el-tag size="small" v-if="scope.row.menuStatu === 1" type="success">正常</el-tag>
					<el-tag size="small" v-else-if="scope.row.menuStatu === 0" type="danger">禁用</el-tag>
				</template>

			</el-table-column>
			<el-table-column
					prop="icon"
					label="操作">

				<template slot-scope="scope">
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


		<!--新增对话框-->
		<el-dialog
				title="提示"
				:visible.sync="dialogVisible"
				width="600px"
				:before-close="handleClose">

			<el-form :model="editForm" :rules="editFormRules" ref="editForm" label-width="100px" class="demo-editForm">

				<el-form-item label="上级菜单" prop="parentId">
					<el-select v-model="editForm.parentId" placeholder="请选择上级菜单">
						<template v-for="item in tableData">
							<el-option :label="item.menuName" :value="item.id"></el-option>
							<template v-for="child in item.children">
								<el-option :label="child.menuName" :value="child.id">
									<span>{{ " - " + child.menuName }}</span>
								</el-option>
							</template>
						</template>
					</el-select>
				</el-form-item>

				<el-form-item label="菜单名称" prop="menuName" label-width="100px">
					<el-input v-model="editForm.menuName" autocomplete="off"></el-input>
				</el-form-item>

				<el-form-item label="权限编码" prop="menuPerms" label-width="100px">
					<el-input v-model="editForm.menuPerms" autocomplete="off"></el-input>
				</el-form-item>

				<el-form-item label="图标" prop="menuIcon" label-width="100px">
					<el-input v-model="editForm.menuIcon" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="菜单URL" prop="menuPath" label-width="100px">
					<el-input v-model="editForm.menuPath" autocomplete="off"></el-input>
				</el-form-item>

				<el-form-item label="菜单组件" prop="menuComponent" label-width="100px">
					<el-input v-model="editForm.menuComponent" autocomplete="off"></el-input>
				</el-form-item>

				<el-form-item label="类型" prop="menuType" label-width="100px">
					<el-radio-group v-model="editForm.menuType">
						<el-radio :label=0>目录</el-radio>
						<el-radio :label=1>菜单</el-radio>
						<el-radio :label=2>按钮</el-radio>
					</el-radio-group>
				</el-form-item>

				<el-form-item label="状态" prop="menuStatu" label-width="100px">
					<el-radio-group v-model="editForm.menuStatu">
						<el-radio :label=0>禁用</el-radio>
						<el-radio :label=1>正常</el-radio>
					</el-radio-group>
				</el-form-item>

				<el-form-item label="排序号" prop="menuOrdernum" label-width="100px">
					<el-input-number v-model="editForm.menuOrdernum" :min="1" label="排序号">1</el-input-number>
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
	export default {
		name: "Menu",
		data() {
			return {
				dialogVisible: false,
				editForm: {

				},
				editFormRules: {
					parentId: [
						{required: true, message: '请选择上级菜单', trigger: 'blur'}
					],
					menuName: [
						{required: true, message: '请输入名称', trigger: 'blur'}
					],
					menuPerms: [
						{required: true, message: '请输入权限编码', trigger: 'blur'}
					],
					menuType: [
						{required: true, message: '请选择状态', trigger: 'blur'}
					],
					menuOrdernum: [
						{required: true, message: '请填入排序号', trigger: 'blur'}
					],
					menuStatu: [
						{required: true, message: '请选择状态', trigger: 'blur'}
					]
				},
				tableData: []
			}
		},
		created() {
			this.getMenuTree()
		},
		methods: {
			getMenuTree() {
				this.$axios.get("/sys/menu/list").then(res => {

					console.log(res)
					this.tableData = res.data.data
				})
			},
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						this.$axios.post('/sys/menu/' + (this.editForm.id?'update' : 'save'), this.editForm)
							.then(res => {

								this.$message({
									showClose: true,
									message: '恭喜你，操作成功',
									type: 'success',
									onClose:() => {
										this.getMenuTree()
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
				this.$axios.get('/sys/menu/info/' + id).then(res => {
					this.editForm = res.data.data

					this.dialogVisible = true
				})
			},
			resetForm(formName) {
				this.$refs[formName].resetFields();
				this.dialogVisible = false
				this.editForm = {}
			},
			handleClose() {
				this.resetForm('editForm')
			},
			delHandle(id) {
				this.$axios.post("/sys/menu/delete/" + id).then(res => {
					this.$message({
						showClose: true,
						message: '恭喜你，操作成功',
						type: 'success',
						onClose:() => {
							this.getMenuTree()
						}
					});

				})
			}
		}
	}
</script>

<style scoped>

</style>