<template>
  <section>
    <!--工具条-->
    <el-col
      :span="24"
      class="toolbar"
    >
      <div class="v_add">
        <p>结算部专用详情</p>
        <el-form :model="busForm">
          <table style="width: 100%" border="1">
          	<tr>
              <td class="bg_color">支行名称：</td>
              <td>
                <el-input v-model="busForm.bankBranch" readonly></el-input>
              </td>
            </tr>
            <tr>
              <td class="bg_color">开户银行名称：</td>
              <td>
                <el-input v-model="busForm.bankDeposit" readonly></el-input>
              </td>
            </tr>
            <tr>
              <td class="bg_color">存款人名称:</td>
              <td>
                <el-input v-model="busForm.depositorName" readonly></el-input>
              </td>
            </tr>
            <tr>
              <td class="bg_color">法人名称:</td>
              <td>
                <el-input v-model="busForm.legalName" readonly></el-input>
              </td>
            </tr>
            <tr>
              <td class="bg_color">法人身份证号：</td>
              <td>
                <el-input v-model="busForm.legalNo" readonly></el-input>
              </td>
            </tr>
            <tr>
              <td class="bg_color">法人是否亲自到场办理开户业务：</td>
              <td>
                <el-input v-model="busForm.corporatePerson" readonly></el-input>
              </td>
            </tr>
            <tr>
              <td class="bg_color">是否为法人授权本单位员工办理开户业务：</td>
              <td>
                <el-input v-model="busForm.authUnit" readonly></el-input>
              </td>
            </tr>
            <tr>
              <td class="bg_color">是否为法人授权第三方代办机构办理开户业务:</td>
              <td>
                <el-input v-model="busForm.legalAuth" readonly></el-input>
              </td>
            </tr>
            <tr>
              <td class="bg_color">是否为企业开立了网银：</td>
              <td>
                <el-input v-model="busForm.entEbank" readonly></el-input>
              </td>
            </tr>
            <tr>
              <td class="bg_color">与工商登记信息是否一致：</td>
              <td>
                <el-input v-model="busForm.busiInform" readonly></el-input>
              </td>
            </tr>
            <tr>
              <td class="bg_color">在工商登记的状态是否正常：</td>
              <td>
                <el-input v-model="busForm.busiRegistration" readonly></el-input>
              </td>
            </tr>
            <tr>
              <td class="bg_color">本次核实方式：</td>
              <td>
                <el-input v-model="busForm.veriMode" readonly></el-input>
              </td>
            </tr>
            <tr>
              <td class="bg_color">本目前经营地址与开户阶段预留地址是否一致：</td>
              <td>
                <el-input v-model="busForm.businessAddress" readonly></el-input>
              </td>
            </tr>
            <tr>
              <td class="bg_color">是否仍在办公或经营：</td>
              <td>
                <el-input v-model="busForm.managementState" readonly></el-input>
              </td>
            </tr>
            <tr>
              <td class="bg_color">详细描述核实情况：</td>
              <td>
                <el-input v-model="busForm.verifiedSituation" readonly></el-input>
              </td>
            </tr>
            <tr>
              <td class="bg_color">账户自开立以来交易特征:</td>
              <td>
                <el-input v-model="busForm.transCharacter" readonly></el-input>
              </td>
            </tr>
            <tr>
              <td class="bg_color">经核实后是否认定为风险账户：</td>
              <td>
                <el-input v-model="busForm.riskAccount" readonly></el-input>
              </td>
            </tr>
            <tr>
              <td class="bg_color">对此账户采取何种处理方式：</td>
              <td>
                <el-input v-model="busForm.accProcessing" readonly></el-input>
              </td>
            </tr>
            <tr>
              <td class="bg_color">核查联系人：</td>
              <td>
                <el-input v-model="busForm.checkContact" readonly></el-input>
              </td>
            </tr>
            <tr>
              <td class="bg_color">其他需要说明的情况：</td>
              <td>
                <el-input v-model="busForm.otherCircumstances" readonly></el-input>
              </td>
            </tr>
            <tr>
              <td class="bg_color">数据来源：</td>
              <td>
                <el-input v-model="busForm.dataSource" readonly></el-input>
              </td>
            </tr>
            <tr>
              <td class="bg_color">导入时间：</td>
              <td>
               <el-input v-model="busForm.createTime" readonly></el-input>
              </td>
            </tr>
            <tr>
              <td class="bg_color">填报人及联系方式：</td>
              <td>
               <el-input v-model="busForm.nameAndTel" readonly></el-input>
              </td>
            </tr>
            <tr>
              <td class="bg_color">该数据所属的文件名：</td>
              <td>
               <el-input v-model="busForm.fileName" readonly></el-input>
              </td>
            </tr>
            <tr>
              <td class="bg_color">所属文件行数：</td>
              <td>
               <el-input v-model="busForm.lineNo" readonly></el-input>
              </td>
            </tr>
          </table>
          <el-row>
            <el-button type="primary" @click="backtrack">返回</el-button>
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
      doubtfulAccId:"",
      ifShowButton:true,
      ifShowButtonTwo:false,
      busForm: {}
    };
  },
  created() {
    this.doubtfulAccId = this.$route.query.doubtfulAccId;
    this.getDetailDate()
  },
  methods: {
    backtrack() {
      this.$router.push({ path: "/Settlement" });
    },
    getDetailDate(){
      let para = {
        id:this.doubtfulAccId
      };
      axios({
        method: "post",
        url: "/banksys/accdoubtful/querydoubtfuldetail.do",
        data: para
      }).then(res => {
          this.busForm = res.data;
    
      }).catch(err => {
        this.$message.error("网络异常，请重试！！！")
      });
    }
  }
};
</script>
<style scoped>
/* .el-textarea__inner{
  height:150px !important;
} */
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
</style>