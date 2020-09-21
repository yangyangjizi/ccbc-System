<template>
  <section v-loading="loading" :element-loading-text="loadingText">
    <!--工具条-->
    <el-col :span="24" class="toolbar" v-if="!loading">
      <el-form :inline="true" :model="filters">
        <el-form-item class="el-forms input-box18" label="添加时间">
          <el-date-picker
            v-model="filters.addTime"
            placeholder="请输入添加时间"
            type="daterange"
            clearable
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item class="el-forms input-box9" label="部门名称">
          <el-input v-model="filters.deptName" clearable placeholder="请输入部门名称" class="input-box7"></el-input>
        </el-form-item>
        <el-form-item label="所属机构">
          <el-cascader
            ref="tree"
            placeholder="请选择所属机构"
            clearable
            v-model="filters.unitCode"
            :options="options"
            :props="defaultData2"
            class="cascader-box"
            collapse-tags
          ></el-cascader>
        </el-form-item>
        <el-button type="warning" @click="handleCheck" v-hasPermission="'deptManageQuery'">查询</el-button>
      </el-form>
      <el-row class="margin-box">
        <el-col>
          <el-button type="primary" @click="handleAddUser" v-hasPermission="'deptManageAdd'">新增</el-button>
          <el-button
            type="danger"
            @click="handleDeleteUsers"
            v-hasPermission="'deptManageDels'"
          >批量删除</el-button>
        </el-col>
      </el-row>
      <!--列表-->
      <el-table
        :data="tableData"
        v-loading="listLoading"
        border
        style="width: 100%;"
        :header-cell-style="styleObj"
        highlight-current-row
        @select="handleClickRow"
        @select-all="handleClickAllRow"
      >
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column prop="number" label="序号" align="center" width="55"></el-table-column>
        <el-table-column prop="deptName" label="部门名称" show-overflow-tooltip align="center"></el-table-column>
        <el-table-column prop="unitName" label="所属机构" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column prop="deptLevel" label="机构级别" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column prop="createName" label="添加操作员" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column prop="createTime" label="添加时间" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column prop="modifyName" label="修改操作员" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column prop="modifyTime" label="最新修改时间" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column label="操作" align="center" min-width="120px">
          <template slot-scope="scope">
            <el-button
              type="success"
              size="small"
              v-hasPermission="'deptManageUpdate'"
              @click="handleEdite(scope.row.deptId,scope.row.deptName,scope.row.unitCodes)"
              class="submit_color"
            >编辑</el-button>

            <el-button
              type="danger"
              size="small"
              v-hasPermission="'deptManageDel'"
              @click="handleDelete(scope.row.deptId)"
              class="submit_color"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 新增弹框 -->
      <el-dialog title="新增部门" :visible.sync="dialogAddUserFormVisible" width="30%">
        <el-form
          :model="addUserForm"
          ref="addUserForm"
          :rules="addUserRules"
          :label-width="labelWidth"
        >
          <el-form-item label="部门名称" prop="deptName" class="add-style">
            <el-input
              v-model="addUserForm.deptName"
              autocomplete="off"
              placeholder="请输入部门名称"
              style="width:50%"
            ></el-input>
          </el-form-item>
          <el-form-item label="所属机构" prop="unitCode" class="add-style">
            <el-cascader
              ref="tree"
              placeholder="请选择所属机构"
              clearable
              v-model="addUserForm.unitCode"
              :options="options"
              :props="defaultData"
              collapse-tags
              style="width:100%"
            ></el-cascader>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="handleNoAdd('addUserForm')">取 消</el-button>
          <el-button type="primary" @click="handleSureAdd('addUserForm')">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 编辑弹框 -->
      <el-dialog title="修改部门" :visible.sync="dialogEditUserFormVisible" width="30%">
        <el-form
          :model="editUserForm"
          :rules="addUserRules"
          ref="editUserForm"
          :label-width="labelWidth"
        >
          <el-form-item label="部门名称" prop="deptName" class="add-style">
            <el-input v-model="editUserForm.deptName" autocomplete="off" style="width:50%"></el-input>
          </el-form-item>
          <el-form-item label="所属机构" prop="unitCode" class="add-style">
            <el-cascader
              ref="tree"
              v-model="editUserForm.unitCode"
              clearable
              :options="options"
              :props="defaultData"
              style="width:100%"
            ></el-cascader>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="handleNoEdit('editUserForm')">取 消</el-button>
          <el-button type="primary" @click="handleSureEdit">确 定</el-button>
        </div>
      </el-dialog>
      <!--页码-->
      <el-pagination
        layout="total, sizes, prev, pager, next, jumper"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
        :current-page.sync="page"
        :page-sizes="[10, 15, 20, 30]"
        :page-size="10"
        :total="total"
        style="float:right;padding-top: 10px;"
        background
      ></el-pagination>
    </el-col>
  </section>
</template>
<script>
export default {
  data() {
    return {
      loading: "",
      loadingText: "拼命加载中",
      addUserRules: {
        deptName: [
          { required: true, message: "请输入部门名称", trigger: "blur" },
          {
            pattern: /^([A-Za-z]|[\u4E00-\u9FA5])+$/,
            message: "名称不规范，请重新输入!"
          }
        ],
        unitCode: [
          { required: true, message: "请选择所属机构", trigger: "change" }
        ]
      },
      filters: {
        addTime: "",
        deptName: "",
        unitCode: []
      },

      options: [],
      defaultData: {
        //联级选择
        leafOnly: true,
        checkStrictly: true,
        value: "unitCode",
        label: "unitName",
        children: "children"
      },
      defaultData2: {
        //联级选择
        leafOnly: true,
        multiple: true,
        checkStrictly: true,
        value: "unitCode",
        label: "unitName",
        children: "children"
      },
      addUserForm: {
        deptName: "",
        unitCode: []
      },
      editUserForm: {
        deptName: "",
        unitCode: []
      },
      multipleSelection: [],
      deptId: "",
      tableData: [],
      total: 0,
      page: 1,
      pageSize: 10,
      listLoading: false,
      dialogAddUserFormVisible: false,
      dialogEditUserFormVisible: false,
      labelWidth: "22%",
      styleObj: {
        background: "#eef1f6",
        "border-color": "#dbdbdb",
        "text-align": "center"
      }
    };
  },
  created() {
    this.getBankList();
  },
  mounted() {
    this.getTableData();
  },
  methods: {
    // 获取所属机构
    getBankList() {
      this.$axios
        .post("/banksys/system/post/queryunitcodebyrole.do", {})
        .then(res => {
          this.options = res.data.list;
        })
        .catch(err => {
          this.$message.error("网络异常，请重新尝试！！！");
        });
    },
    handleCheck() {
      this.getTableData();
    },
    //批量删除
    handleDeleteUsers() {
      let deleteUsersData = this.multipleSelection;
      let deleteUsersList = [];
      for (var i in deleteUsersData) {
        deleteUsersList.push(deleteUsersData[i].deptId);
      }
      if (deleteUsersList.length === 0) {
        this.$message.error("请选中要删除数据项！");
        return;
      }
      this.$confirm("此操作将删除选中项, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.loading = true;
          this.loadingText = "删除中，请稍后！！！";
          this.$axios
            .post("/banksys/system/dept/deldeptdata.do", {
              deptIdList: deleteUsersList
            })
            .then(res => {
              this.loading = false;
              this.multipleSelection = [];
              if (res.data.code === "1001") {
                this.$message.success(res.data.msg);
                this.getTableData2();
              } else {
                this.$message.error(res.data.msg);
              }
            })
            .catch(err => {
              this.loading = false;
              this.$message.error("网络异常，请重试！！");
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 获取点击的行
    handleClickRow(selection, row) {
      this.multipleSelection = selection;
    },
    handleClickAllRow(selection) {
      this.multipleSelection = selection;
    },
    //确定新增模块
    handleSureAdd(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let prop = {};
          prop = {
            deptName: this.addUserForm.deptName,
            unitCode: this.addUserForm.unitCode
          };
          this.loading = true;
          this.loadingText = "保存中，请稍后！！！";
          this.$axios({
            method: "post",
            url: "/banksys/system/dept/savedeptdata.do",
            data: prop
          })
            .then(res => {
              this.loading = false;
              this.dialogAddUserFormVisible = false;
              if (res.data.code == "1001") {
                this.$message.success(res.data.msg);
                this.getTableData2();
                this.addUserForm.deptName = "",
                this.addUserForm.unitCode = []
              } else {
                this.$message.error(res.data.msg);
              }
            })
            .catch(err => {
              this.loading = false;
              this.dialogAddUserFormVisible = false;
              this.$message.error("网络异常，请重试！！！");
            });
        } else {
          return false;
        }
      });
    },
    handleAddUser() {
      this.dialogAddUserFormVisible = true;
    },
    handleNoAdd(formName) {
      this.dialogAddUserFormVisible = false;
      this.addUserForm.deptName = "",
      this.addUserForm.unitCode = []
    },
    //确定编辑部分
    handleSureEdit() {
      let prop = {};
      prop = {
        deptName: this.editUserForm.deptName,
        unitCode: this.editUserForm.unitCode,
        deptId: this.deptId
      };
      this.loading = true;
      this.loadingText = "保存中，请稍后！！！";
      this.$axios({
        method: "post",
        url: "/banksys/system/dept/editdeptdatabyid.do",
        data: prop
      })
        .then(res => {
          this.loading = false;
          this.dialogEditUserFormVisible = false;
          if (res.data.code == "1001") {
            this.$message.success(res.data.msg);
            this.getTableData2();
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch(err => {
          this.loading = false;
          this.dialogEditUserFormVisible = false;
          this.$message.error("网络异常，请重试！！！");
        });
    },
    handleNoEdit(formName) {
      this.dialogEditUserFormVisible = false;
      this.$refs[formName].resetFields();
    },
    //编辑回显
    handleEdite(id, deptName, unitCodes) {
      this.editUserForm.deptName = deptName;
      this.editUserForm.unitCode = unitCodes;
      this.deptId = id;
      this.dialogEditUserFormVisible = true;
    },
    handleDelete(id) {
      let prop = {};
      let propData = [];
      propData.push(id);
      prop = {
        deptIdList: propData
      };
      this.$confirm("此操作将删除角色, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios({
            method: "post",
            url: "/banksys/system/dept/deldeptdata.do",
            data: prop
          })
            .then(res => {
              if (res.data.code === "1001") {
                this.$message.success(res.data.msg);
                this.getTableData2();
              } else {
                this.$message.error(res.data.msg);
              }
            })
            .catch(err => {
              this.$message.error("网络异常，请重试！！");
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //页面列表展示
    getTableData() {
      let para = {
        addTime: this.filters.addTime,
        deptName: this.filters.deptName,
        unitCodes: this.filters.unitCode,
        pagenum: this.page,
        rows: this.pageSize
      };
      this.listLoading = true;
      this.$axios({
        method: "post",
        url: "/banksys/system/dept/querydeptdatalist.do",
        data: para
      })
        .then(res => {
          if (res.data.code === "1001") {
            this.total = res.data.data.total;
            this.tableData = res.data.data.list;
            this.listLoading = false;
            this.$message.success(res.data.msg);
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch(err => {
          this.$message.error("网络异常，请重试！！！");
        });
    },
    getTableData2() {
      let para = {
        addTime: this.filters.addTime,
        deptName: this.filters.deptName,
        unitCode: this.filters.unitCode,
        pagenum: this.page,
        rows: this.pageSize
      };
      this.listLoading = true;
      this.$axios({
        method: "post",
        url: "/banksys/system/dept/querydeptdatalist.do",
        data: para
      })
        .then(res => {
          if (res.data.code === "1001") {
            this.total = res.data.data.total;
            this.tableData = res.data.data.list;
            this.listLoading = false;
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch(err => {
          this.$message.error("网络异常，请重试！！！");
        });
    },
    handleCurrentChange(val) {
      this.page = val;
      this.getTableData();
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.getTableData();
    }
  }
};
</script>
<style scoped>
.input-box18 {
  width: 460px;
}
.add-style {
  margin-bottom: 20px !important;
}
.cascader-box {
  width: 300px !important;
}
</style>