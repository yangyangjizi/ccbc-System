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
          <el-button type="warning" v-on:click="getUsers" v-hasPermission="'butVLQuery'">查询</el-button>
          <el-button type="primary" v-on:click="resetData">重置</el-button>
        </el-form-item>
      </el-form>
      <el-button type="primary" @click="handleAdd" v-hasPermission="'butVLAdd'" class="margin_box">新增</el-button>
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
        <el-table-column prop="ENTNAME" label="企业名称" show-overflow-tooltip align="center">
          <template slot-scope="scope">{{scope.row.ENTNAME}}</template>
        </el-table-column>
        <el-table-column
          prop="BUSLICENID"
          label="营业执照注册号（统一社会信用代码）"
          show-overflow-tooltip
          align="center"
        >
          <template slot-scope="scope">{{scope.row.BUSLICENID}}</template>
        </el-table-column>
        <el-table-column prop="REGISTERADDRESS" label="注册地区" show-overflow-tooltip align="center">
          <template slot-scope="scope">{{scope.row.REGISTERADDRESS}}</template>
        </el-table-column>
        <el-table-column prop="OPENBANK" label="开户银行" show-overflow-tooltip align="center">
          <template slot-scope="scope">{{scope.row.OPENBANK}}</template>
        </el-table-column>
        <el-table-column prop="statisticsTime" label="统计时间" show-overflow-tooltip align="center">
          <template slot-scope="scope">{{scope.row.statisticsTime}}</template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="300">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="small"
              v-hasPermission="'butVLDetails'"
              @click="handleDetail(scope.row.TESTACCOUNTID)"
              class="submit_color"
            >详情</el-button>
            <el-button
              type="primary"
              v-hasPermission="'butVLUpdate'"
              v-if="scope.row.STATUS !=='1'"
              size="small"
              @click="handleEdit( scope.row.TESTACCOUNTID)"
            >编辑</el-button>
            <el-button
              type="danger"
              v-hasPermission="'butVLDel'"
              v-if="scope.row.STATUS !=='1'"
              size="small"
              @click="handleDel(scope.row.TESTACCOUNTID)"
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
        .post("/banksys/testaccount/querytestaccountbyid.do", {
          testAccountId: id
        })
        .then(res => {
          this.$router.push({
            path: "/ViolationsDetail",
            query: res.data.data
          });
        })
        .catch(err => {
          this.$message.error("网络异常，请重试！！！");
        });
    },
    handleEdit(id) {
      axios
        .post("/banksys/testaccount/querytestaccountbyid.do", {
          testAccountId: id
        })
        .then(res => {
          this.$router.push({
            path: "/ViolationsEdit",
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
            .post("/banksys/testaccount/deltestaccountbyid.do", {
              testAccountId: id
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
              this.$message.error("网络异常，请重试！！！");
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
        statisticsTime: this.filters.statisticsTime,
        unitCodes: this.filters.checkCode
      };
      this.listLoading = true;
      axios({
        method: "post",
        url: "/banksys/testaccount/queryletstestaccountlist.do",
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
      this.$router.push({ path: "/ViolationsAdd" });
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getUsers();
    }
  }
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