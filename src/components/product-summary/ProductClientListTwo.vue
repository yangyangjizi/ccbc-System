<template>
  <section>
    <!--工具条-->
    <el-col :span="24" class="toolbar">
      <el-form :model="filters" ref="filters" :inline="true" style="overflow: hidden;">
        <el-form-item label="客户库类型" class="input-box2" prop="customerType" v-if="unitRank === 0">
          <el-select
            v-model="filters.customerType"
            placeholder="请选择"
            class="input-box1"
            @change="handleCheck"
          >
            <el-option
              v-for="item in filters.customerTypeList"
              :key="item.customerType"
              :label="item.label"
              :value="item.customerType"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-button type="warning" v-on:click="getUsers" v-hasPermission="'proCLquery'">查询</el-button>
        <!-- <el-button
          type="primary"
          v-on:click="resetData('filters')"
          v-hasPermission="'proCLReset'"
        >重置</el-button> -->
      </el-form>

      <el-button
        type="danger"
        v-hasPermission="'robClientTwoRob'"
        @click="handleRab"
        v-if="unitRank === 2 || unitRank === 1"
        class="margin-box margin-box3"
      >抢户</el-button>

      <!--列表-->
      <el-table
        :data="tableData"
        v-loading="listLoading"
        :element-loading-text="loadingText"
        border
        style="width: 100%;"
        :header-cell-style="styleObj"
        highlight-current-row
        @select="handleClickRow"
        @select-all="handleClickAllRow"
      >
        <el-table-column type="expand" prop="proDataList">
          <template slot-scope="scope">
            <el-table :data="scope.row.proDataList" align="center" border style="width: 100%">
              <el-table-column prop="number" label="序号" align="center" show-overflow-tooltip></el-table-column>
              <el-table-column prop="productName" label="产品名称" align="center" show-overflow-tooltip></el-table-column>
              <el-table-column prop="markStatus" label="营销结果" align="center" show-overflow-tooltip></el-table-column>
              <el-table-column prop="remark" label="备注" align="center" show-overflow-tooltip></el-table-column>
            </el-table>
          </template>
        </el-table-column>
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column prop="number" label="序号" align="center" width="55">
          <template slot-scope="scope">{{ scope.row.number }}</template>
        </el-table-column>
        <el-table-column prop="clientCode" label="客户编码" show-overflow-tooltip align="center"></el-table-column>
        <el-table-column prop="clientName" label="客户名称" show-overflow-tooltip align="center"></el-table-column>
        <el-table-column prop="address" label="地址" show-overflow-tooltip align="center"></el-table-column>
        <el-table-column prop="contactTel" label="联系电话" show-overflow-tooltip align="center"></el-table-column>
        <el-table-column prop="contactName" label="联系人" show-overflow-tooltip align="center"></el-table-column>
        <el-table-column prop="label" label="标签" show-overflow-tooltip align="center"></el-table-column>
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
export default {
  name: "",
  data() {
    return {
      loadingText: "拼命加载中",
      filters: {
        customerType: "0",
        customerTypeList: [
          {
            customerType: "0",
            label: "分行客户库"
          },
          {
            customerType: "1",
            label: "支行客户库"
          }
        ]
      },
      unitRank: "",
      tableData: [],
      total: 0,
      page: 1,
      pageSize: 10,
      taxIdList: [],
      listLoading: false,
      dialogVisible: false,
      multipleSelection: [],
      checkId: [],
      form: {},
      fileList: [],
      fileTwo: [],
      formData: "",
      styleObj: {
        background: "#eef1f6",
        "border-color": "#dbdbdb",
        "text-align": "center"
      }
    };
  },
  created() {},
  mounted() {
    this.getUsers();
  },
  methods: {
    handleCheck() {
      this.getUsers();
    },
    // 抢户
    handleRab() {
      this.$confirm("是否确认抢户?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let sef = this;
          let req = {};
          for (var i = 0; i < this.multipleSelection.length; i++) {
            var clientId = this.multipleSelection[i].clientId;
            this.checkId.push(clientId);
          }
          req = {
            clientIdList: this.checkId
          };
          axios({
            method: "post",
            data: req,
            url: "/banksys/productsend/unitrobclientdata.do"
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
              console.log(err);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消抢户"
          });
        });
    },

    // 获取点击的行
    handleClickRow(selection, row) {
      this.multipleSelection = selection;
    },
    handleClickAllRow(selection) {
      this.multipleSelection = selection;
    },

    //重置查询条件
    resetData(formName) {
      this.$refs[formName].resetFields();
    },
    //获取用户列表
    getUsers() {
      let para = {
        pagenum: this.page,
        rows: this.pageSize,
        dataType: this.filters.customerType
      };
      this.listLoading = true;
      axios({
        method: "post",
        url: "/banksys/productsend/queryrobclientdatalist.do",
        data: para
      })
        .then(res => {
          if (res.data.code === "1001") {
            this.$message.success(res.data.msg);
            this.total = res.data.data.total;
            this.tableData = res.data.data.list;
            this.unitRank = res.data.unitRank;
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
    // 详情
    handleDetail(id) {
      this.$router.push({
        path: "/ProductListDetail",
        query: { taxId: id, codeType: "1" }
      });
    },
    handleCurrentChange(val) {
      this.page = val;
      this.getUsers();
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getUsers();
    }
  },
  components: {}
};
</script>

<style  scoped>
.margin-box3 {
  margin: 10px 0 !important;
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
.el-form-item__label {
  width: 124px !important;
  font-size: 12px !important;
}
.el-form-item {
  float: left;
}
.query {
  width: 100%;
  position: relative;
  height: 60px;
  overflow: hidden;
}
.query_c {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}
.submit_color {
  background-color: #858ffd;
  border-color: #858ffd;
}
.submit_color:hover {
  background-color: #a6acef;
  border-color: #a6acef;
}
.set-up {
  margin-left: 45px;
}
.form-box {
  margin-left: 8px;
}
.form-box2 {
  margin-left: 52px;
}
</style>
