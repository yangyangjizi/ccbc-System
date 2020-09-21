<template>
  <section>
    <!--工具条-->
    <el-col :span="24" class="toolbar">
      <div class="v_add">
        <p>客户详情信息</p>
        <el-form :model="epiForm">
          <table style="width: 100%" border="1">
            <tr>
              <td class="bg_color">机构编码 :</td>
              <td>
                <el-input v-model="epiForm.orgCode" readonly></el-input>
              </td>
            </tr>
            <tr>
              <td class="bg_color">机构名称 :</td>
              <td>
                <el-input v-model="epiForm.orgName" readonly></el-input>
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
              <td class="bg_color">地址 :</td>
              <td>
                <el-input v-model="epiForm.address" readonly></el-input>
              </td>
            </tr>
            <tr>
              <td class="bg_color">联系电话 :</td>
              <td>
                <el-input v-model="epiForm.contactTel" readonly></el-input>
              </td>
            </tr>
            <tr>
              <td class="bg_color">联系人 :</td>
              <td>
                <el-input v-model="epiForm.contactName" readonly></el-input>
              </td>
            </tr>
            <tr>
              <td class="bg_color">标签 :</td>
              <td>
                <el-input v-model="epiForm.label" readonly></el-input>
              </td>
            </tr>
            <tr>
              <td class="bg_color">分发支行名称 :</td>
              <td>
                <el-input v-model="epiForm.subName" readonly></el-input>
              </td>
            </tr>
            <tr>
              <td class="bg_color">分行分发操作员 :</td>
              <td>
                <el-input v-model="epiForm.bankDisName" readonly></el-input>
              </td>
            </tr>
            <tr>
              <td class="bg_color">分行分发时间 :</td>
              <td>
                <el-input v-model="epiForm.bankDisTime" readonly></el-input>
              </td>
            </tr>
            <tr>
              <td class="bg_color">分发网点名称 :</td>
              <td>
                <el-input v-model="epiForm.unitName" readonly></el-input>
              </td>
            </tr>
            <tr>
              <td class="bg_color">支行分发操作员 :</td>
              <td>
                <el-input v-model="epiForm.subDisName" readonly></el-input>
              </td>
            </tr>
            <tr>
              <td class="bg_color">支行分发时间 :</td>
              <td>
                <el-input v-model="epiForm.subDisTime" readonly></el-input>
              </td>
            </tr>
            <tr>
              <td class="bg_color">分发柜员姓名 :</td>
              <td>
                <el-input v-model="epiForm.staffName" readonly></el-input>
              </td>
            </tr>
            <tr>
              <td class="bg_color">网点分发操作员 :</td>
              <td>
                <el-input v-model="epiForm.unitDisName" readonly></el-input>
              </td>
            </tr>
            <tr>
              <td class="bg_color">网点分发操作时间 :</td>
              <td>
                <el-input v-model="epiForm.unitDisTime" readonly></el-input>
              </td>
            </tr>
            <tr>
              <td class="bg_color">确认认领状态 :</td>
              <td>
                <el-input v-model="epiForm.affirmStatusName" readonly></el-input>
              </td>
            </tr>
            <tr>
              <td class="bg_color">确认认领时间 :</td>
              <td>
                <el-input v-model="epiForm.affirmTime" readonly></el-input>
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
            >确认</el-button>-->
          </el-row>
        </el-form>
      </div>
      <!--撤回反馈列表-->
      <div class="v_add2">
        <p class="p-box margin_box">产品营销反馈记录</p>
        <el-table
          :data="regctedTableData"
          border
          style="width: 100%;"
          :header-cell-style="styleObj"
          highlight-current-row
        >
          <el-table-column prop="number" label="序号" align="center" width="55"></el-table-column>
          <el-table-column prop="productName" label="产品名称" align="center" show-overflow-tooltip></el-table-column>
          <el-table-column prop="markStatus" label="营销结果" align="center" show-overflow-tooltip></el-table-column>
          <el-table-column prop="unitName" label="提交机构名称" align="center" show-overflow-tooltip></el-table-column>
          <el-table-column prop="staffName" label="提交员工姓名" align="center" show-overflow-tooltip></el-table-column>
          <el-table-column prop="submitTime" label="提交时间" align="center" show-overflow-tooltip></el-table-column>
        </el-table>
      </div>
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
      total: 0,
      pageSize: 10,
      page: 1,
      codeType: "",
      clientId: "",
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
    this.clientId = this.$route.query.clientId;
    this.codeType = this.$route.query.codeType;
  },
  mounted() {
    this.getFeedBackCode();
    this.handleCheckAngin();
    this.handleBackList();
    // this.getProduct();
  },
  methods: {
    handleCurrentChange(val) {
      this.page = val;
    //   this.getUsers();
    },
    handleSizeChange(val) {
      this.pageSize = val;
    //   this.getUsers();
    },
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
        .post("/banksys/productsend/queryclientdetails.do", {
          clientId: this.clientId
          //   codeType:this.codeType,
        })
        .then(res => {
          this.epiForm = res.data.data;
          //   this.backStatus = res.data.data.backStatus;
          //   this.marketStatus = res.data.data.marketStatus;
          //   this.tags = this.epiForm.productList;
          //   this.unitRankCode = res.data.unitRank;
          //   this.regctedTableData = this.epiForm.counterList;
        })
        .catch(err => {
          this.$message.error("网络异常，请重试！！！");
        });
    },
    // 反馈记录查询数据
    handleBackList() {
      axios
        .post("/banksys/productsend/queryproductbacklist.do", {
          clientId: this.clientId,
          pagenum: this.page,
          rows: this.pageSize
        })
        .then(res => {
            console.log(res)
          this.regctedTableData = res.data.data.list;
          //   this.backStatus = res.data.data.backStatus;
          //   this.marketStatus = res.data.data.marketStatus;
          //   this.tags = this.epiForm.productList;
          //   this.unitRankCode = res.data.unitRank;
          //   this.regctedTableData = this.epiForm.counterList;
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
      this.$router.push({ path: "/ProductListTwo" });
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