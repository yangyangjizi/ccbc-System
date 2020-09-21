<template>
  <section>
    <!--工具条-->
    <el-col
      :span="24"
      class="toolbar"
    >
      <el-form :inline="true" :model="filters">
        <el-form-item>
          <div class="block">
            <span class="demonstration">添加时间</span>
            <el-date-picker
              v-model="filters.addTime"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </div>
          <div class="block">
            <span class="demonstration">统计时间</span>
            <el-date-picker
              v-model="filters.statisticalTime"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </div>
        </el-form-item>

        <el-form-item class="query">
          <el-button type="warning" v-on:click="getUsers" class="btncolor">查询</el-button>
        </el-form-item>
      </el-form>
      <!--列表-->
      <el-table
        :data="tableData"
        v-loading="listLoading"
        border
        style="width: 100%;"
        :header-cell-style="styleObj"
      >
        <el-table-column prop="branch" label="支行" align="center">
          <template slot-scope="scope">{{scope.row.branch}}</template>
        </el-table-column>
        <el-table-column prop="datasum" label="数据总量" align="center">
          <template slot-scope="scope">{{scope.row.datasum}}</template>
        </el-table-column>
        <el-table-column prop="successful" label="营销成功" align="center">
          <template slot-scope="scope">{{scope.row.successful}}</template>
        </el-table-column>
        <el-table-column prop="failure" label="营销失败" align="center">
          <template slot-scope="scope">{{scope.row.failure}}</template>
        </el-table-column>
        <el-table-column prop="nofeedback" label="未反馈/未营销" align="center">
          <template slot-scope="scope">{{scope.row.nofeedback}}</template>
        </el-table-column>
        <el-table-column prop="successrate" label="营销成功率" align="center">
          <template slot-scope="scope">{{scope.row.successrate}}</template>
        </el-table-column>
      </el-table>
      <!--页码-->

      <el-pagination
        layout="otal, sizes, prev, pager, next, jumper"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
        :current-page.sync="page"
        :page-size="pageSize"
        :page-sizes="[10, 15, 20, 30]"
        :total="total"
        background
      ></el-pagination>
    </el-col>
  </section>
</template>
<script>
import {
  getUserListPage,
  removeUser,
  batchRemoveUser,
  editUser,
  addUser
} from "../../api/api";
export default {
  data() {
    return {
      filters: {
        addTime: "",
        statisticalTime: ""
      },
      tableData: [],
      total: 0,
      page: 1,
      pageSize:10,
      listLoading: false,
      styleObj: {
        background: "#eef1f6",
        "border-color": "#dbdbdb",
        "text-align": "center"
      }
    };
  },
  methods: {
    handleCurrentChange(val) {
      this.page = val;
      this.getUsers();
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getUsers();
    },
    //获取用户列表
    getUsers() {
      let para = {
        page: this.page,
        rows: this.pageSize,
        addTime: this.filters.addTime,
        statisticalTime: this.filters.statisticalTime
      };
      this.listLoading = true;
      getUserListPage(para).then(res => {
        this.total = res.data.total;
        this.tableData = res.data.tableData;
        this.listLoading = false;
        //NProgress.done();
      }).catch(err => {
        this.$message.error("网络异常，请重试！！！")
      });
    }
  }
};
</script>
<style scoped>
.query {
  float: right;
}
.block {
  float: left;
  margin-right: 20px;
  margin-bottom: 10px;
}
.block span {
  margin-right: 10px;
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
.statime {
  margin-right: 20px;
}
</style>