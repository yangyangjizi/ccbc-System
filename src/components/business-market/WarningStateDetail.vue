<template>
  <section v-loading="loading" :element-loading-text="loadingText">
    <el-col :span="24" class="toolbar" v-if="!loading">
      <el-table
        :data="tableData"
        border
        style="width: 100%;"
        :header-cell-style="styleObj"
        highlight-current-row
      >
        <!-- <el-table-column type="selection" width="55" align="center"></el-table-column> -->
        <el-table-column prop="number" label="序号" align="center" width="55"></el-table-column>
        <el-table-column prop="warningReason" label="预警原因" show-overflow-tooltip align="center"></el-table-column>
        <el-table-column label="预警详情" align="center" prop="warningDetails" show-overflow-tooltip>
          <template slot-scope="scope">{{scope.row.warningDetails}}</template>
        </el-table-column>
      </el-table>
    </el-col>
  </section>
</template>
<script>
export default {
  data() {
    return {
      loading: "",
      loadingText: "拼命加载中",
      tableData: [],
      styleObj: {
        background: "#eef1f6",
        "border-color": "#dbdbdb",
        "text-align": "center"
      }
    };
  },
  created() {
    this.getTableData();
  },
  methods: {
    getTableData() {
      this.$axios
        .post("/banksys/accdoubtful/marketskipdoudetails.do", {
          dataType: this.$route.query.dataType,
          yewId: this.$route.query.yewId
        })
        .then(res => {
          console.log(res);
          this.tableData = res.data.data;
        })
        .catch(err => {
          this.$message.error("网络异常，请重试！！！");
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