<template>
  <section>
    <!--工具条-->
    <el-col
      :span="24"
      class="toolbar"
    >
      <div class="v_add">
        <p class="head_p">账户年检统计表详情</p>
        <el-form :model="addForm">
          <table border="1">
            <tr>
              <td class="sub t_color">统计月份</td>
              <td colspan="3" class="other_1">
                <el-date-picker
                  v-model="addForm.month"
                  type="month"
                  placeholder="选择月"
                  style="width: 100%"
                  readonly
                ></el-date-picker>
              </td>
              <td class="sub t_color">填写单位</td>
              <td colspan="4" class="other_1">
                 <el-input v-model="addForm.unitName" readonly></el-input>
              </td>
              <td class="sub t_color">填写日期</td>
              <td colspan="3" class="other_1">
                 <el-input v-model="addForm.createTime" readonly></el-input>
              </td>
            </tr>
            <tr>
              <td rowspan="2" class="t_color">账户类型</td>
              <td rowspan="2" class="t_color">年检结束时，本机构存量账户数量</td>
              <td colspan="5" class="t_center t_color">未纳入年检账范围户的数量</td>
              <td rowspan="2" class="t_color">应年检账户数量</td>
              <td colspan="3" class="t_center t_color">年检结果</td>
              <td rowspan="2" class="t_color">账户年检率</td>
            </tr>
            <tr>
              <td class="t_color">临时存款账户数量</td>
              <td class="t_color">法院、公安等部门冻结账户数量</td>
              <td class="t_color">久悬账户数量</td>
              <td class="t_color">当年新开立账户数量</td>
              <td class="t_color">小计</td>
              <td class="t_color">年检合格账户数量</td>
              <td class="t_color">年检不合格账户数量</td>
              <td class="t_color">未年检账户数量</td>
            </tr>
            <tr :model="addForm.baseBank">
              <td class="t_color">基本存款账户</td>
              <td class="t_center">
                <el-input v-model="addForm.baseBank.yearlyNum" readonly></el-input>
              </td>
              <td>
                --
              </td>
              <td>
                <el-input v-model="addForm.baseBank.frozenNum" readonly></el-input>
              </td>
              <td>
                <el-input v-model="addForm.baseBank.dangerousNum" readonly></el-input>
              </td>
              <td>
                <el-input v-model="addForm.baseBank.newaccountNum" readonly></el-input>
              </td>
              <td>
                <el-input v-model="addForm.baseBank.subtotal" readonly></el-input>
              </td>
              <td>
                <el-input v-model="addForm.baseBank.shouldyearlyNum" readonly></el-input>
              </td>
              <td>
                <el-input v-model="addForm.baseBank.qualifiedNum" readonly></el-input>
              </td>
              <td>
                <el-input v-model="addForm.baseBank.unqualifiedNum" readonly></el-input>
              </td>
              <td>
                <el-input v-model="addForm.baseBank.notcheckedNum" readonly></el-input>
              </td>
              <td class="td-box">
                <el-input v-model="addForm.baseBank.yearlyRate" readonly></el-input>%
              </td>
            </tr>
            <tr :model="addForm.generalBank">
              <td class="t_color">一般存款账户</td>
              <td class="t_center">
                <el-input v-model="addForm.generalBank.yearlyNum" readonly></el-input>
              </td>
              <td>
                --
              </td>
              <td>
                <el-input v-model="addForm.generalBank.frozenNum" readonly></el-input>
              </td>
              <td>
                <el-input v-model="addForm.generalBank.dangerousNum" readonly></el-input>
              </td>
              <td>
                <el-input v-model="addForm.generalBank.newaccountNum" readonly></el-input>
              </td>
              <td>
                <el-input v-model="addForm.generalBank.subtotal" readonly></el-input>
              </td>
              <td>
                <el-input v-model="addForm.generalBank.shouldyearlyNum" readonly></el-input>
              </td>
              <td>
                <el-input v-model="addForm.generalBank.qualifiedNum" readonly></el-input>
              </td>
              <td>
                <el-input v-model="addForm.generalBank.unqualifiedNum" readonly></el-input>
              </td>
              <td>
                <el-input v-model="addForm.generalBank.notcheckedNum" readonly></el-input>
              </td>
              <td class="td-box">
                <el-input v-model="addForm.generalBank.yearlyRate" readonly></el-input>%
              </td>
            </tr>
            <tr :model="addForm.specialBank">
              <td class="t_color">专用存款账户</td>
              <td class="t_center">
                <el-input v-model="addForm.specialBank.yearlyNum" readonly></el-input>
              </td>
              <td>
               --
              </td>
              <td>
                <el-input v-model="addForm.specialBank.frozenNum" readonly></el-input>
              </td>
              <td>
                <el-input v-model="addForm.specialBank.dangerousNum" readonly></el-input>
              </td>
              <td>
                <el-input v-model="addForm.specialBank.newaccountNum" readonly></el-input>
              </td>
              <td>
                <el-input v-model="addForm.specialBank.subtotal" readonly></el-input>
              </td>
              <td>
                <el-input v-model="addForm.specialBank.shouldyearlyNum" readonly></el-input>
              </td>
              <td>
                <el-input v-model="addForm.specialBank.qualifiedNum" readonly></el-input>
              </td>
              <td>
                <el-input v-model="addForm.specialBank.unqualifiedNum" readonly></el-input>
              </td>
              <td>
                <el-input v-model="addForm.specialBank.notcheckedNum" readonly></el-input>
              </td>
              <td class="td-box">
                <el-input v-model="addForm.specialBank.yearlyRate" readonly></el-input>%
              </td>
            </tr>
            <tr :model="addForm.temporaryBank">
              <td class="t_color">临时存款账户</td>
              <td>
                <el-input v-model="addForm.temporaryBank.yearlyNum" readonly></el-input>
              </td>
              <td>
                <el-input v-model="addForm.temporaryBank.temporaryNum" readonly></el-input>
              </td>
              <td class="t_center">--</td>
              <td class="t_center">--</td>
              <td class="t_center">--</td>
              <td>
                <el-input v-model="addForm.temporaryBank.subtotal" readonly></el-input>
              </td>
              <td class="t_center">--</td>
              <td class="t_center">--</td>
              <td class="t_center">--</td>
              <td class="t_center">--</td>
              <td class="t_center">--</td>
            </tr>
            <tr>
              <td class="filler t_color">填票人</td>
              <td colspan="3">
                <el-input v-model="addForm.createName" readonly></el-input>
              </td>

              <td class="phone t_color">电话</td>
              <td colspan="7">
                <el-input v-model="addForm.createPhone" readonly></el-input>
              </td>
            </tr>
          </table>

          <p
            class="note_p"
          >注：如统一账户满足临时存款账户、冻结账户、久悬账户或开立不满一年账户（即2、3、4、5），两项或两项以上条件的，可任选其中一项统计该账户，不得重复统计</p>

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
      addForm: {
        baseBank: {
          temporaryNum:'',
        },
        generalBank: {
          temporaryNum:'',
        },
        specialBank: {
          temporaryNum:'',
        },
        temporaryBank: {
          frozenNum:'',
          dangerousNum:'',
          newaccountNum:'',
          shouldyearlyNum:'',
          qualifiedNum:'',
          unqualifiedNum:'',
          notcheckedNum:'',
          yearlyRate:''
        },
        // value: "",
        month: "",
        createName:"",
        createPhone:"",
        unitName:"",
        createTime:""
      },

      tableData: [],
      total: 0,
      page: 1
    };
  },
  created() {
    this.addForm.month = this.$route.query[0].startStatisticsTime,
    this.addForm.createName = this.$route.query[0].createName,
    this.addForm.createPhone = this.$route.query[0].createPhone,
    this.addForm.unitName = this.$route.query[0].unitName,
    this.addForm.createTime = this.$route.query[0].createTime,
    this.addForm.baseBank= this.$route.query[0],
    this.addForm.generalBank= this.$route.query[1],
    this.addForm.specialBank= this.$route.query[2],
    this.addForm.temporaryBank= this.$route.query[3]
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
  width: 100%;
  margin: 0 auto;
  height: auto;
}
.v_add .head_p {
  text-align: center;
  margin-bottom: 20px;
  font-size: 17px;
  color: #333;
}
.v_add .note_p {
  text-align: left;
  margin-top: 10px;
  font-size: 14px;
  color: #666;
}
table {
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
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
span {
  font-size: 14px;
  display: block;
  width: 140px;
  text-align: right;
}
.submit_color {
  background: #858ffd;
  border-color: #858ffd;
}
.submit_color:hover {
  background-color: #a6acef;
  border-color: #a6acef;
}
th {
  text-align: center;
}
td {
  padding: 3px 10px;
  text-align: center;
  color: #606266;
}
input {
  width: 98%;
  height: 28px;
  padding-left: 4px;
}
.submit {
  width: 120px;
  height: 40px;
}
.t_color {
  background-color: #eef1f6;
}
</style>
