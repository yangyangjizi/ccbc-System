<template>
  <section v-loading="loading" :element-loading-text="loadingText">
    <!--工具条-->
    <el-col :span="24" class="toolbar" v-if="!loading">
      <el-row class="margin-box">
        <el-col>
          <el-button type="primary" @click="handleAddUser" v-hasPermission="'deptManageAdd'">新增</el-button>
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
        <el-table-column prop="description" label="bean实例名称" show-overflow-tooltip align="center"></el-table-column>
        <el-table-column prop="method_name" label="执行方法" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column prop="bean_name" label="bean实例" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column prop="pageType" label="类型" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column label="操作" align="center" min-width="120px">
          <template slot-scope="scope">
            <el-button
              type="danger"
              size="small"
              v-hasPermission="'deptManageDel'"
              @click="handleDelete(scope.row.STimetaskbeanId)"
              class="submit_color"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 新增弹框 -->
      <el-dialog
        title="创建bean实例"
        :visible.sync="dialogAddUserFormVisible"
        :modal="false"
        width="50%"
      >
        <el-form
          :model="addUserForm"
          ref="addUserForm"
          :rules="addUserRules"
          :label-width="labelWidth"
        >
          <el-form-item label="bean实例名称" prop="instanceName" class="add-style">
            <el-input
              v-model="addUserForm.instanceName"
              autocomplete="off"
              placeholder="请bean实例名称"
              style="width:60%"
            ></el-input>
          </el-form-item>
          <el-form-item label="执行方法" prop="methods" style="width:100%">
            <el-input placeholder="请输入执行方法" v-model="addUserForm.methods" style="width:60%"></el-input>
          </el-form-item>
          <el-form-item label="Bean实例" prop="instance" class="add-style">
            <el-input placeholder="请输入Bean实例" v-model="addUserForm.instance" style="width:60%"></el-input>
          </el-form-item>
           <el-form-item label="类型" prop="pageType" class="add-style">
            <el-select v-model="addUserForm.pageType" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="handleNoAdd('addUserForm')">取 消</el-button>
          <el-button type="primary" @click="handleSureAdd('addUserForm')">确 定</el-button>
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
      options: [{
          value: '5',
          label: '日常核查'

        }, {
          value: '6',
          label: '滚动排查'
        }, {
          value: '7',
          label: '风险筛查'
        }, {
          value: '8',
          label: '年检'
        }],
      loading: "",
      loadingText: "拼命加载中",
      addUserRules: {
        instanceName: [
          { required: true, message: "请输入实例名称", trigger: "blur" }
        ],
        methods: [
          { required: true, message: "请输入执行方法", trigger: "blur" }
        ],
        instance: [
          { required: true, message: "请输入bean实例", trigger: "blur" }
        ],
        pageType:[
          { required: true, message: "请选择类型", trigger: "blur" }
        ]
      },
      filters: {
        taskName: "",
        state: ""
      },

      addUserForm: {
        instanceName: "",
        methods: "",
        instance: "",
        pageType:""
      },
      multipleSelection: [],
      deptId: "",
      tableData: [],
      total: 0,
      page: 1,
      pageSize: 10,
      listLoading: false,
      dialogAddUserFormVisible: false,
      labelWidth: "22%",
      styleObj: {
        "background": "#eef1f6",
        "text-align": "center"
      }
    };
  },
  created() {},
  mounted() {
    this.getTableData();
  },
  methods: {
    // 获取bean实例

    handleCheck() {
      this.getTableData();
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
            description: this.addUserForm.instanceName,
            method_name: this.addUserForm.methods,
            bean_name: this.addUserForm.instance,
            pageType: this.addUserForm.pageType
          };
          this.loading = true;
          this.$axios({
            method: "post",
            url: "/banksys/stimetaskbean/savestimetaskbean.do",
            data: prop
          })
            .then(res => {
              if (res.data.code == "1001") {
                 this.loading = false;
                  this.dialogAddUserFormVisible = false;
                this.$message.success(res.data.msg);
                  (this.addUserForm.instanceName = ""),
                  (this.addUserForm.methods = ""),
                  (this.addUserForm.instance = "");
                  this.getTableData();
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
      (this.addUserForm.instanceName = ""),
        (this.addUserForm.methods = ""),
        (this.addUserForm.instance = ""),
        (this.addUserForm.pageType = "");
    },

    handleDelete(id) {
      let prop = {};
      prop = {
        STimetaskbeanId	: id
      };
      this.$confirm("此操作将删除角色, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios({
            method: "post",
            url: "/banksys/stimetaskbean/deltimetaskbeanbyid.do",
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
        taskName: this.filters.taskName,
        state: this.filters.state,
        pagenum: this.page,
        rows: this.pageSize
      };
      this.listLoading = true;
      this.$axios({
        method: "post",
        url: "/banksys/stimetaskbean/querytimetaskbean.do",
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