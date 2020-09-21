<template>
  <section>
    <!--工具条-->
    <el-col :span="24" class="toolbar">
      <el-form :inline="true" :model="filters" v-if="!listLoading">
        <el-form-item class="el-forms" label="用户名">
          <el-input v-model="filters.loginName" clearable placeholder="请输入用户名" class="input-box7"></el-input>
        </el-form-item>
        <el-form-item class="el-forms marginLift" label="姓名">
          <el-input v-model="filters.staffName" clearable placeholder="请输入姓名" class="input-box7"></el-input>
        </el-form-item>
        <el-form-item class="el-forms marginLift" label="查询时间">
          <el-date-picker
            v-model="filters.startTime"
            type="date"
            placeholder="选择日期"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd"
          ></el-date-picker>至
          <el-date-picker
            v-model="filters.endTime"
            type="date"
            placeholder="选择日期"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
        <el-button type="warning" @click="handleCheck" v-hasPermission="'loginRecordQuery'">查询</el-button>
      </el-form>
      <el-row class="margin-box">
        <el-col>
          <el-button type="danger" @click="handleDown" v-if="!listLoading" v-hasPermission="'loginRecordExport'">导出</el-button>
        </el-col>
      </el-row>
      <!--列表-->
      <el-table
        :data="tableData"
        v-loading="listLoading"
        :element-loading-text="loadingText"
        border
        style="width: 100%;"
        :header-cell-style="styleObj"
        highlight-current-row
        @selection-change="handleClickRow"
      >
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column prop="number" label="序号" align="center" width="55"></el-table-column>
        <el-table-column prop="loginName" label="用户名" show-overflow-tooltip align="center"></el-table-column>
        <el-table-column prop="realName" label="姓名" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column prop="roleType" label="角色类型" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column prop="unitName" label="所属机构" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column prop="unitLevel" label="机构级别" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column prop="deptName" label="部门" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column prop="subName" label="上级机构" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column prop="loginNum" label="登录次数" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column prop="minLoginTime" label="最早登录时间" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              type="success"
              size="small"
              v-hasPermission="'loginRecordDetails'"
              @click="handleDetailData(scope.row.userId)"
              class="submit_color"
            >详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog
        title="详情"
        :visible.sync="dialogTableVisible"
        width="30%"
        :modal-append-to-body="false"
        class="tt-dialog"
      >
        <el-table :data="detailData" border>
          <el-table-column property="number" label="序号" width="50" align="center"></el-table-column>

          <el-table-column property="loginName" label="登录时间" align="center"></el-table-column>
        </el-table>
        <el-pagination
          layout="total, sizes, prev, pager, next, jumper"
          @current-change="handleCurrentChange1"
          @size-change="handleSizeChange1"
          :current-page.sync="page1"
          :page-sizes="[5, 8, 10]"
          :page-size="pageSize1"
          :total="total1"
          style="float:right"
          background
        ></el-pagination>
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
import AES from "@/utils/aes.js";
export default {
  data() {
    return {
      loadingText: "拼命加载中",
      filters: {
        startTime: "",
        endTime: "",
        loginName: "",
        staffName: ""
      },
      multipleSelection: [],
      userIdList: [],
      deptId: "",
      tableData: [],
      total: 0,
      page: 1,
      pageSize: 10,
      userId: "",
      detailData: [],
      total1: 0,
      page1: 1,
      pageSize1: 5,
      listLoading: true,
      dialogTableVisible: false,
      labelWidth: "22%",
      styleObj: {
        background: "#eef1f6",
        "border-color": "#dbdbdb",
        "text-align": "center"
      }
    };
  },
  created() {
    this.getNowTime();
  },
  mounted() {
    this.getTableData();
  },
  methods: {
    getNowTime() {
      var now = new Date();
      var year = now.getFullYear(); //得到年份
      var month = now.getMonth(); //得到月份
      var date = now.getDate(); //得到日期
      month = month + 1;
      month = month.toString().padStart(2, "0");
      date = date.toString().padStart(2, "0");
      var defaultDate = `${year}-${month}-${date}`;
      this.$set(this.filters, "startTime", defaultDate);
      this.$set(this.filters, "endTime", defaultDate);
    },
    handleCheck() {
      this.getTableData();
    },
    //批量导出
    handleDown() {
    //   this.userIdList = [];
    //   let userIdListData = this.multipleSelection;
      for (var i = 0; i < this.multipleSelection.length; i++) {
        this.userIdList.push(this.multipleSelection[i].userId);
      }
      this.listLoading = true;
      this.loadingText = "导出中，请稍后！！！";
      let para = {
        startTime: this.filters.startTime,
        endTime: this.filters.endTime,
        loginName: this.filters.loginName,
        staffName: this.filters.staffName,
        userIdList: this.userIdList
      };
      this.$axios({
        method: "post",
        url: "/banksys/system/login/exportuserloginrecord.do",
        data: para,
        responseType: "blob",
        headers: {
          "Content-Type": "application/json; application/octet-stream"
        }
      })
        .then(res => {
          this.listLoading = false;
          const type = "application/zip";
          const blob = new Blob([res.data], { type: type });
          const downloadElement = document.createElement("a");
          const href = window.URL.createObjectURL(blob);
          const name = decodeURI(
            res.headers["content-disposition"].split("=")[1]
          );
          downloadElement.href = href;
          downloadElement.download = name;
          document.body.appendChild(downloadElement);
          downloadElement.click();
          document.body.removeChild(downloadElement);
          window.URL.revokeObjectURL(href);
          this.userIdList = [];
        })
        .catch(err => {
          this.$message.error("网络异常，请重试！！！");
        });
    },
    // 获取点击的行
    handleClickRow(selection, row) {
      console.log(selection);
      this.multipleSelection = selection;
    },
    // handleClickAllRow(selection) {
    //   this.multipleSelection = selection;
    // },
    //页面列表展示
    getTableData() {
      let para = {
        startTime: this.filters.startTime,
        endTime: this.filters.endTime,
        loginName: this.filters.loginName,
        staffName: this.filters.staffName,
        pagenum: this.page,
        rows: this.pageSize
      };
      this.listLoading = true;
      this.loadingText = "拼命加载中";
      this.$axios({
        method: "post",
        url: "/banksys/system/login/queryuserloginrecord.do",
        data: para
      })
        .then(res => {
          console.log(res);
          if (res.data.code === "1001") {
            this.total = res.data.total;
            this.tableData = JSON.parse(AES.decrypt(res.data.list));
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
        startTime: this.filters.startTime,
        endTime: this.filters.endTime,
        loginName: this.filters.loginName,
        staffName: this.filters.staffName,
        pagenum: this.page,
        rows: this.pageSize
      };
      this.listLoading = true;
      this.loadingText = "拼命加载中";
      this.$axios({
        method: "post",
        url: "/banksys/system/login/queryuserloginrecord.do",
        data: para
      })
        .then(res => {
          if (res.data.code === "1001") {
            this.total = res.data.total;
            this.tableData = JSON.parse(AES.decrypt(res.data.list));
            this.listLoading = false;
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch(err => {
          this.$message.error("网络异常，请重试！！！");
        });
    },
    handleDetailData(userId) {
      this.userId = userId;

      this.getDetailData();
    },
    getDetailData() {
      let para = {
        startTime: this.filters.startTime,
        endTime: this.filters.endTime,
        userId: this.userId,
        pagenum: this.page1,
        rows: this.pageSize1
      };
      this.$axios({
        method: "post",
        url: "/banksys/system/login/queryloginrecordbyuserid.do",
        data: para
      })
        .then(res => {
          console.log(res);
          if (res.data.code === "1001") {
            this.dialogTableVisible = true;
            this.total1 = res.data.total;
            this.detailData = JSON.parse(AES.decrypt(res.data.list));
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch(err => {
          this.$message.error("网络异常，请重试！！！");
        });
    },
    getDetailData2() {
      let para = {
        startTime: this.filters.startTime,
        endTime: this.filters.endTime,
        userId: this.userId,
        pagenum: this.page1,
        rows: this.pageSize1
      };
      this.$axios({
        method: "post",
        url: "/banksys/system/login/queryloginrecordbyuserid.do",
        data: para
      })
        .then(res => {
          console.log(res);
          if (res.data.code === "1001") {
            this.total1 = res.data.total;
            this.detailData = JSON.parse(AES.decrypt(res.data.list));
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
    },
    handleCurrentChange1(val) {
      this.page1 = val;
      this.getDetailData2();
    },
    handleSizeChange1(val) {
      this.pageSize1 = val;
      this.getDetailData2();
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
.marginLift {
  margin-left: 30px;
}
.tt-dialog /deep/ .el-dialog__body {
  padding-bottom: 64px !important;
}
.tt-dialog /deep/ .el-dialog__body {
  padding-top: 0px !important;
}
</style>