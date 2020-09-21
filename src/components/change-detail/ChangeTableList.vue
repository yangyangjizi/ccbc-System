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
              v-model="filters.statisticsTime"
              type="monthrange"
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
              class="input-box6"
            ></el-cascader>
          </div>
        </el-form-item>

        <el-form-item class="query">
          <el-button type="warning" v-on:click="getTableList" v-hasPermission="'butCTLQuery'">查询</el-button>
          <el-button type="primary" v-on:click="resetData">重置</el-button>
        </el-form-item>
      </el-form>
      <el-button type="primary" @click="handleAdd" class="margin_box" v-hasPermission="'butCTLAdd'">新增</el-button>
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
        <el-table-column prop="openAccountOrg" label="开户机构" show-overflow-tooltip align="center">
          <template slot-scope="scope">{{scope.row.openAccountOrg}}</template>
        </el-table-column>
        <el-table-column prop="accountNumber" label="账号" show-overflow-tooltip align="center">
          <template slot-scope="scope">{{scope.row.accountNumber}}</template>
        </el-table-column>
        <el-table-column prop="accountName" label="账户名称" show-overflow-tooltip align="center">
          <template slot-scope="scope">{{scope.row.accountName}}</template>
        </el-table-column>
        <el-table-column
          prop="checkAccountType"
          label="排查账户类型"
          show-overflow-tooltip
          align="center"
        >
          <template slot-scope="scope">{{scope.row.checkAccountType}}</template>
        </el-table-column>
        <el-table-column prop="problemDesc" label="存在问题的具体描述" show-overflow-tooltip align="center">
          <template slot-scope="scope">{{scope.row.problemDesc}}</template>
        </el-table-column>
        <el-table-column
          prop="ifdubiousDeal"
          label="是否存在交易违法违规或可疑交易"
          show-overflow-tooltip
          align="center"
        >
          <template slot-scope="scope">{{scope.row.ifdubiousDeal}}</template>
        </el-table-column>
        <el-table-column prop="ifreorganize" label="是否整改" show-overflow-tooltip align="center">
          <template slot-scope="scope">{{scope.row.ifreorganize}}</template>
        </el-table-column>
        <el-table-column
          prop="reorganizeCondition"
          label="未整改整改情况"
          show-overflow-tooltip
          align="center"
        >
          <template slot-scope="scope">{{scope.row.reorganizeCondition}}</template>
        </el-table-column>
        <el-table-column prop="reorganizeDept" label="牵头整改部门" show-overflow-tooltip align="center">
          <template slot-scope="scope">{{scope.row.reorganizeDept}}</template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="300">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="small"
              v-hasPermission="'butCTLDetails'"
              @click="handleDetail(scope.row.id)"
              class="submit_color"
            >详情</el-button>
            <el-button
              type="primary"
              v-hasPermission="'butCTLUpdate'"
              v-if="scope.row.STATUS !=='1'"
              size="small"
              @click="handleEdit( scope.row.id)"
            >编辑</el-button>
            <el-button
              type="danger"
              v-hasPermission="'butCTLDel'"
              v-if="scope.row.STATUS !=='1'"
              size="small"
              @click="handleDel(scope.row.id)"
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
  name: "ChangeTableList",
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
        this.getTableList();
      }
    });
  },
  mounted() {
    this.getTableList();
    this.getBankList();
  },
  methods: {
    //重置查询条件
    resetData() {
      this.filters.addTime = "";
      this.filters.statisticsTime = "";
      this.filters.options = [];
    },
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
    handleDetail(id) {
      axios
        .post("/banksys/riskinspect/queryriskinspectdetailsbyid.do", {
          id: id
        })
        .then(res => {
          this.$router.push({
            path: "/ChangeTableDetail",
            query: res.data.data
          });
        })
        .catch(err => {
          this.$message.error("网络异常，请重试！！！");
        });
    },
    handleEdit(id) {
      axios
        .post("/banksys/riskinspect/queryriskinspectdetailsbyid.do", {
          id: id
        })
        .then(res => {
          this.$router.push({
            path: "/ChangeTableEdit",
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
            .post("/banksys/riskinspect/delriskinspectbyid.do", {
              id: id
            })
            .then(res => {
              if (res.data.code == "1001") {
                this.$message.success(res.data.msg);
                this.getTableList();
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
      this.getTableList();
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getTableList();
    },
    //获取展示数据列表
    getTableList() {
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
        url: "/banksys/riskinspect/queryriskinspectlist.do",
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
    handleAdd() {
      this.$router.push({ path: "/ChangeTableAdd" });
    }
  },
  components: {}
};
</script>

<style scoped>
.submit_color {
  background-color: #858ffd;
  border-color: #858ffd;
}
.submit_color:hover {
  background-color: #a6acef;
  border-color: #a6acef;
}
.statime {
  margin-right: 20px;
}
.margin_box {
  margin-bottom: 10px !important;
}
</style>
