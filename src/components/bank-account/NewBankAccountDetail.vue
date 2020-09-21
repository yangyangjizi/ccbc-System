<template>
  <section>
    <!--工具条-->
    <el-col
      :span="24"
      class="toolbar"
    >
      <div class="v_add">
        <p>银行账户情况统计表详情</p>
        <el-form :model="bankForm">
          <table style="width: 100%" border="1">
            <tr>
              <td class="bg_color">存款人类别:</td>
              <td>
               <el-input v-model="bankForm.depositorName" readonly></el-input>
              </td>
            </tr>
            <tr>
              <td class="bg_color">拒绝开户:</td>
              <td>
                <el-input v-model="bankForm.refuseopenAccount" readonly></el-input>
              </td>
            </tr>
            <tr>
              <td class="bg_color">延长开户审查期限:</td>
              <td>
               <el-input v-model="bankForm.extendopenAccounttime" readonly></el-input>
              </td>
            </tr>
            <tr>
              <td class="bg_color">控制账户交易:</td>
              <td>
               <el-input v-model="bankForm.conTradingName	" readonly></el-input>
              </td>
            </tr>
             <tr>
              <td class="bg_color">涉及企业名称:</td>
              <td>
                 <el-input v-model="bankForm.enterpriseName" readonly></el-input>
              </td>
            </tr>
             <tr>
              <td class="bg_color">采取措施原因:</td>
              <td>
                
                 <el-input type="textarea" v-model="bankForm.measuresReason" readonly></el-input>
              </td>
            </tr>
             <tr>
              <td class="bg_color">备注:</td>
              <td>
                
                 <el-input type="textarea" v-model="bankForm.remark" readonly ></el-input>
              </td>
            </tr>
             <tr>
             <td class="bg_color">统计月份：</td>
             <td> 
               <el-input v-model="bankForm.startStatisticsTime" readonly></el-input>
             </td>
           </tr>
            <tr>
              <td class="bg_color">填报单位:</td>
              <td>
                 <el-input v-model="bankForm.unitName" readonly></el-input>
              </td>
            </tr>
            <tr>
              <td class="bg_color">填报日期:</td>
              <td>
                 <el-input v-model="bankForm.createName" readonly></el-input>
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
import axios from 'axios'
export default {
  name: "NewBankAccountDetail",
  data() {
    return {
      bankForm: {
        submitTime:'',
        queryTypeList:[],
        value: '',
        value1:'',
        value2:'',
        options:[
          {
          value: '选项1',
          label: '是'
          },
           {
          value: '选项2',
          label: '否'
          }
        ]
      },
      tableData: [],
      total: 0,
      page: 1,
    };
  },
  created() {
     this.bankForm = this.$route.query
  },
  mounted() {
  },
  methods: {
 backtrack() {
      this.$router.push({ path: "/NewBankAccountlist" });
    },
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

</style>
