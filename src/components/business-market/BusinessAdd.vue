<template>
  <section>
    <!--工具条-->
    <el-col :span="24" class="toolbar">
      
     <div class="v_add">
      <p>商机营销汇总表新增</p>
       <el-form :model="busForm">
         <table style="width: 100%" border="1">
           <tr>
             <td class="bg_color">数据总量:</td>
             <td> <el-input v-model="busForm.datasum"></el-input></td>
           </tr>
           <tr>
             <td class="bg_color">营销成功:</td>
             <td> <el-input v-model="busForm.successful"></el-input></td>
           </tr>
           <tr>
             <td class="bg_color">营销失败：</td>
             <td> <el-input v-model="busForm.failure"></el-input></td>
           </tr>
           <tr>
             <td class="bg_color">未反馈/未营销：</td>
             <td> <el-input v-model="busForm.nofeedback"></el-input></td>
           </tr>
           <tr>
             <td class="bg_color">营销成功率：</td>
             <td> <el-input v-model="busForm.successrate"></el-input></td>
           </tr>
            <tr>
             <td class="bg_color">统计时间：</td>
             <td> 
                  <el-date-picker
                    v-model="busForm.statisticsTime"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期" style="width: 100%;">
                  </el-date-picker>
             </td>
           </tr>
         </table>
         <el-row>
         <el-button type="primary" @click="save">保存</el-button>
         <el-button type="success" @click="handleSubmit" class="submit_color">提交</el-button>
         <el-button type="primary" plain @click="backtrack">返回</el-button>
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
       busForm: {
          datasum: '',
          successful:'',
          failure:'',
          nofeedback:'',
          successrate:'',
          statisticsTime: ''
          
        },
        tableData: [],
        total: 0,
        page: 1,
        
        
   
      }
    },
      methods:{
     backtrack(){
      this.$router.push({ path: "/Business" });
     },
     save(){
      
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