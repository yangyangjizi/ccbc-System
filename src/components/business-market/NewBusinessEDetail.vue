<template>
  <section>
    <!--工具条-->
    <el-col
      :span="24"
      class="toolbar"
    >
      <div class="v_add">
        <p>商机营销汇总表详情</p>
        <el-form :model="busForm">
          <table style="width: 100%" border="1">
            <tr>
              <td class="bg_color">统一社会信用代码:</td>
              <td>
                <el-input v-model="busForm.creditCode" readonly></el-input>
              </td>
            </tr>
            <tr>
              <td class="bg_color">企业名称:</td>
              <td>
                <div style="float:left">
                  <span style="font-size:14px;color: #606266">{{busForm.firmName}}</span>
                 <span v-if="busForm.ageWarning ==='0' && busForm.timeWarning	 ==='0'&& busForm.cardWarning	 ==='0'&& busForm.addressWarning	 ==='0'">
                  <img src="../../assets/01.png" title="正常" />
                </span>
                <span v-if="busForm.ageWarning !=='0'">
                  <img src="../../assets/02.png" title="年龄预警" />
                </span>
                <span v-if="busForm.timeWarning !=='0'">
                  <img src="../../assets/03.png" title="开户超次预警" />
                </span>
                 <span v-if="busForm.cardWarning !=='0'">
                  <img src="../../assets/04.png" title="法人身份证异地预警" />
                </span>
                <span v-if="busForm.addressWarning !=='0'">
                  <img src="../../assets/05.png" title="地址异常预警" />
                </span>
                </div>
                
              </td>
            </tr>
            <tr>
              <td class="bg_color">法人姓名：</td>
              <td>
                <el-input v-model="busForm.legalName" readonly></el-input>
              </td>
            </tr>
            <tr>
              <td class="bg_color">法人手机号码：</td>
              <td>
                <el-input v-model="busForm.legalPhn" readonly></el-input>
              </td>
            </tr>
            <tr>
              <td class="bg_color">财务负责人姓名：</td>
              <td>
                <el-input v-model="busForm.financeName" readonly></el-input>
              </td>
            </tr>
            <tr>
              <td class="bg_color">财务负责人手机号码：</td>
              <td>
                <el-input v-model="busForm.financePhn" readonly></el-input>
              </td>
            </tr>
            <tr>
              <td class="bg_color">注册资金：</td>
              <td>
                <el-input v-model="busForm.regCapital" readonly></el-input>
              </td>
            </tr>
            <tr>
              <td class="bg_color">注册币种编码：</td>
              <td>
                <el-input v-model="busForm.curCode" readonly></el-input>
              </td>
            </tr>
            <tr>
              <td class="bg_color">注册币种中文：</td>
              <td>
                <el-input v-model="busForm.cutChn" readonly></el-input>
              </td>
            </tr>
            <tr>
              <td class="bg_color">营业期限：</td>
              <td>
                <el-input v-model="busForm.busTerm" readonly></el-input>
              </td>
            </tr>
            <tr>
              <td class="bg_color">核准日期：</td>
              <td>
                <el-input v-model="busForm.appDate" readonly></el-input>
              </td>
            </tr>
            <tr>
              <td class="bg_color">住所（注册地址）：</td>
              <td>
                <!-- <el-input v-model="busForm.regAddress" readonly></el-input> -->
                <span style="font-size: 14px;color: #606266;">{{busForm.regAddress}}</span>
              </td>
            </tr>
            <tr>
              <td class="bg_color">经营地址：</td>
              <td>
                <!-- <el-input v-model="busForm.runAddress" readonly></el-input> -->
                <span style="font-size: 14px;color: #606266;">{{busForm.runAddress}}</span>
              </td>
            </tr>
            <tr>
              <td class="bg_color">经营范围:</td>
              <td>
                <span style="font-size: 14px;color: #606266;">{{busForm.busScope}}</span>
              </td>
            </tr>
            <tr>
              <td class="bg_color">成立日期：</td>
              <td>
                <el-input v-model="busForm.setTime" readonly></el-input>
              </td>
            </tr>
            <tr>
              <td class="bg_color">实际经营地址：</td>
              <td>
                <span style="font-size: 14px;color: #606266;">{{busForm.runAddress}}</span>
              </td>
            </tr>
            <tr>
              <td class="bg_color">推送日期</td>
              <td>
                <span style="font-size: 14px;color: #606266;">{{busForm.pushTime}}</span>
              </td>
            </tr>
            <tr v-if= ifShowButton>
              <td class="bg_color">分发状态：</td>
              <td>
                <el-input v-model="busForm.disStatus" readonly></el-input>
              </td>
            </tr>
            <tr v-if= ifShowButtonTwo>
              <td class="bg_color">分发支行名称：</td>
              <td>
                <el-input v-model="busForm.subName" readonly></el-input>
              </td>
            </tr>
            <tr v-if= ifShowButtonTwo>
              <td class="bg_color">分行分发时间：</td>
              <td>
                <el-input v-model="busForm.bankDisTime" readonly></el-input>
              </td>
            </tr>
            <tr v-if= ifShowButton>
              <td class="bg_color">分发网点名称：</td>
              <td>
                <el-input v-model="busForm.unitName" readonly></el-input>
              </td>
            </tr>
            <tr v-if= ifShowButton>
              <td class="bg_color">支行分发时间：</td>
              <td>
                <el-input v-model="busForm.subDisTime" readonly></el-input>
              </td>
            </tr>
            <tr>
              <td class="bg_color">分发员工姓名：</td>
              <td>
                <el-input v-model="busForm.staffName" readonly></el-input>
              </td>
            </tr>
            <tr>
              <td class="bg_color">确认时间：</td>
              <td>
                <el-input v-model="busForm.affirmDate" readonly></el-input>
              </td>
            </tr>
            <tr>
              <td class="bg_color">营销状态：</td>
              <td>
                <el-input v-model="busForm.markStatus" readonly></el-input>
              </td>
            </tr>
            <tr v-if= ifShowButtonTwo>
              <td class="bg_color">退回理由：</td>
              <td>
                <el-input v-model="busForm.disRemark" readonly></el-input>
              </td>
            </tr>
            <tr>
              <td class="bg_color">反馈内容:</td>
              <td>
                <el-input v-model="busForm.backDetails" readonly></el-input>
              </td>
            </tr>
            <tr>
              <td class="bg_color">银行账号:</td>
              <td>
                <el-input v-model="busForm.accountNo" readonly></el-input>
              </td>
            </tr>
            <tr>
              <td class="bg_color">账户名称:</td>
              <td>
                <el-input v-model="busForm.accountName" readonly></el-input>
              </td>
            </tr>
            <tr>
              <td class="bg_color">开户时间:</td>
              <td>
                <el-input v-model="busForm.accountTime" readonly></el-input>
              </td>
            </tr>
            <tr>
              <td class="bg_color">备注:</td>
              <td>
                <el-input type="textarea" v-model="busForm.remark" readonly></el-input>
              </td>
            </tr>
          </table>
          <el-row>
            <el-button type="primary" plain @click="backtrack">返回</el-button>
          </el-row>
        </el-form>
      </div>
    </el-col>
  </section>
</template>
<script>
import bus from "../../bus";
import AES from "@/utils/aes.js";
export default {
  data() {
    return {
      ifShowButton:true,
      ifShowButtonTwo:false,
      busForm: {}
    };
  },
  created() {
    this.getIfUnitRank();
  },
  methods: {
    backtrack() {
      this.$router.push({ path: "/BusinessElist" });
    },
    getIfUnitRank() {
      this.busForm =JSON.parse(AES.decrypt(this.$route.query[0])) ;
      if(this.$route.query[1] === 2){
         this.ifShowButton =false
      } else if(this.$route.query[1] === 0){
         this.ifShowButtonTwo =true
      }
     
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