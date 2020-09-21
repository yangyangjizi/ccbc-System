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
        <el-form-item class="el-forms input-box9" label="岗位名称">
          <el-input v-model="filters.postName" clearable placeholder="请输入岗位名称" class="input-box7"></el-input>
        </el-form-item>
        <el-form-item label="所属机构">
          <el-cascader
            ref="tree"
            placeholder="请选择所属机构"
            clearable
            v-model="filters.unitCodes"
            :options="options"
            :props="defaultData2"
            class="cascader-box"
            collapse-tags
          ></el-cascader>
        </el-form-item>
        <el-button type="warning" @click="handleCheck" v-hasPermission="'postManageQuery'">查询</el-button>
      </el-form>
      <el-row class="margin-box">
        <el-col>
          <el-button type="primary" @click="handleAddUser" v-hasPermission="'postManageAdd'">新增</el-button>
          <el-button
            type="danger"
            @click="handleDeleteUsers"
            v-hasPermission="'postManageDels'"
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
        <el-table-column prop="postName" label="岗位名称" show-overflow-tooltip align="center"></el-table-column>
        <el-table-column prop="unitName" label="所属机构" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column prop="postLevel" label="机构级别" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column prop="deptName" label="所属部门" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column prop="createName" label="添加操作员" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column prop="createTime" label="添加时间" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column prop="modifyName" label="修改操作员" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column prop="modifyTime" label="最新修改时间" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column label="操作" align="center" min-width="120px">
          <template slot-scope="scope">
            <el-button
              type="success"
              size="small"
              v-hasPermission="'postManageUpdate'"
              @click="handleEdite(scope.row.postId,scope.row.unitCodes)"
              class="submit_color"
            >编辑</el-button>

            <el-button
              type="danger"
              size="small"
              v-hasPermission="'postManageDel'"
              @click="handleDelete(scope.row.postId)"
              class="submit_color"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 新增弹框 -->
      <el-dialog title="新增岗位" :visible.sync="dialogAddUserFormVisible" width="30%">
        <el-form
          :model="addUserForm"
          ref="addUserForm"
          :rules="addUserRules"
          :label-width="labelWidth"
        >
          <el-form-item label="岗位名称" prop="postName" class="add-style">
            <el-input
              v-model="addUserForm.postName"
              autocomplete="off"
              placeholder="请输入岗位名称"
              style="width:50%"
            ></el-input>
          </el-form-item>
          <el-form-item label="所属机构" prop="unitCode" class="add-style">
            <el-cascader
              ref="tree"
              placeholder="请选择所属机构"
              clearable
              @change="handleChange"
              v-model="addUserForm.unitCode"
              :options="options"
              :props="defaultData"
              collapse-tags
              style="width:100%"
            ></el-cascader>
          </el-form-item>
          <el-form-item label="所属部门" prop="deptName" class="add-style">
            <el-select v-model="addUserForm.deptName" placeholder="请选择所属部门">
              <el-option
                v-for="item in deptNameList"
                :key="item.deptId"
                :label="item.deptName"
                :value="item.deptId"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="handleNoAdd('addUserForm')">取 消</el-button>
          <el-button type="primary" @click="handleSureAdd('addUserForm')">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 编辑弹框 -->
      <el-dialog title="修改岗位" :visible.sync="dialogEditUserFormVisible" width="30%">
        <el-form
          :model="editUserForm"
          :rules="addUserRules"
          ref="editUserForm"
          :label-width="labelWidth"
        >
          <el-form-item label="岗位名称" prop="postName" class="add-style">
            <el-input v-model="editUserForm.postName" autocomplete="off" style="width:50%"></el-input>
          </el-form-item>
          <el-form-item label="所属机构" prop="unitCode" class="add-style">
            <el-cascader
              ref="tree"
              v-model="editUserForm.unitCode"
              clearable
              @change="handleWorkData2"
              :options="options"
              :props="defaultData"
              style="width:100%"
            ></el-cascader>
          </el-form-item>
          <el-form-item label="所属部门" prop="deptId" class="add-style">
            <el-select
              v-model="editUserForm.deptId"
              @change="handleChangDept"
              placeholder="请选择所属部门"
            >
              <el-option
                v-for="item in deptNameListTwo"
                :key="item.deptId"
                :label="item.deptName"
                :value="item.deptId"
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
        postName: [
          { required: true, message: "请输入岗位名称", trigger: "blur" },
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
        postName: "",
        unitCodes: []
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
        postName: "",
        deptName: "",
        unitCode: []
      },
      editUserForm: {
        postName: "",
        // deptName: "",
        unitCode: [],
        deptIdList: [],
        deptId: ""
      },
      multipleSelection: [],
      deptNameList: [],
      deptNameListTwo: [],
      postId: "",
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
    // 改变所属部门
    handleChangDept(e) {
      this.editUserForm.deptId = e;
    },
    // 新增部门/岗位数据接口
    handleChange() {
      this.$axios
        .post("/banksys/system/dept/querydeptbyunit.do", {
          unitCode: this.addUserForm.unitCode
        })
        .then(res => {
          this.deptNameList = res.data.data;
        });
    },
    //编辑回显
    handleEdite(id, udList) {
      this.postId = id;
      let prop = {};
      prop = {
        postId: id,
        unitCodes: udList
      };
      this.$axios({
        method: "post",
        url: "/banksys/system/post/querypostdetails.do",
        data: prop
      })
        .then(res => {
          this.editUserForm = res.data.data;
          this.handleWorkData(this.editUserForm.unitCode);
          this.dialogEditUserFormVisible = true;
        })
        .catch(err => {
          this.$message.error("网路异常，请重试！！！");
        });
    },
    // 获取对应机构的下属部门岗位
    handleWorkData(v) {
      this.$axios
        .post("/banksys/system/dept/querydeptbyunit.do", {
          unitCode: v
        })
        .then(res => {
          this.deptNameListTwo = res.data.data;
        });
    },
    // 编辑
    handleWorkData2() {
      this.$axios
        .post("/banksys/system/dept/querydeptbyunit.do", {
          unitCode: this.editUserForm.unitCode
        })
        .then(res => {
          this.editUserForm.deptName = "";
          this.editUserForm.deptId = "";
          this.deptNameListTwo = res.data.data;
        });
    },
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
        deleteUsersList.push(deleteUsersData[i].postId);
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
            .post("/banksys/system/post/delpostbyid.do", {
              postIdList: deleteUsersList
            })
            .then(res => {
              this.loading = false;
              this.multipleSelection = [];
              if (res.data.code === "1001") {
                this.$message.success(res.data.msg);
                this.getTableData();
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
            postName: this.addUserForm.postName,
            unitCode: this.addUserForm.unitCode,
            deptId: this.addUserForm.deptName
          };
          this.loading = true;
          this.loadingText = "保存中，请稍后！！！";
          this.$axios({
            method: "post",
            url: "/banksys/system/post/savepostdata.do",
            data: prop
          })
            .then(res => {
              this.loading = false;
              this.dialogAddUserFormVisible = false;
              if (res.data.code == "1001") {
                this.$message.success(res.data.msg);
                this.getTableData();
                this.addUserForm.postName = "",
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
      this.addUserForm.postName = "",
      this.addUserForm.deptName = "",
      this.addUserForm.unitCode = []
    },
    //确定编辑部分
    handleSureEdit() {
      let prop = {};
      prop = {
        postName: this.editUserForm.postName,
        unitCode: this.editUserForm.unitCode,
        deptId: this.editUserForm.deptId,
        postId: this.postId
      };
      this.loading = true;
      this.loadingText = "保存中，请稍后！！！";
      this.$axios({
        method: "post",
        url: "/banksys/system/post/editpostdata.do",
        data: prop
      })
        .then(res => {
          this.loading = false;
          this.dialogEditUserFormVisible = false;
          if (res.data.code == "1001") {
            this.$message.success(res.data.msg);
            this.getTableData();
            this.editUserForm.deptId = "";
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
    },

    handleDelete(id) {
      let prop = {};
      let propData = [];
      propData.push(id);
      prop = {
        postIdList: propData
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
            url: "/banksys/system/post/delpostbyid.do",
            data: prop
          })
            .then(res => {
              this.loading = false;
              if (res.data.code === "1001") {
                this.$message.success(res.data.msg);
                this.getTableData();
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
        addTime: this.filters.addTime,
        postName: this.filters.postName,
        unitCodes: this.filters.unitCodes,
        pagenum: this.page,
        rows: this.pageSize
      };
      this.listLoading = true;
      this.$axios({
        method: "post",
        url: "/banksys/system/post/querypostdatalist.do",
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