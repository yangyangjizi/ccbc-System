<template>
  <section>
    <!--工具条-->
    <el-col
      :span="24"
      class="toolbar"
    >
      <div class="v_add">
        <p>信息分发详情</p>
        <el-form :model="vioForm">
          <table style="width: 100%" border="1">
            <tr>
              <td class="bg_color">支行名称:</td>
              <td>
                <el-input v-model="vioForm.subName" readonly></el-input>
              </td>
            </tr>
            <tr>
              <td class="bg_color">支行机构号:</td>
              <td>
                <el-input v-model="vioForm.subCode" readonly></el-input>
              </td>
            </tr>
            <tr>
              <td class="bg_color">网点名称:</td>
              <td>
                <el-input v-model="vioForm.unitName" readonly></el-input>
              </td>
            </tr>
            <tr>
              <td class="bg_color">网点机构号:</td>
              <td>
                <el-input v-model="vioForm.unitCode" readonly></el-input>
              </td>
            </tr>
            <tr>
              <td class="bg_color">信息:</td>
              <td>
                <ul
                  style="border: 1px solid #DCDFE6;margin:1px;    border-radius: 4px; text-align:left;color: #606266;"
                >
                  <li v-for="(infor,index) in vioForm.inforList" :key="index">{{index+1}}：{{infor}}</li>
                </ul>
              </td>
            </tr>
            <tr>
              <td class="bg_color">数据导入操作员:</td>
              <td>
                <el-input v-model="vioForm.createName" readonly></el-input>
              </td>
            </tr>
            <tr>
              <td class="bg_color">数据导入时间:</td>
              <td>
                <el-input v-model="vioForm.createTime" readonly></el-input>
              </td>
            </tr>
            <tr v-if="this.showCode === 0">
              <td class="bg_color">分发支行名称:</td>
              <td>
                <el-input v-model="vioForm.disSubName" readonly></el-input>
              </td>
            </tr>
            <tr v-if="this.showCode === 0">
              <td class="bg_color">分行分发时间:</td>
              <td>
                <el-input v-model="vioForm.bankDisTime" readonly></el-input>
              </td>
            </tr>
            <tr v-if="this.showCode === 0 || this.showCode === 1">
              <td class="bg_color">分发网点名称:</td>
              <td>
                <el-input v-model="vioForm.disUnitName" readonly></el-input>
              </td>
            </tr>
            <tr v-if="this.showCode === 0 || this.showCode === 1">
              <td class="bg_color">支行分发时间:</td>
              <td>
                <el-input v-model="vioForm.subDisTime" readonly></el-input>
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
export default {
  data() {
    return {
      showCode: "",
      vioForm: {}
    };
  },
  created() {
    this.vioForm = this.$route.query.data;
    this.showCode = this.$route.query.unitRank;
  },
  mounted() {},
  methods: {
    backtrack() {
      this.$router.push({ path: "/InformationDistribution" });
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
