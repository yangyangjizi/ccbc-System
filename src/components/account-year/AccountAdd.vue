<template>
  <section>
    <!--工具条-->
    <el-col
      :span="24"
      class="toolbar"
    >
      <div class="v_add">
        <p>账户年检统计表新增</p>
        <el-form :model="addForm">
          <table style="width: 100%" border="1">
            <tr>
              <td class="bg_color">账户类型:</td>
              <td>
                <el-select v-model="addForm.value" placeholder="请选择" width="100%">
                  <el-option
                    v-for="item in addForm.qyeryAccountTypeList"
                    :key="item.code"
                    :label="item.codeName"
                    :value="item.code"
                  ></el-option>
                </el-select>
              </td>
            </tr>
            <tr>
              <td class="bg_color">年检结束时，本机构存量账户数量:</td>
              <td>
                <el-input v-model="addForm.yearlyNum"></el-input>
              </td>
            </tr>

            <tr>
              <td class="bg_color">未纳入年检账范围户的数量：</td>
              <td>
                <div class="childfloat">
                  <label>临时存款账户数量:</label>
                  <el-input v-model="addForm.temporaryNum"></el-input>
                </div>
                <div class="childfloat">
                  <label>法院、公安等部门冻结账户数量:</label>
                  <el-input v-model="addForm.frozenNum"></el-input>
                </div>
                <div class="childfloat">
                  <label>久悬账户数量:</label>
                  <el-input v-model="addForm.dangerousNum"></el-input>
                </div>
                <div class="childfloat">
                  <label>当年新开立账户数量:</label>
                  <el-input v-model="addForm.newaccountNum"></el-input>
                </div>
                <div class="childfloat">
                  <label>小计:</label>
                  <el-input v-model="addForm.subtotal"></el-input>
                </div>
              </td>
            </tr>
            <tr>
              <td class="bg_color">应年检账户数量:</td>
              <td>
                <el-input v-model="addForm.shouldyearlyNum"></el-input>
              </td>
            </tr>
            <tr>
              <td class="bg_color">年检结果：</td>
              <td>
                <div class="childfloat">
                  <label>年检合格账户数量:</label>
                  <el-input v-model="addForm.qualifiedNum"></el-input>
                </div>
                <div class="childfloat">
                  <label>年检不合格账户数量:</label>
                  <el-input v-model="addForm.unqualifiedNum"></el-input>
                </div>
                <div class="childfloat">
                  <label>未年检账户数量:</label>
                  <el-input v-model="addForm.notcheckedNum"></el-input>
                </div>
              </td>
            </tr>
            <tr>
              <td class="bg_color">账户年检率：</td>
              <td>
                <el-input v-model="addForm.yearlyRate" class="el-input-box"></el-input><span>%</span>
              </td>
            </tr>
            <tr>
             <td class="bg_color">统计时间：</td>
             <td> 
                  <el-date-picker
                    v-model="addForm.statisticsTime"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期" style="width: 100%;">
                  </el-date-picker>
             </td>
           </tr>
          </table>
          <el-row>
            <el-button type="primary" @click.native="handleSave">保存</el-button>
            <el-button type="success" @click.native="handleSubmit" class="submit_color">提交</el-button>
            <el-button @click="backtrack">返回</el-button>
          </el-row>
        </el-form>
      </div>
    </el-col>
  </section>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      addForm: {
        qyeryAccountTypeList: [],
        value: ""
      },

      tableData: [],
      total: 0,
      page: 1,
      pageDataId:""
    };
  },
  mounted() {
    this.getAccountType();
  },
  methods: {
    handleSave() {
      let req = {};
      req = {
        operationType: "save",
        accountType: this.addForm.value,
        yearlyNum: this.addForm.yearlyNum,
        temporaryNum: this.addForm.temporaryNum,
        frozenNum: this.addForm.frozenNum,
        dangerousNum: this.addForm.dangerousNum,
        newaccountNum: this.addForm.newaccountNum,
        subtotal: this.addForm.subtotal,
        shouldyearlyNum: this.addForm.shouldyearlyNum,
        qualifiedNum: this.addForm.qualifiedNum,
        unqualifiedNum: this.addForm.unqualifiedNum,
        notcheckedNum: this.addForm.notcheckedNum,
        yearlyRate: this.addForm.yearlyRate,
        statisticsTime:this.addForm.statisticsTime,
        pageDataId :this.pageDataId
      };
      axios({
        method: "post",
        data: req,
        url: "/banksys/accountyearly/addaccountyearly.do"
      })
        .then(res => {
          this.pageDataId = res.data.pageDataId
          if (res.data.code === "1001") {
            this.$message.success("保存成功");
            this.$router.push({ path: "/Accountlist" })
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
        accountType: this.addForm.value,
        yearlyNum: this.addForm.yearlyNum,
        temporaryNum: this.addForm.temporaryNum,
        frozenNum: this.addForm.frozenNum,
        dangerousNum: this.addForm.dangerousNum,
        newaccountNum: this.addForm.newaccountNum,
        subtotal: this.addForm.subtotal,
        shouldyearlyNum: this.addForm.shouldyearlyNum,
        qualifiedNum: this.addForm.qualifiedNum,
        unqualifiedNum: this.addForm.unqualifiedNum,
        notcheckedNum: this.addForm.notcheckedNum,
        yearlyRate: this.addForm.yearlyRate,
        statisticsTime:this.addForm.statisticsTime,
        pageDataId :this.pageDataId
      };
      axios({
        method: "post",
        data: req,
        url: "/banksys/accountyearly/addaccountyearly.do"
      })
        .then(res => {
          if (res.data.code === "1001") {
            this.$message.success("提交成功");
            this.$router.push({path: '/Accountlist'})
          }
        })
        .catch(err => {
          console.log(err);
        });
    },

    getAccountType() {
      axios
        .post("/banksys/accountyearly/qyeryaccounttypelist.do", "")
        .then(res => {
          this.addForm.qyeryAccountTypeList = res.data.qyeryAccountTypeList;
        })
        .catch(err => {
          console.log(err);
        });
    },
    backtrack() {
      this.$router.push({ path: "/Accountlist" });
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
.el-input-box{
  width:75px !important;
  text-align: center;
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
.el-select {
  width: 100%;
}
.el-form-item.el-form-item__label {
  line-height: 20px !important;
}
.childfloat {
  overflow: hidden;
  margin-bottom: 10px;
}
.childfloat label {
  font-size: 14px;
  float: left;
  width: 150px;
  text-align: right;
}
.childfloat .el-input {
  float: right;
  width: 210px;
}
.submit_color{
 background: #858ffd;
 border-color: #858ffd;
}
.submit_color:hover{
background-color: #A6ACEF;
border-color: #A6ACEF;
}
</style>