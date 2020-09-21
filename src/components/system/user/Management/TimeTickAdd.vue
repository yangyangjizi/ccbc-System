<template>
  <el-col :span="24" class="toolbar">
    <div class="add_form">
      <el-form
        :model="addUserForm"
        ref="addUserForm"
        :rules="addUserRules"
        :label-width="labelWidth"
      >
        <el-form-item label="任务名称" prop="taskName" class="add-style">
          <el-input
            v-model="addUserForm.taskName"
            autocomplete="off"
            placeholder="请输入任务名称"
            style="width:74%"
          ></el-input>
        </el-form-item>
        <el-form-item label="任务描述" prop="textarea" style="width:100%">
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
            v-model="addUserForm.textarea"
            style="width:74%"
          ></el-input>
        </el-form-item>
        <el-form-item style="margin-top: -10px; margin-bottom:0px;">
          <cron v-if="showCronBox" v-model="addUserForm.cronExpression"></cron>
        </el-form-item>
        <el-form-item label="规则" prop="cronExpression" class="add-style">
          <div style="width:74%;overflow: hidden">
            <el-input
              v-model="addUserForm.cronExpression"
              autocomplete="off"
              style="width:84%"
              disabled
            ></el-input>
            <el-button type="primary" @click="handleRules" style="float:right;">规则</el-button>
          </div>
        </el-form-item>
        <el-form-item label="Bean实例" prop="instance" class="add-style">
          <el-select v-model="addUserForm.instance" placeholder="请选择" style="width:74%">
            <el-option
              v-for="item in instanceList"
              :key="item.TimetaskbeanId"
              :label="item.bean_name"
              :value="item.TimetaskbeanId"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="add-style" prop="addTime" label="执行时间">
          <el-date-picker
            v-model="addUserForm.addTime"
            placeholder="请输入添加时间"
            type="daterange"
            clearable
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            style="width:74%"
            value-format="yyyy-MM-dd HH:mm:ss"
          ></el-date-picker>
        </el-form-item>
      </el-form>
      <el-row slot="footer" class="dialog-footer">
        <el-button @click="backtrack">返回</el-button>
        <el-button type="primary" @click="handleSureAdd('addUserForm')">确 定</el-button>
      </el-row>
    </div>
  </el-col>
</template>
<script>
import axios from "axios";
import bus from "../../../../bus";
import cron from "./cron";
export default {
  components: {
    cron
  },
  data() {
    return {
      labelWidth: "18%",
      addUserRules: {
        taskName: [
          { required: true, message: "请输入任务名称", trigger: "blur" }
        ],
        textarea: [
          { required: true, message: "请输入任务描述", trigger: "blur" }
        ],
        cronExpression: [
          { required: true, message: "请输入规则", trigger: "blur" }
        ],
        addTime: [
          { required: true, message: "请输入执行时间", trigger: "blur" }
        ],
        instance: [
          { required: true, message: "请输入bean实例", trigger: "blur" }
        ]
      },
      addUserForm: {
        cronExpression: "",
        taskName: "",
        textarea: "",
        rules: "",
        instance: "",
        addTime: ""
      },
      instanceList:[],
      showCronBox: false
    };
  },
  created() {
    this.getBeanList();
  },
  methods: {
    //规则
    handleRules() {
      this.showCronBox = !this.showCronBox;
    },
    //返回
    backtrack() {
      this.$refs.addUserForm.resetFields();
      this.$router.go(-1);
    },
    // 获取bean实例列表
    getBeanList() {

      this.$axios
        .post("/banksys/stimetask/queryaddtimetask.do", {})

        .then(res => {
          console.log(res);
          this.instanceList = res.data.data.list;
        })
        .catch(err => {
          this.$message.error("网络异常，请重试！！！");
        });

      },

    //确定
    handleSureAdd(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let prop = {};
          prop = {
            name: this.addUserForm.taskName,//任务名称
            description: this.addUserForm.textarea,//任务描述
            cron: this.addUserForm.cronExpression,//规则
            TimetaskbeanId: this.addUserForm.instance,//bean实例ID
            executiontime: this.addUserForm.addTime//执行时间
          };
          this.loading = true;
          this.loadingText = "保存中，请稍后！！！";
          this.$axios({
            method: "post",
            url: "/banksys/stimetask/savestimetask.do",
            data: prop
          })
            .then(res => {
              this.loading = false;
              this.dialogAddUserFormVisible = false;
              if (res.data.code == "1001") {
                 this.$message.success(res.data.msg);
                 bus.$emit('handleChangeMata2','true')
                 this.$refs.addUserForm.resetFields();
                 this.$router.push({ path: '/TimeTick'});
              } else {
                this.$message.error(res.data.msg);
              }
            })
            .catch(err => {
              this.loading = false;
              this.dialogAddUserFormVisible = false;
              this.$message.error("网络异常，请重试！！！");
            });
        } else {
          return false;
        }
      });
    }
  }
};
</script>
<style scoped>
.add_form {
  width: 1000px;
  margin: 0 auto;
}
.el-row {
  text-align: center;
}
</style>