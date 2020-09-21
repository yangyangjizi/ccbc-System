<template>
  <section>
    <!--工具条-->
    <el-col :span="24" class="toolbar">
      <div class="v_add">
        <p>农村地区非现金支付工具和方式新增</p>
        <el-form :model="payForm">
          <table style="width: 100%" border="1">
            <tr>
              <td class="bg_color">地区代码:</td>
              <td>
                <el-input v-model="payForm.regionCode"></el-input>
              </td>
            </tr>

            <tr>
              <td class="bg_color">银行卡业务量:</td>
              <td>
                <div class="childfloat">
                  <label>笔数（笔）:</label>
                  <el-input v-model="payForm.bcStrokeNum"></el-input>
                </div>
                <div class="childfloat">
                  <label>金额（元）:</label>
                  <el-input v-model="payForm.bcSunofmoney"></el-input>
                </div>
              </td>
            </tr>
            <tr>
              <td class="bg_color">票据业务量:</td>
              <td>
                <div class="childfloat">
                  <label>笔数（笔）:</label>
                  <el-input v-model="payForm.billStrokeNum"></el-input>
                </div>
                <div class="childfloat">
                  <label>金额（元）:</label>
                  <el-input v-model="payForm.billSunofmoney"></el-input>
                </div>
              </td>
            </tr>
            <tr>
              <td class="bg_color">网上支付:</td>
              <td>
                <div class="childfloat">
                  <label>开户数量（户）:</label>
                  <el-input v-model="payForm.olOpenaccountNum"></el-input>
                </div>
                <div class="childfloat">
                  <label>笔数（笔）:</label>
                  <el-input v-model="payForm.olStrokeNum"></el-input>
                </div>
                <div class="childfloat">
                  <label>金额（元）:</label>
                  <el-input v-model="payForm.olSunofmoney"></el-input>
                </div>
              </td>
            </tr>
            <tr>
              <td class="bg_color">移动支付:</td>
              <td>
                <div class="childfloat">
                  <label>开户数量（户）:</label>
                  <el-input v-model="payForm.moveOpenaccountNum"></el-input>
                </div>
                <div class="childfloat">
                  <label>笔数（笔）:</label>
                  <el-input v-model="payForm.moveStrokeNum"></el-input>
                </div>
                <div class="childfloat">
                  <label>金额（元）:</label>
                  <el-input v-model="payForm.moveSunofmoney"></el-input>
                </div>
              </td>
            </tr>
            <tr>
              <td class="bg_color">电话支付:</td>
              <td>
                <div class="childfloat">
                  <label>开户数量（户）:</label>
                  <el-input v-model="payForm.pnOpenaccountNum"></el-input>
                </div>
                <div class="childfloat">
                  <label>笔数（笔）:</label>
                  <el-input v-model="payForm.pnStrokeNum"></el-input>
                </div>
                <div class="childfloat">
                  <label>金额（元）:</label>
                  <el-input v-model="payForm.pnSunofmoney"></el-input>
                </div>
              </td>
            </tr>
            <tr>
              <td class="bg_color">电商业务量:</td>
              <td>
                <div class="childfloat">
                  <label>笔数（笔）:</label>
                  <el-input v-model="payForm.rlStrokeNum"></el-input>
                </div>
                <div class="childfloat">
                  <label>金额（元）:</label>
                  <el-input v-model="payForm.rlSunofmoney"></el-input>
                </div>
              </td>
            </tr>
            <tr>
              <td class="bg_color">备注:</td>
              <td>
                <el-input type="textarea" v-model="payForm.remark"></el-input>
              </td>
            </tr>
            <tr>
              <td class="bg_color">统计时间：</td>
              <td>
                <!-- <el-date-picker
                    v-model="payForm.statisticsTime"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期" style="width: 100%;">
                </el-date-picker>-->
                <el-date-picker
                  v-model="payForm.statisticsTime"
                  type="month"
                  style="width: 100%;"
                  placeholder="选择月"
                ></el-date-picker>
              </td>
            </tr>
          </table>
          <el-row>
            <el-button type="primary" @click="handleSave">保存</el-button>
            <el-button type="success" @click="handleSubmit" class="submit_color">提交</el-button>
            <el-button @click="backtrack">返回</el-button>
          </el-row>
        </el-form>
      </div>
    </el-col>
  </section>
</template>
<script>
import axios from "axios";
import bus from "../../bus";
export default {
  data() {
    return {
      payForm: {
        regionCode: "",
        bcStrokeNum: "",
        bcSunofmoney: "",
        billStrokeNum: "",
        billSunofmoney: "",
        olStrokeNum: "",
        olSunofmoney: "",
        olOpenaccountNum: "",
        moveStrokeNum: "",
        moveSunofmoney: "",
        moveOpenaccountNum: "",
        pnStrokeNum: "",
        pnSunofmoney: "",
        pnOpenaccountNum: "",
        rlStrokeNum: "",
        rlSunofmoney: "",
        remark: "",
        statisticsTime: ""
      },
      // operationType:'',
      tableData: [],
      total: 0,
      page: 1
    };
  },
  methods: {
    backtrack() {
      this.$router.back(-1);
    },
    handleSave() {
      let req = {};
      req = {
        regionCode: this.payForm.regionCode,
        bcStrokeNum: this.payForm.bcStrokeNum,
        bcSunofmoney: this.payForm.bcSunofmoney,
        billStrokeNum: this.payForm.billStrokeNum,
        billSunofmoney: this.payForm.billSunofmoney,
        olStrokeNum: this.payForm.olStrokeNum,
        olSunofmoney: this.payForm.olSunofmoney,
        olOpenaccountNum: this.payForm.olOpenaccountNum,
        moveStrokeNum: this.payForm.moveStrokeNum,
        moveSunofmoney: this.payForm.moveSunofmoney,
        moveOpenaccountNum: this.payForm.moveOpenaccountNum,
        pnStrokeNum: this.payForm.pnStrokeNum,
        pnSunofmoney: this.payForm.pnSunofmoney,
        pnOpenaccountNum: this.payForm.pnOpenaccountNum,
        rlStrokeNum: this.payForm.rlStrokeNum,
        rlSunofmoney: this.payForm.rlSunofmoney,
        rlSunofmoney: this.payForm.rlSunofmoney,
        remark: this.payForm.remark,
        statisticsTime: this.payForm.statisticsTime,
        operationType: "save"
      };
      axios({
        method: "post",
        data: req,
        url: "/banksys/paymentmethod/addpaymentmethod.do"
      })
        .then(res => {
          this.pageDataId = res.data.pageDataId;
          if (res.data.code === "1001") {
            this.$message.success("保存成功");
            bus.$emit("handleChangeMata2", "true");
            this.$router.push({ path: "/Ruralpaylist" });
          }
        })
        .catch(() => {
          this.$message.error("网络异常,请稍后重试!!!");
        });
    },
    handleSubmit() {
      this.$confirm("您确定提交吗？ 提交之后将不能编辑和删除！", "提示", {
        type: "warning"
      })
        .then(() => {
          let req = {};
          req = {
            regionCode: this.payForm.regionCode,
            bcStrokeNum: this.payForm.bcStrokeNum,
            bcSunofmoney: this.payForm.bcSunofmoney,
            billStrokeNum: this.payForm.billStrokeNum,
            billSunofmoney: this.payForm.billSunofmoney,
            olStrokeNum: this.payForm.olStrokeNum,
            olSunofmoney: this.payForm.olSunofmoney,
            olOpenaccountNum: this.payForm.olOpenaccountNum,
            moveStrokeNum: this.payForm.moveStrokeNum,
            moveSunofmoney: this.payForm.moveSunofmoney,
            moveOpenaccountNum: this.payForm.moveOpenaccountNum,
            pnStrokeNum: this.payForm.pnStrokeNum,
            pnSunofmoney: this.payForm.pnSunofmoney,
            pnOpenaccountNum: this.payForm.pnOpenaccountNum,
            rlStrokeNum: this.payForm.rlStrokeNum,
            rlSunofmoney: this.payForm.rlSunofmoney,
            rlSunofmoney: this.payForm.rlSunofmoney,
            remark: this.payForm.remark,
            statisticsTime: this.payForm.statisticsTime,
            operationType: "submit"
          };
          axios({
            method: "post",
            data: req,
            url: "/banksys/paymentmethod/addpaymentmethod.do"
          }).then(res => {
            if (res.data.code === "1001") {
              this.$message.success("提交成功");
              bus.$emit("handleChangeMata2", "true");
              this.$router.push({ path: "/Ruralpaylist" });
            }
          }).catch(err => {
        this.$message.error("网络异常，请重试！！！")
      });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    }
  }
};
</script>
<style scoped>
.v_add {
  width: 560px;
  margin: 0 auto;
  height: auto;
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
.childfloat {
  overflow: hidden;
  margin-bottom: 10px;
}
.childfloat label {
  font-size: 14px;
  float: left;
  width: 110px;
  text-align: right;
  line-height: 40px;
}
.childfloat .el-input {
  float: right;
  width: 250px;
}
</style>