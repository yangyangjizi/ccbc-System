<template>
  <section>
    <!--工具条-->
    <el-col :span="24" class="toolbar">
      
     <div class="v_add">
      <p>企业违规多头开立基本存款账户检测分析表</p>
       <el-form :model="vioForm">
         <table style="width: 100%" border="1">
           <tr>
             <td class="bg_color">企业名称:</td>
             <td> <el-input v-model="vioForm.entName"></el-input></td>
           </tr>
           <tr>
             <td class="bg_color">营业执照注册号:</td>
             <td> <el-input v-model="vioForm.buslicenId"></el-input></td>
           </tr>
           <tr>
             <td class="bg_color">注册地区：</td>
             <td> <el-input v-model="vioForm.registerAddress"></el-input></td>
           </tr>
           <tr>
             <td class="bg_color">开户银行：</td>
             <td> <el-input v-model="vioForm.openBank"></el-input></td>
           </tr>
           <tr>
             <td class="bg_color">统计时间：</td>
             <td> 
                  <!-- <el-date-picker
                    v-model="vioForm.statisticsTime"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期" style="width: 100%;">
                  </el-date-picker> -->
                   <el-date-picker
                      v-model="vioForm.statisticsTime"
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
import axios from 'axios'
import bus from "../../bus"
  export default{
    data() {
      return {
       vioForm: {
          entName: '',
          buslicenId:'',
          registerAddress:'',
          openBank:'',
          statisticsTime: ''
        },
        // operationType:'',
        tableData: [],
        total: 0,
        page: 1,
        pageDataId:''
   
      }
    },
      methods:{
     backtrack(){
      this.$router.back(-1);
     },
     handleSave(){
       let req = {};
      req = {
        entName: this.vioForm.entName,
        buslicenId: this.vioForm.buslicenId,
        registerAddress: this.vioForm.registerAddress,
        openBank: this.vioForm.openBank,
        operationType: 'save',
        statisticsTime: this.vioForm.statisticsTime,
        pageDataId :this.pageDataId
      };
        axios({
        method: "post",
        data: req,
        url: "/banksys/testaccount/savetestaccount.do"
      }).then(res => {
        this.pageDataId = res.data.pageDataId
         if(res.data.code === "1001"){
          this.$message.success("保存成功")
          bus.$emit('handleChangeMata2','true')
          this.$router.push({ path: '/Violations'});
        }
      })
      .catch(() => {
         this.$message.error("网络异常,请稍后重试!!!");
      })
     },
     handleSubmit(){
        let req = {};
      req = {
        entName: this.vioForm.entName,
        buslicenId: this.vioForm.buslicenId,
        registerAddress: this.vioForm.registerAddress,
        openBank: this.vioForm.openBank,
        operationType: 'submit',
        statisticsTime: this.vioForm.statisticsTime,
        pageDataId :this.pageDataId
      };
        axios({
        method: "post",
        data: req,
        url: "/banksys/testaccount/savetestaccount.do"
      }).then(res => {
        if(res.data.code === "1001"){
          this.$message.success("提交成功")
          bus.$emit('handleChangeMata2','true')
          this.$router.push({ path: '/Violations'});
        }
      })
      .catch(() => {
         this.$message.error("网络异常,请稍后重试!!!");
      })
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