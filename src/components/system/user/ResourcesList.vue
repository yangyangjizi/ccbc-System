<template>
  <section>
    <!--工具条-->
    <el-col
      :span="24"
      class="toolbar"
    >
      <el-form :inline="true" :model="filters">
        <el-form-item class="el-forms input-box9" label="资源名称">
          <el-input v-model="filters.resName" clearable placeholder="请输入资源名称" class="input-box7"></el-input>
        </el-form-item>
        <el-form-item class="el-forms input-box9" label="资源编码">
          <el-input v-model="filters.resCode" clearable placeholder="请输入资源编码" class="input-box7"></el-input>
        </el-form-item>
        <el-form-item class="el-forms input-box9" label="资源值">
          <el-input v-model="filters.resValue" clearable placeholder="请输入资源值" class="input-box7"></el-input>
        </el-form-item>
        <el-form-item class="el-forms" label="上级资源编码">
          <el-input
            v-model="filters.superResCode"
            clearable
            placeholder="请输入上级资源编码"
            class="input-box7"
          ></el-input>
        </el-form-item>
        <el-form-item class="el-forms input-box9" label="上级资源值">
          <el-input
            v-model="filters.superResValue"
            clearable
            placeholder="请输入上级资源值"
            class="input-box7"
          ></el-input>
        </el-form-item>
        <el-form-item class="el-forms input-box9" label="资源类型">
          <el-select v-model="filters.resType" clearable placeholder="请选择资源类型">
            <el-option
              v-for="item in roleTypeList"
              :key="item.resTypeCode"
              :label="item.resTypeName"
              :value="item.resTypeCode"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-button type="warning" @click="handleCheck" v-hasPermission="'resManageQuery'">查询</el-button>
      </el-form>

      <el-row class="margin-box">
        <el-col>
          <el-button type="primary" @click="handleAddUser" v-hasPermission="'resManageAdd'">新增</el-button>
          <el-button type="danger" @click="handleDeleteUsers" v-hasPermission="'resManageDels'">批量删除</el-button>
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
      >
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column prop="number" label="序号" align="center" width="55"></el-table-column>
        <el-table-column prop="resName" label="资源名称" show-overflow-tooltip align="center"></el-table-column>
        <el-table-column prop="resCode" label="资源编码" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column prop="resValue" label="资源值" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column prop="superResCode" label="上级资源编码" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column prop="superResValue" label="上级资源值" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column prop="url" label="资源地址" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column prop="resType" label="资源类型" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column prop="resTypeName" label="资源类型名称" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column prop="resLevel" label="资源等级" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column label="操作" align="center" min-width="120px">
          <template slot-scope="scope">
            <el-button
              type="success"
              size="small"
              v-hasPermission="'resManageUpdate'"
              @click="handleEdite(scope.row.id)"
              class="submit_color"
            >编辑</el-button>
            <el-button
              type="danger"
              size="small"
              v-hasPermission="'resManageDel'"
              @click="handleDelete(scope.row.id)"
              class="submit_color"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 新增弹框 -->
      <el-dialog title="新增资源" :visible.sync="dialogAddUserFormVisible" width="30%">
        <el-form :model="addUserForm" ref="addUserForm" label-width="120px">
          <el-form-item label="资源名称" prop="resName">
            <el-input
              v-model="addUserForm.resName"
              autocomplete="off"
              placeholder="请输入资源名称"
              style="width:50%"
            ></el-input>
          </el-form-item>
          <el-form-item label="资源编码" prop="resCode">
            <el-input
              v-model="addUserForm.resCode"
              autocomplete="off"
              placeholder="请输入资源编码"
              style="width:50%"
            ></el-input>
          </el-form-item>
          <el-form-item label="上级资源编码" prop="superResCode">
            <el-input
              v-model="addUserForm.superResCode"
              autocomplete="off"
              placeholder="请输入上级资源编码"
              style="width:50%"
            ></el-input>
          </el-form-item>
          <el-form-item label="url访问地址" prop="url">
            <el-input
              v-model="addUserForm.url"
              autocomplete="off"
              placeholder="请输入url访问地址"
              style="width:50%"
            ></el-input>
          </el-form-item>
          <el-form-item label="资源类别" prop="resType">
            <el-select v-model="addUserForm.resType" clearable placeholder="请选择资源类型">
              <el-option
                v-for="item in roleTypeList"
                :key="item.resTypeCode"
                :label="item.resTypeName"
                :value="item.resTypeCode"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="handleNoAdd('addUserForm')">取 消</el-button>
          <el-button type="primary" @click="handleSureAdd">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 编辑弹框 -->
      <el-dialog title="修改资源" :visible.sync="dialogEditUserFormVisible" width="30%">
        <el-form :model="editUserForm" ref="editUserForm" label-width="120px">
          <el-form-item label="资源名称" prop="resName">
            <el-input v-model="editUserForm.resName" autocomplete="off" style="width:50%"></el-input>
          </el-form-item>
          <el-form-item label="资源编码" prop="resCode">
            <el-input v-model="editUserForm.resCode" autocomplete="off" style="width:50%"></el-input>
          </el-form-item>
          <el-form-item label="上级资源编码" prop="superResCode">
            <el-input v-model="editUserForm.superResCode" autocomplete="off" style="width:50%"></el-input>
          </el-form-item>
          <el-form-item label="url访问地址" prop="url">
            <el-input v-model="editUserForm.url" autocomplete="off" style="width:50%"></el-input>
          </el-form-item>
          <el-form-item label="资源类别" prop="resType">
            <el-select v-model="editUserForm.resType" clearable placeholder="请选择资源类型">
              <el-option
                v-for="item in roleTypeList"
                :key="item.resTypeCode"
                :label="item.resTypeName"
                :value="item.resTypeCode"
              ></el-option>
            </el-select>
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
        :page-size="pageSize"
        :total="total"
        background
      ></el-pagination>
    </el-col>
  </section>
</template>
<script>
export default {
  data() {
    return {
      filters: {
        resName: "",
        resCode: "",
        resValue: "",
        superResCode: "",
        superResValue: "",
        resType: ""
      },
      addUserForm: {
        resName: "",
        resCode: "",
        superResCode: "",
        url: "",
        resType: ""
      },
      editUserForm: {
        resName: "",
        resCode: "",
        superResCode: "",
        url: "",
        resType: ""
      },
      roleTypeList: [],
      multipleSelection: [],
      tableData: [],
      total: 0,
      page: 1,
      pageSize: 10,
      listLoading: false,
      dialogAddUserFormVisible: false,
      dialogEditUserFormVisible: false,
      styleObj: {
        background: "#eef1f6",
        "border-color": "#dbdbdb",
        "text-align": "center"
      }
    };
  },
  created() {
    this.getTableData();
    this.handleCheckUserCode();
  },
  methods: {
    handleCheck() {
      this.getTableData();
    },
    //批量删除
    handleDeleteUsers() {
      let deleteUsersData = this.multipleSelection;
      let deleteUsersList = [];
      for (var i in deleteUsersData) {
        deleteUsersList.push(deleteUsersData[i].id);
      }
      if (deleteUsersList.length === 0) {
        this.$message.error("请选中要删除数据项！");
        return;
      }
      this.$confirm("此操作将删除角色, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios
            .post("/banksys/system/resource/resourcedelete.do", {
              delIds: deleteUsersList
            })
            .then(res => {
              this.multipleSelection = [];
              if (res.data.code === "1001") {
                this.$message.success(res.data.msg);
                this.getTableData();
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
    // 获取点击的行
    handleClickRow(selection, row) {
      this.multipleSelection = selection;
    },
    // 资源类型查询
    handleCheckUserCode() {
      this.$axios
        .post("/banksys/system/resource/restypequery.do", {})
        .then(res => {
          this.roleTypeList = res.data.list;
        })
        .catch(err => {
          this.$message.error("网络异常，请重试！！！");
        });
    },
    //确定新增模块
    handleSureAdd() {
      let prop = {};
      prop = {
        resName: this.addUserForm.resName,
        resCode: this.addUserForm.resCode,
        superResCode: this.addUserForm.superResCode,
        url: this.addUserForm.url,
        resType: this.addUserForm.resType
      };
      this.$axios({
        method: "post",
        url: "/banksys/system/resource/resourceadd.do",
        data: prop
      })
        .then(res => {
          this.dialogAddUserFormVisible = false;
          if ((res.data.code == "1001")) {
            this.$message.success(res.data.msg);
            this.getTableData();
            this.$refs.addUserForm.resetFields();
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch(err => {
          this.dialogAddUserFormVisible = false;
          this.$message.error("网络异常，请重试！！！");
        });
    },
    handleAddUser() {
      this.dialogAddUserFormVisible = true;
    },
    handleNoAdd(formName) {
      this.dialogAddUserFormVisible = false;
      this.$refs[formName].resetFields();
    },
    //确定编辑部分
    handleSureEdit() {
      let prop = {};
      prop = {
        resName: this.editUserForm.resName,
        resCode: this.editUserForm.resCode,
        superResCode: this.editUserForm.superResCode,
        url: this.editUserForm.url,
        resType: this.editUserForm.resType
      };
      this.$axios({
        method: "post",
        url: "/banksys/system/resource/resourceupdate.do",
        data: prop
      })
        .then(res => {
          this.dialogEditUserFormVisible = false;
          if ((res.data.code == "1001")) {
            this.$message.success(res.data.msg);
            this.getTableData();
          }else {
            this.$message.error(res.data.msg)
          }
        })
        .catch(err => {
          this.dialogEditUserFormVisible = false;
          this.$message.error("网络异常，请重试！！！");
        });
    },
    handleNoEdit(formName) {
      this.dialogEditUserFormVisible = false;
      this.$refs[formName].resetFields();
    },
    handleEdite(id) {
      this.dialogEditUserFormVisible = true;
      let prop = {};
      let propData = [];
      propData.push(id);
      prop = {
        resId: propData
      };
      this.$axios({
        method: "post",
        url: "/banksys/system/resource/resourcequerybyid.do",
        data: prop
      })
        .then(res => {
          this.editUserForm = res.data.data;
        })
        .catch(err => {
          this.$message.error("网路异常，请重试！！！");
        });
    },
    handleDelete(id) {
      let prop = {};
      let propData = [];
      propData.push(id);
      prop = {
        delIds: propData
      };
      this.$confirm("此操作将删除角色, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios({
            method: "post",
            url: "/banksys/system/resource/resourcedelete.do",
            data: prop
          })
            .then(res => {
              if (res.data.code === "1001") {
                this.$message.success(res.data.msg);
                this.getTableData();
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
        resName: this.filters.resName,
        resCode: this.filters.resCode,
        resValue: this.filters.resValue,
        superResCode: this.filters.superResCode,
        superResValue: this.filters.superResValue,
        resType: this.filters.resType,
        pagenum: this.page,
        rows: this.pageSize
      };
      this.listLoading = true;
      this.$axios({
        method: "post",
        url: "/banksys/system/resource/resourcequery.do",
        data: para
      }).then(res => {
        if (res.data.code === "1001") {
          this.total = res.data.total;
          this.tableData = res.data.list;
          this.listLoading = false;
          this.multipleSelection = [];
          this.$message.success(res.data.msg);
        } else {
          this.$message.error(res.data.msg);
        }
      }).catch(err => {
        this.$message.error("网络异常，请重试！！！")
      });
    },
    handleCurrentChange(val) {
      this.page = val;
      this.getTableData();
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getTableData();
    }
  }
};
</script>
<style scoped>
</style>