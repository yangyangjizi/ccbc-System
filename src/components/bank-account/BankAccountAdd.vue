<template>
  <section>
    <!--工具条-->
    <el-col
      :span="24"
      class="toolbar"
    >
      <div class="v_add">
        <p>银行账户情况统计表新增</p>
        <el-form :model="bankForm">
          <table style="width: 100%" border="1">
            <tr>
              <td class="bg_color">存款人类别:</td>
              <td>
                <el-select v-model="bankForm.value"  placeholder="请选择" class="el-select-box">
                  <el-option
                    v-for="item in bankForm.queryTypeList"
                    :key="item.code"
                    :label="item.codeName"
                    :value="item.code"
                  ></el-option>
                </el-select>
              </td>
            </tr>
            <tr>
              <td class="bg_color">拒绝开户:</td>
              <td>
                <el-input v-model="bankForm.refuseopenAccount" size="mini"></el-input>
              </td>
            </tr>
            <tr>
              <td class="bg_color">延长开户审查期限:</td>
              <td>
                <el-input v-model="bankForm.extendopenAccounttime" size="mini"></el-input>
              </td>
            </tr>
            <tr>
              <td class="bg_color">控制账户交易:</td>
              <td>
                <el-row>
                  <el-col :span="10">
                    <span>暂停非柜面业务:</span>
                  </el-col>
                  <el-col :span="14">
                    <el-input v-model="bankForm.suspend" size="mini"></el-input>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="10">
                    <span>限制交易规模或频率:</span>
                  </el-col>
                  <el-col :span="14">
                    <el-input v-model="bankForm.limitScale" size="mini"></el-input>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="10">
                    <span>停止支付:</span>
                  </el-col>
                  <el-col :span="14">
                    <el-input v-model="bankForm.stopPayment" size="mini"></el-input>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="10">
                    <span>终止业务:</span>
                  </el-col>
                  <el-col :span="14">
                    <el-input v-model="bankForm.stopBusiness" size="mini"></el-input>
                  </el-col>
                </el-row>
              </td>
            </tr>
            <tr>
             <td class="bg_color">统计时间：</td>
             <td> 
                  <el-date-picker
                    v-model="bankForm.statisticsTime"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期" style="width: 100%;">
                  </el-date-picker>
             </td>
           </tr>
          </table>
          <el-row>
            <el-button type="primary" @click="handleSave">保存</el-button>
            <el-button type="success" @click="handleSubmit" class="submit_color">提交</el-button>
            <el-button type="primary" plain @click="backtrack">返回</el-button>
          </el-row>
        </el-form>
      </div>
    </el-col>
  </section>
</template>

<script>
import axios from 'axios'
export default {
  name: "BankAccountAdd",
  data() {
    return {
      bankForm: {
        refuseopenAccount:'',
        extendopenAccounttime:'',
        suspend:'',
        limitScale:'',
        stopPayment:'',
        stopBusiness:'',
        statisticsTime:'',
        createTime:'',
        submitTime:'',
        queryTypeList:[],
        value: ''
      },
      tableData: [],
      total: 0,
      page: 1,
    };
  },
  created() {},
  mounted() {
     this.getAccountType()
  },
  methods: {
    //保存
    handleSave() {
      let req = {};
      req = {
        operationType: "save",
        depositorType: this.bankForm.value,
        refuseopenAccount: this.bankForm.refuseopenAccount,
        extendopenAccounttime: this.bankForm.extendopenAccounttime,
        suspend: this.bankForm.suspend,
        limitScale: this.bankForm.limitScale,
        stopPayment: this.bankForm.stopPayment,
        subtotal: this.bankForm.subtotal,
        stopBusiness: this.bankForm.stopBusiness
      };
      axios({
        method: "post",
        data: req,
        url: "/banksys/banckaccount/saveBankAccount.do"
      })
        .then(res => {
          if (res.data.code === "1001") {
            this.$message.success(res.data.msg);
          }else{
            this.$message.err(res.data.msg);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //提交
    handleSubmit() {
      let req = {};
      req = {
        operationType: "submit",
        depositorType: this.bankForm.value,
        refuseopenAccount: this.bankForm.refuseopenAccount,
        extendopenAccounttime: this.bankForm.extendopenAccounttime,
        suspend: this.bankForm.suspend,
        limitScale: this.bankForm.limitScale,
        stopPayment: this.bankForm.stopPayment,
        subtotal: this.bankForm.subtotal,
        stopBusiness: this.bankForm.stopBusiness
      };
      axios({
        method: "post",
        data: req,
        url: "/banksys/banckaccount/saveBankAccount.do"
      })
        .then(res => {
          if (res.data.code === "1001") {
            this.$message.success(res.data.msg);
          }else {
            this.$message.error(res.data.msg)
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    backtrack() {
      this.$router.push({ path: "/BankAccount" });
    },
    getBankAccountType() {
      axios
        .post("/banksys/banckaccount/queryDepositorType.do", "")
        .then(res => {
          this.bankForm.queryTypeList = res.data.queryTypeList;
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
  
}
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
table{
  border-collapse:collapse;border-spacing:0;
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
span {
  font-size: 14px;
  display: block;
  width: 140px;
  text-align: right;
}
.submit_color{
 background: #858ffd;
 border-color: #858ffd;
}
.submit_color:hover{
background-color: #A6ACEF;
border-color: #A6ACEF;
}
.el-select-box{
  width: 370px
}
</style>
