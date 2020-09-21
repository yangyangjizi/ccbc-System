<template>
  <section>
    <!--工具条-->
    <el-col :span="24" class="toolbar">
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
          <el-button type="primary" @click="AccAdd">新增</el-button>
        </el-form-item>
      </el-form>
      <!--列表-->
      <el-table
        :data="tableData"
        border
        style="width: 100%;"
        :header-cell-style="styleObj"
        v-loading="listLoading"
      >
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column label="地区" align="center">
          <template slot-scope="scope">天津</template>
        </el-table-column>
        <el-table-column label="存款人类别" align="center">
          <template slot-scope="scope">{{scope.row.depositorType}}</template>
        </el-table-column>
        <el-table-column label="拒绝开户" align="center">
          <template slot-scope="scope">{{scope.row.refuseopenAccount}}</template>
        </el-table-column>
        <el-table-column label="延长开户审查期限" align="center">
          <template slot-scope="scope">{{scope.row.extendopenAccounttime}}</template>
        </el-table-column>
        <el-table-column label="控制账户交易" align="center">
          <el-table-column label="暂停非柜面业务" align="center">
            <template slot-scope="scope">{{scope.row.suspend}}</template>
          </el-table-column>
          <el-table-column label="限制交易规模或频率" align="center">
            <template slot-scope="scope">{{scope.row.limitScale}}</template>
          </el-table-column>
          <el-table-column label="停止支付" align="center">
            <template slot-scope="scope">{{scope.row.stopPayment}}</template>
          </el-table-column>
          <el-table-column label="终止业务" align="center">
            <template slot-scope="scope">{{scope.row.stopBusiness}}</template>
          </el-table-column>
        </el-table-column>
        <el-table-column prop="statisticsTime" label="统计时间" align="center">
          <template slot-scope="scope">{{scope.row.statisticsTime}}</template>
        </el-table-column>
        <el-table-column prop="operation" label="操作" width="218" align="center" fixed="right">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="small"
              @click="handleDetail(scope.row.id)"
              class="submit_color"
            >详情</el-button>
            <el-button
              type="primary"
              v-if="scope.row.status !=='1'"
              size="small"
              @click="handleEdit( scope.row.id)"
            >编辑</el-button>
            <el-button
              type="danger"
              v-if="scope.row.status !=='1'"
              size="small"
              @click="handleDel( scope.row.id)"
            >删除</el-button>
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
      pageSize: 10,
      listLoading: false,
      styleObj: {
        background: "#eef1f6",
        "border-color": "#dbdbdb",
        "text-align": "center"
      }
    };
  },
  mounted() {
    this.getUsers(), this.getBankAccountType();
  },
  methods: {
    //详情
    handleDetail(id) {
      axios
        .post("/banksys/banckaccount/queryBankAccountbyid.do", {
          id: id
        })
        .then(res => {
          this.$router.push({
            path: "/BankAccountDetail",
            query: res.data
          });
        })
        .catch(err => {
          this.$message.error("网络异常，请重试！！！");
        });
    },
    //编辑
    handleEdit(id) {
      axios
        .post("/banksys/banckaccount/editBankAccount.do", {
          id: id
        })
        .then(res => {
          this.$router.push({
            path: "/BankAccountEdit",
            query: res.data
          });
        });
    },
    //删除
    handleDel(id) {
      this.$confirm("确认删除吗?", "提示", {
        type: "warning"
      })
        .then(() => {
          axios
            .post("/banksys/banckaccount/delBankAccount.do", {
              id: id
            })
            .then(res => {
              if (res.data.code == "1001") {
                this.$message.success(res.data.msg);
                this.getUsers();
              } else {
                this.$message.error(res.data.msg);
              }
            })
            .catch(err => {
              this.$message.error(res.data.msg);
            });
        })
        .catch(() => {
          this.$message.error("取消删除");
        });
    },
    getBankAccountType() {
      axios
        .post("/banksys/banckaccount/queryDepositorType.do", "")
        .then(res => {
          this.bankForm.queryTypeList = res.data.queryTypeList;
        })
        .catch(err => {
          console.log(err);
        });
    },
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
        pagenum: this.page,
        rows: this.pageSize,
        addTime: this.filters.addTime,
        statisticalTime: this.filters.statisticalTime
      };
      this.listLoading = true;
      axios({
        method: "post",
        url: "/banksys/banckaccount/queryBankAccountlist.do",
        data: para
      })
        .then(res => {
          this.total = res.data.total;
          this.tableData = res.data.data.bankList;
          this.listLoading = false;
        })
        .catch(err => {
          this.$message.error("网络异常，请重试！！！");
        });
    },
    AccAdd() {
      this.$router.push({ path: "/BankAccountAdd" });
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
.ycolor {
  background-color: #858ffd;
  border-color: #858ffd;
}
.ycolor:hover {
  background-color: #a6acef;
  border-color: #a6acef;
}
.el-table--border th,
.el-table__fixed-right-patch {
  border-bottom: 1px solid #dbdbdb !important;
}
.el-table__row .cell {
  text-align: center !important;
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
.el-table__header-wrapper {
  text-align: center;
}
.cell button {
  float: center;
}
.statime {
  margin-right: 20px;
}
.submit_color {
  background: #858ffd;
  border-color: #858ffd;
}
.submit_color:hover {
  background-color: #a6acef;
  border-color: #a6acef;
}
</style>