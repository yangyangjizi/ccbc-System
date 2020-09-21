<template>
  <section>
    <!--工具条-->
    <el-col :span="24" class="toolbar">
      <div class="v_add">
        <p>企业产品汇总详情</p>
        <el-form :model="epiForm">
          <table style="width: 100%" border="1">
            <tr>
              <td class="bg_color">机构编码 :</td>
              <td>
                <el-input v-model="epiForm.dataUnitCode" readonly></el-input>
              </td>
            </tr>
            <tr>
              <td class="bg_color">机构名称 :</td>
              <td>
                <el-input v-model="epiForm.dataUnitName" readonly></el-input>
              </td>
            </tr>
            <tr>
              <td class="bg_color">客户编码 :</td>
              <td>
                <el-input v-model="epiForm.clientCode" readonly></el-input>
              </td>
            </tr>
            <tr>
              <td class="bg_color">客户名称 :</td>
              <td>
                <el-input v-model="epiForm.clientName" readonly></el-input>
              </td>
            </tr>
            <tr>
              <td class="bg_color">对公客户类型 :</td>
              <td>
                <el-input v-model="epiForm.toPublicType" readonly></el-input>
              </td>
            </tr>
            <tr>
              <td class="bg_color">客户归属总行部门 :</td>
              <td>
                <el-input v-model="epiForm.clientHeadDept" readonly></el-input>
              </td>
            </tr>
            <tr>
              <td class="bg_color">场景名称 :</td>
              <td>
                <el-input v-model="epiForm.sceneName" readonly></el-input>
              </td>
            </tr>
            <tr>
              <td class="bg_color">折算后数量 :</td>
              <td>
                <el-input v-model="epiForm.convertNum" readonly></el-input>
              </td>
            </tr>
            <tr>
              <td class="bg_color">规模 :</td>
              <td>
                <el-input v-model="epiForm.scale" readonly></el-input>
              </td>
            </tr>
            <tr>
              <td class="bg_color">公司机构客户金融总量日均余额合计（元） :</td>
              <td>
                <el-input v-model="epiForm.balanceTotal" readonly></el-input>
              </td>
            </tr>
            <tr>
              <td class="bg_color">账务性交易量笔数合计 :</td>
              <td>
                <el-input v-model="epiForm.tradingTotal" readonly></el-input>
              </td>
            </tr>
            <tr>
              <td class="bg_color">产品覆盖度 :</td>
              <td>
                <el-input v-model="epiForm.productCover" readonly></el-input>
              </td>
            </tr>
            <tr>
              <td class="bg_color">公司类存款本币日均余额（元） :</td>
              <td>
                <el-input v-model="epiForm.depositBalance" readonly></el-input>
              </td>
            </tr>
            <tr>
              <td class="bg_color">使用账单自助服务 :</td>
              <td>
                <el-input v-model="epiForm.selfService" readonly></el-input>
              </td>
            </tr>
            <tr>
              <td class="bg_color">使用新型结算产品 :</td>
              <td>
                <el-input v-model="epiForm.settlementPro" readonly></el-input>
              </td>
            </tr>
            <tr>
              <td class="bg_color">使用单位结算卡 :</td>
              <td>
                <el-input v-model="epiForm.debitCard" readonly></el-input>
              </td>
            </tr>
            <tr>
              <td class="bg_color">基础结算业务收入（元） :</td>
              <td>
                <el-input v-model="epiForm.busiIncome" readonly></el-input>
              </td>
            </tr>
            <tr>
              <td class="bg_color">使用对公信用卡 :</td>
              <td>
                <el-input v-model="epiForm.publicCreditCard" readonly></el-input>
              </td>
            </tr>
            <tr>
              <td class="bg_color">使用商户收单业务 :</td>
              <td>
                <el-input v-model="epiForm.receiveSingle" readonly></el-input>
              </td>
            </tr>
            <tr>
              <td class="bg_color">使用代发工资 :</td>
              <td>
                <el-input v-model="epiForm.payrollCredit" readonly></el-input>
              </td>
            </tr>
            <tr>
              <td class="bg_color">代理财险业务收入（元） :</td>
              <td>
                <el-input v-model="epiForm.insuranceBusi" readonly></el-input>
              </td>
            </tr>
            <tr>
              <td class="bg_color">使用代理收付款业务 :</td>
              <td>
                <el-input v-model="epiForm.paymentBusi" readonly></el-input>
              </td>
            </tr>
            <tr>
              <td class="bg_color">代客业务交易金额（元） :</td>
              <td>
                <el-input v-model="epiForm.valetService" readonly></el-input>
              </td>
            </tr>
            <tr>
              <td class="bg_color">代客贵金属年交易金额（元） :</td>
              <td>
                <el-input v-model="epiForm.nobleMetal" readonly></el-input>
              </td>
            </tr>
            <tr>
              <td class="bg_color">保函业务日均余额（元） :</td>
              <td>
                <el-input v-model="epiForm.guaranBusi" readonly></el-input>
              </td>
            </tr>
            <tr>
              <td class="bg_color">鑫存管业务签约 :</td>
              <td>
                <el-input v-model="epiForm.busiContract" readonly></el-input>
              </td>
            </tr>
            <tr>
              <td class="bg_color">使用监管产品 :</td>
              <td>
                <el-input v-model="epiForm.regulPro" readonly></el-input>
              </td>
            </tr>
            <tr>
              <td class="bg_color">年金产品签约 :</td>
              <td>
                <el-input v-model="epiForm.annuityPro" readonly></el-input>
              </td>
            </tr>
            <tr>
              <td class="bg_color">类年金产品签约 :</td>
              <td>
                <el-input v-model="epiForm.classAnnuityPro" readonly></el-input>
              </td>
            </tr>
            <tr>
              <td class="bg_color">投资托管业务收入（元） :</td>
              <td>
                <el-input v-model="epiForm.investIncome" readonly></el-input>
              </td>
            </tr>
            <tr>
              <td class="bg_color">对公网络系统签约 :</td>
              <td>
                <el-input v-model="epiForm.publicNetwork" readonly></el-input>
              </td>
            </tr>
            <tr>
              <td class="bg_color">善融商务交易 :</td>
              <td>
                <el-input v-model="epiForm.shanrongBusi" readonly></el-input>
              </td>
            </tr>
            <tr>
              <td class="bg_color">使用善融商务融资 :</td>
              <td>
                <el-input v-model="epiForm.useShanrongBusi" readonly></el-input>
              </td>
            </tr>
            <tr>
              <td class="bg_color">理财产品发行签约 :</td>
              <td>
                <el-input v-model="epiForm.financialPro" readonly></el-input>
              </td>
            </tr>
            <tr>
              <td class="bg_color">理财产品购买日均余额（元） :</td>
              <td>
                <el-input v-model="epiForm.financialProBalance" readonly></el-input>
              </td>
            </tr>
            <tr>
              <td class="bg_color">债券承销业务签约 :</td>
              <td>
                <el-input v-model="epiForm.underwritBusi" readonly></el-input>
              </td>
            </tr>
            <tr>
              <td class="bg_color">工程造价咨询业务收入（元） :</td>
              <td>
                <el-input v-model="epiForm.consultRevenue" readonly></el-input>
              </td>
            </tr>
            <tr>
              <td class="bg_color">财务顾问业务收入（元） :</td>
              <td>
                <el-input v-model="epiForm.advisoryBusi" readonly></el-input>
              </td>
            </tr>
            <tr>
              <td class="bg_color">黄金积存 :</td>
              <td>
                <el-input v-model="epiForm.goldStore" readonly></el-input>
              </td>
            </tr>
            <tr>
              <td class="bg_color">福费廷 :</td>
              <td>
                <el-input v-model="epiForm.forfaiting" readonly></el-input>
              </td>
            </tr>
            <tr>
              <td class="bg_color">国内信用证 :</td>
              <td>
                <el-input v-model="epiForm.creditCard" readonly></el-input>
              </td>
            </tr>
            <tr>
              <td class="bg_color">代销建信信托 :</td>
              <td>
                <el-input v-model="epiForm.trust" readonly></el-input>
              </td>
            </tr>
            <tr>
              <td class="bg_color">代销建信基金 :</td>
              <td>
                <el-input v-model="epiForm.fund" readonly></el-input>
              </td>
            </tr>
            <tr v-if="this.unitRankCode === 0">
              <td class="bg_color">分发支行名称：</td>
              <td>
                <el-input v-model="epiForm.subName" readonly></el-input>
              </td>
            </tr>
            <tr v-if="this.unitRankCode === 0">
              <td class="bg_color">分行分发时间：</td>
              <td>
                <el-input v-model="epiForm.bankDisTime" readonly></el-input>
              </td>
            </tr>
            <tr v-if="this.unitRankCode === 0 || this.unitRankCode === 1">
              <td class="bg_color">分发网点名称：</td>
              <td>
                <el-input v-model="epiForm.unitName" readonly></el-input>
              </td>
            </tr>
            <tr v-if="this.unitRankCode === 0 || this.unitRankCode === 1">
              <td class="bg_color">支行分发时间：</td>
              <td>
                <el-input v-model="epiForm.subDisTime" readonly></el-input>
              </td>
            </tr>
            <tr v-if="this.unitRankCode === 0 || this.unitRankCode === 1|| this.unitRankCode === 2">
              <td class="bg_color">分发员工名称：</td>
              <td>
                <el-input v-model="epiForm.staffName" readonly></el-input>
              </td>
            </tr>
            <tr v-if="this.unitRankCode === 0 || this.unitRankCode === 1|| this.unitRankCode === 2">
              <td class="bg_color">网点分发时间：</td>
              <td>
                <el-input v-model="epiForm.unitDisTime" readonly></el-input>
              </td>
            </tr>
            <tr v-if="this.unitRankCode === 0 || this.unitRankCode === 1|| this.unitRankCode === 2">
              <td class="bg_color">确认领取状态：</td>
              <td>
                <el-input v-model="epiForm.affirmStatus" readonly></el-input>
              </td>
            </tr>
            <tr v-if="this.unitRankCode === 0 || this.unitRankCode === 1|| this.unitRankCode === 2">
              <td class="bg_color">确认领取时间：</td>
              <td>
                <el-input v-model="epiForm.affirmDate" readonly></el-input>
              </td>
            </tr>
            <tr>
              <td class="bg_color">营销状态 :</td>
              <td>
                <el-input v-model="epiForm.markStatus" readonly></el-input>
              </td>
            </tr>
            <tr>
              <td class="bg_color">反馈内容 :</td>
              <td>
                <el-input v-model="epiForm.backDetails" readonly></el-input>
              </td>
            </tr>
            <tr>
              <td class="bg_color">银行账户 :</td>
              <td>
                <el-input v-model="epiForm.accountNo" readonly></el-input>
              </td>
            </tr>
            <tr>
              <td class="bg_color">账户名称 :</td>
              <td>
                <el-input v-model="epiForm.accountName" readonly></el-input>
              </td>
            </tr>
            <tr>
              <td class="bg_color">开户时间 :</td>
              <td>
                <el-input v-model="epiForm.accountTime" readonly></el-input>
              </td>
            </tr>
            <tr>
              <td class="bg_color">备注 :</td>
              <td>
                <el-input v-model="epiForm.remark" readonly></el-input>
              </td>
            </tr>
          </table>
          <el-row>
            <el-button class="margin-box2" @click="backtrack">返回</el-button>
            <!-- <el-button
              class="margin-box2"
              v-if="this.marketStatus == 0 && this.pageCode =='99'"
              @click="handleFeedBack"
            >反馈</el-button>
            <el-button
              class="margin-box2"
              v-if="this.backStatus ==0 && this.pageCode =='99' && this.unitRankCode != 3"
              @click="handleRejected"
            >驳回</el-button>
            <el-button
              class="margin-box2"
              v-if="this.backStatus ==0 && this.pageCode =='99' && this.unitRankCode != 3"
              @click="handleSure"
            >确认</el-button> -->
          </el-row>
        </el-form>
      </div>
      <!--撤回反馈列表-->
      <div class="v_add2">
        <p class="p-box margin_box">撤回记录</p>
        <el-table
          :data="regctedTableData"
          border
          style="width: 100%;"
          :header-cell-style="styleObj"
          highlight-current-row
        >
          <el-table-column prop="number" label="序号" align="center" width="55">
            <template slot-scope="scope">{{ scope.row.number }}</template>
          </el-table-column>
          <el-table-column prop="firmName" label="撤回原因" align="center" show-overflow-tooltip>
            <template slot-scope="scope">{{ scope.row.counterReason }}</template>
          </el-table-column>
          <el-table-column prop="firmName" label="撤回机构名称" align="center" show-overflow-tooltip>
            <template slot-scope="scope">{{ scope.row.unitName }}</template>
          </el-table-column>
          <el-table-column prop="firmName" label="撤回机构级别" align="center" show-overflow-tooltip>
            <template slot-scope="scope">{{ scope.row.unitType }}</template>
          </el-table-column>
          <el-table-column prop="firmName" label="撤回时间" align="center" show-overflow-tooltip>
            <template slot-scope="scope">{{ scope.row.counterTime }}</template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 弹出驳回反馈框 -->
      <el-dialog :visible.sync="dialogRejectedState" title="驳回" width="30%" center>
        <el-form :model="rejectedForm" label-width="80px" class="input-box6">
          <el-form-item label="撤回理由:">
            <el-input
              v-model="rejectedForm.counterReason"
              type="textarea"
              :rows="4"
              class="input-box5"
              @input="change($event)"
            ></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="success" @click.native="handleRejectedSubmit">提交</el-button>
          <el-button @click="dialogRejectedState = false">取消</el-button>
        </span>
      </el-dialog>

      <!-- 弹出反馈框 -->
      <el-dialog :visible.sync="dialogState" title="反馈" width="30%" center>
        <el-form :model="addForm" ref="addForm" :rules="addFormRules" label-width="100px">
          <el-form-item label="产品名称:" prop="productName">
            <el-select
              v-model="addForm.productName"
              size="small"
              style="width:70%"
              @input="change($event)"
            >
              <el-option
                v-for="item in this.addForm.productNameList"
                :label="item.productName"
                :value="item.productId"
                :key="item.productId"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="营销状态:" prop="markStatusCode">
            <el-select
              v-model="addForm.markStatusCode"
              size="small"
              style="width:70%"
              @input="change($event)"
            >
              <el-option
                v-for="item in this.addForm.markStatusList"
                :label="item.label"
                :value="item.value"
                :key="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="反馈内容:" v-if="addForm.markStatusCode === '1'" prop="backDetails">
            <el-select
              v-model="addForm.backCode"
              size="small"
              style="width:70%"
              @input="change($event)"
            >
              <el-option
                v-for="(item,index) in this.addForm.backDetailsList"
                :label="item.codeName"
                :value="item.code"
                :key="index"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="员工编号:" prop="staffNo">
            <el-input v-model="addForm.staffNo" style="width:70%"></el-input>
          </el-form-item>
          <el-form-item label="提交人姓名:" prop="submitName">
            <el-input v-model="addForm.submitName" style="width:70%"></el-input>
          </el-form-item>
          <el-form-item label="备注:">
            <el-input
              v-model="addForm.remark"
              type="textarea"
              :rows="4"
              style="width:70%"
              @input="change($event)"
            ></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="success" @click.native="handleSubmit('addForm')">提交</el-button>
          <el-button @click="dialogState = false">返回</el-button>
        </span>
      </el-dialog>
    </el-col>
  </section>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      codeType:"",
      backStatus: "",
      marketStatus: "",
      unitRankCode: "",
      epiForm: {},
      tags: [],
      taxId: "",
      disId: "",
      pageCode: "",
      dialogState: false,
      dialogRejectedState: false,
      regctedTableData: [],
      rejectedForm: {
        counterReason: ""
      },
      addForm: {
        productName: "",
        markStatusCode: "",
        backCode: "",
        remark: "",
        submitTime: "",
        staffNo: "",
        submitName: "",
        productNameList: [],
        markStatusList: [
          {
            value: "0",
            label: "营销成功"
          },
          {
            value: "1",
            label: "营销失败"
          }
        ],
        backDetailsList: []
      },
      addFormRules: {
        productName: [
          { required: true, message: "请选择产品名称", trigger: "change" }
        ],
        markStatusCode: [
          { required: true, message: "请选择营销状态", trigger: "change" }
        ],
        staffNo: [
          { required: true, message: "请输入员工编号", trigger: "blur" }
        ],
        submitName: [
          { required: true, message: "请输入提交人姓名", trigger: "blur" }
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
    this.taxId = this.$route.query.taxId;
    this.disId = this.$route.query.disId;
    this.codeType = this.$route.query.codeType;
    this.pageCode = this.$route.query.pageCode;
  },
  mounted() {
    this.getFeedBackCode();
    this.handleCheckAngin();
    // this.getProduct();
  },
  methods: {
    // 确认提交反馈
    handleRejectedSubmit() {
      let req = {};
      req = {
        disId: this.disId,
        taxId: this.taxId,
        counterReason: this.rejectedForm.counterReason
      };
      axios({
        method: "post",
        data: req,
        url: "/banksys/busimarket/countertaxdata.do"
      })
        .then(res => {
          if (res.data.code === "1001") {
            this.$message.success(res.data.msg);
            this.dialogRejectedState = false;
            this.$router.push({ path: "/ProductList" });
          } else {
            this.$message.error(res.data.msg);
            this.dialogRejectedState = false;
          }
          this.$refs.rejectedForm.resetFields();
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 反馈
    handleFeedBack() {
      this.dialogState = true;
    },
    //确认按钮
    handleSure() {
      this.$confirm("是否确认接收该数据?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          axios
            .post("/banksys/busimarket/affirmtaxdata.do", {
              disId: this.disId
            })
            .then(res => {
              if (res.data.code == "1001") {
                this.$message.success(res.data.msg);
                this.handleCheckAngin();
              } else {
                this.$message.error(res.data.msg);
              }
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消接收该数据"
          });
        });
    },
    // 驳回
    handleRejected() {
      this.dialogRejectedState = true;
    },

    // 详情内容数据
    handleCheckAngin() {
      axios
        .post("/banksys/busimarket/queryclientdetails.do", {
          taxId: this.taxId,
          codeType:this.codeType,
        })
        .then(res => {
          this.epiForm = res.data.data;
          this.backStatus = res.data.data.backStatus;
          this.marketStatus = res.data.data.marketStatus;
          this.tags = this.epiForm.productList;
          this.unitRankCode = res.data.unitRank;
          this.regctedTableData = this.epiForm.counterList;
        })
        .catch(err => {
          this.$message.error("网络异常，请重试！！！");
        });
    },

    handleSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let req = {};
          req = {
            operationType: "submit",
            productId: this.addForm.productId,
            productName: this.addForm.productName,
            markStatus: this.addForm.markStatusCode,
            backDetails: this.addForm.backCode,
            remark: this.addForm.remark,
            submitTime: this.addForm.submitTime,
            disId: this.disId,
            taxId: this.taxId
          };
          axios({
            method: "post",
            data: req,
            url: "/banksys/busimarket/edittaxbackdata.do"
          })
            .then(res => {
              if (res.data.code === "1001") {
                this.$message.success(res.data.msg);
                this.dialogState = false;
                this.handleCheckAngin();
                if (res.data.pageRes === "0") {
                  this.$router.push({ path: "/ProductList" });
                }
              } else {
                this.$message.error(res.data.msg);
                this.dialogState = false;
              }
              this.$refs.addForm.resetFields();
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          return false;
        }
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
    // 产品名称数据
    // getProduct() {
    //   let prop = {};
    //   prop = {
    //     taxId: this.taxId,
    //     disId: this.disId
    //   };
    //   axios({
    //     method: "post",
    //     data: prop,
    //     url: "/banksys/busimarket/queryProNameListByTaxId.do"
    //   })
    //     .then(res => {
    //       this.addForm.productNameList = res.data.data;
    //       const propCodeAll = res.data.data[0].productName;
    //       if (propCodeAll === "全部") {
    //         this.addForm.markStatusCode = "1";
    //       }
    //     })
    //     .catch(err => {
    //       this.$message.error("网络异常，请重试！！！");
    //     });
    // },

    change(e) {
      this.$forceUpdate();
    },
    backtrack() {
      this.$router.push({ path: "/ProductList" });
    }
  }
};
</script>
<style scoped>
.el-tag--light {
  margin: 5px;
}
.v_add {
  width: 560px;
  margin: 0 auto;
  height: auto;
}
.v_add2 {
  width: 100%;
  margin: 0 auto;
  height: auto;
}
.margin_box {
  margin-top: 20px;
}
.v_add p {
  text-align: center;
  margin-bottom: 20px;
  font-size: 17px;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
  text-align: center;
  border-top: #dbdbdb;
  border-left: #dbdbdb;
  border-right: #dbdbdb;
  border-bottom: #dbdbdb;
}
table td {
  padding: 6px;
}
.bg_color {
  background-color: #eef1f6;
  color: #333;
  width: 160px;
  font-size: 14px;
}
.el-row {
  text-align: center;
  padding-top: 20px;
}
.submit_color {
  background: #858ffd;
  border-color: #858ffd;
}
.submit_color:hover {
  background-color: #a6acef;
  border-color: #a6acef;
}
</style>