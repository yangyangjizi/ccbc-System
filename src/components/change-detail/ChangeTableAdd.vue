<template>
  <section>
    <!--工具条-->
    <el-col
      :span="24"
      class="toolbar"
    >
      <div class="v_add">
        <p>风险问题及整改明细表新增</p>
        <el-form :model="vioForm">
          <table style="width: 100%" border="1">
            <tr>
              <td class="bg_color">账户:</td>
              <td>
                <el-input v-model="vioForm.accountNumber"></el-input>
              </td>
            </tr>
            <tr>
              <td class="bg_color">账户名称:</td>
              <td>
                <el-input v-model="vioForm.accountName"></el-input>
              </td>
            </tr>
            <tr>
              <td class="bg_color">排查账户类型:</td>
              <td>
                <el-select v-model="vioForm.checkAccountType" placeholder="请选择" style="width:100%">
                  <el-option
                    v-for="(item,index) in vioForm.checkAccountTypeList"
                    :key="index"
                    :label="item.codeName"
                    :value="item.code"
                  ></el-option>
                </el-select>
              </td>
            </tr>
            <tr>
              <td class="bg_color">存在问题的具体描述:</td>
              <td>
                <el-input v-model="vioForm.problemDesc"></el-input>
              </td>
            </tr>
            <tr>
              <td class="bg_color">是否存在交易违法违规或可疑交易:</td>
              <td>
                <el-select v-model="vioForm.ifdubiousDeal" placeholder="请选择" style="width:100%">
                  <el-option
                    v-for="(item,index) in vioForm.ifdubiousDealList"
                    :key="index"
                    :label="item.label"
                    :value="item.code"
                  ></el-option>
                </el-select>
              </td>
            </tr>
            <tr>
              <td class="bg_color">是否整改:</td>
              <td>
                <el-select v-model="vioForm.ifreorganize" placeholder="请选择" style="width:100%">
                  <el-option
                    v-for="(item,index) in vioForm.ifreorganizeList"
                    :key="index"
                    :label="item.label"
                    :value="item.code"
                  ></el-option>
                </el-select>
              </td>
            </tr>
            <tr>
              <td class="bg_color">未整改整改情况:</td>
              <td>
                <el-input v-model="vioForm.reorganizeCondition"></el-input>
              </td>
            </tr>
            <tr>
              <td class="bg_color">牵头整改部门:</td>
              <td>
                <el-input v-model="vioForm.reorganizeDept"></el-input>
              </td>
            </tr>
            <tr>
              <td class="bg_color">统计月份：</td>
              <td>
                <el-date-picker
                  v-model="vioForm.statisticsTime"
                  type="month"
                  style="width: 100%;"
                  placeholder="选择月"
                ></el-date-picker>
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
import bus from "../../bus";
export default {
  name: "ChangeTableAdd",
  data() {
    return {
      vioForm: {
        checkAccountType: "",
        checkAccountTypeList: [
             {
              code: "1",
            codeName: "基本存款账户"
          },
          {
              code: "2",
            codeName: "一般存款账户"
          },
          {
              code: "3",
            codeName: "专用存款账户"
          },
          {
              code: "4",
            codeName: "临时存款账户"
          }
        ],
        ifdubiousDeal: "",
        ifdubiousDealList: [
          {
            code: "是",
            label: "是"
          },
          {
            code: "否",
            label: "否"
          }
        ],
        ifreorganize: "",
        ifreorganizeList: [
          {
            code: "是",
            label: "是"
          },
          {
            code: "否",
            label: "否"
          }
        ]
      },
    };
  },
  created() {},
  mounted() {},
  methods: {
    backtrack() {
      this.$router.back(-1);
    },
    handleSave() {
      let req = {};
      req = {
        operationType: "save",
        accountNumber: this.vioForm.accountNumber,
        accountName: this.vioForm.accountName,
        checkAccountType: this.vioForm.checkAccountType,
        problemDesc: this.vioForm.problemDesc,
        ifdubiousDeal: this.vioForm.ifdubiousDeal,
        ifreorganize: this.vioForm.ifreorganize,
        reorganizeCondition: this.vioForm.reorganizeCondition,
        reorganizeDept: this.vioForm.reorganizeDept,
        statisticsTime: this.vioForm.statisticsTime
      };
      axios({
        method: "post",
        data: req,
        url: "/banksys/riskinspect/addriskinspect.do"
      })
        .then(res => {
          if (res.data.code === "1001") {
            this.$message.success("保存成功");
            bus.$emit("handleChangeMata2", "true");
            this.$router.push({ path: "/ChangeTableList" });
          }
        })
        .catch(() => {
          this.$message.error("网络异常,请稍后重试!!!");
        });
    },
    handleSubmit() {
      let req = {};
      req = {
        operationType: "submit",
        accountNumber: this.vioForm.accountNumber,
        accountName: this.vioForm.accountName,
        checkAccountType: this.vioForm.checkAccountType,
        problemDesc: this.vioForm.problemDesc,
        ifdubiousDeal: this.vioForm.ifdubiousDeal,
        ifreorganize: this.vioForm.ifreorganize,
        reorganizeCondition: this.vioForm.reorganizeCondition,
        reorganizeDept: this.vioForm.reorganizeDept,
        statisticsTime: this.vioForm.statisticsTime
      };
      axios({
        method: "post",
        data: req,
        url: "/banksys/riskinspect/addriskinspect.do"
      })
        .then(res => {
          if (res.data.code === "1001") {
            this.$message.success("提交成功");
            bus.$emit("handleChangeMata2", "true");
            this.$router.push({ path: "/ChangeTableList" });
          }
        })
        .catch(() => {
          this.$message.error("网络异常,请稍后重试!!!");
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
