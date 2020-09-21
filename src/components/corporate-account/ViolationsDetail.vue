<template>
  <section>
    <!--工具条-->
    <el-col
      :span="24"
      class="toolbar"
    >
      <div class="v_add">
        <p>企业违规多头开立基本存款账户检测分析表详情</p>
        <el-form :model="vioForm">
          <table style="width: 100%" border="1">
            <tr>
              <td class="bg_color">企业名称:</td>
              <td>
                <el-input v-model="vioForm.ENTNAME" readonly></el-input>
              </td>
            </tr>
            <tr>
              <td class="bg_color">营业执照注册号:</td>
              <td>
                <el-input v-model="vioForm.BUSLICENID" readonly></el-input>
              </td>
            </tr>
            <tr>
              <td class="bg_color">注册地区：</td>
              <td>
                <el-input v-model="vioForm.REGISTERADDRESS" readonly></el-input>
              </td>
            </tr>
            <tr>
              <td class="bg_color">开户银行：</td>
              <td>
                <el-input v-model="vioForm.OPENBANK" readonly></el-input>
              </td>
            </tr>
            <tr>
              <td class="bg_color">统计时间：</td>
              <td>
                <!-- <el-date-picker
                  v-model="vioForm.statisticsTime"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  readonly style="width: 100%;"
                ></el-date-picker> -->
                <el-date-picker
                      v-model="vioForm.STATISTICSTIME"
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
                <el-input v-model="vioForm.CREATETIME" readonly></el-input>
              </td>
            </tr>
            <tr>
              <td class="bg_color">提交时间：</td>
              <td>
                <el-input v-model="vioForm.SUBMITTIME" readonly></el-input>
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
      vioForm: {}
    };
  },
  created() {
    this.vioForm = this.$route.query;
  },
  methods: {
    backtrack() {
      this.$router.push({ path: "/Violations" });
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
</style>