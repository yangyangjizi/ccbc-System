<template>
  <section v-loading="loading" :element-loading-text="loadingText">
    <!--工具条-->
    <el-col :span="24" class="toolbar" v-if="!loading">
      <el-form :inline="true" :model="filters">
        <el-form-item class="el-forms input-box9" label="任务名称">
          <el-input v-model="filters.taskName" clearable placeholder="请输入任务名称" class="input-box7"></el-input>
        </el-form-item>
        <el-form-item class="el-forms" label="任务状态">
          <el-select v-model="filters.state" placeholder="请选择">
            <el-option
              v-for="item in stateList"
              :key="item.stateType"
              :label="item.stateTypeLabel"
              :value="item.stateTypeLabel"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-button type="warning" @click="getTableData" v-hasPermission="'cronJobQuery'">查询</el-button>
      </el-form>
      <el-row class="margin-box">
        <el-col>
          <el-button type="primary" @click="handleAddUser" v-hasPermission="'cronJobAdd'">新增</el-button>
          <el-button type="success" @click="handleRelease" v-hasPermission="'cronJobInto'">发布</el-button>
          <el-button type="info" @click="handleCancel" v-hasPermission="'cronJobOut'">取消发布</el-button>
          <el-button type="danger" @click="handleDeleteTask" v-hasPermission="'cronJobDel'">删除</el-button>
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
        <el-table-column prop="name" label="任务名称" show-overflow-tooltip align="center"></el-table-column>
        <el-table-column prop="cron" label="cron表达式" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column prop="job_status" label="任务状态" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column prop="plan_status" label="计划状态" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column prop="method_name" label="执行方法" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column prop="bean_name" label="bean实例" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column label="操作" align="center" min-width="140px">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="small"
              v-hasPermission="'cronJobEdit'"
              @click="handleEdite(scope.row.STimetaskId)"
              class="submit_color"
            >编辑</el-button>
            <el-button
              type="success"
              size="small"
              v-hasPermission="'cronJobStart'"
              @click="handleRunNow(scope.row.STimetaskId)"
              class="submit_color"
              v-if="scope.row.job_status=='已发布'&&(scope.row.plan_status=='正常运行'||scope.row.plan_status=='已暂停')"
            >立即执行</el-button>
            <el-button
              type="success"
              size="small"
              v-hasPermission="'cronJobPlan'"
              @click="handlePlan(scope.row.STimetaskId)"
              class="submit_color"
              v-if="scope.row.job_status=='已发布'&&(scope.row.plan_status=='未计划'||scope.row.plan_status=='已暂停'||scope.row.plan_status=='线程阻塞')"
            >计划</el-button>
            <el-button
              type="info"
              size="small"
              v-hasPermission="'cronJobStop'"
              @click="handleStop(scope.row.STimetaskId)"
              class="submit_color"
              v-if="scope.row.job_status=='已发布'&&scope.row.plan_status=='正常运行'"
            >暂停</el-button>
            <el-button
              type="danger"
              size="small"
              v-hasPermission="'cronJobRemove'"
              @click="handleRemove(scope.row.STimetaskId)"
              class="submit_color"
              v-if="scope.row.job_status=='已发布'&&(scope.row.plan_status=='正常运行'||scope.row.plan_status=='已暂停')"
            >移除</el-button>
          </template>
        </el-table-column>
      </el-table>
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
import axios from "axios";
import bus from "../../../../bus";
export default {
  data() {
    return {
      loading: "",
      loadingText: "拼命加载中",
      filters: {
        taskName: "",
        state: ""
      },
      removeShow: false,
      planShow: true,
      plan: "计划",
      stateList: [
        {
          stateType: "0",
          stateTypeLabel: "全部"
        },
        {
          stateType: "1",
          stateTypeLabel: "已发布"
        },
        {
          stateType: "2",
          stateTypeLabel: "未发布"
        }
      ],
      options: [],
      multipleSelection: [],
      STimetaskId: "",
      tableData: [],
      total: 0,
      page: 1,
      pageSize: 10,
      listLoading: false,
      labelWidth: "22%",
      styleObj: {
        background: "#eef1f6",
        "text-align": "center"
      }
    };
  },
  created() {
    bus.$on("handleChangeMata2", msg => {
      if (msg === "true") {
        this.getTableData();
      }
    });
   
  },
  mounted() {
    this.getTableData();
  },
  methods: {
   
    handleCheck() {
      this.getTableData();
    },
    //批量删除
    handleDeleteTask() {
      let deleteUsersData = this.multipleSelection;
      let deleteUsersList = [];
      for (var i in deleteUsersData) {
        deleteUsersList.push(deleteUsersData[i].STimetaskId);
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
            .post("/banksys/stimetask/deltimetask.do", {
              TimetaskId: deleteUsersList
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

    handleAddUser() {
      this.$router.push({ path: "/TimeTickAdd" });
    },

    //编辑回显
    handleEdite(id) {
      this.$confirm("修改cron表达式会导致计划取消，是否正确？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios
            .post("/banksys/stimetask/querystimetaskbyid.do", {
              TimetaskId: id
            })
            .then(res => {
              this.$router.push({
                path: "/TimeTickEdit",
                query: res.data.data
              });
            })
            .catch(err => {
              this.$message.error("网络异常，请重试！！！");
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消编辑"
          });
        });
    },
    //移除
    handleRemove(id) {
      this.$confirm(
        "移除job会导致定时任务永久不再执行，是否确认移除?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          this.$axios
            .post("/banksys/task/remove_task2job.do", {
              TimetaskId: id
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
    //计划
    handlePlan(id) {
      this.$confirm("job添加后会定时执行，是否确认把job添加到计划中?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios
            .post("/banksys/task/add_task2job.do", {
              TimetaskId: id
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
            message: "已取消计划"
          });
        });
    },
    //暂停
    handleStop(id) {
      this.$confirm(
        "job暂停后会定时任务不再执行，可能会影响到业务状态的变更，是否确认暂停?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          this.$axios
            .post("/banksys/task/stop_task2job.do", {
              TimetaskId: id
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
    //立即执行
    handleRunNow(id) {
      this.$confirm(
        "job立即执行一次，执行结束后不会再执行，仅用于测试定时任务的业务逻辑是否正确？",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          this.$axios
            .post("/banksys/task/run_task2job.do", {
              TimetaskId: id
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

    //执行
    handlePerform(id) {
      let prop = {};
      let propData = [];
      propData.push(id);
      prop = {
        deptIdList: propData
      };
      this.$confirm(
        "job立即执行一次，执行结束后不会再执行，仅用于测试定时任务的业务逻辑是否正确?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          this.$axios({
            method: "post",
            url: "/banksys/system/dept/deldeptdata.do",
            data: prop
          })
            .then(res => {
              if (res.data.code === "1001") {
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
    // 发布
    handleRelease() {
      let releaseData = this.multipleSelection;
      let releaseList = [];
      let releaseStateList = [];
      for (var i in releaseData) {
        releaseStateList.push(releaseData[i].job_status);
      }
      for (var i in releaseData) {
        releaseList.push(releaseData[i].STimetaskId);
      }
      if (releaseList.length === 0) {
        this.$message.error("请选中要发布的数据项！");
        return;
      }

      this.$confirm("确定要执行此操作吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.loading = true;
          this.loadingText = "发布中，请稍后！！！";
          for (var i in releaseStateList) {
            if (releaseStateList[i] == "已发布") {
              this.$alert("已发布的任务不可重复发布", "提示", {
                confirmButtonText: "确定"
              });
            }
          }
          this.$axios
            .post("/banksys/stimetask/updatetimetask.do", {
              TimetaskId: releaseList
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
            message: "已取消操作"
          });
        });
    },
    //取消发布
    handleCancel() {
      let releaseData = this.multipleSelection;
      let releaseList = [];
      let releaseplanList = [];
      for (var i in releaseData) {
        releaseList.push(releaseData[i].STimetaskId);
      }
      /*for (var i in releaseData) {
        releaseplanList.push(releaseData[i].is_concurrent);
      }*/
      if (releaseList.length === 0) {
        this.$message.error("请选中要取消发布的数据项！");
        return;
      }
      this.$confirm("确定要执行此操作吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.loading = true;
          /* for (var i in releaseStateList) {
          if(releaseStateList[i]=="正常运行"){
            this.$alert('只有未计划的任务可取消发布！，请先将任务移除计划', '提示', {
              confirmButtonText: '确定',
            });
          }
        }*/
          this.$axios
            .post("/banksys/stimetask/updatecantimetask.do", {
              TimetaskId: releaseList
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
            message: "已取消操作"
          });
        });
    },

    //页面列表展示
    getTableData() {
      let para = {
        taskName: this.filters.taskName,
        job_status: this.filters.state,
        pagenum: this.page,
        rows: this.pageSize
      };
      this.listLoading = true;
      this.$axios({
        method: "post",
        url: "/banksys/stimetask/querytimetask.do",
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
        taskName: this.filters.taskName,
        job_status: this.filters.state,
        pagenum: this.page,
        rows: this.pageSize
      };
      this.listLoading = true;
      this.$axios({
        method: "post",
        url: "/banksys/stimetask/querytimetask.do",
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