<template>
  <div class="bg_fa">
    <img src="../../assets/bg_welcome.png" alt />
    <!-- 修改密码弹框 -->
    <el-dialog
      title="重置密码"
      :visible.sync="dialogFormVisible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false"
      width="30%"
    >
      <el-form
        :model="resetPasswordform"
        :rules="resetPasswordformRules"
        ref="resetPasswordform"
        label-width="70px"
      >
        <el-form-item label="旧密码">
          <el-input v-model="resetPasswordform.oldPassword" show-password autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword">
          <el-input
            v-model="resetPasswordform.newPassword"
            show-password
            type="password"
            placeholder="6-20位字符在数字、小写、大写字母以及特殊字符中四选三"
            autocomplete="off"
          ></el-input>
          <el-progress
            v-if="resetPasswordform.newPassword"
            :percentage="passwordPercent"
            class="titleList"
            :format="passwordPercentFormat"
          ></el-progress>
        </el-form-item>
        <el-form-item label="确认密码" prop="surePassword">
          <el-input v-model="resetPasswordform.surePassword" show-password autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleNo">取 消</el-button>
        <el-button type="primary" @click="handleChangePassword('resetPasswordform')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import axios from "axios";
import AES from "@/utils/aes.js";
export default {
  data() {
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.resetPasswordform.newPassword) {
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
        if (this.resetPasswordform.newPassword !== "") {
          if (this.resetPasswordform.newPassword.match(/([a-z])+/)) {
            ls++;
          }
          if (this.resetPasswordform.newPassword.match(/([0-9])+/)) {
            ls++;
          }
          if (this.resetPasswordform.newPassword.match(/([A-Z])+/)) {
            ls++;
          }
          if (
            this.resetPasswordform.newPassword.match(/([\W])+/) &&
            !this.resetPasswordform.newPassword.match(/(![\u4E00-\u9FA5])+/)
          ) {
            ls++;
          }
          if (
            this.resetPasswordform.newPassword.length < 6 ||
            this.resetPasswordform.newPassword.length > 20
          ) {
            callback(new Error("要求6-20位字符"));
            ls = 0;
          }
          if (this.resetPasswordform.newPassword.match(/([\u4E00-\u9FA5])+/)) {
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
      socket:null,
      dialogFormVisible: false,
      passwordPercent: 0,
      resetPasswordform: {
        oldPassword: "",
        newPassword: "",
        surePassword: ""
      },
      resetPasswordformRules: {
        newPassword: [
          {
            required: true,
            validator: validatePassword,
            trigger: ["blur", "change"]
          }
        ],
        surePassword: [{ validator: validatePass2, trigger: "blur" }]
      }
    };
  },
  created() {
    this.checkStatus();
    // 连接webSocket，用于接收后台实时报警信息推送
    this.webSocket();
  },
  // destroyed() {
  //     this.socket.close() //离开路由之后断开websocket连接
  //   },
  methods: {
    webSocket() {
      const that = this;
      if (typeof WebSocket == "undefined") {
        this.$notify({
          title: "提示",
          message: "当前浏览器无法接收实时报警信息，请使用谷歌浏览器！",
          type: "warning",
          duration: 0
        });
      } else {
        // 实例化socket，这里我把用户名传给了后台，使后台能判断要把消息发给哪个用户，其实也可以后台直接获取用户IP来判断并推送
        const socketUrl =
          "ws://"+document.location.host+"/banksys/websocket/chat/" + sessionStorage.getItem("unitCode")+"/"+sessionStorage.getItem("loginName");
        this.socket = new WebSocket(socketUrl);
        // 监听socket打开
        this.socket.onopen = function() {
          console.log("浏览器WebSocket已打开");
        };
        // 监听socket消息接收
        this.socket.onmessage = function(msg) {
          that.$notify.info({
            title: "有新的通知",
            // 这里也可以把返回信息加入到message中显示
            message: msg.data,
            duration: 0,
          });
        }; // 监听socket错误
        this.socket.onerror = function() {
          that.$notify({
            title: "错误",
            message: "服务器错误，无法接收实时消息",
            type: "error",
            duration: 0
          });
        };
        // 监听socket关闭
        this.socket.onclose = function() {
          console.log("WebSocket已关闭");
        };
      }
    },
    passwordPercentFormat(percentage) {
      return percentage === 100 ? "符合" : `不符`;
    },
    // 取消重置
    handleNo() {
      this.$router.push({ path: "/" });
    },
    //密码重置
    handleChangePassword(formName) {
      let para = {};
      para = {
        oldPassword: AES.encrypt(this.resetPasswordform.oldPassword),
        newPassword: AES.encrypt(this.resetPasswordform.newPassword)
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
                this.dialogFormVisible = false;
                this.$router.push({ path: "/" });
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
    checkStatus() {
      const statusCode = sessionStorage.getItem("status");
      if (statusCode === "0") {
        this.dialogFormVisible = true;
      }
    }
  }
};
</script>
<style scoped>
.bg_fa {
  text-align: center;
}
.bg_fa img {
  margin-top: 100px;
  width: 800px;
  height: 552px;
}
.titleList {
  margin-top: 10px;
}
</style>