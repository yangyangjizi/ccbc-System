<template>
  <section>
    <!--工具条-->
    <el-col :span="24" class="toolbar" v-loading="loading" :element-loading-text="loadingText">
      <el-form :inline="true" :model="filters" class="clearfix">
        <div class="block">
          <span class="demonstration">添加时间</span>
          <el-date-picker
            v-model="filters.addTime"
            type="daterange"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </div>
        <div class="block">
          <span class="demonstration">统计时间</span>
          <el-date-picker
            v-model="filters.dateMonth"
            type="monthrange"
            format="yyyy-MM "
            value-format="yyyy-MM "
            range-separator="至"
            start-placeholder="开始月份"
            end-placeholder="结束月份"
          ></el-date-picker>
        </div>
        <div class="block">
          <span class="demonstration">银行名称:</span>
          <el-cascader
            placeholder="请输入查询名称"
            :options="filters.options"
            :props="filters.defaultData"
            @change="handleChangeCode"
            collapse-tags
            class="el-select-box"
          ></el-cascader>
        </div>

        <!-- <el-form-item class="query"> -->
          <el-button type="warning"  v-hasPermission="'butBALQuery'" v-on:click="getUsers" class="btncolor">查询</el-button>
        <!-- </el-form-item> -->
      </el-form>
      <el-button type="primary"  v-hasPermission="'butBALAdd'" @click="AccAdd" class="acc-box">新增</el-button>
      <el-button class="exportexcel_button"  v-hasPermission="'butBALExport'" v-on:click="exportexcel">导出</el-button>

      <!--列表-->
      <el-table
        :data="tableData"
        border
        style="width: 100%;"
        :header-cell-style="styleObj"
        v-loading="listLoading"
        ref="multipleTable"
        @select="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column label="序号" width="55" align="center">
          <template slot-scope="scope">{{scope.row.rownum}}</template>
        </el-table-column>
        <el-table-column label="银行名称" align="center" show-overflow-tooltip>
          <template slot-scope="scope">{{scope.row.authName}}</template>
        </el-table-column>
        <el-table-column label="存款人类别" align="center" show-overflow-tooltip>
          <template slot-scope="scope">{{scope.row.depositorName}}</template>
        </el-table-column>
        <el-table-column label="拒绝开户" width="55" align="center">
          <template slot-scope="scope">{{scope.row.refuseopenAccount}}</template>
        </el-table-column>
        <el-table-column label="延长开户审查期限" align="center">
          <template slot-scope="scope">{{scope.row.extendopenAccounttime}}</template>
        </el-table-column>
        <el-table-column label="控制账户交易" align="center" show-overflow-tooltip>
          <template slot-scope="scope">{{scope.row.conTradingName}}</template>
        </el-table-column>
        <el-table-column label="涉及企业名称" align="center" show-overflow-tooltip>
          <template slot-scope="scope">{{scope.row.enterpriseName}}</template>
        </el-table-column>
        <el-table-column label="采取措施原因" align="center" show-overflow-tooltip>
          <template slot-scope="scope">{{scope.row.measuresReason}}</template>
        </el-table-column>
        <el-table-column label="备注" align="center" show-overflow-tooltip>
          <template slot-scope="scope">{{scope.row.remark}}</template>
        </el-table-column>
        <el-table-column label="统计月份" align="center">
          <template slot-scope="scope">{{scope.row.startStatisticsTime}}</template>
        </el-table-column>
        <el-table-column prop="operation" label="操作" width="218" align="center">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="small"
              v-hasPermission="'butBALDetails'"
              @click="handleDetail(scope.row.id)"
              class="submit_color"
            >详情</el-button>
            <el-button
              type="primary"
              v-if="scope.row.status !=='1'"
              size="small"
              v-hasPermission="'butBALUpdate'"
              @click="handleEdit(scope.row.id)"
            >编辑</el-button>
            <el-button
              type="danger"
              v-if="scope.row.status !=='1'"
              size="small"
              v-hasPermission="'butBALDel'"
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
        background
      ></el-pagination>
    </el-col>
  </section>
</template>
<script>
import axios from "axios";
import bus from "../../bus";
export default {
  data() {
    return {
      loading: "",
      loadingText: "拼命加载中",
      filters: {
        addTime: "",
        statisticsTime: "",
        checkCode: "",
        options: [],
        defaultData: {
          //联级选择
          multiple: true,
          value: "unitCode",
          label: "unitName",
          children: "children"
        }
      },
      multipleSelection: [],
      checkId: [],
      queryTypeList: [],
      queryConTradingList: [],
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
  created() {
    bus.$on("handleChangeMata1", msg => {
      if (msg === "true") {
        this.getUsers();
      }
    });
  },
  mounted() {
    this.getUsers(), this.getBankList();
    this.getBankAccountType(), this.getBankAccountConTrading();
  },

  methods: {
    handleSizeChange(val) {
      this.pageSize = val;
      this.getUsers();
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 数据导出
    exportexcel() {
      this.loading = true;
      this.loadingText = "导出中，请稍后！！！";
      let sef = this;
      let req = {};
      for (var i = 0; i < this.multipleSelection.length; i++) {
        var id = this.multipleSelection[i].id;
        this.checkId.push(id);
      }
      req = {
        addTime: this.filters.addTime,
        statisticsTime: this.filters.dateMonth,
        unitCodes: this.filters.checkCode,
        id: this.checkId
      };
      axios({
        method: "post",
        data: req,
        url: "/banksys/banckaccount/exportexceinvoicelist.do",
        responseType: "blob",
        headers: {
          "Content-Type": "application/json; application/octet-stream"
        }
      })
        .then(res => {
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
          this.loading = false;
          this.checkId = [];
        })
        .catch(err => {
          console.log(err);
          this.loading = false;
        });
    },
    // 获取银行名称列表
    getBankList() {
      axios
        .post("/banksys/system/common/queryunitcode.do", {
          returnType: "tree",
          tableType: "0"
        })
        .then(res => {
          this.filters.options = res.data.list;
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleChangeCode(e, form, thsAreaCode) {
      this.filters.checkCode = e;
    },
    getBankAccountType() {
      axios
        .post("/banksys/banckaccount/queryDepositorType.do", "")
        .then(res => {
          this.queryTypeList = res.data.queryTypeList;
        })
        .catch(err => {
          console.log(err);
        });
    },
    getBankAccountConTrading() {
      axios
        .post("/banksys/banckaccount/queryConTradingType.do", "")
        .then(res => {
          this.queryConTradingList = res.data.queryConTradingList;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //详情
    handleDetail(id) {
      axios
        .post("/banksys/banckaccount/queryBankAccountbyid.do", {
          id: id
        })
        .then(res => {
          this.$router.push({
            path: "/NewBankAccountDetail",
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
        .post("/banksys/banckaccount/queryBankAccountbyid.do", {
          id: id
        })
        .then(res => {
          this.$router.push({
            path: "/NewBankAccountEdit",
            query: [res.data, this.queryTypeList, this.queryConTradingList]
          });
        })
        .catch(err => {
          this.$message.error("网络异常，请重试！！！");
        });
    },
    //删除
    handleDel(id) {
      this.$confirm("确认删除吗?", "提示", {
        type: "warning"
      })
        .then(() => {
          axios
            .post("/banksys/banckaccount/delBankAccountbyid.do", {
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
    handleCurrentChange(val) {
      this.page = val;
      this.getUsers();
    },
    //获取用户列表
    getUsers() {
      let para = {
        pagenum: this.page,
        rows: this.pageSize,
        addTime: this.filters.addTime,
        statisticsTime: this.filters.dateMonth,
        unitCodes: this.filters.checkCode
      };
      this.listLoading = true;
      axios({
        method: "post",
        url: "/banksys/banckaccount/queryBankAccountlist.do",
        data: para
      })
        .then(res => {
          if (res.data.code === "1001") {
            this.$message.success(res.data.msg);
            this.total = res.data.data.total;
            this.tableData = res.data.data.bankList;
            this.listLoading = false;
          } else {
            this.$message.error(res.data.msg);
            this.listLoading = false;
          }
        })
        .catch(err => {
          this.$message.error("网络异常，请重试！！！");
        });
    },
    AccAdd() {
      this.$router.push({ path: "/NewBankAccountAdd" });
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
.exportexcel_button {
  background-color: #7a94fd;
  color: white;
  margin-bottom: 10px;
}
.acc-box {
  margin-bottom: 10px;
}
</style>