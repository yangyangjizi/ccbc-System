<template>
  <section v-loading="loading" :element-loading-text="loadingText">
    <!--工具条-->
    <el-col :span="24" class="toolbar" v-if="!loading">
      <div class="v_add">
        <p>添加员工与用户</p>
        <el-form :model="userForm" ref="userForm" :rules="rules">
          <table style="width: 100%;margin-bottom:20px" border="1">
            <tr>
              <td class="bg_color">员工编号:</td>
              <td>
                <el-input v-model="userForm.staffNo" size="mini" clearable placeholder="请输入员工编号"></el-input>
              </td>
            </tr>
            <tr>
              <td class="bg_color">员工姓名:</td>
              <td>
                <el-input v-model="userForm.staffName" size="mini" clearable placeholder="请输入员工姓名"></el-input>
              </td>
            </tr>

            <tr>
              <td class="bg_color">联系电话:</td>
              <td>
                <el-input v-model="userForm.tel" size="mini" clearable placeholder="请输入联系电话"></el-input>
              </td>
            </tr>

            <tr>
              <td class="bg_color">所属机构:</td>
              <td>
                <el-cascader
                  ref="tree"
                  placeholder="请选择所属机构"
                  v-model="userForm.unitCode"
                  :options="options"
                  @change="handleChange1"
                  :props="defaultData"
                  collapse-tags
                  style="width:100%"
                ></el-cascader>
              </td>
            </tr>
            <tr>
              <td class="bg_color">部门名称:</td>
              <td>
                <el-select
                  v-model="userForm.deptName"
                  placeholder="请选择部门名称"
                  @change="handleChange"
                  style="width:100%"
                >
                  <el-option
                    v-for="item in deptNameList1"
                    :key="item.deptId"
                    :label="item.deptName"
                    :value="item.deptId"
                  ></el-option>
                </el-select>
              </td>
            </tr>
            <tr>
              <td class="bg_color">岗位名称:</td>
              <td>
                <el-select v-model="userForm.postName" placeholder="请选择岗位名称" style="width:100%">
                  <el-option
                    v-for="item in postNameList"
                    :key="item.postId"
                    :label="item.postName"
                    :value="item.postId"
                  ></el-option>
                </el-select>
              </td>
            </tr>
            <tr>
              <td class="bg_color">登录密码:</td>
              <td>
                <el-form-item prop="passWord">
                  <el-input
                    v-model="userForm.passWord"
                    show-password
                    placeholder="6-20位字符在数字、小写、大写字母以及特殊字符中四选三"
                    type="password"
                    size="mini"
                  ></el-input>
                  <el-progress :percentage="passwordPercent" :format="passwordPercentFormat"></el-progress>
                </el-form-item>
              </td>
            </tr>
          </table>
          <p style="text-align:center">
            <el-switch v-model="passwordCode" active-text="初始密码" inactive-text="自定义密码"></el-switch>
          </p>
          <p>分配资源/角色</p>

          <div style="text-align:center">
            <el-form-item label="资源类型" prop="resources">
              <el-cascader
                placeholder="请选择资源类型"
                style="width: 80%"
                v-model="userForm.resources"
                :options="resourcesTypeList"
                :props="defaultResourcesData"
                collapse-tags
                clearable
              ></el-cascader>
            </el-form-item>
            <el-form-item class="el-forms input-box9" label="角色类型">
              <el-select
                v-model="userForm.roleType"
                clearable
                placeholder="请选择角色类型"
                class="input-box7"
              >
                <el-option
                  v-for="item in roleTypeList"
                  :key="item.code"
                  :label="item.codeName"
                  :value="item.code"
                ></el-option>
              </el-select>
            </el-form-item>
          </div>
          <el-row>
            <el-button type="primary" @click="handleSave">保存</el-button>
            <el-button @click="backtrack">返回</el-button>
          </el-row>
        </el-form>
      </div>
    </el-col>
  </section>
</template>

<script>
import AES from "@/utils/aes.js";
export default {
  name: "AddUserAndStaff",
  data() {
    const validatePassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        //6-20位包含字符、数字和特殊字符
        var ls = 0;
        if (this.userForm.passWord !== "") {
          if (this.userForm.passWord.match(/([a-z])+/)) {
            ls++;
          }
          if (this.userForm.passWord.match(/([0-9])+/)) {
            ls++;
          }
          if (this.userForm.passWord.match(/([A-Z])+/)) {
            ls++;
          }
          if (
            this.userForm.passWord.match(/([\W])+/) &&
            !this.userForm.passWord.match(/(![\u4E00-\u9FA5])+/)
          ) {
            ls++;
          }
          if (
            this.userForm.passWord.length < 6 ||
            this.userForm.passWord.length > 20
          ) {
            callback(new Error("要求6-20位字符"));
            ls = 0;
          }
          if (this.userForm.passWord.match(/([\u4E00-\u9FA5])+/)) {
            callback(new Error("不能包含中文字符"));
            ls = 0;
          }
          switch (ls) {
            case 0:
              this.passwordPercent = 0;
              callback(
                new Error("数字、小写字母、大写字母以及特殊字符中四选三")
              );
              break;
            case 1:
              this.passwordPercent = 33;
              callback(
                new Error("数字、小写字母、大写字母以及特殊字符中四选三")
              );
              break;
            case 2:
              this.passwordPercent = 66;
              callback(
                new Error("数字、小写字母 、大写字母以及特殊字符中四选三")
              );
              break;
            case 3:
            case 4:
              this.passwordPercent = 100;
              break;
            default:
              this.passwordPercent = 0;
              break;
          }
        }
        callback();
      }
    };
    return {
      passwordPercent: 0,
      loading: "",
      loadingText: "拼命加载中",
      passwordCode: false,
      roleTypeList: [],
      resourcesTypeList: [],
      deptNameList1: [],
      postNameList: [],
      defaultResourcesData: {
        //联级选择
        multiple: true,
        value: "id",
        label: "resName",
        children: "children"
      },
      userForm: {
        staffNo: "",
        passWord: "",
        staffName: "",
        resources: [],
        roleType: "",
        tel: "",
        postName: "",
        deptName: "",
        unitCode: []
      },
      options: [],
      defaultData: {
        //联级选择
        leafOnly: true,
        checkStrictly: true,
        value: "unitCode",
        label: "unitName",
        children: "children"
      },
      rules: {
        passWord: [
          {
            required: true,
            validator: validatePassword,
            trigger: ["blur", "change"]
          }
        ]
      }
    };
  },
  watch: {
    passwordCode() {
      this.getPassWordCode();
    }
  },
  created() {
    this.handleCheckResourcesCode();
    this.handleCheckUserCode();
    this.getBankList();
  },
  mounted() {},
  methods: {
    passwordPercentFormat(percentage) {
      return percentage === 100 ? "符合" : `不符`;
    },
    // 获取所属机构
    getBankList() {
      this.$axios
        .post("/banksys/system/post/queryunitcodebyrole.do", {})
        .then(res => {
          this.options = res.data.list;
        })
        .catch(err => {
          this.$message.error("网络异常，请重新尝试！！！");
        });
    },
    // 新增部门数据接口
    handleChange1(e) {
      this.$axios
        .post("/banksys/system/dept/querydeptbyunit.do", {
          unitCode: e
        })
        .then(res => {
          this.deptNameList1 = res.data.data;
          this.userForm.postName = "";
          this.userForm.deptName = "";
          this.postNameList = [];
        });
    },
    // 新增岗位数据接口
    handleChange() {
      this.userForm.postName = "";
      this.$axios
        .post("/banksys/system/post/querypostbyunitcode.do ", {
          unitCodes: this.userForm.unitCode,
          deptName: this.userForm.deptName
        })
        .then(res => {
          this.postNameList = res.data.data;
        });
    },
    // 角色类型查询
    handleCheckUserCode() {
      this.$axios
        .post("/banksys/system/role/queryroletypelist.do", {})
        .then(res => {
          this.roleTypeList = res.data.data;
        })
        .catch(err => {
          this.$message.error("网络异常，请重试！！！");
        });
    },
    // 资源类型查询
    handleCheckResourcesCode() {
      this.$axios
        .post("/banksys/system/resource/queryreslist.do", {
          returnType: "tree"
        })
        .then(res => {
          this.resourcesTypeList = res.data.list;
        })
        .catch(err => {
          this.$message.error("网络异常，请重试！！！");
        });
    },
    getPassWordCode() {
      if (this.passwordCode == true) {
        this.$axios
          .post("/banksys/system/user/queryinitialpassword.do", {})
          .then(res => {
            this.userForm.passWord =AES.decrypt(res.data.initialPassword);
          })
          .catch(err => {
            this.$message.error("网络异常，请重试！！！");
          });
      } else {
        this.userForm.passWord = "";
      }
    },
    //保存
    handleSave() {
      this.loading = true;
      this.loadingText = "正在保存，请稍后！！！";
      let req = {};
      req = {
        staffNo: AES.encrypt(this.userForm.staffNo),
        passWord: AES.encrypt(this.userForm.passWord.replace(/\s*/g,"")),
        staffName: AES.encrypt(this.userForm.staffName),
        resources: this.userForm.resources,
        roleType: this.userForm.roleType,
        tel: AES.encrypt(this.userForm.tel),
        unitCode: this.userForm.unitCode,
        deptId: this.userForm.deptName,
        postId: this.userForm.postName,
        addRoleType: "y"
      };
      this.$axios({
        method: "post",
        data: req,
        url: "/banksys/system/user/useradd.do"
      })
        .then(res => {
          this.loading = false;
          if (res.data.code === "1001") {
            this.$message.success(res.data.msg);
            (this.userForm.staffNo = ""),
              (this.userForm.passWord = ""),
              (this.userForm.staffName = ""),
              (this.userForm.resources = []),
              (this.userForm.roleType = ""),
              (this.userForm.tel = ""),
              (this.userForm.postName = ""),
              (this.userForm.deptName = ""),
              (this.userForm.unitCode = []);
            // this.$router.push({ path: "/Userlist" });
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch(err => {
          this.loading = false;
          console.log(err);
        });
    },
    backtrack() {
      this.$router.push({ path: "/Userlist" });
    }
  }
};
</script>

<style scoped>
.v_add {
  width: 600px;
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
</style>
