<template>
  <section>
    <!--工具条-->
    <el-col :span="24" class="toolbar">
    <div class="v_add">
      <p>企业银行账户“即开即用”统计表编辑</p>
       <el-form :model="epiForm">
         <table style="width: 100%" border="1">
          <tr>
             <td class="bg_color">企业名称:</td>
             <td> <el-input v-model="epiForm.entName"></el-input></td>
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
                ></el-date-picker>
             </td>
           </tr>
           <tr>
             <td class="bg_color">开户3日内总入金笔数（笔）:</td>
             <td> <el-input v-model="epiForm.threedaySin"></el-input></td>
           </tr>
           <tr>
             <td class="bg_color">开户3日内总入金总金额（万）:</td>
             <td> <el-input v-model="epiForm.threedaysinSum"></el-input></td>
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
                ></el-date-picker>
             </td>
           </tr>
            <tr>
             <td class="bg_color">开户3日内总出金笔数（笔）:</td>
             <td> <el-input v-model="epiForm.threedaySout"></el-input></td>
           </tr>
           <tr>
             <td class="bg_color">开户3日内总出金总金额（万）:</td>
             <td> <el-input v-model="epiForm.threedaysoutSum"></el-input> </td>
           </tr>
            <tr>
              <td class="bg_color">存款人类别:</td>
              <td>
                <el-select v-model="epiForm.depositorTypeCode" placeholder="请选择" class="el-select-box">
                  <el-option
                    v-for="item in depositorTypeList"
                    :key="item.code"
                    :label="item.codeName"
                    :value="item.code"
                  ></el-option>
                </el-select>
              </td>
            </tr>
            <tr>
              <td class="bg_color">账户类别:</td>
              <td>
                <el-select v-model="epiForm.accountTypeCode" placeholder="请选择" class="el-select-box">
                  <el-option
                    v-for="item in accountTypeList"
                    :key="item.code"
                    :label="item.codeName"
                    :value="item.code"
                  ></el-option>
                </el-select>
              </td>
            </tr>
             <tr>
              <td class="bg_color">企业行业类别:</td>
              <td>
                <el-select v-model="epiForm.entbankTypeCode" placeholder="请选择" class="el-select-box">
                  <el-option
                    v-for="item in tradeTypeList"
                    :key="item.code"
                    :label="item.codeName"
                    :value="item.code"
                  ></el-option>
                </el-select>
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
                      placeholder="选择月">
                    </el-date-picker>
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
import bus from "../../bus"
  export default{
    data() {
      return {
        epiForm: {
          entName: '',
          openaccountTime:'',
          firstinTime:'',
          threedaySin:'',
          threedaysinSum:'',
          firstoutTime:'',
          threedaySout:'',
          threedaysoutSum:'',
          contact:'',
          statisticsTime:'',
          depositorTypeCode:'',
          accountTypeCode:'',
          entbankTypeCode:'',
         
        },
        depositorTypeList:[],
        accountTypeList:[],
        tradeTypeList:[]
      }
    },
     created() {
     this.epiForm = this.$route.query;
   },
   mounted() {
    this.gettradeType(), this.getdepositorType(),this.getaccountType()
  },
    methods:{
     backtrack(){
      this.$router.push({ path: "/Epireadylist" });
     },
      handleSave(){
       let req = {};
      req = {
        entName: this.epiForm.entName,
        openaccountTime: this.epiForm.openaccountTime,
        firstinTime: this.epiForm.firstinTime,
        threedaySin: this.epiForm.threedaySin,
        threedaysinSum: this.epiForm.threedaysinSum,
        firstoutTime: this.epiForm.firstoutTime,
        threedaySout: this.epiForm.threedaySout,
        threedaysoutSum: this.epiForm.threedaysoutSum,
        depositorType: this.epiForm.depositorTypeCode,
        accountType:this.epiForm.accountTypeCode,
        entbankType:this.epiForm.entbankTypeCode,
        contact:this.epiForm.contact,
        statisticsTime: this.epiForm.statisticsTime,
        operationType: 'save',
        enterAccountId:this.epiForm.enterAccountId
      };
        axios({
        method: "post",
        data: req,
        url: "/banksys/enteraccount/editenteraccountbyid.do"
      }).then(res => {
         if(res.data.code === "1001"){
          this.$message.success("保存成功")
          bus.$emit('handleChangeMata2','true')
          this.$router.push({ path: '/Epireadylist'});
        }
      })
      .catch(() => {
         this.$message.error("网络异常,请稍后重试!!!");
      })
     },
     handleSubmit(){
       this.$confirm('您确定提交吗？ 提交之后将不能编辑和删除！', '提示', {
          type: 'warning'
        })
       .then(() => {
        let req = {};
      req = {
        entName: this.epiForm.entName,
        openaccountTime: this.epiForm.openaccountTime,
        firstinTime: this.epiForm.firstinTime,
        threedaySin: this.epiForm.threedaySin,
        threedaysinSum: this.epiForm.threedaysinSum,
        firstoutTime: this.epiForm.firstoutTime,
        threedaySout: this.epiForm.threedaySout,
        threedaysoutSum: this.epiForm.threedaysoutSum,
        depositorType: this.epiForm.depositorTypeCode,
        accountType:this.epiForm.accountTypeCode,
        entbankType:this.epiForm.entbankTypeCode,
        contact:this.epiForm.contact,
        statisticsTime: this.epiForm.statisticsTime,
        operationType: 'submit',
        enterAccountId:this.epiForm.enterAccountId
      };
        axios({
        method: "post",
        data: req,
        url: "/banksys/enteraccount/editenteraccountbyid.do"
      }).then(res => {
        if(res.data.code === "1001"){
          
          this.$message.success("提交成功")
          bus.$emit('handleChangeMata2','true')
          this.$router.push({ path: '/Epireadylist'});
        }
      })
      })
       .catch(() => {
           this.$message({
            type: 'info',
            message: '已取消'
          }); 
      })
     },
     gettradeType(){
       let prop = {};
       prop = {
         codeTypes: "trade_type"
       };
       axios({
         method: "post",
         data: prop,
         url: "/banksys/system/common/querycode.do"
       })
        .then(res => {
          this.tradeTypeList = res.data.list;
        })
        .catch(err => {
          console.log(err);
        });
     },
     getaccountType(){
       let prop = {};
       prop = {
         codeTypes: "account_type"
       };
       axios({
         method: "post",
         data: prop,
         url: "/banksys/system/common/querycode.do"
       })
        .then(res => {
          this.accountTypeList = res.data.list;

        })
        .catch(err => {
          console.log(err);
        });
     },
      getdepositorType(){
       let prop = {};
       prop = {
         codeTypes: "depositor_type"
       };
       axios({
         method: "post",
         data: prop,
         url: "/banksys/system/common/querycode.do"
       })
        .then(res => {
          this.depositorTypeList = res.data.list;
        })
        .catch(err => {
          console.log(err);
        });
     }
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