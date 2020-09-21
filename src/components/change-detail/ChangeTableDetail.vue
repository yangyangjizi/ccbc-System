<template>
  <section>
    <!--工具条-->
    <el-col
      :span="24"
      class="toolbar"
    >
      <div class="v_add">
        <p>风险问题及整改明细表详情</p>
        <el-form :model="vioForm">
          <table style="width: 100%" border="1">
            <tr>
              <td class="bg_color">账户:</td>
              <td>
                <el-input v-model="vioForm.accountNumber" readonly></el-input>
              </td>
            </tr>
            <tr>
              <td class="bg_color">账户名称:</td>
              <td>
                <el-input v-model="vioForm.accountName" readonly></el-input>
              </td>
            </tr>
            <tr>
              <td class="bg_color">排查账户类型:</td>
              <td>
                <el-input v-model="vioForm.checkAccountType" readonly></el-input>
              </td>
            </tr>
            <tr>
              <td class="bg_color">存在问题的具体描述:</td>
              <td>
                <el-input v-model="vioForm.problemDesc" readonly></el-input>
              </td>
            </tr>
            <tr>
              <td class="bg_color">是否存在交易违法违规或可疑交易:</td>
              <td>
                <el-input v-model="vioForm.ifdubiousDeal" readonly></el-input>
              </td>
            </tr>
            <tr>
              <td class="bg_color">是否整改:</td>
              <td>
                <el-input v-model="vioForm.ifreorganize" readonly></el-input>
              </td>
            </tr>
            <tr>
              <td class="bg_color">未整改整改情况:</td>
              <td>
                <el-input v-model="vioForm.reorganizeCondition" readonly></el-input>
              </td>
            </tr>
            <tr>
              <td class="bg_color">牵头整改部门:</td>
              <td>
                <el-input v-model="vioForm.reorganizeDept" readonly></el-input>
              </td>
            </tr>
            <tr>
              <td class="bg_color">统计时间：</td>
              <td>
                <el-input v-model="vioForm.statisticsTime" readonly></el-input>
              </td>
            </tr>
            <tr>
              <td class="bg_color">创建时间：</td>
              <td>
                <el-input v-model="vioForm.createTime" readonly></el-input>
              </td>
            </tr>
            <tr>
              <td class="bg_color">填报时间：</td>
              <td>
                <el-input v-model="vioForm.submitTime" readonly></el-input>
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
import axios from "axios";
import bus from "../../bus";
export default {
  name: "ChangeTableDetail",
  data() {
    return {
      vioForm: {}
    };
  },
  created() {
      this.vioForm = this.$route.query;
  },
  mounted() {},
  methods: {
    backtrack() {
      this.$router.push({ path: "/ChangeTableList" });
    },
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
