<template>
  <section>
    <!--工具条-->
    <el-col :span="24" class="toolbar">
      <el-form ref="epireadyRef" :inline="true" :model="filters" style="overflow: hidden;">
        <el-form-item label="创建时间" prop="addTime">
          <el-date-picker
            v-model="filters.addTime"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="统计时间" prop="statisticsTime">
          <el-date-picker
            v-model="filters.statisticsTime"
            type="monthrange"
            range-separator="至"
            start-placeholder="开始月份"
            end-placeholder="结束月份"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="银行名称" prop="value">
          <el-cascader
            v-model="filters.value"
            placeholder="请输入查询名称"
            :options="filters.options"
            :props="filters.defaultData"
            @change="handleChangeCode"
            collapse-tags
            class="el-cascader-box"
          ></el-cascader>
        </el-form-item>
        <div class="query">
          <el-button type="warning" v-on:click="getUsers" v-hasPermission="'epireadyQuery'">查询</el-button>
          <el-button type="primary" v-on:click="resetData" v-hasPermission="'epireadyReset'">重置</el-button>
        </div>
      </el-form>

      <el-button
        type="primary"
        v-on:click="epiAdd"
        v-hasPermission="'butELAdd'"
        class="margin_box"
      >新增</el-button>
      <!--列表-->
      <el-table
        :data="tableData"
        v-loading="listLoading"
        border
        style="width: 100%;"
        :header-cell-style="styleObj"
        highlight-current-row
      >
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column prop="number" label="序号" align="center" width="55">
          <template slot-scope="scope">{{scope.row.number}}</template>
        </el-table-column>
        <el-table-column prop="firmName" label="企业名称" align="center" show-overflow-tooltip>
          <template slot-scope="scope">{{scope.row.entName}}</template>
        </el-table-column>
        <el-table-column prop="legalName" label="开户日期" show-overflow-tooltip align="center">
          <template slot-scope="scope">{{scope.row.openaccountTime}}</template>
        </el-table-column>
        <el-table-column prop="regCapital" label="填报银行" show-overflow-tooltip align="center">
          <template slot-scope="scope">{{scope.row.bankName}}</template>
        </el-table-column>
        <el-table-column prop="setTime" label="开户3日内总入金总金额（万）" show-overflow-tooltip align="center">
          <template slot-scope="scope">{{scope.row.threedaysinSum}}</template>
        </el-table-column>
        <el-table-column
          prop="runAddress"
          label="开户3日内总出金总金额（万）"
          show-overflow-tooltip
          align="center"
        >
          <template slot-scope="scope">{{scope.row.threedaysoutSum}}</template>
        </el-table-column>
        <el-table-column prop="nodeName" label="存款人类别" show-overflow-tooltip align="center">
          <template slot-scope="scope">{{scope.row.depositorType}}</template>
        </el-table-column>
        <el-table-column prop="disStatus" label="账户类别" show-overflow-tooltip align="center">
          <template slot-scope="scope">{{scope.row.accountType}}</template>
        </el-table-column>
        <el-table-column prop="disStatus" label="企业行业类别" show-overflow-tooltip align="center">
          <template slot-scope="scope">{{scope.row.entbankType}}</template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="300">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="small"
              v-hasPermission="'epireadyDetails'"
              @click="handleDetail(scope.row.enterAccountId)"
              class="submit_color"
            >详情</el-button>
            <el-button
              type="primary"
              v-if="scope.row.status !=='1'"
              v-hasPermission="'butELUpdate'"
              size="small"
              @click="handleEdit( scope.row.enterAccountId)"
            >编辑</el-button>
            <el-button
              type="danger"
              v-hasPermission="'butELDel'"
              v-if="scope.row.status !=='1'"
              size="small"
              @click="handleDel(scope.row.enterAccountId)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--页码-->

      <el-pagination
        layout="total, sizes, prev, pager, next, jumper"
        @current-change="handleCurrentChange"
        :page-size="pageSize"
        @size-change="handleSizeChange"
        :current-page.sync="page"
        :page-sizes="[10, 15, 20, 30]"
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
  name: "",
  data() {
    return {
      filters: {
        addTime: "",
        statisticsTime: "",
        options: [],
        defaultData: {
          //联级选择
          multiple: true,
          value: "unitCode",
          label: "unitName",
          children: "children"
        }
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
  created() {
    bus.$on("handleChangeMata2", msg => {
      if (msg === "true") {
        this.getUsers();
      }
    });
  },
  mounted() {
    this.getUsers();
    this.getBankList();
  },
  methods: {
    handleChangeCode(e, form, thsAreaCode) {
      this.filters.checkCode = e;
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
    //重置查询条件
    resetData() {
      this.$refs.epireadyRef.resetFields();
    },
    //获取用户列表
    getUsers() {
      let para = {
        pagenum: this.page,
        rows: this.pageSize,
        addTime: this.filters.addTime,
        statisticsTime: this.filters.statisticsTime,
        unitCodes: this.filters.checkCode
      };
      this.listLoading = true;
      axios({
        method: "post",
        url: "/banksys/enteraccount/queryenteraccountlist.do",
        data: para
      })
        .then(res => {
          if (res.data.code === "1001") {
            this.$message.success(res.data.msg);
            this.total = res.data.data.total;
            this.tableData = res.data.data.list;
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

    handleDetail(id) {
      axios
        .post("/banksys/enteraccount/queryenteraccountbyid.do", {
          enterAccountId: id
        })
        .then(res => {
          this.$router.push({
            path: "/EpireadyDetail",
            query: res.data.data
          });
        })
        .catch(err => {
          this.$message.error("网络异常，请重试！！！");
        });
    },
    handleEdit(id) {
      axios
        .post("/banksys/enteraccount/queryenteraccountbyid.do", {
          enterAccountId: id
        })
        .then(res => {
          this.$router.push({
            path: "/EpireadyEdit",
            query: res.data.data
          });
        })
        .catch(err => {
          this.$message.error("网络异常，请重试！！！");
        });
    },
    handleDel(id) {
      this.$confirm("确认删除吗?", "提示", {
        type: "warning"
      })
        .then(() => {
          axios
            .post("/banksys/enteraccount/delenteraccountbyid.do", {
              enterAccountId: id
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
    handleSizeChange(val) {
      this.pageSize = val;
      this.getUsers();
    },
    epiAdd() {
      this.$router.push({ path: "/EpireadyAdd" });
    }
  },
  components: {}
};
</script>

<style  scoped>
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
.el-form-item__label {
  width: 124px !important;
  font-size: 12px !important;
}
.el-form-item {
  float: left;
}

.submit_color {
  background-color: #858ffd;
  border-color: #858ffd;
}
.submit_color:hover {
  background-color: #a6acef;
  border-color: #a6acef;
}
.margin_box {
  margin-bottom: 10px !important;
}
</style>
