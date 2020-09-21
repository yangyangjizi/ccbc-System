<template>
  <section v-loading="loading" :element-loading-text="loadingText">
    <!--工具条-->
    <el-col :span="24" class="toolbar" v-if="!loading">
      <div class="v_add">
        <p>预警详情表</p>
        <div class="margin-box">
          <el-button type="primary" size="mini" @click="handleShowBox" v-hasPermission="'warningByReaAdd'">新增</el-button>
          <el-button type="success" size="mini" @click="handleDelete" v-hasPermission="'warningByReaDel'">删除</el-button>
          <el-button type="danger" size="mini" @click="handleRemove" v-hasPermission="'warningByReaOut'">移出</el-button>
        </div>
        <el-table
          :data="tableData"
          border
          style="width: 100%;"
          :header-cell-style="styleObj"
          highlight-current-row
          @select="handleClickRow"
          @select-all="handleClickAllRow"
          @selection-change="handleChangeCheck"
        >
          <el-table-column type="selection" width="55" align="center"></el-table-column>
          <el-table-column prop="number" label="序号" align="center" width="55"></el-table-column>
          <el-table-column prop="warningReason" label="预警原因" show-overflow-tooltip align="center"></el-table-column>
          <el-table-column label="预警详情" align="center" prop="warningDetails" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-popover
                placement="right"
                width="auto"
                trigger="click"
                v-if="scope.row.warningType == '1'"
              >
                <p class="show-box">
                  <span class="inline-box">预警原因:</span>
                  <el-input type="textarea" :rows="3" placeholder="请输入内容" v-model="scope.row.warningReason"></el-input>
                </p>
                <p class="show-box">
                  <span class="inline-box">人行账户信息:</span>
                  <el-input type="textarea" :rows="3" placeholder="请输入内容" v-model="scope.row.peopleAccData"></el-input>
                </p>
                <p class="show-box">
                  <span class="inline-box">新一代信息:</span>
                  <el-input type="textarea" :rows="3" placeholder="请输入内容" v-model="scope.row.newGenData"></el-input>
                </p>
                <p class="show-box">
                  <span class="inline-box">工商信息:</span>
                  <el-input type="textarea" :rows="3" placeholder="请输入内容" v-model="scope.row.busiData"></el-input>
                </p>
                <el-button slot="reference" type="info" size="mini" class="submit_color">详情</el-button>
              </el-popover>
              <template v-else>{{scope.row.warningDetails}}</template>
            </template>
          </el-table-column>
        </el-table>
        <!-- 新增弹框 -->
        <el-dialog title="新增" :visible.sync="dialogFormVisible" width="30%">
          <el-form :model="AddForm" ref="AddForm">
            <el-form-item label="预警原因" :label-width="formLabelWidth" prop="warningReason">
              <el-input v-model="AddForm.warningReason" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="预警详情" :label-width="formLabelWidth" prop="warningDetails">
              <el-input v-model="AddForm.warningDetails" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="handleNo('AddForm')">取 消</el-button>
            <el-button type="primary" @click="handleYes('AddForm')">确 定</el-button>
          </div>
        </el-dialog>
        <!-- 操作弹框输入原因 -->
        <el-dialog title :visible.sync="dialogOperateVisible" width="30%">
          <el-form :model="operateForm">
            <el-form-item label="操作原因" :label-width="formLabelWidth">
              <el-input v-model="operateForm.operateReason" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogOperateVisible = false">取 消</el-button>
            <el-button type="primary" @click="handleOperateYes">确 定</el-button>
          </div>
        </el-dialog>
        <p>预警详情移出表</p>
        <div class="margin-box">
          <el-button type="warning" size="mini" @click="handleMoveIn" v-hasPermission="'warningByReaInto'">移入</el-button>
          <el-button type="success" size="mini" @click="handleDelete2" v-hasPermission="'warningByReaDel'">删除</el-button>
        </div>

        <el-table
          :data="tableData2"
          border
          style="width: 100%;"
          :header-cell-style="styleObj"
          highlight-current-row
          @select="handleClickRow2"
          @selection-change="handleChangeCheck2"
          @select-all="handleClickAllRow2"
        >
          <el-table-column type="selection" width="55" align="center"></el-table-column>
          <el-table-column prop="number" label="序号" align="center" width="55"></el-table-column>
          <el-table-column prop="warningReason" label="预警原因" show-overflow-tooltip align="center"></el-table-column>
          <el-table-column label="预警详情" align="center" prop="warningDetails" show-overflow-tooltip>
             <template slot-scope="scope">
              <el-popover
                placement="right"
                width="auto"
                trigger="click"
                v-if="scope.row.warningType == '1'"
              >
                <p class="show-box">
                  <span class="inline-box">预警原因:</span>
                  <el-input type="textarea" :rows="3" placeholder="请输入内容" v-model="scope.row.warningReason"></el-input>
                </p>
                <p class="show-box">
                  <span class="inline-box">人行账户信息:</span>
                  <el-input type="textarea" :rows="3" placeholder="请输入内容" v-model="scope.row.peopleAccData"></el-input>
                </p>
                <p class="show-box">
                  <span class="inline-box">新一代信息:</span>
                  <el-input type="textarea" :rows="3" placeholder="请输入内容" v-model="scope.row.newGenData"></el-input>
                </p>
                <p class="show-box">
                  <span class="inline-box">工商信息:</span>
                  <el-input type="textarea" :rows="3" placeholder="请输入内容" v-model="scope.row.busiData"></el-input>
                </p>
                <el-button slot="reference" type="info" size="mini" class="submit_color">详情</el-button>
              </el-popover>
              <template v-else>{{scope.row.warningDetails}}</template>
            </template>
          </el-table-column>
        </el-table>
        <!-- 操作弹框输入原因 -->
        <el-dialog title :visible.sync="dialogOperateVisible2" width="30%">
          <el-form :model="operateForm2">
            <el-form-item label="操作原因" :label-width="formLabelWidth">
              <el-input v-model="operateForm2.operateReason" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogOperateVisible2 = false">取 消</el-button>
            <el-button type="primary" @click="handleOperateYes2">确 定</el-button>
          </div>
        </el-dialog>
        <el-row>
          <el-button type="primary" @click="backtrack">返回</el-button>
        </el-row>
      </div>
    </el-col>
  </section>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      loading: "",
      loadingText: "拼命加载中",
      commonId: "",
      ifShowButton: true,
      ifShowButtonTwo: false,
      dialogFormVisible: false,
      formLabelWidth: "80px",
      tableData: [],
      tableData2: [],
      warningIdList: [],
      nowOperateTypeList: [],
      multipleSelection: [],
      multipleSelection2: [],
      operateForm: {
        operateReason: ""
      },
      operateForm2: {
        operateReason: ""
      },
      operateType: "",
      dialogOperateVisible: false,
      dialogOperateVisible2: false,
      AddForm: {
        warningReason: "",
        warningDetails: ""
      },
      styleObj: {
        background: "#eef1f6",
        "border-color": "#dbdbdb",
        "text-align": "center"
      }
    };
  },
  created() {
    this.commonId = this.$route.query.commonId;
    this.getDetailDate();
    this.getDetailDate2();
  },
  methods: {
    handleOperateYes() {
      this.loading = true;
      this.loadingText = "操作中，请稍后！！！";
      axios
        .post("/banksys/accdoubtful/operatewarningreason.do", {
          warningIdList: this.warningIdList,
          nowOperateTypeList: this.nowOperateTypeList,
          operateType: this.operateType,
          operateReason: this.operateForm.operateReason
        })
        .then(res => {
          this.loading = false;
          this.dialogOperateVisible = false;
          if (res.data.code === "1001") {
            this.$message.success(res.data.msg);
            this.getDetailDate();
            this.getDetailDate2();
            this.warningIdList = [];
            this.nowOperateTypeList = [];
            this.multipleSelection = [];
            this.operateForm.operateReason = "";
          } else {
            this.$message.error(res.data.msg);
            this.warningIdList = [];
            this.nowOperateTypeList = [];
            this.multipleSelection = [];
          }
        })
        .catch(err => {
          this.loading = false;
          this.$message.error("网络异常，请重试！！");
        });
    },
    handleOperateYes2() {
      this.loading = true;
      this.loadingText = "操作中，请稍后！！！";
      axios
        .post("/banksys/accdoubtful/operatewarningreason.do", {
          warningIdList: this.warningIdList,
          nowOperateTypeList: this.nowOperateTypeList,
          operateType: this.operateType,
          operateReason: this.operateForm.operateReason
        })
        .then(res => {
          this.loading = false;
          this.dialogOperateVisible2 = false;
          if (res.data.code === "1001") {
            this.$message.success(res.data.msg);
            this.getDetailDate();
            this.getDetailDate2();
            this.warningIdList = [];
            this.nowOperateTypeList = [];
            this.multipleSelection2 = [];
            this.operateForm2.operateReason = "";
          } else {
            this.$message.error(res.data.msg);
            this.warningIdList = [];
            this.nowOperateTypeList = [];
            this.multipleSelection2 = [];
          }
        })
        .catch(err => {
          this.loading = false;
          this.$message.error("网络异常，请重试！！");
        });
    },
    handleClickRow(selection, row) {
      this.multipleSelection = selection;
    },
    handleClickAllRow(selection) {
      this.multipleSelection = selection;
    },
    handleChangeCheck(selection) {
      this.multipleSelection = selection;
    },
    handleClickRow2(selection, row) {
      this.multipleSelection2 = selection;
    },
    handleClickAllRow2(selection) {
      this.multipleSelection2 = selection;
    },
    handleChangeCheck2(selection) {
      this.multipleSelection2 = selection;
    },
    // 新增
    handleShowBox() {
      this.dialogFormVisible = true;
    },
    handleNo(formName) {
      this.dialogFormVisible = false;
      this.$refs[formName].resetFields();
    },
    handleYes() {
      this.dialogFormVisible = false;
      this.$axios
        .post("/banksys/accdoubtful/operatewarningreason.do", {
          warningReason: this.AddForm.warningReason,
          warningDetails: this.AddForm.warningDetails,
          operateType: "1",
          accountId: this.commonId
        })
        .then(res => {
          if (res.data.code == "1001") {
            this.$message.success(res.data.msg);
            this.AddForm.warningReason = "";
            this.AddForm.warningDetails = "";
            this.getDetailDate();
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch(err => {
          this.$message.error("网络异常，请重试！！！");
        });
    },
    // 删除
    handleDelete() {
      let deleteDate = this.multipleSelection;
      for (let i in deleteDate) {
        this.warningIdList.push(deleteDate[i].warningId);
        this.nowOperateTypeList.push(deleteDate[i].operateType);
      }
      if (this.warningIdList.length === 0) {
        this.$message.error("请选中要删除的项！！！");
        return;
      }
      this.dialogOperateVisible = true;
      this.operateType = "4";
    },
    handleDelete2() {
      let deleteDate = this.multipleSelection2;
      for (let i in deleteDate) {
        this.warningIdList.push(deleteDate[i].warningId);
        this.nowOperateTypeList.push(deleteDate[i].operateType);
      }
      if (this.warningIdList.length === 0) {
        this.$message.error("请选中要删除的项！！！");
        return;
      }
      this.dialogOperateVisible2 = true;
      this.operateType = "4";
    },
    // 移出
    handleRemove() {
      let RemoveDate = this.multipleSelection;
      for (let i in RemoveDate) {
        this.warningIdList.push(RemoveDate[i].warningId);
        this.nowOperateTypeList.push(RemoveDate[i].operateType);
      }
      if (this.warningIdList.length === 0) {
        this.$message.error("请选中要移出的项！！！");
        return;
      }
      this.dialogOperateVisible = true;
      this.operateType = "3";
    },
    // 移入
    handleMoveIn() {
      let MoveInDate = this.multipleSelection2;
      for (let i in MoveInDate) {
        this.warningIdList.push(MoveInDate[i].warningId);
        this.nowOperateTypeList.push(MoveInDate[i].operateType);
      }
      if (this.warningIdList.length === 0) {
        this.$message.error("请选中要移入的项！！！");
        return;
      }
      this.dialogOperateVisible2 = true;
      this.operateType = "2";
    },
    backtrack() {
      this.$router.push({ path: "/General" });
    },
    getDetailDate() {
      let para = {
        accountId: this.commonId,
        delCode: "0",
        operateType: "",
        outCode: "0"
      };
      axios({
        method: "post",
        url: "/banksys/accdoubtful/querydoubtfulcommondetail.do",
        data: para
      })
        .then(res => {
          console.log(res);
          this.tableData = res.data.warningReasonList;
        })
        .catch(err => {
          this.$message.error("网络异常，请重试！！！");
        });
    },
    getDetailDate2() {
      let para = {
        accountId: this.commonId,
        delCode: "0",
        operateType: "3"
      };
      axios({
        method: "post",
        url: "/banksys/accdoubtful/querydoubtfulcommondetail.do",
        data: para
      })
        .then(res => {
          this.tableData2 = res.data.warningReasonList;
        })
        .catch(err => {
          this.$message.error("网络异常，请重试！！！");
        });
    }
  }
};
</script>
<style scoped>
/* .el-textarea__inner{
  height:150px !important;
} */
.v_add {
  width: 560px;
  margin: 0 auto;

  height: auto;
}
.v_add p {
  text-align: center;
  margin: 20px 0;
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
.inline-box{
  display: inline-block;
  margin-bottom:10px;
  font-size: 15px;
  font-weight: 700;
}
.show-box{
  margin: 10px 0;
}
</style>