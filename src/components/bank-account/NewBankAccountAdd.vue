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
                <el-select v-model="bankForm.value" placeholder="请选择" class="el-select-box">
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
                <el-select v-model="bankForm.value1" placeholder="请选择" class="el-select-box">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </td>
            </tr>
            <tr>
              <td class="bg_color">延长开户审查期限:</td>
              <td>
                <el-date-picker
                  v-model="bankForm.extendopenAccounttime"
                  type="date"
                   format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd"
                  placeholder="选择日期"
                  class="el-select-box"
                ></el-date-picker>
              </td>
            </tr>
            <tr>
              <td class="bg_color">控制账户交易:</td>
              <td>
                <el-select v-model="bankForm.value2" placeholder="请选择" class="el-select-box">
                  <el-option
                    v-for="item in bankForm.queryConTradingList"
                    :key="item.code"
                    :label="item.codeName"
                    :value="item.code"
                  ></el-option>
                </el-select>
              </td>
            </tr>
            <tr>
              <td class="bg_color">涉及企业名称:</td>
              <td>
                <el-input v-model="bankForm.enterpriseName"></el-input>
              </td>
            </tr>
            <tr>
              <td class="bg_color">采取措施原因:</td>
              <td>
                <el-input type="textarea" v-model="bankForm.measuresReason"></el-input>
              </td>
            </tr>
            <tr>
              <td class="bg_color">备注:</td>
              <td>
                <el-input type="textarea" v-model="bankForm.remark"></el-input>
              </td>
            </tr>
            <tr>
              <td class="bg_color">统计月份：</td>
              <td>
                <el-date-picker
                  v-model="bankForm.datemonth"
                  type="month"
                  format="yyyy-MM "
                  value-format="yyyy-MM "
                  placeholder="选择月"
                  class="el-select-box"
                ></el-date-picker>
              </td>
            </tr>
          </table>
          <el-row>
            <el-button type="primary" @click="handleSave">保存</el-button>
            <el-button type="success" @click="handleSubmit" class="submit_color">提交</el-button>
            <el-button  @click="backtrack">返回</el-button>
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
  name: "NewBankAccountAdd",
  data() {
    return {
      bankForm: {
        datemonth: "",
        submitTime: "",
        queryTypeList: [],
       
        value1: "",
        value2: "",
       
      },
       options: [
          {
            value: "1",
            label: "是"
          },
          {
            value: "0",
            label: "否"
          }
        ],
         value: "",
      tableData: [],
      total: 0,
      page: 1
    };
  },
  created() {},
  mounted() {
    this.getBankAccountType(), this.getBankAccountConTrading();
  },
  methods: {
    //保存
    handleSave() {
      let req = {};
      req = {
        operationType: "save",
        depositorType: this.bankForm.value,
        refuseopenAccount:this.bankForm.value1,
        extendopenAccounttime:this.bankForm.extendopenAccounttime,
        conTrading: this.bankForm.value2,
        enterpriseName: this.bankForm.enterpriseName,
        measuresReason: this.bankForm.measuresReason,
        remark: this.bankForm.remark,
        datemonth: this.bankForm.datemonth
      };
      axios({
        method: "post",
        data: req,
        url: "/banksys/banckaccount/saveBankAccount.do"
      })
        .then(res => {
          if (res.data.code === "1001") {
            this.$message.success("保存成功");
            bus.$emit('handleChangeMata1','true')
            this.$router.push({ path: "/NewBankAccountlist" })
          } else {
            this.$message.error("保存失败");
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
        refuseopenAccount:this.bankForm.value1,
        extendopenAccounttime:this.bankForm.extendopenAccounttime,
        conTrading: this.bankForm.value2,
        enterpriseName: this.bankForm.enterpriseName,
        measuresReason: this.bankForm.measuresReason,
        remark: this.bankForm.remark,
        datemonth: this.bankForm.datemonth
      };
      axios({
        method: "post",
        data: req,
        url: "/banksys/banckaccount/saveBankAccount.do"
      })
        .then(res => {
          if (res.data.code === "1001") {
            this.$message.success("提交成功");
            bus.$emit('handleChangeMata1','true')
            this.$router.push({ path: "/NewBankAccountlist" })
          }else {
            this.$message.error("提交失败");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    backtrack() {
      this.$router.push({ path: "/NewBankAccountlist" });
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
    },
    getBankAccountConTrading() {
      axios
        .post("/banksys/banckaccount/queryConTradingType.do", "")
        .then(res => {
          this.bankForm.queryConTradingList = res.data.queryConTradingList;
        })
        .catch(err => {
          console.log(err);
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
span {
  font-size: 14px;
  display: block;
  width: 140px;
  text-align: right;
}
.submit_color {
  background: #858ffd;
  border-color: #858ffd;
}
.submit_color:hover {
  background-color: #a6acef;
  border-color: #a6acef;
}
.el-select-box{
width: 370px
}
</style>
