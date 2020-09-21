<template>
  <div v-loading="loading" :element-loading-text="loadingText">
    <el-card class="box-card head-top">
      <el-collapse v-model="activeNames">
        <el-collapse-item name="1">
          <template slot="title">
            <i class="header-icon el-icon-s-custom dd"></i>&nbsp&nbsp客户信息筛选条件
          </template>
          <el-form ref="epireadyRef1" :inline="true" :model="clientParam">
            <el-row>
              <el-col :sm="6" :md="6" :lg="6" :xl="6">
                <el-form-item label="企业名称" prop="firmName">
                  <el-input v-model="clientParam.firmName" placeholder="请输入企业名称"></el-input>
                </el-form-item>
              </el-col>
              <el-col :sm="6" :md="6" :lg="6" :xl="6">
                <el-form-item label="代表人姓名" prop="legalName">
                  <el-input v-model="clientParam.legalName" placeholder="请输入代表人姓名"></el-input>
                </el-form-item>
              </el-col>
              <el-col :sm="6" :md="6" :lg="6" :xl="6">
                <el-form-item label="代表人证件号码" prop="legalIdNum">
                  <el-input v-model="clientParam.legalIdNum" placeholder="请输入代表人证件号码"></el-input>
                </el-form-item>
              </el-col>
              <el-col :sm="6" :md="6" :lg="6" :xl="6">
                <el-form-item label="股东证件号码" prop="shareIdNum">
                  <el-input v-model="clientParam.shareIdNum" placeholder="请输入股东证件号码"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :sm="6" :md="6" :lg="6" :xl="6">
                <el-form-item label="股东姓名" prop="shareName">
                  <el-input v-model="clientParam.shareName" placeholder="请输入股东姓名"></el-input>
                </el-form-item>
              </el-col>
              <el-col :sm="6" :md="6" :lg="6" :xl="6">
                <el-form-item label="控制人姓名" prop="controName">
                  <el-input v-model="clientParam.controName" placeholder="请输入实际控制人姓名"></el-input>
                </el-form-item>
              </el-col>
              <el-col :sm="6" :md="6" :lg="6" :xl="6">
                <el-form-item label="控制人证件号码" prop="controIdNum">
                  <el-input v-model="clientParam.controIdNum" placeholder="请输入控制人证件号码"></el-input>
                </el-form-item>
              </el-col>
              <el-col :sm="6" :md="6" :lg="6" :xl="6">
                <el-form-item label="显示项" prop="tableNameList">
                  <el-select
                    v-model="clientParam.tableNameList"
                    multiple
                    collapse-tags
                    placeholder="请选择显示项"
                  >
                    <el-option
                      v-for="item in checkListObj1"
                      :key="item.key"
                      :label="item.label"
                      :value="item.key"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>

            <div></div>
          </el-form>
        </el-collapse-item>
        <el-collapse-item name="2">
          <template slot="title">
            <i class="header-icon el-icon-s-marketing dd"></i>&nbsp&nbsp账户信息筛选条件
          </template>
          <el-form ref="epireadyRef" :inline="true" :model="filters">
            <el-row>
              <el-col :sm="6" :md="6" :lg="6" :xl="6">
                <el-form-item label="账号" prop="accountNum">
                  <el-input v-model="filters.accountNum" placeholder="请输入账号"></el-input>
                </el-form-item>
              </el-col>
              <el-col :sm="6" :md="6" :lg="6" :xl="6">
                <el-form-item label="币别" prop="currenct">
                  <el-input v-model="filters.currenct" placeholder="请输入币别"></el-input>
                </el-form-item>
              </el-col>
              <el-col :sm="6" :md="6" :lg="6" :xl="6">
                <el-form-item label="账户名称" prop="accountName">
                  <el-input v-model="filters.accountName" placeholder="请输入账户名称"></el-input>
                </el-form-item>
              </el-col>
              <el-col :sm="6" :md="6" :lg="6" :xl="6">
                <el-form-item label="账户性质" prop="accountNature">
                  <el-input
                    v-model="filters.accountNature"
                    placeholder="请输入账户性质"
                    class="input-box97"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :sm="6" :md="6" :lg="6" :xl="6">
                <el-form-item label="开户许可证号" prop="openAccNum">
                  <el-input v-model="filters.openAccNum" placeholder="请输入开户许可证号"></el-input>
                </el-form-item>
              </el-col>
              <el-col :sm="6" :md="6" :lg="6" :xl="6">
                <el-form-item label="地址" prop="address">
                  <el-input v-model="filters.address" placeholder="请输入地址"></el-input>
                </el-form-item>
              </el-col>
              <el-col :sm="6" :md="6" :lg="6" :xl="6">
                <el-form-item label="开户日期" prop="openAccDate">
                  <el-input v-model="filters.openAccDate" placeholder="请输入开户日期"></el-input>
                </el-form-item>
              </el-col>
              <el-col :sm="6" :md="6" :lg="6" :xl="6">
                <el-form-item label="睡眠状态" prop="sleepStatus">
                  <el-input v-model="filters.sleepStatus" placeholder="请输入睡眠状态"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :sm="6" :md="6" :lg="6" :xl="6">
                <el-form-item label="睡眠设置日期" prop="sleepDate">
                  <el-input v-model="filters.sleepDate" placeholder="请输入睡眠设置日期"></el-input>
                </el-form-item>
              </el-col>
              <el-col :sm="6" :md="6" :lg="6" :xl="6">
                <el-form-item label="开户行" prop="openAccBank">
                  <el-input v-model="filters.openAccBank" placeholder="请输入开户行"></el-input>
                </el-form-item>
              </el-col>
              <el-col :sm="6" :md="6" :lg="6" :xl="6">
                <el-form-item label="销户日期" prop="closeAccDate">
                  <el-input v-model="filters.closeAccDate" placeholder="请输入销户日期"></el-input>
                </el-form-item>
              </el-col>
              <el-col :sm="6" :md="6" :lg="6" :xl="6">
                <el-form-item label="资金用途" prop="useFund">
                  <el-input v-model="filters.useFund" placeholder="请输入资金用途"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :sm="6" :md="6" :lg="6" :xl="6">
                <el-form-item label="账户终止状态" prop="accEndStatus">
                  <el-input v-model="filters.accEndStatus" placeholder="请输入账户终止状态"></el-input>
                </el-form-item>
              </el-col>
              <el-col :sm="6" :md="6" :lg="6" :xl="6">
                <el-form-item label="企业名称" prop="firmName">
                  <el-input v-model="filters.firmName" placeholder="请输入企业名称"></el-input>
                </el-form-item>
              </el-col>
              <el-col :sm="6" :md="6" :lg="6" :xl="6">
                <el-form-item label="代表人姓名" prop="legalName">
                  <el-input v-model="filters.legalName" placeholder="请输入代表人姓名"></el-input>
                </el-form-item>
              </el-col>
              <el-col :sm="6" :md="6" :lg="6" :xl="6">
                <el-form-item label="代表人证件号码" prop="legalIdNum">
                  <el-input v-model="filters.legalIdNum" placeholder="请输入代表人证件号码"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :sm="6" :md="6" :lg="6" :xl="6">
                <el-form-item label="股东证件号码" prop="shareIdNum">
                  <el-input v-model="filters.shareIdNum" placeholder="请输入股东证件号码"></el-input>
                </el-form-item>
              </el-col>
              <el-col :sm="6" :md="6" :lg="6" :xl="6">
                <el-form-item label="股东姓名" prop="shareName">
                  <el-input v-model="filters.shareName" placeholder="请输入股东姓名"></el-input>
                </el-form-item>
              </el-col>
              <el-col :sm="6" :md="6" :lg="6" :xl="6">
                <el-form-item label="控制人姓名" prop="controName">
                  <el-input v-model="filters.controName" placeholder="请输入实际控制人姓名"></el-input>
                </el-form-item>
              </el-col>
              <el-col :sm="6" :md="6" :lg="6" :xl="6">
                <el-form-item label="控制人证件号码" prop="controIdNum">
                  <el-input v-model="filters.controIdNum" placeholder="请输入控制人证件号码"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
                <el-form-item label="截止日期" prop="endTime">
                  <el-date-picker
                    v-model="filters.endTime"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                  ></el-date-picker>
                </el-form-item>
                <el-form-item label="显示项" prop="tableNameList">
                  <el-select
                    v-model="filters.tableNameList"
                    multiple
                    collapse-tags
                    placeholder="请选择显示项"
                  >
                    <el-option
                      v-for="item in checkListObj"
                      :key="item.key"
                      :label="item.label"
                      :value="item.key"
                    ></el-option>
                  </el-select>
                </el-form-item>
            </el-row>
          </el-form>
        </el-collapse-item>
      </el-collapse>
      <el-form ref="epireadyRef3" :inline="true" :model="operateTypeForm" class="queryAll">
        <el-form-item label="页面操作类型" prop="tableNameList">
          <el-select
            v-model="operateTypeForm.operateType"
            @change="getTableData()"
            placeholder="请选择显示项"
          >
            <el-option
              v-for="item in operateTypeForm.operateTypeList"
              :key="item.key"
              :label="item.label"
              :value="item.key"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-button type="warning" v-on:click="getTableData()" v-hasPermission="'situationQueryBtn'">查询</el-button>
        <el-button type="primary" v-on:click="resetData" v-hasPermission="'situationQueryBtn'">重置</el-button>
      </el-form>
      <el-table :data="tableData33" style="width: 100%" border v-show="this.tableList2.length == 0"></el-table>
      <!--列表-->
      <el-table
        :data="tableData"
        v-loading="listLoading"
        :element-loading-text="loadingText"
        style="width: 100%"
        :header-cell-style="styleObj"
        highlight-current-row
        border
        v-if="this.tableList2.length != 0"
      >
        <el-table-column type="expand" v-if="this.accTableNameList.length != 0" prop="accDataList">
          <template slot-scope="scope">
            <el-table :data="scope.row.accDataList" align="center" border style="width: 100%">
              <el-table-column
                v-for="info in accTableNameList"
                show-overflow-tooltip
                :key="info.key"
                :label="info.label"
                align="center"
              >
                <el-table-column
                  show-overflow-tooltip
                  v-for="info1 in info.towTableNameList"
                  :key="info1.key"
                  :property="info1.key"
                  :label="info1.label"
                  align="center"
                >
                  <template slot-scope="scope">{{scope.row[scope.column.property]}}</template>
                </el-table-column>
              </el-table-column>
              <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                  <el-button
                    type="primary"
                    size="small"
                    v-hasPermission="'situationQueryDetails'"
                    @click="handleDetail(scope.row.dynamicrevAccId,scope.row.accountNum,scope.row.accountName)"
                  >详情</el-button>
                </template>
              </el-table-column>
            </el-table>
          </template>
        </el-table-column>
        <!-- <el-table-column type="selection" width="55" align="center"></el-table-column> -->
        <el-table-column
          v-for="info in tableList2"
          show-overflow-tooltip
          :key="info.key"
          :label="info.label"
          align="center"
        >
          <el-table-column
            show-overflow-tooltip
            v-for="info1 in info.towTableNameList"
            :key="info1.key"
            :property="info1.key"
            :label="info1.label"
            align="center"
          >
            <template slot-scope="scope">{{scope.row[scope.column.property]}}</template>
          </el-table-column>
        </el-table-column>
        <!-- <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="primary" size="small" @click="handleDetail(scope.row.Id)">详情</el-button>
          </template>
        </el-table-column>-->
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
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeNames: ["1"],
      loading: "",
      loadingText: "拼命加载中",
      listLoading: false,
      total: 0,
      page: 1,
      pageSize: 10,
      accTableNameList: [],
      tableList2: [],
      tableData: [],
      tableData33: [],
      checkListObj: [],
      checkListObj1: [],
      filters: {
        // options: [],
        tableNameList: [],

        accountNum: "",
        currenct: "",
        accountName: "",
        accountNature: "",
        openAccNum: "",
        openAccDate: "",
        closeAccDate: "",
        sleepStatus: "",
        sleepDate: "",
        openAccBank: "",
        address: "",
        useFund: "",
        accEndStatus: "",
        firmName: "",
        legalName: "",
        legalIdNum: "",
        shareName: "",
        shareIdNum: "",
        controName: "",
        controIdNum: "",
        endTime: ""
      },
      clientParam: {
        tableNameList: [],
        firmName: "",
        legalName: "",
        legalIdNum: "",
        firmName: "",
        shareIdNum: "",
        shareName: "",
        controName: "",
        controIdNum: ""
      },
      operateTypeForm: {
        operateType: "5",
        operateTypeList: [
          {
            key: "5",
            label: "日常核查"
          },
          {
            key: "6",
            label: "滚动排查"
          },
          {
            key: "7",
            label: "风险筛查"
          },
          {
            key: "8",
            label: "年检"
          }
        ]
      },
      styleObj: {
        background: "#eef1f6",
        "border-color": "#dbdbdb",
        "text-align": "center"
      }
    };
  },
  created() {
    this.getTableData();
    this.getCheckList1();
    this.getCheckList();
  },
  methods: {
    getCheckList1() {
      this.$axios
        .post("/banksys/accdoubtful/querytablenamelist.do", {
          tableType: "client_table_name"
        })
        .then(res => {
          this.checkListObj1 = res.data.tableNameList;
        })
        .catch(err => {
          this.$message.error("网络异常，请重试！！！");
        });
    },
    getCheckList() {
      this.$axios
        .post("/banksys/accdoubtful/querytablenamelist.do", {
          tableType: "rev_table_name"
        })
        .then(res => {
          this.checkListObj = res.data.tableNameList;
        })
        .catch(err => {
          this.$message.error("网络异常，请重试！！！");
        });
    },
    // 跳转详情页面
    handleDetail(dynamicrevAccId, accountNum, accountName) {
      this.$router.push({
        path: "/CheckSituationDetail",
        query: {
          operateType: this.operateTypeForm.operateType,
          dynamicrevAccId: dynamicrevAccId,
          accountNum: accountNum,
          accountName: accountName
        }
      });
    },
    getTableData() {
      this.listLoading = true;
      this.$axios
        .post("/banksys/dynamicrev/querysituationlist.do", {
          operateType: this.operateTypeForm.operateType,
          clientParam: this.clientParam,
          accParam: this.filters,
          pagenum: this.page,
          rows: this.pageSize
        })
        .then(res => {
          this.listLoading = false;
          this.total = res.data.data.total;
          this.tableData = res.data.data.list;
          this.tableList2 = res.data.clientTableNameList;
          this.accTableNameList = res.data.accTableNameList;
        })
        .catch(err => {
          this.$message.error("网络异常，请重试！！！");
        });
    },
    // handleGetData() {},
    //重置查询条件
    resetData() {
      this.$refs.epireadyRef.resetFields();
      this.$refs.epireadyRef1.resetFields();
    },
    handleCurrentChange(val) {
      this.page = val;
      this.getTableData();
    },

    handleSizeChange(val) {
      this.pageSize = val;
      this.getTableData();
    }
  }
};
</script>

<style scoped>
.head-top {
  margin-top: 10px;
}
.queryAll {
  margin: 10px 0;
}
.dd {
  font-size: 18px;
}
</style>