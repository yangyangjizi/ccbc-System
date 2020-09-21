<template>
  <div id="login">
    <div class="login_content">
      <div class="login_from">
        <div class="login_from_left">
          <img src="../assets/loginimg/login1.png" />
        </div>
        <div class="login_from_right">
          <div class="login_from_right_con">
            <div class="login_head">
              <img src="../assets/loginimg/head_logo.png" alt />
              <span>迎客图系统</span>
            </div>
            <el-form :model="ruleForm" :rules="rules" class="el-form-box" ref="ruleForm">
              <el-form-item prop="loginName" class="margin-item">
                <div>
                  <el-input
                    placeholder="请输入员工编号"
                    prefix-icon="el-icon-user"
                    v-model="ruleForm.loginName"
                    ref="mark"
                    @keyup.enter.native="submitForm('ruleForm')"
                  ></el-input>
                </div>
              </el-form-item>
              <el-form-item prop="password">
                <div>
                  <el-input
                    placeholder="请输入密码"
                    prefix-icon="el-icon-lock"
                    v-model="ruleForm.password"
                    show-password
                    @keyup.enter.native="submitForm('ruleForm')"
                  ></el-input>
                </div>
              </el-form-item>
              <!-- <el-form-item prop="captcha">
						<div >
							<el-input placeholder="请输入验证码"  prefix-icon="el-icon-key" v-model="ruleForm.captcha" style="width: 62%;" @keyup.enter.native="submitForm('ruleForm')"></el-input>
							<img :src="codeImg" alt="" style="vertical-align: middle;height: 40px;border-radius: 3px;" @click="refash">
						</div>
              </el-form-item>-->
              <el-form-item>
                <div class="button-box">
                  <el-button @click="submitForm('ruleForm')">登录</el-button>
                </div>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
// import { encrypt, decrypt } from "@/utils/aes.js";
import AES from "@/utils/aes.js";

// var encrypts = AES.encrypt(JSON.stringify(cars),keys);
// var dess = JSON.parse(AES.decrypt(encrypts,keys));
export default {
  name: "login",
  data() {
    return {
      ruleForm: {
        loginName: "",
        password: ""
        // captcha:''
      },
      rules: {
        loginName: [
          { required: true, message: "请输入员工编号", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
        // captcha:[
        // 	{ required: true, message: '请输入验证码',trigger: 'blur'}
        // ]
      },
      codeImg: ""
    };
  },
  mounted: function() {
    this.$refs.mark.$el.querySelector("input").focus();
    // this.queryCodeImg();
  },
  methods: {
    // 提交登录信息
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.loginAjax();
        } else {
          return false;
        }
      });
    },
    loginAjax() {
      axios
        .post("/banksys/login/logincheck.do", {
          // loginName: this.ruleForm.loginName,
          // password: this.ruleForm.password
          loginName: AES.encrypt(this.ruleForm.loginName),
          password: AES.encrypt(this.ruleForm.password)
          // captcha: this.ruleForm.captcha
        })
        .then(res => {
          console.log(res);
          // sessionStorage.setItem('loginState', '1')
          sessionStorage.setItem("unitCode", res.data.unitCode);
          sessionStorage.setItem("loginName", res.data.staffNo);
          sessionStorage.setItem("userName", res.data.realName);
          sessionStorage.setItem("status", res.data.status);
          sessionStorage.setItem("unitRank", res.data.unitRank);
          // 接收按钮权限
          sessionStorage.setItem("PERMISSIONS", res.data.btCodeList);
          // sessionStorage.setItem("PERMISSIONS", '["user",]');
          if (res.data.code === "1001") {
            this.$message.success(res.data.msg);
            this.$router.push({
              path: "/welcome"
            });
            if (res.data.status === "0") {
              this.dialogFormVisible = true;
            }
          } else if (res.data.code === "1002") {
            this.$message.error(res.data.msg);
          }

          // this.queryCodeImg();
        })
        .catch(err => {
          console.log(err);
          this.$message.error("网络异常，请稍后重试！！！");
          // this.queryCodeImg();
        });
    }
    // 切换验证码
    // queryCodeImg () {
    // 	this.codeImg = '/banksys/kapthca?' + Math.random()
    // },
    // refash () {
    // 	this.queryCodeImg();
    // }
  }
};
</script>
<style scoped>
.login_content {
  width: 100%;
  height: 100%;
  position: absolute;
  background: url(../assets/loginimg/bg.jpg) no-repeat;
  background-size: 100% 100%;
}
.login_head {
  width: 100%;
  text-align: center;
  font-size: 24px;
  margin-bottom: 34px;
  font-weight: 600;
  color: #0e3192;
}
.login_head img {
  width: 30px;
  height: 30px;
  vertical-align: bottom;
}
.login_from {
  width: 828px;
  height: 460px;
  position: relative;
  left: 50%;
  margin-left: -414px;
  top: 50%;
  margin-top: -230px;
}
.login_from_left {
  float: left;
  width: 50%;
  height: 460px;
}
.login_from_left img {
  width: 100%;
}
.login_from_left p {
  color: #fff;
  margin-left: 59px;
}
.p1 {
  padding-top: 100px;
  font-size: 35px;
}
.p2 {
  margin-top: 20px;
  font-size: 28px;
}
.login_from_right {
  float: left;
  width: 50%;
  height: 460px;
  background-color: #fff;
}
.login_from_right_con {
  width: 320px;
  height: 312px;
  margin: 54px auto 0;
}
.login_from_right_con .el-form-box {
  margin-top: 40px;
}
.button-box {
  text-align: center;
  margin-top: 23px;
}
.el-button {
  width: 320px;
  height: 40px;
  background-color: #929ae9;
  border: none;
  color: #ffffff;
  font-size: 16px;
}
.margin-item {
  margin-bottom: 20px !important;
}
</style>