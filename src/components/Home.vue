<template>
  <el-row class="container">
    <el-col :span="24" class="header">
      <el-col :span="3" class="logo">
        <img class="img1" src="../assets/loginimg/head_logo.png" alt />
        <span style="font-weight:800;letter-spacing:3px">{{sysName}}</span>
      </el-col>
      <el-col :span="4">
        <div class="tools" @click.prevent="collapse">
          <el-tooltip class="item" effect="dark" content="展开" placement="bottom">
            <i class="el-icon-s-fold" v-show="this.isCollapse"></i>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="收起" placement="bottom">
            <i class="el-icon-s-unfold" v-show="!this.isCollapse"></i>
          </el-tooltip>
        </div>
      </el-col>
      <el-col :span="10" class="userinfo">
        <el-popover v-if="warningElShow" placement="top-start" width="210" trigger="hover">
          <ul style="list-style:none;">
            <li v-for="(item,index) in warningStr" :key="index">
              <span style="font-weight:bold;">{{index}}</span>
              {{item}}
            </li>
          </ul>
          <p v-if="warningShow" style="color: red;">{{warningMsg}}</p>
          <el-button
            slot="reference"
            icon="el-icon-message-solid"
            class="userinfo_text"
            v-bind:class="{ userinfo_text_red: isActive }"
            style="border:none;background-color: #a5acf7;padding-left: 2px;"
          >消息</el-button>
        </el-popover>
        <el-dropdown style="cursor:pointer" @command="changePassword">
          <span class="el-dropdown-link span_box">
            <i class="el-icon-user-solid"></i>
            {{this.userName}}
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-edit">修改密码</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-link :underline="false" @click.native="logout" class="userinfo_text">
          <img class="exit" src="../assets/exit3.png" alt />
          退出登录
        </el-link>
      </el-col>
    </el-col>

    <!-- 修改密码弹框 -->
    <el-dialog title="密码修改" :visible.sync="dialogChangePasswordVisible" width="30%">
      <el-form
        :model="changePasswordForm"
        :rules="changePasswordFormRules"
        ref="changePasswordForm"
        label-position="left"
      >
        <el-form-item label="旧密码:" label-width="80px">
          <el-input v-model="changePasswordForm.oldPassword" show-password></el-input>
        </el-form-item>
        <el-form-item label="新密码:" label-width="80px" prop="newPassword">
          <el-input
            v-model="changePasswordForm.newPassword"
            placeholder="6-20位字符在数字、小写、大写字母以及特殊字符中四选三"
            show-password
            type="password"
          ></el-input>
          <el-progress
            v-if="changePasswordForm.newPassword"
            :percentage="passwordPercent"
            :format="passwordPercentFormat"
          ></el-progress>
        </el-form-item>
        <el-form-item label="确认密码:" label-width="80px" prop="surePassword">
          <el-input v-model="changePasswordForm.surePassword" show-password></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogChangePasswordVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleChangePassword('changePasswordForm')">确 定</el-button>
      </span>
    </el-dialog>

    <el-col class="main">
      <div style="overflow-y: scroll;background: #dfe8ff">
        <!--左侧导航菜单-->
        <el-menu class="el-menu-vertical-demo" unique-opened router :collapse="isCollapse">
          <template v-for="item1 in menuLits">
            <el-submenu :index="item1.resValue" :key="item1.resValue">
              <template slot="title">
                <i :class="item1.iconCls"></i>
                <span slot="title">{{item1.name | ellipsis}}</span>
              </template>
              <template v-for="item2 in item1.children">
                <el-submenu
                  v-if="item2.children != null && 0 !=item2.children.length"
                  :index="item2.resValue"
                  :key="item2.resValue"
                >
                  <template slot="title">{{ item2.name }}</template>
                  <template v-for="item3 in item2.children">
                    <el-submenu
                      v-if="item3.children != null && 0 !=item3.children.length"
                      :index="item3.resValue"
                      :key="item3.resValue"
                    >
                      <template slot="title">{{ item3.name }}</template>
                      <el-menu-item
                        v-for="item4 in item3.children"
                        :key="item4.resValue"
                        :index="item4.path"
                      >{{ item4.name }}</el-menu-item>
                    </el-submenu>

                    <el-menu-item
                      v-else
                      :title="item3.name"
                      :index="item3.path"
                      :key="item3.resValue"
                    >{{item3.name | ellipsis}}</el-menu-item>
                  </template>
                </el-submenu>

                <el-menu-item
                  v-else
                  :title="item2.name"
                  :index="item2.path"
                  :key="item2.resValue"
                >{{item2.name | ellipsis}}</el-menu-item>
              </template>
            </el-submenu>
          </template>
        </el-menu>
      </div>
      <!-- main部分 -->
      <section class="content-container">
        <div class="grid-content bg-purple-light">
          <el-col :span="24" class="breadcrumb-container">
            <el-breadcrumb separator=">" class="breadcrumb-inner">
              <el-breadcrumb-item
                v-for="(item,index) in $route.matched"
                :key="index"
              >{{ item.name }}</el-breadcrumb-item>
            </el-breadcrumb>
          </el-col>
          <el-col :span="24" class="content-wrapper">
            <!-- <transition name="fade" mode="out-in"> -->
            <keep-alive>
              <router-view v-if="$route.meta.keepAlive"></router-view>
            </keep-alive>
            <router-view v-if="!$route.meta.keepAlive"></router-view>
            <!-- </transition> -->
          </el-col>
        </div>
      </section>
    </el-col>
  </el-row>
</template>

<script>
import axios from "axios";
import AES from "@/utils/aes.js";
export default {
  data() {
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.changePasswordForm.newPassword) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    const validatePassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        //6-20位包含字符、数字和特殊字符
        var ls = 0;
        if (this.changePasswordForm.newPassword !== "") {
          if (this.changePasswordForm.newPassword.match(/([a-z])+/)) {
            ls++;
          }
          if (this.changePasswordForm.newPassword.match(/([0-9])+/)) {
            ls++;
          }
          if (this.changePasswordForm.newPassword.match(/([A-Z])+/)) {
            ls++;
          }
          if (
            this.changePasswordForm.newPassword.match(/([\W])+/) &&
            !this.changePasswordForm.newPassword.match(/(![\u4E00-\u9FA5])+/)
          ) {
            ls++;
          }
          if (
            this.changePasswordForm.newPassword.length < 6 ||
            this.changePasswordForm.newPassword.length > 20
          ) {
            callback(new Error("要求6-20位字符"));
            ls = 0;
          }
          if (this.changePasswordForm.newPassword.match(/([\u4E00-\u9FA5])+/)) {
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
      changePasswordForm: {
        oldPassword: "",
        newPassword: "",
        surePassword: ""
      },
      changePasswordFormRules: {
        newPassword: [
          {
            required: true,
            validator: validatePassword,
            trigger: ["blur", "change"]
          }
        ],
        surePassword: [{ validator: validatePass2, trigger: "blur" }]
      },
      isCollapse: false,
      userName: "",
      sysName: "迎客图系统",
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      isActive: false,
      visible: false,
      warningElShow: false,
      dialogChangePasswordVisible: false,
      warningStr: "",
      warningShow: false,
      warningMsg: "",
      menuLits: []
    };
  },
  //预警
  created() {
    this.userName = sessionStorage.getItem("userName");
    this.warningData();
    this.createMenu();
    this.getSocketData();
  },

  methods: {
    // 调用接口
    getSocketData() {
      this.$axios
        .post("/banksys/productsend/querytaxremindlist.do", {})
        .then(res => { console.log("查询离线状态下是否有新消息！")})
        .catch(err => {
          console.log(err);
        });
    },
    passwordPercentFormat(percentage) {
      return percentage === 100 ? "符合" : `不符`;
    },
    //点击修改密码出现弹框
    changePassword() {
      this.dialogChangePasswordVisible = true;
    },
    //确定修改密码
    handleChangePassword(formName) {
      let para = {};
      para = {
        oldPassword: AES.encrypt(this.changePasswordForm.oldPassword),
        newPassword: AES.encrypt(this.changePasswordForm.newPassword)
      };
      this.$refs[formName].validate(valid => {
        if (valid) {
          axios({
            method: "post",
            url: "/banksys/system/user/passwordupdate.do",
            data: para
          })
            .then(res => {
              if (res.data.code === "1001") {
                this.$message.success(res.data.msg);
                this.dialogChangePasswordVisible = false;
                this.$router.push({ path: "/" });
                sessionStorage.removeItem("userName");
                sessionStorage.removeItem("status");
              } else {
                this.$message.error(res.data.msg);
              }
            })
            .catch(err => {
              this.$message.error("网络异常，请重试！！");
            });
        } else {
          return false;
        }
      });
    },
    // 加载左侧菜单栏
    createMenu() {
      axios({
        method: "post",
        data: {
          returnType: "tree",
          resType: "1",
          createMenu: "1"
        },
        url: "/banksys/system/resource/queryreslist.do"
      })
        .then(res => {
          if (res.data.code === "1001") {
            this.menuLits = res.data.menuList.marketing;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //判断是否有警报
    warningData() {
      axios({
        method: "post",
        data: {},
        url: "/banksys/system/common/getdataearlywarning.do"
      })
        .then(res => {
          this.warningStr = "";
          if (res.data.code === "1001") {
            this.warningElShow = res.data.warningShow;
            if (this.warningElShow) {
              this.isActive = res.data.warning;
              this.warningShow = res.data.warning;
              this.warningStr = res.data.showMsgs;
              this.warningMsg = res.data.warningMsg;
              if (this.isActive) {
                this.$notify({
                  title: "警告",
                  message: this.warningMsg,
                  type: "warning"
                });
              }
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //退出登录
    logout: function() {
      var _this = this;
      this.$confirm("确认退出吗?", "提示", {
        //type: 'warning'
      })
        .then(() => {
          sessionStorage.removeItem("userName");
          sessionStorage.removeItem("status");
          sessionStorage.removeItem("ifRefresh");
          sessionStorage.removeItem("PERMISSIONS");
          _this.$destroy();
          _this.$router.push("/");
        })
        .catch(() => {});
    },

    //折叠导航栏
    collapse: function() {
      this.isCollapse = !this.isCollapse;
    }
  },
  // 过滤文字字数
  filters: {
    ellipsis(value) {
      if (!value) return "";
      if (value.length > 10) {
        return value.slice(0, 10) + "...";
      }
      return value;
    }
  }
};
</script>

<style scoped >
.container {
  position: absolute;
  top: 0px;
  bottom: 0px;
  width: 100%;
}
.header {
  height: 60px;
  line-height: 60px;
  background: #a5acf7;
  color: #fff;
}
.userinfo {
  text-align: right;
  padding-right: 35px;
  float: right;
}
.userinfo-inner {
  cursor: pointer;
  color: #fff;
}
img {
  width: 40px;
  height: 40px;
  border-radius: 20px;
  margin: 10px 0px 10px 10px;
}

.logo {
  width: 240px;
  height: 60px;
  font-size: 17px;
  padding-left: 5px;
  padding-right: 10px;
  border-color: rgba(238, 241, 146, 0.3);
  border-right-width: 1px;
  border-right-style: solid;
  color: #0e3192;
}
.img1 {
  width: 30px;
  height: 30px;
  float: left;
  margin: 15px 10px 10px 18px;
}
.tools {
  padding: 0px 23px;
  width: 14px;
  height: 60px;
  line-height: 60px;
  font-size: 22px;
  cursor: pointer;
}
.fa {
  font-size: 20px !important;
  margin-top: 20px !important;
}
.el-link.el-link--default {
  color: #fff;
}
.span_box {
  font-size: 14px;
  margin-right: 20px;
}
.main {
  display: flex;
  background: #f2f3f3;
  position: absolute;
  top: 60px;
  bottom: 0px;
  overflow: hidden;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 240px;
  min-height: 400px;
}
.el-submenu .el-menu-item {
  min-width: 0px;
}
.el-dropdown {
  color: #fff !important;
}
.breadcrumb-inner {
  float: left;
}
.el-menu {
  height: 100%;
  background: #dfe8ff;
}
/* .el-submenu >>> .el-menu--inline{
  background:rgba(171, 226, 120, 0.467);
} */
.content-container {
  flex: 1;
  overflow-y: scroll;
  padding: 20px;
}

.breadcrumb-container {
  margin-bottom: 5px;
}
.content-wrapper {
  background-color: #f2f3f3;
  box-sizing: border-box;
}
.userinfo_text {
  color: #fff;
  margin-right: 10px;
}
.exit {
  width: 13px;
  height: 13px;
  line-height: 13px;
  vertical-align: middle;
}
.userinfo_text_red {
  color: red !important;
}
</style>