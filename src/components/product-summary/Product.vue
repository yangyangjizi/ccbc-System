<template>
  <section>
    <!--工具条-->
    <el-col
      :span="24"
      class="toolbar"
  
    >
      <el-form :inline="true" :model="filters">
        <!-- <el-col :span="6">
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
        </el-col>
        <el-col :span="6">
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
        </el-col>-->
        <el-col :span="6">
          <div class="block">
            <span class="demonstration">银行名称:</span>
            <el-cascader
              placeholder="请输入银行名称"
              :options="filters.options"
              :props="filters.defaultData"
              @change="handleChangeCode"
              collapse-tags
              class="input-box6"
            ></el-cascader>
          </div>
        </el-col>
        <el-col :span="6">
          <el-button type="warning" v-on:click="getTableData">查询</el-button>
        </el-col>
      </el-form>
      <!--列表-->
      <el-table
        :data="tableData"
        :max-height="tableHeight"
        v-loading="listLoading"
        border
        style="width: 100%;"
        :header-cell-style="styleObj"
      >
        <el-table-column prop="unitName" label="产品名称" align="center">
          <template slot-scope="scope">{{scope.row.productName}}</template>
        </el-table-column>
        <el-table-column prop="dataTotal" label="数据总量" align="center">
          <template slot-scope="scope">{{scope.row.total}}</template>
        </el-table-column>
        <el-table-column prop="marketSuccessNum" label="营销成功" align="center">
          <template slot-scope="scope">{{scope.row.sucNum}}</template>
        </el-table-column>
        <el-table-column prop="marketFailedNum" label="营销失败" align="center">
          <template slot-scope="scope">{{scope.row.failNum}}</template>
        </el-table-column>
        <el-table-column prop="nomarketNum" label="未反馈/未营销" align="center">
          <template slot-scope="scope">{{scope.row.nomarketNum}}</template>
        </el-table-column>
        <el-table-column prop="marketSuccessRate" label="营销成功率" align="center">
          <template slot-scope="scope">{{scope.row.sucRate}}%</template>
        </el-table-column>
      </el-table>
    </el-col>
  </section>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      tableHeight: "570px",
      filters: {
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
      listLoading: false,
      spanArr: [], // 一个空的数组，用于存放每一行记录的合并数
      pos: 0, // spanArr 的索引
      contentSpanArr: [],
      position: 0,
      styleObj: {
        background: "#eef1f6",
        "border-color": "#dbdbdb",
        "text-align": "center"
      }
    };
  },
  mounted() {
    this.getBankList();
    this.getTableData();
  },
  methods: {
    handleChangeCode(e, form, thsAreaCode) {
      this.filters.checkCode = e;
    },
    // 获取银行名称列表
    getBankList() {
      axios
        .post("/banksys/system/common/queryunitcode.do", { returnType: "tree", tableType: "0"})
        .then(res => {
          this.filters.options = res.data.list;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //获取展示列表
    getTableData() {
      let ctx = this;
      let para = {
        unitCodes: this.filters.checkCode
      };
      this.listLoading = true;
      axios({
        method: "post",
        url: "/banksys/busimarket/statmarketbypro.do",
        data: para
      }).then(res => {
        if (res.data.code === "1001") {
          this.$message.success(res.data.msg)
          this.tableData = res.data.data;
          this.listLoading = false;
        } else {
          this.$message.error(res.data.msg);
          this.listLoading = false;
        }
      }).catch(err => {
        this.$message.error('网络异常，请重试！！！')
      });
    }
  }
};
</script>
<style scoped>
.el-form-item {
  width: 100% !important;
}
.el-date-editor {
  width: 240px !important;
}
.el-cascader {
  width: 200px !important;
}
.el-select {
  width: 200px !important;
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