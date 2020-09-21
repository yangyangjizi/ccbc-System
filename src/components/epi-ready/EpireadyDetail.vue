<template>
  <section>
    <!--工具条-->
    <el-col :span="24" class="toolbar">
        <div class="v_add">
      <p>企业银行账户“即开即用”统计表详情</p>
       <el-form :model="epiForm">
         <table style="width: 100%" border="1">
          <tr>
             <td class="bg_color">企业名称:</td>
             <td> <el-input v-model="epiForm.entName" readonly></el-input></td>
           </tr>
           <tr>
             <td class="bg_color">开户日期:</td>
             <td> 
                 <el-date-picker
                  v-model="epiForm.openaccountTime"
                  type="date"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期"
                  class="el-select-box"
                  readonly
                ></el-date-picker>
             </td>
           </tr>
           <tr>
             <td class="bg_color">首笔入金日期:</td>
             <td> 
                 <el-date-picker
                  v-model="epiForm.firstinTime"
                  type="date"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期"
                  class="el-select-box"
                  readonly
                ></el-date-picker>
             </td>
           </tr>
           <tr>
             <td class="bg_color">开户3日内总入金笔数（笔）:</td>
             <td> <el-input v-model="epiForm.threedaySin" readonly></el-input></td>
           </tr>
           <tr>
             <td class="bg_color">开户3日内总入金总金额（万）:</td>
             <td> <el-input v-model="epiForm.threedaysinSum" readonly></el-input></td>
           </tr>
           <tr>
             <td class="bg_color">首笔出金日期:</td>
             <td> 
                <el-date-picker
                  v-model="epiForm.firstoutTime"
                  type="date"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期"
                  class="el-select-box"
                  readonly
                ></el-date-picker>
             </td>
           </tr>
            <tr>
             <td class="bg_color">开户3日内总出金笔数（笔）:</td>
             <td> <el-input v-model="epiForm.threedaySout" readonly></el-input></td>
           </tr>
           <tr>
             <td class="bg_color">开户3日内总出金总金额（万）:</td>
             <td> <el-input v-model="epiForm.threedaysoutSum" readonly></el-input> </td>
           </tr>
            <tr>
              <td class="bg_color">存款人类别:</td>
              <td>
                 <el-input v-model="epiForm.depositorType" readonly></el-input>
                <!-- <el-select v-model="epiForm.depositorType" placeholder="请选择" class="el-select-box" readonly>
                  
                  <el-option
                    v-for="item in epiForm.depositor_type"
                    :key="item.code"
                    :label="item.codeName"
                    :value="item.code"
                  ></el-option>
                </el-select> -->
              </td>
            </tr>
            <tr>
              <td class="bg_color">账户类别:</td>
              <td>
                 <el-input v-model="epiForm.accountType" readonly></el-input>
                <!-- <el-select v-model="epiForm.accountType" placeholder="请选择" class="el-select-box" readonly>
                  <el-option
                    v-for="item in epiForm.account_type"
                    :key="item.code"
                    :label="item.codeName"
                    :value="item.code"
                  ></el-option>
                </el-select> -->
              </td>
            </tr>
             <tr>
              <td class="bg_color">企业行业类别:</td>
              <td>
                 <el-input v-model="epiForm.entbankType" readonly></el-input>
               <!--  <el-select v-model="epiForm.entbankType" placeholder="请选择" class="el-select-box" readonly>
                  <el-option
                    v-for="item in epiForm.trade_type"
                    :key="item.code"
                    :label="item.codeName"
                    :value="item.code"
                  ></el-option>
                </el-select> -->
              </td>
            </tr>
           <tr>
             <td class="bg_color">联系电话:</td>
             <td> <el-input v-model="epiForm.contact"></el-input></td>
           </tr>
           <tr>
             <td class="bg_color">统计时间：</td>
             <td> 
                  <!-- <el-date-picker
                    v-model="epiForm.statisticsTime"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期" style="width: 100%;">
                  </el-date-picker> -->
                   <el-date-picker
                      v-model="epiForm.statisticsTime"
                      type="month"
                      style="width: 100%;"
                      readonly
                      placeholder="选择月">

                    </el-date-picker>
             </td>
           </tr>
           <tr>
              <td class="bg_color">创建时间：</td>
              <td>
                <el-input v-model="epiForm.createTime" readonly></el-input>
              </td>
            </tr>
            <tr>
              <td class="bg_color">填报银行：</td>
              <td>
                <el-input v-model="epiForm.bankName" readonly></el-input>
              </td>
            </tr>
            <!-- <tr>
              <td class="bg_color">填报人：</td>
              <td>
                <el-input v-model="epiForm.CREATETIME" readonly></el-input>
              </td>
            </tr> -->
            <tr>
              <td class="bg_color">提交时间：</td>
              <td>
                <el-input v-model="epiForm.submitTime" readonly></el-input>
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
       epiForm: {},
      }
    },
    created() {
    this.epiForm = this.$route.query;
  },
      methods:{
     backtrack(){
      this.$router.push({ path: "/Epireadylist" });
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