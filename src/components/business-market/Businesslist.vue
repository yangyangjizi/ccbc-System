<template>
  <section v-loading="loading" :element-loading-text="loadingText">
    <!--工具条-->
    <el-col :span="24" class="toolbar" v-if="!loading">
      <el-form :inline="true" :model="filters" class="clearfix">
        <el-form-item label="统一社会信用代码" class="form-box">
          <el-input v-model="filters.creditCode" placeholder="请输入" class="input-box1"></el-input>
        </el-form-item>
        <el-form-item label="企业名称" class="input-box2">
          <el-input v-model="filters.firmName" placeholder="请输入" class="input-box1"></el-input>
        </el-form-item>
        <el-form-item label="法人姓名" class="input-box2">
          <el-input v-model="filters.legalName" placeholder="请输入" class="input-box1"></el-input>
        </el-form-item>
        <el-form-item label="财务负责人姓名" class="input-box2">
          <el-input v-model="filters.financeName" placeholder="请输入" class="input-box1"></el-input>
        </el-form-item>
        <el-form-item label="分发状态" v-hasPermission="'butBLDistribute'" class="input-box2">
          <el-select v-model="filters.distributionCode" placeholder="请选择" class="input-box1">
            <el-option
              v-for="item in filters.distributionList"
              :key="item.distributionCode"
              :label="item.label"
              :value="item.distributionCode"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="分发进度" v-hasPermission="'butBLDistribute'" class="input-box2">
          <el-select v-model="filters.nodeNameCode" placeholder="请选择" class="input-box1">
            <el-option
              v-for="item in filters.nodeNameList1"
              :key="item.nodeNameCode"
              :label="item.label"
              :value="item.nodeNameCode"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="营销状态" class="input-box2">
          <el-select v-model="filters.markStatusCode" placeholder="请选择" class="input-box1">
            <el-option
              v-for="item in filters.markStatusList"
              :key="item.markStatusCode"
              :label="item.label"
              :value="item.markStatusCode"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="预警状态" class="input-box2">
          <el-select v-model="filters.ageWarningCode" placeholder="请选择" class="input-box1">
            <el-option
              v-for="item in filters.ageWarningList"
              :key="item.ageWarningCode"
              :label="item.label"
              :value="item.ageWarningCode"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="实际经营地址" class="input-box2">
          <el-select
            v-model="filters.keyWords"
            multiple
            clearable
            collapse-tags
            placeholder="请选择"
            class="input-box1"
          >
            <el-option
              v-for="item in filters.actualOperationList"
              :key="item.code"
              :label="item.keyWords"
              :value="item.keyWords"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="企业类型" class="input-box2">
          <el-select v-model="filters.business_type" placeholder="请选择" class="input-box1">
            <el-option
              v-for="item in filters.queryConTradingList"
              :key="item.code"
              :label="item.codeName"
              :value="item.code"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="成立日期" class="input-box10 set-up">
          <el-date-picker
            v-model="filters.setTime	"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            class="input-box1"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="注册资金" class="registered">
          <el-input v-model="filters.startRegCapital" class="input-box11" placeholder="请输入"></el-input>&nbsp;-
          <el-input v-model="filters.endRegCapital" class="input-box11" placeholder="请输入"></el-input>
        </el-form-item>
        <div class="query">
          <el-button type="warning" v-hasPermission="'butBLQuery'" v-on:click="getTableData">查询</el-button>
          <el-button type="primary" v-hasPermission="'butBLReset'" v-on:click="clearConditions">重置</el-button>
        </div>
      </el-form>
      <div class="margin-box">
        <el-button
          type="info"
          v-hasPermission="'butBLBack'"
          v-if="ifShowBackButton"
          v-on:click="handleBack"
        >退回</el-button>
        <el-button
          type="danger"
          v-hasPermission="'butBLDistribute'"
          v-on:click="handleDistribution"
        >手动分发</el-button>
        <el-button
          class="exportexcel_button"
          v-hasPermission="'butBLExport'"
          v-on:click="exportexcel"
        >导出</el-button>
      </div>

      <!--列表-->
      <el-table
        :data="tableData"
        border
        style="width: 100%;"
        :header-cell-style="styleObj"
        highlight-current-row
        @select="handleClickRow"
        @select-all="handleClickAllRow"
      >
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column prop="number" label="序号" align="center" width="55">
          <template slot-scope="scope">{{scope.row.number}}</template>
        </el-table-column>
        <el-table-column prop="creditCode" label="统一社会信用代码" show-overflow-tooltip align="center">
          <template slot-scope="scope">{{scope.row.creditCode}}</template>
        </el-table-column>
        <el-table-column prop="firmType" label="企业类型" align="center" show-overflow-tooltip>
          <template slot-scope="scope">{{scope.row.firmType}}</template>
        </el-table-column>
        <el-table-column prop="firmName" label="企业名称" align="center" show-overflow-tooltip>
          <template slot-scope="scope">{{scope.row.firmName}}</template>
        </el-table-column>

        <el-table-column prop="regCapital" label="注册资金" show-overflow-tooltip align="center">
          <template slot-scope="scope">{{scope.row.regCapital}}</template>
        </el-table-column>
        <el-table-column prop="setTime" label="成立日期" show-overflow-tooltip align="center">
          <template slot-scope="scope">{{scope.row.setTime}}</template>
        </el-table-column>
        <el-table-column prop="runAddress" label="实际经营地址" show-overflow-tooltip align="center">
          <template slot-scope="scope">{{scope.row.runAddress}}</template>
        </el-table-column>
        <el-table-column prop="legalName" label="法人姓名" show-overflow-tooltip align="center">
          <template slot-scope="scope">{{scope.row.legalName}}</template>
        </el-table-column>
        <el-table-column prop="financeName" label="财务负责人姓名" show-overflow-tooltip align="center">
          <template slot-scope="scope">{{scope.row.financeName}}</template>
        </el-table-column>
        <el-table-column
          prop="nodeName"
          label="分发进度"
          v-if="ifShow !='2'"
          show-overflow-tooltip
          align="center"
        >
          <template slot-scope="scope">{{scope.row.nodeName}}</template>
        </el-table-column>
        <el-table-column
          prop="disStatus"
          label="分发状态"
          v-if="ifShow !='2'"
          show-overflow-tooltip
          align="center"
        >
          <template slot-scope="scope">{{scope.row.disStatus}}</template>
        </el-table-column>
        <el-table-column
          prop="subName"
          label="分发支行名称"
          show-overflow-tooltip
          align="center"
          v-if="ifShowButtonTwo"
        ></el-table-column>
        <el-table-column
          prop="unitName"
          label="分发网点名称"
          show-overflow-tooltip
          align="center"
          v-if="ifShowButton"
        ></el-table-column>
        <el-table-column prop="staffName" label="分发员工姓名" show-overflow-tooltip align="center"></el-table-column>
        <el-table-column prop="markStatus" label="营销状态" show-overflow-tooltip align="center">
          <template slot-scope="scope">{{scope.row.markStatus}}</template>
        </el-table-column>
        <!-- 获取预警状态 -->
        <el-table-column label="预警状态" align="center">
          <template slot-scope="scope">
            <span
              v-if="scope.row.ageWarning ==='0' && scope.row.timeWarning	 ==='0' && scope.row.cardWarning	 ==='0' && scope.row.addressWarning	 ==='0' " @click="handleJump(scope.row.yewId,'3')"
            >
              <img src="../../assets/01.png" title="正常" />
            </span>
            <span v-if="scope.row.ageWarning !=='0'" @click="handleJump(scope.row.yewId,'3')">
              <img src="../../assets/02.png" title="年龄预警" />
            </span>
            <span v-if="scope.row.timeWarning !=='0'" @click="handleJump(scope.row.yewId,'3')">
              <img src="../../assets/03.png" title="一人多企预警" />
            </span>
            <span v-if="scope.row.cardWarning !=='0'" @click="handleJump(scope.row.yewId,'3')">
              <img src="../../assets/04.png" title="法人身份证异地预警" />
            </span>
            <span v-if="scope.row.addressWarning !=='0'" @click="handleJump(scope.row.yewId,'3')">
              <img src="../../assets/05.png" title="地址异常预警" />
            </span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="200">
          <template slot-scope="scope">
            <el-button
              type="warning"
              v-hasPermission="'butBLFeedback'"
              v-if="scope.row.dataStatus ==='1'"
              size="small"
              @click="handleFeedBack( scope.row.backId,scope.row.disId)"
            >反馈</el-button>
            <el-button
              v-if="scope.row.dataStatus ==='0'"
              type="warning"
              v-hasPermission="'affirmBusiness'"
              size="small"
              @click="handleYesAffirm(scope.row.disId)"
              class="submit_color"
            >确定认领</el-button>
            <el-button
              type="primary"
              v-hasPermission="'butBLDetails'"
              size="small"
              @click="handleDetail(scope.row.yewId)"
              class="submit_color"
            >详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 弹出反馈框 -->
      <el-dialog :visible.sync="dialogState" title="反馈" width="30%" center>
        <el-form :model="addForm" ref="addForm" label-width="80px" class="el-form-box2">
          <el-form-item label="营销状态:" prop="loginName">
            <el-select v-model="addForm.markStatus" size="small" class="input-box4">
              <el-option
                v-for="(item,index) in this.addForm.markStatusList"
                :label="item.codeName"
                :value="item.code"
                :key="index"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="反馈内容:" prop="password" v-if="addForm.markStatus === '1'">
            <el-select v-model="addForm.backDetails" size="small" class="input-box4">
              <el-option
                v-for="(item,index) in this.addForm.backDetailsList"
                :label="item.codeName"
                :value="item.code"
                :key="index"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="银行账号:" prop="accountNO" v-if="addForm.markStatus === '0'">
            <el-input v-model="addForm.accountNO" class="input-box4"></el-input>
          </el-form-item>
          <el-form-item label="账户名称:" prop="accountName" v-if="addForm.markStatus === '0'">
            <el-input v-model="addForm.accountName" class="input-box4"></el-input>
          </el-form-item>
          <el-form-item label="开户时间:" prop="accountTime" v-if="addForm.markStatus === '0'">
            <el-date-picker
              v-model="addForm.accountTime"
              class="input-box4"
              type="date"
              placeholder="选择日期"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
            >></el-date-picker>
          </el-form-item>
          <el-form-item label="备注:" prop="remark">
            <el-input v-model="addForm.remark" type="textarea" class="input-box4"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click.native="handleSave">保存</el-button>
          <el-button type="success" @click.native="handleSubmit">提交</el-button>
          <el-button @click="dialogState = false">返回</el-button>
        </span>
      </el-dialog>
      <!-- 弹出手动分发框 -->
      <el-dialog
        :visible.sync="dialogDistributionState"
        @close="handleClose"
        title="分发"
        width="30%"
        center
      >
        <el-form :model="distributionForm" label-width="80px" class="el-form-box">
          <el-form-item label="分发地址:">
            <el-select
              v-model="distributionForm.distributionAddress"
              size="small"
              class="input-box4"
            >
              <el-option
                v-for="(item,index) in this.distributionForm.distributionAddressList"
                :label="item.unitName"
                :value="item.unitCode"
                :key="index"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="统计时间:" v-if="ifShow === 0">
            <el-date-picker
              v-model="distributionForm.statisticsTime"
              type="month"
              size="small"
              class="input-box4"
              placeholder="选择月"
            ></el-date-picker>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click.native="handleYes">确定</el-button>
          <el-button @click="handleNo">取消</el-button>
        </span>
      </el-dialog>
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
import AES from "@/utils/aes.js";
export default {
  name: "",
  data() {
    return {
      loading: "",
      loadingText: "拼命加载中",
      filters: {
        creditCode: "",
        firmName: "",
        business_type: "",
        queryConTradingList: {},
        keyWords: "",
        actualOperationList: {},
        startRegCapital: "",
        endRegCapital: "",
        setTime: "",
        runAddress: "",
        legalName: "",
        financeName: "",
        distributionCode: "",
        nodeNameCode: "",
        markStatusCode: "",
        ageWarningCode: "",
        distributionList: [
          {
            distributionCode: "",
            label: "全部"
          },
          {
            distributionCode: "0",
            label: "分发成功"
          },
          {
            distributionCode: "1",
            label: "分发失败"
          },
          {
            distributionCode: "2",
            label: "未分发"
          }
        ],
        nodeNameList1: [
          {
            nodeNameCode: "",
            label: "全部"
          },
          {
            nodeNameCode: "1",
            label: "分发到支行"
          },
          {
            nodeNameCode: "2",
            label: "分发到网点"
          },
          {
            nodeNameCode: "3",
            label: "分发到员工"
          },
          {
            nodeNameCode: "999",
            label: "数据被退回"
          }
        ],
        nodeNameList2: [
          {
            nodeNameCode: "",
            label: "全部"
          },
          {
            nodeNameCode: "2",
            label: "分发到网点"
          }
        ],
        nodeNameList3: [
          {
            nodeNameCode: "",
            label: "全部"
          },
          {
            nodeNameCode: "3",
            label: "分发到员工"
          }
        ],
        markStatusList: [
          {
            markStatusCode: "",
            label: "全部"
          },
          {
            markStatusCode: "0",
            label: "营销成功"
          },
          {
            markStatusCode: "1",
            label: "营销失败"
          },
          {
            markStatusCode: "2",
            label: "未营销"
          }
        ],
        ageWarningList: [
          {
            ageWarningCode: "",
            label: "全部"
          },
          {
            ageWarningCode: "0",
            label: "正常"
          },
          {
            ageWarningCode: "3",
            label: "非正常"
          },
          {
            ageWarningCode: "1",
            label: "年龄预警"
          },
          {
            ageWarningCode: "2",
            label: "法人一人多企预警"
          },
          {
            ageWarningCode: "4",
            label: "法人身份证异地预警"
          },
          {
            ageWarningCode: "5",
            label: "地址异常预警"
          }
        ]
      },
      addForm: {
        markStatus: "",
        backDetails: "",
        remark: "",
        disId: "",
        backId: "",
        markStatusList: [],
        backDetailsList: []
      },
      distributionForm: {
        distributionAddress: "",
        distributionAddressList: {}
      },
      ifShowBackButton: false,
      dialogDistributionState: false,
      ifShowButton: true,
      ifShowButtonTwo: false,
      cascaderData1: [],
      multipleSelection: [],
      disIdList: [],
      yewIdList: [],
      yewIdAutoList: [],
      options: [],
      unitRank: "",
      tableData: [],
      total: 0,
      pageSize: 10,
      page: 1,
      ifShow: "",
      dialogState: false,
      checkId: [],
      styleObj: {
        background: "#eef1f6",
        "border-color": "#dbdbdb",
        "text-align": "center"
      }
    };
  },
  created() {},
  mounted() {
    this.getTableData();
    this.getMarkCode();
    this.getFeedBackCode();
    this.getEnterpriseCode();
    this.getactualOperationCode();
    this.handleDistributionAddress();
  },
  methods: {
    handleJump(yewId,dataType){
     this.$router.push({
        path: "/WarningStateDetail",
        query: {yewId:yewId,dataType:dataType}
     })
    },
    // 确认认领
    handleYesAffirm(disId) {
      this.$confirm("是否确定认领?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let req = {};
          req = {
            disId: disId
          };
          axios({
            method: "post",
            data: req,
            url: "/banksys/busimarket/affirmbusimarketdata.do"
          })
            .then(res => {
              if (res.data.code === "1001") {
                this.$message.success(res.data.msg);
                this.getTableData();
              } else {
                this.$message.error(res.data.msg);
              }
            })
            .catch(err => {
              this.$message.error("网络异常，请重试！！！");
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消认领"
          });
        });
    },
    // 分发地址获取
    handleDistributionAddress() {
      let prop = {};
      prop = { dataType: "noNew" };
      axios({
        method: "post",
        url: "/banksys/datadistribute/queryunitandstafflist.do",
        data: prop
      })
        .then(res => {
          this.distributionForm.distributionAddressList = res.data.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 分发处理拿到的各项的yewId
    handleDistribution() {
      for (let i = 0; i < this.multipleSelection.length; i++) {
        var yewId = this.multipleSelection[i].yewId;
        this.yewIdList.push(yewId);
      }
      this.dialogDistributionState = true;
    },
    // 确定分发
    handleYes() {
      this.loading = true;
      this.loadingText = "分发中，请稍后！！！";
      let req = {};
      req = {
        yewIdList: this.yewIdList,
        selectCode: this.distributionForm.distributionAddress,
        statisticsTime: this.distributionForm.statisticsTime
      };
      axios({
        method: "post",
        data: req,
        url: "/banksys/datadistribute/handdodistribution.do"
      })
        .then(res => {
          this.loading = false;
          if (res.data.code === "1001") {
            this.$message.success(res.data.msg);
            this.yewIdList = [];
            this.getTableData();
            this.dialogDistributionState = false;
          } else {
            this.$message.error(res.data.msg);
            this.dialogDistributionState = false;
            this.yewIdList = [];
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 取消分发
    handleNo() {
      this.dialogDistributionState = false;
      this.yewIdList = [];
    },
    //  关闭弹出框的回调
    handleClose() {
      this.yewIdList = [];
    },

    // 获取点击的行
    handleClickRow(selection, row) {
      this.multipleSelection = selection;
    },
    handleClickAllRow(selection) {
      this.multipleSelection = selection;
    },
    // 退回
    handleBack() {
      if (this.multipleSelection.length == 0) {
        this.$message.error("请选则要退回的数据");
        return;
      }
      this.$confirm("是否确定退回?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let req = {};
          for (var i = 0; i < this.multipleSelection.length; i++) {
            var disId = this.multipleSelection[i].disId;
            this.disIdList.push(disId);
          }
          req = {
            disIdList: this.disIdList
          };
          axios({
            method: "post",
            data: req,
            url: "/banksys/busimarket/batchbackgsxx.do"
          })
            .then(res => {
              if (res.data.code === "1001") {
                this.$message.success(res.data.msg);
                this.disIdList = [];
                this.getTableData();
              } else {
                this.$message.error(res.data.msg);
                this.disIdList = [];
              }
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消退回"
          });
        });
    },
    // 实际经营地址条件
    getactualOperationCode() {
      axios({
        method: "post",
        data: "",
        url: "/banksys/datadistribute/queryrunaddresslist.do"
      })
        .then(res => {
          this.filters.actualOperationList = res.data.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 企业类型条件
    getEnterpriseCode() {
      let prop = {};
      prop = {
        codeTypes: "firm_type",
        needAll: "1"
      };
      axios({
        method: "post",
        data: prop,
        url: "/banksys/system/common/querycode.do"
      })
        .then(res => {
          this.filters.queryConTradingList = res.data.list;
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 反馈中的条件
    getMarkCode() {
      let prop = {};
      prop = {
        codeTypes: "mark_status"
      };
      axios({
        method: "post",
        data: prop,
        url: "/banksys/system/common/querycode.do"
      })
        .then(res => {
          this.addForm.markStatusList = res.data.list;
        })
        .catch(err => {
          console.log(err);
        });
    },
    getFeedBackCode() {
      let prop = {};
      prop = {
        codeTypes: "cus_feedback",
        needAll: "1"
      };
      axios({
        method: "post",
        data: prop,
        url: "/banksys/system/common/querycode.do"
      })
        .then(res => {
          this.addForm.backDetailsList = res.data.list;
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleSave() {
      let req = {};
      req = {
        operationType: "save",
        disId: this.addForm.disId,
        backId: this.addForm.backId,
        markStatus: this.addForm.markStatus,
        backDetails: this.addForm.backDetails,
        remark: this.addForm.remark,
        accountNO: this.addForm.accountNO,
        accountName: this.addForm.accountName,
        accountTime: this.addForm.accountTime
      };
      axios({
        method: "post",
        data: req,
        url: "/banksys/busimarket/editbusimarketifsucce.do"
      })
        .then(res => {
          this.pageDataId = res.data.pageDataId;
          if (res.data.code === "1001") {
            this.$message.success("保存成功");
            this.dialogState = false;
            this.getTableData();
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleSubmit() {
      let req = {};
      req = {
        operationType: "submit",
        disId: this.addForm.disId,
        backId: this.addForm.backId,
        markStatus: this.addForm.markStatus,
        backDetails: this.addForm.backDetails,
        remark: this.addForm.remark,
        accountNO: this.addForm.accountNO,
        accountName: this.addForm.accountName,
        accountTime: this.addForm.accountTime
      };
      axios({
        method: "post",
        data: req,
        url: "/banksys/busimarket/editbusimarketifsucce.do"
      })
        .then(res => {
          if (res.data.code === "1001") {
            this.$message.success("提交成功");
            this.dialogState = false;
            this.getTableData();
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 重置选择条件
    clearConditions() {
      this.filters.creditCode = "";
      this.filters.firmName = "";
      this.filters.business_type = "";
      this.filters.startRegCapital = "";
      this.filters.endRegCapital = "";
      this.filters.setTime = "";
      this.filters.keyWords = [];
      this.filters.legalName = "";
      this.filters.financeName = "";
      this.filters.distributionCode = "";
      this.filters.nodeNameCode = "";
      this.filters.markStatusCode = "";
      this.filters.ageWarningCode = "";
    },
    //页面列表展示
    getTableData() {
      this.loading = true;
      this.loadingText = "拼命加载中";
      let para = {
        pagenum: this.page,
        rows: this.pageSize,
        creditCode: this.filters.creditCode,
        firmName: this.filters.firmName,
        firmType: this.filters.business_type,
        startRegCapital: this.filters.startRegCapital,
        endRegCapital: this.filters.endRegCapital,
        setTime: this.filters.setTime,
        runAddressList: this.filters.keyWords,
        legalName: this.filters.legalName,
        financeName: this.filters.financeName,
        nodeNameCode: this.filters.nodeNameCode,
        markStatusCode: this.filters.markStatusCode,
        ageWarningCode: this.filters.ageWarningCode,
        distributionCode: this.filters.distributionCode
      };
      axios({
        method: "post",
        url: "/banksys/busimarket/queryletsgsxxlist.do",
        data: para
      })
        .then(res => {
          if (res.data.code === "1001") {
            console.log(res)
            this.$message.success(res.data.msg);
            this.ifShow = res.data.data.dataMaxLevel;
            this.total = res.data.data.total;
            this.tableData = JSON.parse(AES.decrypt(res.data.data.list));
            this.loading = false;
            if (res.data.data.dataMaxLevel === 2) {
              this.ifShowBackButton = true;
            } else if (res.data.data.dataMaxLevel === 1) {
              this.ifShowBackButton = true;
            }
            if (res.data.unitRank === 1) {
              this.filters.nodeNameList1 = this.filters.nodeNameList2;
            } else if (res.data.unitRank === 0) {
              this.ifShowButtonTwo = true;
            } else if (res.data.unitRank === 2) {
              this.ifShowButton = false;
              this.filters.nodeNameList1 = this.filters.nodeNameList3;
            }
          } else {
            this.$message.error(res.data.msg);
            this.loading = false;
          }
        })
        .catch(err => {
          this.$message.error("网络异常，请重试！！！");
        });
    },
    handleDetail(yewId) {
      axios
        .post("/banksys/datadistribute/querybusinessdetailsbyId.do", {
          yewId: yewId
        })
        .then(res => {
          this.unitRank = res.data.unitRank;
          this.$router.push({
            path: "/NewBusinessDetail",
            query: [res.data.deta, res.data.unitRank]
          });
        })
        .catch(err => {
          this.$message.error("网络异常，请重试！！！");
        });
    },
    // 数据导出
    exportexcel() {
      this.loading = true;
      this.loadingText = "导出中，请稍后！！！";
      let sef = this;
      let req = {};
      for (var i = 0; i < this.multipleSelection.length; i++) {
        var yewId = this.multipleSelection[i].yewId;
        this.checkId.push(yewId);
      }
      req = {
        creditCode: this.filters.creditCode,
        firmName: this.filters.firmName,
        firmType: this.filters.business_type,
        startRegCapital: this.filters.startRegCapital,
        endRegCapital: this.filters.endRegCapital,
        setTime: this.filters.setTime,
        runAddressList: this.filters.keyWords,
        legalName: this.filters.legalName,
        financeName: this.filters.financeName,
        distributionCode: this.filters.distributionCode,
        nodeNameCode: this.filters.nodeNameCode,
        markStatusCode: this.filters.markStatusCode,
        ageWarningCode: this.filters.ageWarningCode,
        yewIdList: this.checkId
      };
      axios({
        method: "post",
        data: req,
        url: "/banksys/busimarket/exportbusimarketlist.do",
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
        });
    },
    //反馈回显
    handleFeedBack(backId, disId) {
      this.addForm.disId = disId;
      this.addForm.backId = backId;
      this.dialogState = true;
      let req = {};
      req = {
        disId: disId
      };
      axios({
        method: "post",
        url: "/banksys/busimarket/querybackdatabybackid.do",
        data: req
      })
        .then(res => {
          this.addForm.markStatus = res.data.data.markStatus;
          this.addForm.backDetails = res.data.data.backDetails;
          this.addForm.remark = res.data.data.remark;
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleCurrentChange(val) {
      this.page = val;
      this.getTableData();
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getTableData();
    },
    backtrack() {
      this.$router.push({ path: "/Businesslist" });
    }
  },
  components: {}
};
</script>

<style  scoped>
.form-box {
  margin-left: -10px;
}
.registered {
  margin-left: 45px;
}
.set-up {
  margin-left: -137px;
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
.exportexcel_button {
  background-color: #7a94fd;
  color: white;
  border-color: #7a94fd;
}
</style>
