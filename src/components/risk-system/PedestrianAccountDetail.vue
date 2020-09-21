<template>
  <section>
    <!--工具条-->
    <el-col
      :span="24"
      class="toolbar"
    >
      <div class="v_add">
        <p>人行账户详情</p>
        <el-form :model="busForm">
          <table style="width: 100%" border="1">
            <tr>
              <td class="bg_color">账号:</td>
              <td>
                <el-input v-model="busForm.accNumber" readonly></el-input>
              </td>
            </tr>
            <tr>
              <td class="bg_color">银行机构代码：</td>
              <td>
                <el-input v-model="busForm.unitCode" readonly></el-input>
              </td>
            </tr>
            <tr>
              <td class="bg_color">银行机构名称：</td>
              <td>
                <el-input v-model="busForm.unitName" readonly></el-input>
              </td>
            </tr>
            <tr>
              <td class="bg_color">存款人名称：</td>
              <td>
                <el-input v-model="busForm.depositorName" readonly></el-input>
              </td>
            </tr>
            <tr>
              <td class="bg_color">注册地区代码：</td>
              <td>
                <el-input v-model="busForm.regAreaCode" readonly></el-input>
              </td>
            </tr>
            <tr>
              <td class="bg_color">账户名称：</td>
              <td>
                <el-input v-model="busForm.accName" readonly></el-input>
              </td>
            </tr>
            <tr>
              <td class="bg_color">账户性质：</td>
              <td>
                <el-input v-model="busForm.accType" readonly></el-input>
              </td>
            </tr>
            <tr>
              <td class="bg_color">开户许可证核准号：</td>
              <td>
                <el-input v-model="busForm.openAccNumber" readonly></el-input>
              </td>
            </tr>
            <tr>
              <td class="bg_color">开户日期：</td>
              <td>
                <el-input v-model="busForm.openAccTime" readonly></el-input>
              </td>
            </tr>
            <tr>
              <td class="bg_color">销户日期：</td>
              <td>
                <el-input v-model="busForm.closAccTime" readonly></el-input>
              </td>
            </tr>
            <tr>
              <td class="bg_color">状态：</td>
              <td>
                <el-input v-model="busForm.accStatus" readonly></el-input>
              </td>
            </tr>
            <tr>
              <td class="bg_color">导入机构名称：</td>
              <td>
                <el-input v-model="busForm.createUnitCode" readonly></el-input>
              </td>
            </tr>
            <tr>
              <td class="bg_color">导入操作员姓名：</td>
              <td>
                <el-input v-model="busForm.createName" readonly></el-input>
              </td>
            </tr>
            <tr>
              <td class="bg_color">导入时间：</td>
              <td>
                <el-input v-model="busForm.createTime" readonly></el-input>
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
    this.doubtfulAccId = this.$route.query.depositorId;
    this.getDetailDate()
  },
  methods: {
    backtrack() {
      this.$router.push({ path: "/PedestrianAccountList" });
    },
    getDetailDate(){
      let para = {
        depositorId:this.doubtfulAccId
      };
      axios({
        method: "post",
        url: "/banksys/peopleacc/querydepositordetailsbyid.do",
        data: para
      }).then(res => {
          this.busForm = res.data.data;
    
      }).catch(err => {
        this.$message.error("网络异常，请重试！！！")
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
.submit_color {
  background: #858ffd;
  border-color: #858ffd;
}
.submit_color:hover {
  background-color: #a6acef;
  border-color: #a6acef;
}
</style>