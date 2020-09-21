<template>
  <section>
    <!--工具条-->
    <el-col :span="24" class="toolbar">
      
     <div class="v_add">
      <p>注吊销后发生业务反馈表详情</p>
       <el-form :model="revForm">
         <table style="width: 100%" border="1">
          <tr>
             <td class="bg_color">企业名称:</td>
             <td> <el-input v-model="revForm.enterpriseName" readonly></el-input></td>
           </tr>
          <!--  <tr>
             <td class="bg_color">银行名称:</td>
             <td> <el-input v-model="revForm.entName"></el-input></td>
           </tr> -->
           <tr>
             <td class="bg_color">营业执照号码:</td>
             <td> <el-input v-model="revForm.businessLicenseNo" readonly></el-input></td>
           </tr>
           <tr>
             <td class="bg_color">旧营业执照号码:</td>
             <td> <el-input v-model="revForm.oldBusinessLicenseNo" readonly></el-input></td>
           </tr>
           <tr>
             <td class="bg_color">法定代表人姓名:</td>
             <td> <el-input v-model="revForm.legalName" readonly></el-input></td>
           </tr>
           <tr>
             <td class="bg_color">注册资金金额:</td>
             <td style="color: #999;"> <el-input v-model="revForm.amountRegistered" style="width: 86%;margin-right: 5px;" readonly></el-input>(万元)</td>
           </tr>
           <tr>
             <td class="bg_color">经营状态代码:</td>
             <td> <el-input v-model="revForm.businessStatusCode"></el-input></td>
           </tr>
            <tr>
             <td class="bg_color">组织性质代码:</td>
             <td> <el-input v-model="revForm.organizationCode" readonly></el-input></td>
           </tr>
           <tr>
             <td class="bg_color">组织成立日期:</td>
             <td> <el-input v-model="revForm.dateOfEstablishment" readonly></el-input></td>
           </tr>
           <tr>
             <td class="bg_color">注销日期:</td>
             <td> <el-input v-model="revForm.logoutTime" readonly></el-input></td>
           </tr>
           <tr>
             <td class="bg_color">吊销日期:</td>
             <td> <el-input v-model="revForm.revokeTime" readonly></el-input></td>
           </tr>
           <tr>
             <td class="bg_color">行业类型代码:</td>
             <td> <el-input v-model="revForm.industryTypeCode" readonly></el-input></td>
           </tr>
           <tr>
             <td class="bg_color">注吊销日期:</td>
             <td> <el-input v-model="revForm.cancellationTime" readonly></el-input></td>
           </tr>
           <tr>
             <td class="bg_color">客户账号:</td>
             <td> <el-input v-model="revForm.accountNumber" readonly></el-input></td>
           </tr>
            <tr>
             <td class="bg_color">账户状态:</td>
             <td> 
              <el-input v-model="revForm.accountStatus" readonly></el-input>
             </td>
           </tr>
           <tr>
             <td class="bg_color">是否销户:</td>
             <td>
              <el-input v-model="revForm.ifcloseAccount" readonly></el-input>
              </td>
           </tr>
           <tr>
             <td class="bg_color">统计时间：</td>
             <td> 
                  <!-- <el-date-picker
                    v-model="revForm.statisticsTime"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期" style="width: 100%;">
                  </el-date-picker> -->
                   <el-date-picker
                      v-model="revForm.statisticsTime"
                      type="month"
                      readonly
                      style="width: 100%;"
                      placeholder="选择月">
                    </el-date-picker>
             </td>
           </tr>
           <tr>
              <td class="bg_color">创建时间：</td>
              <td>
                <el-input v-model="revForm.createTime" readonly></el-input>
              </td>
            </tr>
            <tr>
              <td class="bg_color">填报时间：</td>
              <td>
                <el-input v-model="revForm.submitTime" readonly></el-input>
              </td>
            </tr>
         </table>
         <el-row>
         <el-button @click="backtrack">返回</el-button>
       </el-row>
       </el-form>
     </div>
      
    
    
    </el-col>
    
  </section>
</template>
<script>

  export default{
    data() {
      return {
       revForm: {},
      }
    },
    created() {
    this.revForm = this.$route.query;
  },
      methods:{
     backtrack(){
      this.$router.push({ path: "/Revokedlist" });
     },
     
    }
  }
</script>
<style scoped>
  
.v_add{
  width: 560px;
  margin: 0 auto;
  height: auto;

}
.v_add p{
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
table td{
  padding: 6px;
}
.bg_color{
  background-color: #eef1f6;
  color: #333;
  width: 160px;
  font-size: 14px;
}
.el-row{
  text-align: center;
  padding-top: 20px;
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