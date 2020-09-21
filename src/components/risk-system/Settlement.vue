<template>
  <section v-loading="loading" :element-loading-text="loadingText">
    <el-col :span="24" class="toolbar" v-if="!loading">
      <el-form ref="epireadyRef" :inline="true" :model="filters" style="overflow: hidden;">
        <el-form-item label="支行名称" prop="subName">
          <el-input v-model="filters.subName" placeholder="请输入支行名称" class="input-box7"></el-input>
        </el-form-item>
        <el-form-item label="开户银行名称" prop="openBankName">
          <el-input v-model="filters.openBankName" placeholder="请输入开户银行名称" class="input-box7"></el-input>
        </el-form-item>
        <el-form-item label="存款人名称" prop="depositorName">
          <el-input v-model="filters.depositorName" placeholder="请输入存款人名称" class="input-box7"></el-input>
        </el-form-item>
        <el-form-item label="法人身份证号" prop="legalCard">
          <el-input v-model="filters.legalCard" placeholder="请输入法人身份证号" class="input-box7"></el-input>
        </el-form-item>
        <el-form-item label="法人名称" prop="legalName">
          <el-input v-model="filters.legalName" placeholder="请输入法人名称" class="input-box7"></el-input>
        </el-form-item>
        <el-form-item label="显示项" class="appear-box" prop="tableNameList">
          <el-select v-model="filters.tableNameList" multiple collapse-tags placeholder="请选择显示项">
            <el-option
              v-for="item in checkListObj"
              :key="item.key"
              :label="item.label"
              :value="item.key"
            ></el-option>
          </el-select>
        </el-form-item>
        <div class="query">
          <el-button type="warning" v-on:click="getUsers" v-hasPermission="'warningBySetQuery'">查询</el-button>
          <el-button type="primary" v-on:click="resetData" v-hasPermission="'warningBySetReset'">重置</el-button>
        </div>
      </el-form>
      <!--列表-->
      <el-col class="margin-box" v-if="ifShowCode === 0">
        <el-button type="primary" @click="handleClick" v-hasPermission="'warningBySetLead'">导入</el-button>
        <el-button type="success" @click="handleOutClick" v-hasPermission="'warningBySetExp'">导出</el-button>
        <div style="float:right" v-if="ifShowCode === 0">
          <el-button
            type="danger"
            @click="downFile('warningTemplate')"
            v-hasPermission="'warningBySetDown'"
          >下载导入模版</el-button>
        </div>
      </el-col>

      <el-table
        :data="tableData"
        v-loading="listLoading"
        border
        style="width: 100%;"
        :header-cell-style="styleObj"
        highlight-current-row
        @select="handleClickRow"
        @select-all="handleClickAllRow"
      >
        <el-table-column
          type="selection"
          width="55"
          align="center"
          v-if="this.tableNameList.length !==0"
        ></el-table-column>
        <el-table-column
          v-for="info in tableNameList"
          :key="info.key"
          :property="info.key"
          :label="info.label"
          align="center"
        >
          <template slot-scope="scope">{{scope.row[scope.column.property]}}</template>
        </el-table-column>
        <el-table-column label="操作" align="center" v-if="this.tableNameList.length !==0">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="small"
              @click="handleDetail(scope.row.doubtfulAccId)"
              class="submit_color"
            >详情</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 导入弹框 -->
      <el-dialog
        :visible.sync="dialogDistributionState"
        @close="handleClose"
        title="导入时间"
        width="30%"
        center
      >
        <el-form :model="distributionForm" label-width="80px" class="el-form-box">
          <el-form-item label="所属部门:">
            <el-select v-model="distributionForm.value" placeholder="请选择">
              <el-option
                v-for="item in distributionForm.selectDeptList"
                :key="item.value"
                :label="item.label"
                :value="item.label"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <el-upload
          action
          :limit="1"
          accept=".xlsx, .xls"
          :show-file-list="false"
          :http-request="uploadFile"
          :file-list="fileList"
          :before-upload="beforeExcelUpload"
        >
          <el-button type="success">导入</el-button>
        </el-upload>
      </el-dialog>
      <!--页码-->

      <el-pagination
        v-if="this.tableNameList.length !==0"
        layout="total, sizes, prev, pager, next, jumper"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
        :current-page.sync="page"
        :page-sizes="[10, 15, 20, 30]"
        :page-size="pageSize"
        :total="total"
        background
      ></el-pagination>
    </el-col>
  </section>
</template>

<script>
import axios from "axios";
export default {
  inject: ["reload"],
  name: "",
  data() {
    return {
      loading: "",
      loadingText: "拼命加载中",
      ifShowCode: "",
      filters: {
        subName: "",
        openBankName: "",
        depositorName: "",
        legalName: "",
        legalCard: "",
        tableNameList: []
      },
      checkListObj: [
        {
          key: "all",
          label: "全部"
        },
        {
          key: "subName",
          label: "支行名称"
        },
        {
          key: "openBankName",
          label: "开户银行名称"
        },
        {
          key: "depositorName",
          label: "存款人名称"
        },
        {
          key: "legalCard",
          label: "法人身份证号"
        },
        {
          key: "legalName  ",
          label: "法人名称"
        }
      ],
      distributionForm: {
        value: "结算部",
        selectDeptList: [
          {
            value: "1",
            label: "结算部"
          }
        ]
      },

      fileList: [],
      tableData: [],
      tableNameList: [],
      total: 0,
      page: 1,
      pageSize: 10,
      listLoading: false,
      dialogDistributionState: false,
      multipleSelection: [],
      checkId: [],
      styleObj: {
        background: "#eef1f6",
        "border-color": "#dbdbdb",
        "text-align": "center"
      }
    };
  },
  created() {
    this.getUsers();
  },
  mounted() {},
  methods: {
    // 导出功能
    handleOutClick() {
      this.loading = true;
      this.loadingText = "导出中，请稍后！！！";
      let req = {};
      for (var i = 0; i < this.multipleSelection.length; i++) {
        var doubtfulAccId = this.multipleSelection[i].doubtfulAccId;
        this.checkId.push(doubtfulAccId);
      }
      req = {
        dataType: "0",
        doubtfulAccIdList: this.checkId,
        subName: this.filters.subName,
        openBankName: this.filters.openBankName,
        depositorName: this.filters.depositorName,
        legalName: this.filters.legalName,
        legalCard: this.filters.legalCard
      };
      axios({
        method: "post",
        data: req,
        url: "/banksys/accdoubtful/exportdoubtfuldata.do",
        responseType: "blob",
        headers: {
          "Content-Type": "application/json; application/octet-stream"
        }
      })
        .then(res => {
          const type = "application/zip";
          const blob = new Blob([res.data], { type: type });
          const downloadElement = document.createElement("a");
          const href = window.URL.createObjectURL(blob);
          const name = decodeURI(
            res.headers["content-disposition"].split("=")[1]
          );
          downloadElement.href = href;
          downloadElement.download = name;
          document.body.appendChild(downloadElement);
          downloadElement.click();
          document.body.removeChild(downloadElement);
          window.URL.revokeObjectURL(href);
          this.checkId = [];
          this.loading = false;
        })
        .catch(err => {
          this.checkId = [];
          this.loading = false;
          console.log(err);
        });
    },
    //导入选择时间弹框关闭
    handleClose() {
      this.distributionForm.statisticsTime = "";
      this.fileList = [];
      this.handleDisabled = !this.handleDisabled;
    },
    handleClick() {
      this.dialogDistributionState = true;
    },
    //下载模板功能
    downFile(code) {
      this.loading = true;
      this.loadingText = "下载中，请稍后！！！";
      let req;
      req = {
        templateName: code
      };
      axios({
        method: "post",
        data: req,
        url: "/banksys/acccontrast/downloadexporttemplate.do",
        responseType: "blob",
        headers: {
          "Content-Type": "application/json; application/octet-stream"
        }
      })
        .then(res => {
          const type = "application/zip";
          const blob = new Blob([res.data], { type: type });
          const downloadElement = document.createElement("a");
          const href = window.URL.createObjectURL(blob);
          const name = decodeURI(
            res.headers["content-disposition"].split("=")[1]
          );
          downloadElement.href = href;
          downloadElement.download = name;
          document.body.appendChild(downloadElement);
          downloadElement.click();
          document.body.removeChild(downloadElement);
          window.URL.revokeObjectURL(href);
          this.loading = false;
        })
        .catch(err => {
          this.loading = false;
          this.$messgae.error("网络异常，请稍后重试！！！");
        });
    },
    // 上传文件之前的钩子,上传前对文件的大小和类型进行判断
    beforeExcelUpload(file) {
      const isExcel =
        file.name.split(".")[1] === "xlsx" || file.name.split(".")[1] === "xls";
      if (!isExcel) {
        this.$message({
          message: "只能上传xls或xlsx文件!",
          type: "error"
        });
      }
      return isExcel;
    },
    //导入功能
    uploadFile(ele) {
      this.dialogDistributionState = false;
      this.loading = true;
      this.loadingText = "导入中，请稍后！！！";
      const fd = new FormData();
      fd.append("file", ele.file);
      fd.append("selectDept", this.distributionForm.value);
      axios({
        method: "post",
        data: fd,
        url: "/banksys/accdoubtful/recdoubtfuldata.do",
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
        .then(res => {
          this.loading = false;
          if (res.data.code == "1001") {
            this.$message.success(res.data.msg);
            this.reload();
          } else if (res.data.code === "1007") {
            this.$confirm("此操作将覆盖当日文件, 是否继续?", "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning"
            })
              .then(() => {
                this.loading = true;
                this.loadingText = "导入中，请稍后！！！";
                fd.set("fileCode", "1");
                axios({
                  method: "post",
                  data: fd,
                  url: "/banksys/accdoubtful/recdoubtfuldata.do",
                  headers: {
                    "Content-Type": "multipart/form-data"
                  }
                })
                  .then(res => {
                    this.loading = false;
                    if (res.data.code == "1001") {
                      this.$message.success(res.data.msg);
                      // this.reload();
                      this.getUsers();
                      fd.set("fileCode", "");
                    } else {
                      this.$message.error(res.data.msg);
                      fd.set("fileCode", "");
                    }
                  })
                  .catch(err => {
                    this.loading = false;
                    console.log(err);
                  });
              })
              .catch(() => {
                this.loading = false;
                this.$message({
                  type: "info",
                  message: "已取消覆盖"
                });
              });
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch(err => {
          this.loading = false;
          this.$message.error("网络异常，请重试！！！");
        });
    },
    handleCheck() {
      this.getUsers();
    },

    // 获取点击的行
    handleClickRow(selection, row) {
      this.multipleSelection = selection;
    },
    handleClickAllRow(selection) {
      this.multipleSelection = selection;
    },
    //重置查询条件
    resetData() {
      this.$refs.epireadyRef.resetFields();
    },
    //获取用户列表
    getUsers() {
      let para = {
        subName: this.filters.subName,
        openBankName: this.filters.openBankName,
        depositorName: this.filters.depositorName,
        legalName: this.filters.legalName,
        legalCard: this.filters.legalCard,
        tableNameList: this.filters.tableNameList,
        pagenum: this.page,
        rows: this.pageSize
      };
      this.listLoading = true;
      axios({
        method: "post",
        url: "/banksys/accdoubtful/querydoubtfuldatalist.do",
        data: para
      })
        .then(res => {
          if (res.data.code === "1001") {
            this.$message.success(res.data.msg);
            this.total = res.data.data.total;
            this.tableData = res.data.data.list;
            this.tableNameList = res.data.tableNameList;
            this.ifShowCode = res.data.unitRank;
            this.listLoading = false;
          } else {
            this.$message.error(res.data.msg);
            this.listLoading = false;
          }
        })
        .catch(err => {
          this.$message.error("网络异常，请重试！！！");
        });
    },
    // 详情
    handleDetail(id) {
      this.$router.push({
        path: "/SettlementDetail",
        query: { doubtfulAccId: id }
      });
    },
    handleCurrentChange(val) {
      this.page = val;
      this.getUsers();
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getUsers();
    }
  }
};
</script>

<style  scoped>
.el-table td,
.el-table th.is-leaf,
.el-table--border,
.el-table--group {
  border-color: #dbdbdb;
}
.el-table--border::after,
.el-table--group::after,
.el-table::before {
  background-color: #dbdbdb;
}
.el-form-item__label {
  width: 124px !important;
  font-size: 12px !important;
}
.el-form-item {
  float: left;
}
.submit_color {
  background-color: #858ffd;
  border-color: #858ffd;
}
.submit_color:hover {
  background-color: #a6acef;
  border-color: #a6acef;
}
.appear-box {
  margin-left: 14px;
}
</style>
