<template>
  <section>
    <!--工具条-->
    <el-col :span="24" class="toolbar">
      <div class="v_add">
        <p>注吊销后发生业务反馈表编辑</p>
        <el-form :model="revForm">
          <table style="width: 100%" border="1">
            <tr>
              <td class="bg_color">企业名称:</td>
              <td>
                <el-input v-model="revForm.enterpriseName"></el-input>
              </td>
            </tr>
            <tr>
              <td class="bg_color">营业执照号码:</td>
              <td>
                <el-input v-model="revForm.businessLicenseNo"></el-input>
              </td>
            </tr>
            <tr>
              <td class="bg_color">旧营业执照号码:</td>
              <td>
                <el-input v-model="revForm.oldBusinessLicenseNo"></el-input>
              </td>
            </tr>
            <tr>
              <td class="bg_color">法定代表人姓名:</td>
              <td>
                <el-input v-model="revForm.legalName"></el-input>
              </td>
            </tr>
            <tr>
              <td class="bg_color">注册资金金额:</td>
              <td style="color: #999;">
                <el-input v-model="revForm.amountRegistered" style="width: 86%;margin-right: 5px;"></el-input>(万元)
              </td>
            </tr>
            <tr>
              <td class="bg_color">经营状态代码:</td>
              <td>
                <el-input v-model="revForm.businessStatusCode"></el-input>
              </td>
            </tr>
            <tr>
              <td class="bg_color">组织性质代码:</td>
              <td>
                <el-input v-model="revForm.organizationCode"></el-input>
              </td>
            </tr>
            <tr>
              <td class="bg_color">组织成立日期:</td>
              <td>
                <el-date-picker
                  v-model="revForm.dateOfEstablishment"
                  type="date"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期"
                  class="input-box5"
                ></el-date-picker>
              </td>
            </tr>
            <tr>
              <td class="bg_color">注销日期:</td>
              <td>
                <el-date-picker
                  v-model="revForm.logoutTime"
                  type="date"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期"
                  class="input-box5"
                ></el-date-picker>
              </td>
            </tr>
            <tr>
              <td class="bg_color">吊销日期:</td>
              <td>
                <el-date-picker
                  v-model="revForm.revokeTime"
                  type="date"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期"
                  class="input-box5"
                ></el-date-picker>
              </td>
            </tr>
            <tr>
              <td class="bg_color">行业类型代码:</td>
              <td>
                <el-input v-model="revForm.industryTypeCode"></el-input>
              </td>
            </tr>
            <tr>
              <td class="bg_color">注吊销日期:</td>
              <td>
                <el-date-picker
                  v-model="revForm.cancellationTime"
                  type="date"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期"
                  class="input-box5"
                ></el-date-picker>
              </td>
            </tr>
            <tr>
              <td class="bg_color">客户账号:</td>
              <td>
                <el-input v-model="revForm.accountNumber"></el-input>
              </td>
            </tr>
            <tr>
              <td class="bg_color">账户状态:</td>
              <td>
                <el-select v-model="revForm.accountStatus" placeholder="请选择" class="input-box5">
                  <el-option
                    v-for="item in accountoptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </td>
            </tr>
            <tr>
              <td class="bg_color">是否销户:</td>
              <td>
                <el-select v-model="revForm.ifcloseAccount" placeholder="请选择" class="input-box5">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </td>
            </tr>
            <tr>
              <td class="bg_color">统计时间：</td>
              <td>
                <!-- <el-date-picker
                    v-model="revForm.statisticsTime"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期" style="width: 100%;">
                </el-date-picker>-->
                <el-date-picker
                  v-model="revForm.statisticsTime"
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
  data() {
    return {
      revForm: {
        enterpriseName: "",
        businessLicenseNo: "",
        oldBusinessLicenseNo: "",
        legalName: "",
        amountRegistered: "",
        businessStatusCode: "",
        organizationCode: "",
        dateOfEstablishment: "",
        logoutTime: "",
        revokeTime: "",
        industryTypeCode: "",
        cancellationTime: "",
        accountNumber: "",
        accountStatus: "",
        ifcloseAccount: "",
        statisticsTime: ""
      },
      options: [
        {
          value: "是",
          label: "是"
        },
        {
          value: "否",
          label: "否"
        }
      ],
      accountoptions: [
        {
          value: "已吊销",
          label: "已吊销"
        },
        {
          value: "已注销",
          label: "已注销"
        }
      ]
    };
  },
  created() {
    this.revForm = this.$route.query;
  },
  methods: {
    backtrack() {
      this.$router.push({ path: "/Revokedlist" });
    },
    handleSave() {
      let req = {};
      req = {
        enterpriseName: this.revForm.enterpriseName,
        businessLicenseNo: this.revForm.businessLicenseNo,
        legalName: this.revForm.legalName,
        amountRegistered: this.revForm.amountRegistered,
        businessStatusCode: this.revForm.businessStatusCode,
        oldBusinessLicenseNo: this.revForm.oldBusinessLicenseNo,
        organizationCode: this.revForm.organizationCode,
        dateOfEstablishment: this.revForm.dateOfEstablishment,
        logoutTime: this.revForm.logoutTime,
        industryTypeCode: this.revForm.industryTypeCode,
        cancellationTime: this.revForm.cancellationTime,
        revokeTime: this.revForm.revokeTime,
        accountNumber: this.revForm.accountNumber,
        ifcloseAccount: this.revForm.ifcloseAccount,
        accountStatus: this.revForm.accountStatus,
        statisticsTime: this.revForm.statisticsTime,
        operationType: "save",
        id: this.revForm.id
      };
      axios({
        method: "post",
        data: req,
        url: "/banksys/revokefeedback/editrevokedetailsbyid.do"
      })
        .then(res => {
          if (res.data.code === "1001") {
            this.$message.success("保存成功");
            bus.$emit("handleChangeMata2", "true");
            this.$router.push({ path: "/Revokedlist" });
          }
        })
        .catch(() => {
          this.$message.error("网络异常,请稍后重试!!!");
        });
    },
    handleSubmit() {
      this.$confirm("您确定提交吗？ 提交之后将不能编辑和删除！", "提示", {
        type: "warning"
      })
        .then(() => {
          let req = {};
          req = {
            enterpriseName: this.revForm.enterpriseName,
            businessLicenseNo: this.revForm.businessLicenseNo,
            legalName: this.revForm.legalName,
            amountRegistered: this.revForm.amountRegistered,
            businessStatusCode: this.revForm.businessStatusCode,
            oldBusinessLicenseNo: this.revForm.oldBusinessLicenseNo,
            organizationCode: this.revForm.organizationCode,
            dateOfEstablishment: this.revForm.dateOfEstablishment,
            logoutTime: this.revForm.logoutTime,
            industryTypeCode: this.revForm.industryTypeCode,
            cancellationTime: this.revForm.cancellationTime,
            revokeTime: this.revForm.revokeTime,
            accountNumber: this.revForm.accountNumber,
            ifcloseAccount: this.revForm.ifcloseAccount,
            accountStatus: this.revForm.accountStatus,
            statisticsTime: this.revForm.statisticsTime,
            operationType: "submit",
            id: this.revForm.id
          };
          axios({
            method: "post",
            data: req,
            url: "/banksys/revokefeedback/editrevokedetailsbyid.do"
          })
            .then(res => {
              if (res.data.code === "1001") {
                this.$message.success("提交成功");
                bus.$emit("handleChangeMata2", "true");
                this.$router.push({ path: "/Revokedlist" });
              }
            })
            .catch(err => {
              this.$message.error("网络异常，请重试！！！");
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
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