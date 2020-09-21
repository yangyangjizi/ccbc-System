<template>
  <section v-loading="loading" :element-loading-text="loadingText">
    <!--工具条-->
    <el-col :span="24" class="toolbar" v-if="!loading">
      <el-form :inline="true" :model="filters">
        <el-form-item class="el-forms" label="账号">
          <el-input v-model="filters.loginName" placeholder="请输入账号" clearable class="input-box7"></el-input>
        </el-form-item>
        <el-form-item class="el-forms input-box2" label="真实姓名">
          <el-input v-model="filters.realName" placeholder="请输入真实姓名" clearable class="input-box7"></el-input>
        </el-form-item>
        <el-button type="warning" v-on:click="getTableData" v-hasPermission="'userMangQuery'">查询</el-button>
      </el-form>
      <el-row class="margin-box">
        <el-col>
          <el-button type="primary" v-on:click="addUser" v-hasPermission="'userManageAdd'">新增用户</el-button>
          <el-button type="success" v-on:click="addUserAndStaff" v-hasPermission="'addStaff'">新增员工</el-button>
          <el-button type="danger" v-on:click="deleteUser" v-hasPermission="'userManageDel'">批量删除</el-button>
          <el-button type v-on:click="batchEditUser" v-hasPermission="'batchEditUser'">批量编辑</el-button>
          <el-button type="info" v-on:click="resetPassword" v-hasPermission="'passWordRest'">重置密码</el-button>
          <el-button
            class="check-button"
            v-on:click="handlePassword"
            v-hasPermission="'userPassWordRest'"
          >初始密码管理</el-button>
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
        @selection-change="handleClickCheck"
      >
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column prop="number" label="序号" align="center" width="55"></el-table-column>
        <el-table-column prop="loginName" label="员工编号" show-overflow-tooltip align="center"></el-table-column>
        <el-table-column prop="realName" label="员工姓名" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column prop="roleType" label="角色类型" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column prop="unitName" label="所属机构" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column prop="unitLevel" label="机构级别" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column prop="postName" label="部门/岗位" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column prop="tel" label="联系电话" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column prop="createName" label="添加操作员" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column prop="createTime" label="添加时间" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column prop="modifyName" label="修改操作员" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column prop="modifyTime" label="最新修改时间" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column label="操作" align="center" :min-width="minWidth">
          <template slot-scope="scope">
            <el-button
              type="success"
              size="small"
              v-hasPermission="'userMangUpd'"
              @click="handleEdite(scope.row.roleId,scope.row.unitLevelCode)"
              class="submit_color"
            >编辑</el-button>
            <el-button
              type="danger"
              v-hasPermission="'userMangDel'"
              size="small"
              @click="handleDelete(scope.row.id)"
              class="submit_color"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 编辑弹框 -->
      <el-dialog
        title="修改用户资料"
        :visible.sync="dialogEditUserFormVisible"
        width="30%"
        @close="handleColse"
        center
      >
        <el-form :model="editUserForm" ref="editUserForm">
          <el-form-item label="资源类型" prop="resources">
            <el-cascader
              placeholder="请选择资源类型"
              style="width: 80%"
              v-model="editUserForm.resources"
              :options="resourcesTypeList"
              :props="defaultResourcesData"
              collapse-tags
              clearable
            ></el-cascader>
          </el-form-item>
          <el-form-item class="el-forms input-box9" label="角色类型" prop="roleType">
            <el-select
              v-model="editUserForm.roleType"
              clearable
              placeholder="请选择角色类型"
              class="input-box7"
            >
              <el-option
                v-for="item in roleTypeList"
                :key="item.code"
                :label="item.codeName"
                :value="item.code"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="handleNoEdit('editUserForm')">取 消</el-button>
          <el-button type="primary" @click="handleSureEdit">确 定</el-button>
        </div>
      </el-dialog>

      <!-- 初始密码管理弹框 -->
      <el-dialog title="初始密码管理" :visible.sync="dialogPassWordVisible" width="30%" center>
        <el-form :model="passWordForm" ref="passWordForm" :label-width="lableWidth2">
          <el-form-item label="初始密码" prop="newPassWord">
            <el-input placeholder="请输入密码" v-model="passWordForm.newPassWord" show-password></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="handleNo('passWordForm')">取 消</el-button>
          <el-button type="primary" @click="handleSure">修改</el-button>
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
import axios from "axios";
import AES from "@/utils/aes.js";
export default {
  name: "Userlist",
  beforeRouteEnter(to, from, next) {
    if (from.path == "/AddUser" || from.path == "/SetUserRole") {
      sessionStorage.setItem("ifRefresh", "true");
      next();
    } else {
      sessionStorage.setItem("ifRefresh", "false");
      next();
    }
  },
  beforeRouteLeave(to, from, next) {
    if (to.path == "/AddUser" || to.path == "/SetUserRole") {
      next();
    } else {
      sessionStorage.removeItem("ifRefresh");
      next();
    }
  },
  data() {
    return {
      minWidth:"120px",
      loading: "",
      loadingText: "拼命加载中",
      ifCode: false,
      lableWidth2: "15%",
      changeId: "",
      codeId: "",
      optionsData: [],
      roleTypeList: [],
      roleIds: [],
      codeIds: [],
      resourcesTypeList: [],
      defaultResourcesData: {
        //联级选择
        multiple: true,
        value: "id",
        label: "resName",
        children: "children"
      },
      filters: {
        loginName: "",
        realName: ""
      },
      tableData: [],
      total: 0,
      pageSize: 10,
      page: 1,
      options: [],
      defaultData: {
        //联级选择
        leafOnly: true,
        checkStrictly: true,
        value: "unitCode",
        label: "unitName",
        children: "children"
      },
      listLoading: false,
      dialogPassWordVisible: false,
      dialogEditUserFormVisible: false,
      passWordForm: {
        newPassWord: ""
      },
      editUserForm: {
        resources: [],
        roleType: ""
      },
      multipleSelection: [],
      styleObj: {
        background: "#eef1f6",
        "border-color": "#dbdbdb",
        "text-align": "center"
      }
    };
  },
  created() {
    this.getBankList();
    this.handleCheckResourcesCode();
    this.handleCheckUserCode();
  },
  // 监听新增后返回到此页面时刷新列表数据
  watch: {
    $route(to, from) {
      if (from.path == "/AddUser" || from.path == "/SetUserRole") {
        this.getIfRefresh();
      }
    }
  },
  mounted() {
    this.getTableData();
  },
  methods: {
    // 批量编辑
    batchEditUser() {
      let editData = this.multipleSelection;
      for (let i in editData) {
        this.roleIds.push(editData[i].roleId);
        this.codeIds.push(editData[i].unitLevelCode);
      }
      if (editData.length == 0) {
        this.$message.error("请选择所要批量编辑的用户！！！");
        return;
      }

      this.dialogEditUserFormVisible = true;
      this.editUserForm.resources = [];
      this.editUserForm.roleType = "";
      // this.handleSureEdit2(roleIds,codeIds)
    },
    //初始密码弹框
    handlePassword() {
      this.$axios
        .post("/banksys/system/user/queryinitialpassword.do", {})
        .then(res => {
          this.passWordForm.newPassWord = AES.decrypt(res.data.initialPassword);
          this.dialogPassWordVisible = true;
        })
        .catch(err => {
          this.$message.error("网络异常，请重试！！！");
        });
    },
    handleSure() {
      let that = this;
      that
        .$confirm("此操作将重置密码, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(() => {
          this.loading = true;
          this.loadingText = "密码初始中，请稍后！！！";
          that.$axios
            .post("/banksys/system/user/editinitialpassword.do", {
              editInitialPassword: AES.encrypt(that.passWordForm.newPassWord)
            })
            .then(res => {
              this.loading = false;
              if (res.data.code == "1001") {
                that.$message.success(res.data.msg);
                that.dialogPassWordVisible = false;
              } else {
                that.$message.error(res.data.msg);
              }
            })
            .catch(err => {
              this.loading = false;
              that.$message.error("网络异常，请重试！！！");
            });
        })
        .catch(() => {
          that.$message({
            type: "info",
            message: "已取消修改"
          });
        });
    },
    handleNo(formName) {
      this.dialogPassWordVisible = false;
      this.$refs[formName].resetFields();
    },

    //确定编辑部分
    handleSureEdit() {
      this.loading = true;
      this.loadingText = "保存中，请稍后！！！";
      let prop = {};
      prop = {
        roleIds: this.roleIds,
        resources: this.editUserForm.resources,
        roleType: this.editUserForm.roleType,
        unitLevels: this.codeIds
      };
      this.$axios({
        method: "post",
        url: "/banksys/system/user/edituserdata.do",
        data: prop
      })
        .then(res => {
          this.dialogEditUserFormVisible = false;
          this.loading = false;
          if (res.data.code == "1001") {
            this.$message.success(res.data.msg);
            this.getTableData();
            this.roleIds = [];
            this.codeIds = [];
          } else {
            this.$message.error(res.data.msg);
            this.getTableData1();
            // this.roleIds = [];
            // this.codeIds = [];
          }
        })
        .catch(err => {
          this.loading = false;
          this.dialogEditUserFormVisible = false;
          this.$message.error("网络异常，请重试！！！");
        });
    },
    // 取消编辑
    handleNoEdit(formName) {
      this.roleIds = [];
      this.codeIds = [];
      this.dialogEditUserFormVisible = false;
      this.$refs[formName].resetFields();
    },
    // 角色类型查询
    handleCheckUserCode() {
      this.$axios
        .post("/banksys/system/role/queryroletypelist.do", {})
        .then(res => {
          this.roleTypeList = res.data.data;
        })
        .catch(err => {
          this.$message.error("网络异常，请重试！！！");
        });
    },
    // 资源类型查询
    handleCheckResourcesCode() {
      this.$axios
        .post("/banksys/system/resource/queryreslist.do", {
          returnType: "tree"
        })
        .then(res => {
          this.resourcesTypeList = res.data.list;
        })
        .catch(err => {
          this.$message.error("网络异常，请重试！！！");
        });
    },
    handleColse() {
      this.roleIds = [];
      this.codeIds = [];
    },
    //点击编辑回显
    handleEdite(id, code) {
      this.changeId = id;
      this.codeId = code;
      this.roleIds.push(this.changeId);
      this.codeIds.push(this.codeId);
      let prop = {};
      prop = {
        roleId: this.changeId
      };
      this.$axios({
        method: "post",
        url: "/banksys/system/user/queryuserdatabyroleid.do",
        data: prop
      })
        .then(res => {
          this.editUserForm.resources = res.data.resIdList;
          this.editUserForm.roleType = res.data.roleType;
          this.dialogEditUserFormVisible = true;
        })
        .catch(err => {
          this.$message.error("网路异常，请重试！！！");
        });
    },
    // 监听返回路径刷新页面
    getIfRefresh() {
      if (sessionStorage.getItem("ifRefresh") == "true") {
        this.getTableData1();
      }
    },
    // 获取银行名称列表
    getBankList() {
      axios
        .post("/banksys/system/common/queryunitcode.do", {
          returnType: "tree",
          tableType: "1"
        })
        .then(res => {
          this.options = res.data.list;
        })
        .catch(err => {
          this.$message.error("网路异常，请重试！！！");
        });
    },
    //重置密码
    resetPassword() {
      let restPasswordData = this.multipleSelection;
      let restPasswordList = [];
      for (var i in restPasswordData) {
        restPasswordList.push(restPasswordData[i].id);
      }
      if (restPasswordList.length === 0) {
        this.$message.error("请选中要重置密码的用户！！！");
        return;
      }
      this.$confirm("此操作将重置密码, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.loading = true;
          this.loadingText = "密码重置中，请稍后！！！";
          axios
            .post("/banksys/system/user/resetpassword.do", {
              resetIds: restPasswordList
            })
            .then(res => {
              this.loading = false;
              if (res.data.code === "1001") {
                this.$message.success(res.data.msg);
                this.getTableData1();
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
            message: "已取消重置"
          });
        });
    },
    //批量删除用户
    deleteUser() {
      let deleteData = this.multipleSelection;
      let deleteuserIdList = [];
      for (var i in deleteData) {
        deleteuserIdList.push(deleteData[i].id);
      }
      if (deleteuserIdList.length == 0) {
        this.$message.error("请选择所要删除用户！！！");
        return;
      }
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.loading = true;
          this.loadingText = "删除中，请稍后！！！";
          axios
            .post("/banksys/system/user/userdelete.do", {
              delIds: deleteuserIdList
            })
            .then(res => {
              this.loading = false;
              if (res.data.code === "1001") {
                this.$message.success(res.data.msg);
                this.getTableData1();
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
    //点击单条删除
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
          this.loading = true;
          this.loadingText = "删除中，请稍后！！！";
          this.$axios({
            method: "post",
            url: "/banksys/system/user/userdelete.do",
            data: prop
          })
            .then(res => {
              this.loading = false;
              if (res.data.code === "1001") {
                this.$message.success(res.data.msg);
                this.getTableData1();
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

    //页面列表展示
    getTableData() {
      let para = {
        pagenum: this.page,
        rows: this.pageSize,
        loginName: this.filters.loginName,
        realName: this.filters.realName
      };
      this.listLoading = true;
      axios({
        method: "post",
        url: "/banksys/system/user/userquery.do",
        data: para
      })
        .then(res => {
          if (res.data.code == "1001") {
            this.$message.success(res.data.msg);
            this.total = res.data.total;
            this.tableData = JSON.parse(AES.decrypt(res.data.list));
            this.listLoading = false;
            this.multipleSelection = [];
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch(err => {
          this.$message.error("网络异常，请重试！！！");
        });
    },
    getTableData1() {
      let para = {
        pagenum: this.page,
        rows: this.pageSize,
        loginName: this.filters.loginName,
        realName: this.filters.realName
      };
      this.listLoading = true;
      axios({
        method: "post",
        url: "/banksys/system/user/userquery.do",
        data: para
      })
        .then(res => {
          if (res.data.code == "1001") {
            this.total = res.data.total;
            this.tableData = JSON.parse(AES.decrypt(res.data.list));
            this.listLoading = false;
            this.multipleSelection = [];
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch(err => {
          this.$message.error("网络异常，请重试！！！");
        });
    },
    //添加用户
    addUser() {
      this.$router.push({
        path: "/AddUser",
        query: {}
      });
    },
    //添加员工与用户
    addUserAndStaff() {
      this.$router.push({
        path: "/AddUserAndStaff",
        query: {}
      });
    },
    // 获取点击的行
    handleClickRow(selection, row) {
      this.multipleSelection = selection;
    },
    handleClickAllRow(selection) {
      this.multipleSelection = selection;
    },
    handleClickCheck(selection) {
      this.multipleSelection = selection;
      this.roleIds = [];
      this.codeIds = [];
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

<style  scoped>
.check-button {
  color: #fff;
  background-color: #eb42e2;
}
.check-button:hover {
  opacity: 0.7;
}
.el-table td,
.el-table th.is-leaf,
.el-table--border,
.el-table--group {
  border-color: #dbdbdb;
}
.el-table--border::after,
.el-table--group::after,
.el-table::before {
  background-color: #dbdbdb;
}
</style>
