<template>
  <section>
    <!--工具条-->
    <el-col :span="24" class="toolbar">
     <div class="v_add">
      <p>农村地区非现金支付工具和方式详情</p>
       <el-form :model="payForm">
         <table style="width: 100%" border="1">
          <tr>
             <td class="bg_color">地区代码:</td>
             <td> <el-input v-model="payForm.regionCode" readonly></el-input></td>
           </tr>
           
           <tr>
             <td class="bg_color">银行卡业务量:</td>
             <td> 
              <div class="childfloat">
                  <label>笔数（笔）:</label>
                  <el-input v-model="payForm.bcStrokeNum" readonly></el-input>
              </div>
              <div class="childfloat">
                  <label>金额（元）:</label>
                  <el-input v-model="payForm.bcSunofmoney" readonly></el-input>
              </div>
             </td>
           </tr>
            <tr>
             <td class="bg_color">票据业务量:</td>
             <td> 
              <div class="childfloat">
                  <label>笔数（笔）:</label>
                  <el-input v-model="payForm.billStrokeNum" readonly></el-input>
              </div>
              <div class="childfloat">
                  <label>金额（元）:</label>
                  <el-input v-model="payForm.billSunofmoney" readonly></el-input>
              </div>
             </td>
           </tr>
           <tr>
             <td class="bg_color">网上支付:</td>
             <td> 
              <div class="childfloat">
                  <label>开户数量（户）:</label>
                  <el-input v-model="payForm.olOpenaccountNum" readonly></el-input>
              </div>
              <div class="childfloat">
                  <label>笔数（笔）:</label>
                  <el-input v-model="payForm.olStrokeNum" readonly></el-input>
              </div>
              <div class="childfloat">
                  <label>金额（元）:</label>
                  <el-input v-model="payForm.olSunofmoney" readonly></el-input>
              </div>
             </td>
           </tr>
           <tr>
             <td class="bg_color">移动支付:</td>
             <td> 
              <div class="childfloat">
                  <label>开户数量（户）:</label>
                  <el-input v-model="payForm.moveOpenaccountNum" readonly></el-input>
              </div>
              <div class="childfloat">
                  <label>笔数（笔）:</label>
                  <el-input v-model="payForm.moveStrokeNum" readonly></el-input>
              </div>
              <div class="childfloat">
                  <label>金额（元）:</label>
                  <el-input v-model="payForm.moveSunofmoney" readonly></el-input>
              </div>
             </td>
           </tr>
           <tr>
             <td class="bg_color">电话支付:</td>
             <td> 
              <div class="childfloat">
                  <label>开户数量（户）:</label>
                  <el-input v-model="payForm.pnOpenaccountNum" readonly></el-input>
              </div>
              <div class="childfloat">
                  <label>笔数（笔）:</label>
                  <el-input v-model="payForm.pnStrokeNum" readonly></el-input>
              </div>
              <div class="childfloat">
                  <label>金额（元）:</label>
                  <el-input v-model="payForm.pnSunofmoney" readonly></el-input>
              </div>
             </td>
           </tr>
          <tr>
             <td class="bg_color">电商业务量:</td>
             <td> 
              <div class="childfloat">
                  <label>笔数（笔）:</label>
                  <el-input v-model="payForm.rlStrokeNum" readonly></el-input>
              </div>
              <div class="childfloat">
                  <label>金额（元）:</label>
                  <el-input v-model="payForm.rlSunofmoney" readonly></el-input>
              </div>
             </td>
           </tr>
            <tr>
              <td class="bg_color">备注:</td>
              <td>
                <el-input type="textarea" v-model="payForm.remark" readonly></el-input>
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
                  </el-date-picker> -->
                   <el-date-picker
                      v-model="payForm.statisticsTime"
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
                <el-input v-model="payForm.createTime" readonly></el-input>
              </td>
            </tr>
            <tr>
              <td class="bg_color">填报时间：</td>
              <td>
                <el-input v-model="payForm.submitTime" readonly></el-input>
              </td>
            </tr>
             <tr>
              <td class="bg_color">填报单位：</td>
              <td>
                <el-input v-model="payForm.unitName" readonly></el-input>
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
       payForm: {},
      }
    },
    created() {
    this.payForm = this.$route.query;
  },
      methods:{
     backtrack(){
      this.$router.push({ path: "/Ruralpaylist" });
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