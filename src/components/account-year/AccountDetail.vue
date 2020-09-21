<template>
  <section>
    <!--工具条-->
    <el-col
      :span="24"
      class="toolbar"
    >
      <div class="v_add">
        <p>账户年检统计表详情</p>
        <el-form :model="addForm">
          <table style="width: 100%" border="1">
            <tr>
              <td class="bg_color">账户类型:</td>
              <td>
                <!-- <el-select v-model="addForm.accountType" placeholder="请选择" width="100%">
                  <el-option
                    v-for="item in addForm.qyeryAccountTypeList"
                    :key="item.code"
                    :label="item.codeName"
                    :value="item.code"
                  ></el-option>
                </el-select> -->
                 <el-input v-model="addForm.accountType" readonly></el-input>
              </td>
            </tr>
            <tr>
              <td class="bg_color">年检结束时，本机构存量账户数量:</td>
              <td>
                <el-input v-model="addForm.yearlyNum" readonly></el-input>
              </td>
            </tr>

            <tr>
              <td class="bg_color">未纳入年检账范围户的数量：</td>
              <td>
                <div class="childfloat">
                  <label>临时存款账户数量:</label>
                  <el-input v-model="addForm.temporaryNum" readonly></el-input>
                </div>
                <div class="childfloat">
                  <label>法院、公安等部门冻结账户数量:</label>
                  <el-input v-model="addForm.frozenNum" readonly></el-input>
                </div>
                <div class="childfloat">
                  <label>久悬账户数量:</label>
                  <el-input v-model="addForm.dangerousNum" readonly></el-input>
                </div>
                <div class="childfloat">
                  <label>当年新开立账户数量:</label>
                  <el-input v-model="addForm.newaccountNum" readonly></el-input>
                </div>
                <div class="childfloat">
                  <label>小计:</label>
                  <el-input v-model="addForm.subtotal" readonly></el-input>
                </div>
              </td>
            </tr>
            <tr>
              <td class="bg_color">应年检账户数量:</td>
              <td>
                <el-input v-model="addForm.shouldyearlyNum" readonly></el-input>
              </td>
            </tr>
            <tr>
              <td class="bg_color">年检结果：</td>
              <td>
                <div class="childfloat">
                  <label>年检合格账户数量:</label>
                  <el-input v-model="addForm.qualifiedNum" readonly></el-input>
                </div>
                <div class="childfloat">
                  <label>年检不合格账户数量:</label>
                  <el-input v-model="addForm.unqualifiedNum" readonly></el-input>
                </div>
                <div class="childfloat">
                  <label>未年检账户数量:</label>
                  <el-input v-model="addForm.notcheckedNum" readonly></el-input>
                </div>
              </td>
            </tr>
            <tr>
              <td class="bg_color">账户年检率：</td>
              <td>
                <el-input v-model="addForm.yearlyRate" class="el-input-box" readonly></el-input><span>%</span>
              </td>
            </tr>
            <tr>
              <td class="bg_color">统计时间：</td>
              <td>
                <el-date-picker
                  v-model="addForm.statisticsTime"
                  readonly
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  style="width: 100%;"
                ></el-date-picker>
              </td>
            </tr>
            <tr>
              <td class="bg_color">创建时间：</td>
              <td>
                <el-input v-model="addForm.createTime" readonly></el-input>
              </td>
            </tr>
            <tr>
              <td class="bg_color">提交时间：</td>
              <td>
                <el-input v-model="addForm.submitTime" readonly></el-input>
              </td>
            </tr>
          </table>
          <el-row>
            <el-button type="primary" plain @click="backtrack">返回</el-button>
          </el-row>
        </el-form>
      </div>
    </el-col>
  </section>
</template>
<script>
export default {
  data() {
    return {
      addForm: {}
    };
  },
  created() {
    this.addForm = this.$route.query;
  },
  methods: {
    backtrack() {
      this.$router.push({ path: "/Accountlist" });
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
.el-input-box{
  width:75px !important;
  text-align: center;
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
.el-select {
  width: 100%;
}
.el-form-item.el-form-item__label {
  line-height: 20px !important;
}
.childfloat {
  overflow: hidden;
  margin-bottom: 10px;
}
.childfloat label {
  font-size: 14px;
  float: left;
  width: 150px;
  text-align: right;
}
.childfloat .el-input {
  float: right;
  width: 210px;
}
</style>