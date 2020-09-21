<template>
  <section>
    <!--工具条-->
    <el-col :span="24" class="toolbar">
      <div class="list-box2">
        <p>预警详情操作记录表</p>
        <el-table
          :data="tableData2"
          v-loading="listLoading"
          border
          style="width: 100%;"
          :header-cell-style="styleObj"
          highlight-current-row
        >
          <el-table-column prop="number" label="序号" align="center" width="55"></el-table-column>
          <el-table-column label="操作时间" align="center" show-overflow-tooltip prop="operateTime"></el-table-column>
          <el-table-column label="操作类型" align="center" prop="operateTypeName"></el-table-column>
          <el-table-column label="操作原因"  show-overflow-tooltip align="center" prop="operateReason"></el-table-column>
          <el-table-column label="操作人员" align="center" prop="operateName"></el-table-column>
          <el-table-column label="数据来源" align="center" prop="dataSource"></el-table-column>
          <el-table-column prop="warningReason" label="预警原因" align="center" show-overflow-tooltip></el-table-column>
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
                  <el-input
                    type="textarea"
                    :rows="3"
                    placeholder="请输入内容"
                    v-model="scope.row.warningReason"
                  ></el-input>
                </p>
                <p class="show-box">
                  <span class="inline-box">人行账户信息:</span>
                  <el-input
                    type="textarea"
                    :rows="3"
                    placeholder="请输入内容"
                    v-model="scope.row.peopleAccData"
                  ></el-input>
                </p>
                <p class="show-box">
                  <span class="inline-box">新一代信息:</span>
                  <el-input
                    type="textarea"
                    :rows="3"
                    placeholder="请输入内容"
                    v-model="scope.row.newGenData"
                  ></el-input>
                </p>
                <p class="show-box">
                  <span class="inline-box">工商信息:</span>
                  <el-input
                    type="textarea"
                    :rows="3"
                    placeholder="请输入内容"
                    v-model="scope.row.busiData"
                  ></el-input>
                </p>
                <el-button slot="reference" type="info" size="mini" class="submit_color">详情</el-button>
              </el-popover>
              <template v-else>{{scope.row.warningDetails}}</template>
            </template>
          </el-table-column>
        </el-table>
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
      commonId: "",
      detailOperateCategory: "",
      detailOperateTime: "",
      ifShowButton: true,
      ifShowButtonTwo: false,
      listLoading: false,
      tableData2: [],
      styleObj: {
        background: "#eef1f6",
        "border-color": "#dbdbdb",
        "text-align": "center"
      }
    };
  },
  created() {
    this.commonId = this.$route.query.commonId;
    this.detailOperateCategory = this.$route.query.detailOperateCategory;
    this.detailOperateTime = JSON.parse(this.$route.query.detailOperateTime);
    this.getDetailDate2();
  },
  methods: {
    backtrack() {
      this.$router.push({ path: "/WarningCheckSituation" });
    },
    getDetailDate2() {
      let para = {
        accountId: this.commonId,
        detailOperateCategory: this.detailOperateCategory,
        detailOperateTime: this.detailOperateTime,
        statusCode: "3",
        operateType: ""
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
.list-box2 {
  width: 1300px;
  margin: 0 auto;
}
.v_add p,
.list-box2 p {
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
.inline-box {
  display: inline-block;
  margin-bottom: 10px;
  font-size: 15px;
  font-weight: 700;
}
.show-box {
  margin: 10px 0;
}
</style>