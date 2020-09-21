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
            <span class="demonstration">添加时间:</span>
            <el-date-picker
              v-model="filters.startDate"
              type="date"
              placeholder="选择日期"
              :picker-options="filters.pickerOptionsStart"
              @change="changeEnd"
            ></el-date-picker>
          </div>
          <div class="block">至</div>
          <div class="block statime">
            <el-date-picker
              v-model="filters.endDate"
              type="date"
              placeholder="选择日期"
              :picker-options="filters.pickerOptionsEnd"
              @change="changeStart"
            ></el-date-picker>
          </div>
          <div class="block">
            <span class="demonstration">统计时间:</span>
            <el-date-picker
              v-model="filters.startStatisticsTime"
              type="date"
              placeholder="选择日期"
              :picker-options="filters.pickerOptionsStart"
              @change="changeEnd"
            ></el-date-picker>
          </div>
           <div class="block">至</div>
          <div class="block">
            <el-date-picker
              v-model="filters.endStatisticsTime"
              type="date"
              placeholder="选择日期"
              :picker-options="filters.pickerOptionsEnd"
              @change="changeStart"
            ></el-date-picker>
          </div>
        </el-form-item>

        <el-form-item class="query">
          <el-button type="warning" v-on:click="getUsers" class="btncolor">查询</el-button>
          <!--  <el-button  type="primary"  @click="AccAdd" >新增</el-button> -->
        </el-form-item>
      </el-form>
      <!--列表-->
      <el-table
        :data="tableData"
        border
        style="width: 100%;"
        :header-cell-style="styleObj"
        :span-method="objectSpanMethod"
      >
        <el-table-column prop="bank" label="开户银行" align="center"></el-table-column>
        <el-table-column prop="enterprise" label="用户类型" align="center">
          <template slot-scope="scope">{{scope.row.value}}</template>
        </el-table-column>
        <el-table-column prop="license" label="年检结束时，本机构存量账户数量" align="center">
          <template slot-scope="scope">{{scope.row.registered}}</template>
        </el-table-column>
        <el-table-column prop="area" label="未纳入年检账范围户的数量">
          <el-table-column prop="deposit" label="临时存款账户数量" width="120" align="center">
            <template slot-scope="scope">{{scope.row.deposit}}</template>
          </el-table-column>
          <el-table-column prop="freeze" label="法院、公安等部门冻结账户数量" width="120" align="center">
            <template slot-scope="scope">{{scope.row.freeze}}</template>
          </el-table-column>
          <el-table-column prop="hanging" label="久悬账户数量" width="120" align="center">
            <template slot-scope="scope">{{scope.row.hanging}}</template>
          </el-table-column>
          <el-table-column prop="newopen" label="当年新开立账户数量" width="120" align="center">
            <template slot-scope="scope">{{scope.row.newopen}}</template>
          </el-table-column>
          <el-table-column prop="subtotal" label="小计" width="120" align="center">
            <template slot-scope="scope">{{scope.row.subtotal}}</template>
          </el-table-column>
        </el-table-column>
        <el-table-column prop="Should" label="应年检账户数量" align="center">
          <template slot-scope="scope">{{scope.row.should}}</template>
        </el-table-column>
        <el-table-column prop="results" label="年检结果">
          <el-table-column prop="qualified" label="年检合格账户数量" width="120" align="center">
            <template slot-scope="scope">{{scope.row.qualified}}</template>
          </el-table-column>
          <el-table-column prop="unqualified" label="年检不合格账户数量" width="120" align="center">
            <template slot-scope="scope">{{scope.row.unqualified}}</template>
          </el-table-column>
          <el-table-column prop="nocheck" label="未年检账户数量" width="120" align="center">
            <template slot-scope="scope">{{scope.row.nocheck}}</template>
          </el-table-column>
        </el-table-column>
        <el-table-column prop="account" label="账户年检率" align="center">
          <template slot-scope="scope">{{scope.row.annualrate}}</template>
        </el-table-column>
        <el-table-column prop="operation" label="操作" align="center">
          <template slot-scope="scope">
            <el-button size="small" type="primary">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--页码-->
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
      tableData: [
        {
          bank: "xxx支行",
          enterprise: "基本存款账户",
          license: "",
          deposit: "",
          freeze: "",
          hanging: "",
          newopen: "",
          subtotal: "",
          Should: "",
          qualified: "",
          unqualified: "",
          nocheck: "",
          account: "",
          operation: ""
        },
        {
          enterprise: "一般存款账户",
          license: "",
          deposit: "",
          freeze: "",
          hanging: "",
          newopen: "",
          subtotal: "",
          Should: "",
          qualified: "",
          unqualified: "",
          nocheck: "",
          account: "",
          operation: ""
        },
        {
          enterprise: "专用存款账户",
          license: "",
          deposit: "",
          freeze: "",
          hanging: "",
          newopen: "",
          subtotal: "",
          Should: "",
          qualified: "",
          unqualified: "",
          nocheck: "",
          account: "",
          operation: ""
        },
        {
          enterprise: "临时存款账户",
          license: "",
          deposit: "",
          freeze: "",
          hanging: "",
          newopen: "",
          subtotal: "",
          Should: "",
          qualified: "",
          unqualified: "",
          nocheck: "",
          account: "",
          operation: ""
        },
        {
          enterprise: "合计",
          license: "",
          deposit: "",
          freeze: "",
          hanging: "",
          newopen: "",
          subtotal: "",
          Should: "",
          qualified: "",
          unqualified: "",
          nocheck: "",
          account: "",
          operation: ""
        }
      ],
      filters: {
        startDate: "",
        endDate: "",
        pickerOptionsStart: {},
        pickerOptionsEnd: {}
      },

      total: 0,
      page: 1,
      listLoading: false,
      styleObj: {
        background: "#eef1f6",
        "border-color": "#dbdbdb",
        "text-align": "center"
      }
    };
  },
  methods: {
    changeStart() {
      this.filters.pickerOptionsStart = Object.assign(
        {},
        this.pickerOptionsStart,
        {
          disabledDate: time => {
            return time.getTime() > this.filters.endDate;
          }
        }
      );
    },
    changeEnd() {
      this.filters.pickerOptionsEnd = Object.assign({}, this.pickerOptionsEnd, {
        disabledDate: time => {
          return time.getTime() < this.filters.startDate;
        }
      });
    },
    handleCurrentChange(val) {
      this.page = val;
      this.getUsers();
    },
    //获取用户列表
    getUsers() {
      let para = {
        page: this.page,
        start: this.filters.startDate,
        end: this.filters.endDate
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
    },
    AccAdd() {
      this.$router.push({ path: "/AccountAdd" });
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        if (rowIndex % 5 === 0) {
          return {
            rowspan: 5,
            colspan: 1
          };
        } else {
          return {
            rowspan: 0,
            colspan: 0
          };
        }
      }
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
  margin-right: 10px;
  margin-bottom: 10px;
}
.block span {
  margin-right: 10px;
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
.statime{
margin-right: 20px;
}
</style>