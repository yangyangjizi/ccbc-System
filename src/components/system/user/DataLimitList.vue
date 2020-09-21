<template>
  <section>
    <!--工具条-->
    <el-col :span="24" class="toolbar">
      <el-form :inline="true" :model="filters">
        <el-form-item class="el-forms input-box9" label="机构名称">
          <el-input v-model="filters.authName" clearable placeholder="请输入机构名称" class="input-box7"></el-input>
        </el-form-item>
        <el-form-item class="el-forms input-box9" label="机构编号">
          <el-input v-model="filters.authCode" clearable placeholder="请输入机构编号" class="input-box7"></el-input>
        </el-form-item>
        <el-form-item class="el-forms input-box9" label="上级机构名称">
          <el-input
            v-model="filters.superAuthName"
            clearable
            placeholder="请输入上级资源编码"
            class="input-box7"
          ></el-input>
        </el-form-item>
        <el-form-item class="el-forms input-box9" label="上级编号">
          <el-input
            v-model="filters.superAuthCode"
            clearable
            placeholder="请输入上级资源值"
            class="input-box7"
          ></el-input>
        </el-form-item>
        <el-form-item class="el-forms" label="数据表类型">
          <el-select v-model="filters.tableType" @change="handleChangeOption" placeholder="请选择">
            <el-option
              v-for="item in tableTypeList"
              :key="item.tableType"
              :label="item.tableTypeLabel"
              :value="item.tableType"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-button type="warning" @click="handleCheck">查询</el-button>
      </el-form>
      <el-row class="margin-box">
        <el-col>
          <el-button type="primary" @click="handleAddUser">新增</el-button>
          <!-- <el-button type="danger" @click="handleDeleteUsers">批量删除</el-button> -->
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
        <el-table-column prop="authName" label="机构名称" show-overflow-tooltip align="center"></el-table-column>
        <el-table-column prop="authCode" label="机构编号" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column prop="superAuthName" label="上级机构名称" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column prop="superAuthCode" label="上级机构编号" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column prop="authLevelName" label="机构级别" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column prop="createName" label="添加操作员" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column prop="createTime" label="添加时间" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column prop="modifyName" label="修改操作员" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column prop="modifyTime" label="最新修改时间" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column label="操作" align="center" min-width="120px">
          <template slot-scope="scope">
            <el-button
              v-if="filters.tableType == '04'"
              type="success"
              size="small"
              @click="handleEdite(scope.row.id)"
              class="submit_color"
            >编辑</el-button>

            <el-button
              type="danger"
              size="small"
              @click="handleDelete(scope.row.id)"
              class="submit_color"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 新增弹框 -->
      <el-dialog title="新增机构信息" :visible.sync="dialogAddUserFormVisible" width="30%">
        <el-form :model="addUserForm" ref="addUserForm" label-width="100px">
          <el-form-item label="机构名称" prop="authName">
            <el-input
              v-model="addUserForm.authName"
              autocomplete="off"
              placeholder="请输入机构名称"
            ></el-input>
          </el-form-item>
          <el-form-item label="机构编号" prop="authCode">
            <el-input
              v-model="addUserForm.authCode"
              autocomplete="off"
              placeholder="请输入机构编号"
            ></el-input>
          </el-form-item>
          <el-form-item label="上级机构名称" prop="superAuthCode">
            <el-cascader
              ref="tree"
              placeholder="请选择上级机构名称"
              clearable
              v-model="addUserForm.superAuthCode"
              :options="options"
              :props="defaultData"
              class="cascader-box"
              collapse-tags
            ></el-cascader>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="handleNoAdd('addUserForm')">取 消</el-button>
          <el-button type="primary" @click="handleSureAdd">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 编辑弹框 -->
      <el-dialog title="修改机构信息" :visible.sync="dialogEditUserFormVisible" width="30%">
        <el-form :model="editUserForm" ref="editUserForm" label-width="100px">
          <el-form-item label="机构名称" prop="authName">
            <el-input v-model="editUserForm.authName" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="机构编号" prop="authCode">
            <el-input v-model="editUserForm.authCode" readonly autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="上级机构名称" prop="superAuthCodeList">
            <el-cascader
              ref="tree"
              placeholder="请选择所属机构"
              clearable
              v-model="editUserForm.superAuthCodeList"
              :options="options"
              :props="defaultData"
              class="cascader-box"
              collapse-tags
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
        :page-size="pageSize"
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
      filters: {
        authName: "",
        authCode: "",
        superAuthCode: "",
        superAuthName: "",
        tableType: "01"
      },
      addUserForm: {
        authName: "",
        authCode: "",
        superAuthCode: []
      },
      editUserForm: {
        authName: "",
        authCode: "",
        superAuthCodeList: []
      },
      roleTypeList: [],
      tableTypeList: [
        {
          tableType: "01",
          tableTypeLabel: "商机汇专用机构表"
        },
        {
          tableType: "02",
          tableTypeLabel: "人行报表专用机构表"
        },
        {
          tableType: "03",
          tableTypeLabel: "产品汇专用机构表"
        },
        {
          tableType: "04",
          tableTypeLabel: "全量机构表"
        }
      ],
      options: [],
      propId:"",
      defaultData: {
        //联级选择
        leafOnly: true,
        checkStrictly: true,
        value: "unitCode",
        label: "unitName",
        children: "children"
      },
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
    // this.dropDownDate();
  },
  methods: {
    //数据表类型变化调动接口
    handleChangeOption() {
      this.getTableData();
      this.dropDownDate();
    },
    // 获取新增下拉框数据
    dropDownDate() {
      this.$axios
        .post("/banksys/system/dataauth/queryUnitCodeByRole.do", {
          tableType: this.filters.tableType
        })
        .then(res => {
          this.options = res.data.list;
        })
        .catch(err => {
          this.$message.error("网络异常，请重试！！！");
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
        deleteUsersList.push(deleteUsersData[i].id);
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
          this.$axios
            .post("/banksys/system/dataauth/dataauthdelete.do", {
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
    //确定新增模块
    handleSureAdd() {
      let prop = {};
      prop = {
        authName: this.addUserForm.authName,
        authCode: this.addUserForm.authCode,
        tableType: this.filters.tableType,
        superAuthCode: this.addUserForm.superAuthCode
      };
      this.$axios({
        method: "post",
        url: "/banksys/system/dataauth/dataauthadd.do",
        data: prop
      })
        .then(res => {
          this.dialogAddUserFormVisible = false;
          if (res.data.code == "1001") {
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
      this.dropDownDate()
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
        authName: this.editUserForm.authName,
        authCode: this.editUserForm.authCode,
        tableType: this.filters.tableType,
        id: this.propId,
        superAuthCode: this.editUserForm.superAuthCodeList
      };
      this.$axios({
        method: "post",
        url: "/banksys/system/dataauth/dataauthupdate.do",
        data: prop
      })
        .then(res => {
          this.dialogEditUserFormVisible = false;
          if (res.data.code == "1001") {
            this.$message.success(res.data.msg);
            this.getTableData();
          } else {
            this.$message.error(res.data.msg);
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
    //编辑回显
    handleEdite(id) {
      this.dropDownDate()
      this.propId = id
      this.dialogEditUserFormVisible = true;

      let prop = {
        authId: this.propId,
        tableType: this.filters.tableType,
      };
      this.$axios({
        method: "post",
        url: "/banksys/system/dataauth/dataauthquerybyid.do",
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
      prop = {
        authId: id,
        tableType:this.filters.tableType
      };
      this.$confirm("此操作将删除角色, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios({
            method: "post",
            url: "/banksys/system/dataauth/dataauthdelete.do",
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
        authName: this.filters.authName,
        authCode: this.filters.authCode,
        superAuthCode: this.filters.superAuthCode,
        superAuthName: this.filters.superAuthName,
        tableType: this.filters.tableType,
        pagenum: this.page,
        rows: this.pageSize
      };
      this.listLoading = true;
      this.$axios({
        method: "post",
        url: "/banksys/system/dataauth/dataauthquery.do",
        data: para
      })
        .then(res => {
          if (res.data.code === "1001") {
            this.total = res.data.total;
            this.tableData = res.data.list;
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