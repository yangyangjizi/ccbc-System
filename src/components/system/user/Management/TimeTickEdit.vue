<template>
  <el-col :span="24" class="toolbar">
    <div class="add_form">
      <el-form
        :model="editUserForm"
        :rules="addUserRules"
        ref="editUserForm"
        :label-width="labelWidth"
      >
        <el-form-item label="任务名称" prop="NAME" class="add-style">
          <el-input v-model="editUserForm.mapstimetask.NAME" autocomplete="off" style="width:74%"></el-input>
        </el-form-item>
        <el-form-item label="任务描述" prop="DESCRIPTION" style="width:100%">
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
            v-model="editUserForm.mapstimetask.DESCRIPTION"
            style="width:74%"
          ></el-input>
        </el-form-item>
        <el-form-item style="margin-top: -10px; margin-bottom:0px;">
          <cron v-if="showCronBox" v-model="editUserForm.mapstimetask.CRON"></cron>
        </el-form-item>
        <el-form-item label="规则" prop="CRON" class="add-style">
          <div style="width:74%;overflow: hidden">
            <el-input
              v-model="editUserForm.mapstimetask.CRON"
              autocomplete="off"
              placeholder="请输入规则"
              style="width:84%"
              disabled
            ></el-input>
            <el-button type="primary" @click="handleRules" style="float:right;">规则</el-button>
          </div>
        </el-form-item>
        <el-form-item label="Bean实例" prop="BEAN_ID" class="add-style">
          <el-select v-model="editUserForm.mapstimetask.BEAN_ID" placeholder="请选择" style="width:74%">
            <el-option
              v-for="item in editUserForm.list"
              :key="item.TimetaskbeanId"
              :label="item.bean_name"
              :value="item.TimetaskbeanId"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="add-style" prop="executiontime" label="执行时间">
          <el-date-picker
            v-model="editUserForm.executiontime"
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
        <el-button type="primary" @click="handleSureEdit('editUserForm')">确 定</el-button>
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
      editUserForm: {
        list: [],
        mapstimetask:{
         CRON: "",
         DESCRIPTION: "",
         BEAN_ID:"",
          NAME:"",
        },
       executiontime:[]
      
      },
      showCronBox: false
    };
  },
  created() {
    
  },
  activated(){
    this.editUserForm = this.$route.query;
    // this.editUserForm.executiontime[0]=this.$route.query.START_TIME
    // this.editUserForm.executiontime[1]=this.$route.query.END_TIME;
    this.$set(this.editUserForm, 'executiontime', [this.editUserForm.mapstimetask.START_TIME, this.editUserForm.mapstimetask.END_TIME]);
  },
  methods: {
    //规则
    handleRules() {
      this.showCronBox = !this.showCronBox;
    },
    //返回
    backtrack() {
      this.$router.go(-1);
    },
    //确定
    handleSureEdit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let prop = {};
          prop = {
            TimetaskbeanId: this.editUserForm.mapstimetask.BEAN_ID,
            TimetaskId: this.editUserForm.mapstimetask.TIMETASKID,
            name: this.editUserForm.mapstimetask.NAME,
            cron: this.editUserForm.mapstimetask.CRON,
            description:this. editUserForm.mapstimetask.DESCRIPTION,
            executiontime:this.editUserForm.executiontime
          };
          this.loading = true;
          this.loadingText = "保存中，请稍后！！！";
          this.$axios({
            method: "post",
            url: "/banksys/stimetask/saveeditstimetask.do",
            data: prop
          })
            .then(res => {
              this.loading = false;
              this.dialogAddUserFormVisible = false;
              if (res.data.code == "1001") {
                this.$message.success(res.data.msg);
                bus.$emit("handleChangeMata2", "true");
                this.$router.push({ path: "/TimeTick" });
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