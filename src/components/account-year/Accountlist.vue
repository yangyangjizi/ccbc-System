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
            ></el-cascader>
          </div>
        </el-form-item>

        <el-button
          type="warning"
          v-on:click="getUsers"
          v-hasPermission="'butAILQuery'"
          class="btncolor"
        >查询</el-button>
        <el-button type="primary" v-on:click="resetData">重置</el-button>
      </el-form>
      <el-button type="primary" @click="handleAdd" v-hasPermission="'butAILAdd'" class="add_box">新增</el-button>
      <!--列表-->
      <el-table
        :data="tableData"
        border
        style="width: 100%;"
        :header-cell-style="styleObj"
        highlight-current-row
      >
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column prop="number" label="序号" align="center" width="55">
          <template slot-scope="scope">{{scope.row.number}}</template>
        </el-table-column>
        <el-table-column prop="unitName" label="银行名称" align="center" show-overflow-tooltip>
          <template slot-scope="scope">{{scope.row.unitName}}</template>
        </el-table-column>
        <el-table-column prop="createIime" label="填报日期" align="center" show-overflow-tooltip>
          <template slot-scope="scope">{{scope.row.createIime}}</template>
        </el-table-column>
        <el-table-column prop="createName" label="填报人" align="center">
          <template slot-scope="scope">{{scope.row.createName}}</template>
        </el-table-column>
        <el-table-column prop="reeatePhone" label="电话" align="center">
          <template slot-scope="scope">{{scope.row.reeatePhone}}</template>
        </el-table-column>
        <el-table-column prop="statisticsTime" label="统计月份" align="center">
          <template slot-scope="scope">{{scope.row.statisticsTime}}</template>
        </el-table-column>
        <el-table-column prop="operation" label="操作" width="300" align="center">
          <template slot-scope="scope">
            <el-button
              size="small"
              type="success"
              v-hasPermission="'butAILDetails'"
              @click="handleDetail(scope.row.id)"
              class="ycolor"
            >详情</el-button>
            <el-button
              size="small"
              type="primary"
              v-if="scope.row.status !=='1'"
              v-hasPermission="'butAILUpdate'"
              @click="handleEdit( scope.row.id)"
            >编辑</el-button>
            <el-button
              size="small"
              type="danger"
              v-hasPermission="'butAILDel'"
              v-if="scope.row.status !=='1'"
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
      filters: {
        addTime: "",
        statisticalTime: "",
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
      tableData: [],
      total: 0,
      page: 1,
      pageSize: 10,
      listLoading: false,
      accountType: [],
      styleObj: {
        background: "#eef1f6",
        "border-color": "#dbdbdb",
        "text-align": "center"
      }
    };
  },

  created() {
    bus.$on("handleChangeMata", msg => {
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
      this.filters.statisticalTime = "";
      this.filters.options = [];
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getUsers();
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
    handleDetail(id) {
      axios
        .post("/banksys/accountyearly/querydetailsbymainid.do", {
          id: id
        })
        .then(res => {
          this.$router.push({
            path: "/NewAccountDetail",
            query: res.data.deta
          });
        })
        .catch(err => {
          this.$message.error("网络异常，请重试！！！");
        });
    },
    handleEdit(id) {
      axios
        .post("/banksys/accountyearly/querydetailsbymainid.do", {
          id: id
        })
        .then(res => {
          this.$router.push({
            path: "/NewAccountEdit",
            query: res.data.deta
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
            .post("/banksys/accountyearly/delaccountyearlybyid.do", {
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
        statisticalTime: this.filters.statisticalTime,
        unitCodeList: this.filters.checkCode
      };
      this.listLoading = true;
      axios({
        method: "post",
        url: "/banksys/accountyearly/querybrowsedata.do",
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
      this.$router.push({ path: "/NewAccountAdd" });
    }
  }
};
</script>
<style scoped>
.el-form-item{
  margin-bottom:0px !important;
}
.query {
  float: right;
}
.add_box {
  margin-bottom: 10px;
}
.block {
  float: left;
  margin-right: 20px;
  /* margin-bottom: 10px; */
}
.block span {
  margin-right: 10px;
}
.block .el-cascader {
  width: 270px;
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
</style>