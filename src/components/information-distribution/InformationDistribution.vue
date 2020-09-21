<template>
  <section v-loading="loading" :element-loading-text="loadingText">
    <!--工具条-->
    <el-col :span="24" class="toolbar" v-if="!loading">
      <el-form :inline="true" :model="filters" class="clearfix">
        <el-form-item>
          <div class="block">
            <span class="demonstration">添加时间</span>
            <el-date-picker
              v-model="filters.addTime"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </div>
          <el-button type="warning" v-on:click="getTableList" v-hasPermission="'inforDisQuery'">查询</el-button>
        </el-form-item>
      </el-form>
      <div class="margin-box">
        <el-dropdown>
          <el-button type="success" v-hasPermission="'inforDisLead'">
            导入
            <i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <el-upload
                ref="upload"
                action
                :limit="1"
                accept=".xlsx, .xls"
                :show-file-list="false"
                :http-request="uploadFile1"
                :before-upload="beforeExcelUpload"
              >新增</el-upload>
            </el-dropdown-item>
            <el-dropdown-item>
              <el-upload
                ref="upload"
                action
                :limit="1"
                accept=".xlsx, .xls"
                :show-file-list="false"
                :http-request="uploadFile2"
                :before-upload="beforeExcelUpload"
              >覆盖</el-upload>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-button
          type="primary"
          @click="handleOutImport"
          class="btn-box"
          v-hasPermission="'inforDisExport'"
        >导出</el-button>
        <el-button type="info" @click="handleDistribution" v-hasPermission="'inforDisDis'">手动分发</el-button>
        <el-button
          type="warning"
          @click="handleAutoDistribution"
          class="margin-box"
          v-hasPermission="'inforDisDisAuto'"
        >自动分发</el-button>
        <el-button
          type="primary"
          class="submit_color margin-box"
          @click="handleDeleteData"
          v-hasPermission="'inforDisDel'"
        >批量删除</el-button>
        <div style="float:right">
          <el-button
            type="danger"
            @click="downFile('inforDisTemplate')"
            class="margin-box"
            v-hasPermission="'inforDisDown'"
          >下载模版</el-button>
        </div>
      </div>

      <!--列表-->
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
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column prop="number" label="序号" align="center" width="55"></el-table-column>
        <el-table-column prop="subName" label="支行名称" show-overflow-tooltip align="center"></el-table-column>
        <el-table-column prop="subCode" label="支行机构号" show-overflow-tooltip align="center"></el-table-column>
        <el-table-column prop="unitName" label="网点名称" show-overflow-tooltip align="center"></el-table-column>
        <el-table-column prop="unitCode" label="网点机构号" show-overflow-tooltip align="center"></el-table-column>
        <el-table-column prop="inforOne" label="信息1" show-overflow-tooltip align="center"></el-table-column>
        <el-table-column prop="inforTwo" label="信息2" show-overflow-tooltip align="center"></el-table-column>
        <el-table-column prop="nodeName" label="分发进度" show-overflow-tooltip align="center"></el-table-column>
        <el-table-column prop="disStatus" label="分发状态" show-overflow-tooltip align="center"></el-table-column>
        <el-table-column label="操作" align="center" width="300">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="small"
              v-hasPermission="'inforDisDetail'"
              @click="handleDetail(scope.row.inforMainId)"
              class="submit_color"
            >详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 弹出手动分发框 -->
      <el-dialog
        :visible.sync="dialogDistributionState"
        @close="handleClose"
        title="分发"
        width="30%"
        center
      >
        <el-form :model="distributionForm" label-width="80px" class="el-form-box">
          <el-form-item label="分发地址:">
            <el-select
              v-model="distributionForm.distributionAddress"
              size="small"
              class="input-box4"
            >
              <el-option
                v-for="(item,index) in this.distributionForm.distributionAddressList"
                :label="item.unitName"
                :value="item.unitCode"
                :key="index"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="handleYes">确定</el-button>
          <el-button @click="handleNo">取消</el-button>
        </span>
      </el-dialog>
      <!--页码-->
      <el-pagination
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
  name: "InformationDistribution",
  data() {
    return {
      loading: "",
      loadingText: "拼命加载中",
      filters: {
        addTime: ""
      },
      tableData: [],
      multipleSelection: [],
      inforMainIdList: [],
      total: 0,
      page: 1,
      pageSize: 10,
      listLoading: false,
      dialogDistributionState: false,
      distributionForm: {
        distributionAddress: ""
      },
      styleObj: {
        background: "#eef1f6",
        "border-color": "#dbdbdb",
        "text-align": "center"
      }
    };
  },
  created() {
    this.handleDistributionAddress();
  },
  mounted() {
    this.getTableList();
  },
  methods: {
    //批量删除
    handleDeleteData() {
      let deleteUsersData = this.multipleSelection;
      let deleteUsersList = [];
      for (var i in deleteUsersData) {
        deleteUsersList.push(deleteUsersData[i].inforMainId);
      }
      this.$confirm("此操作将删除数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.loading = true;
          this.loadingText = "删除中，请稍后！！！";
          this.$axios
            .post("/banksys/infordis/delInforMainById.do", {
              inforMainIdList: deleteUsersList
            })
            .then(res => {
              this.loading = false;
              this.multipleSelection = [];
              if (res.data.code === "1001") {
                this.$message.success(res.data.msg);
                this.getTableList();
              } else {
                this.$message.error(res.data.msg);
              }
            })
            .catch(err => {
              this.loading = false;
              this.$message.error("网络异常，请重试！！");
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 手动分发
    handleDistribution() {
      for (let i = 0; i < this.multipleSelection.length; i++) {
        var yewId = this.multipleSelection[i].inforMainId;
        this.inforMainIdList.push(yewId);
      }
      this.dialogDistributionState = true;
    },
    // 手动分发地址
    handleDistributionAddress() {
      let prop = {};
      prop = { dataType: "new" };
      axios({
        method: "post",
        url: "/banksys/datadistribute/queryunitcodelist.do",
        data: prop
      })
        .then(res => {
          this.distributionForm.distributionAddressList = res.data.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 确定分发
    handleYes() {
      this.loading = true;
      this.loadingText = "分发中，请稍后！！！";
      let req = {};
      req = {
        inforMainIdList: this.inforMainIdList,
        selectCode: this.distributionForm.distributionAddress
      };
      axios({
        method: "post",
        data: req,
        url: "/banksys/datadistribute/handdodisinforlist.do"
      })
        .then(res => {
          this.loading = false;
          if (res.data.code === "1001") {
            this.$message.success(res.data.msg);
            this.inforMainIdList = [];
            this.getTableList();
            this.dialogDistributionState = false;
            this.listLoading = false;
          } else {
            this.$message.error(res.data.msg);
            this.dialogDistributionState = false;
            this.listLoading = false;
            this.inforMainIdList = [];
          }
        })
        .catch(err => {
          this.loading = false;
          console.log(err);
        });
    },
    // 取消分发
    handleNo() {
      this.dialogDistributionState = false;
      this.inforMainIdList = [];
    },
    // 导出
    handleOutImport() {
      this.loading = true;
      this.loadingText = "导出中，请稍后！！！";
      let sef = this;
      let req = {};
      for (var i = 0; i < this.multipleSelection.length; i++) {
        var taxId = this.multipleSelection[i].inforMainId;
        this.inforMainIdList.push(taxId);
      }
      req = {
        addTime: this.filters.addTime,
        inforMainIdList: this.inforMainIdList
      };
      axios({
        method: "post",
        data: req,
        url: "/banksys/infordis/exportInforList.do",
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
          this.inforMainIdList = [];
          this.loading = false;
        })
        .catch(err => {
          this.loading = false;
          console.log(err);
        });
    },
    // 自动分发处理拿到的各项的inforMainId
    handleAutoDistribution() {
      for (let i = 0; i < this.multipleSelection.length; i++) {
        var taxId = this.multipleSelection[i].inforMainId;
        this.inforMainIdList.push(taxId);
      }
      if (this.inforMainIdList.length === 0) {
        this.$message.error("请选择要分发的数据项！");
        return;
      }
      let prop = {};
      prop = {
        inforMainIdList: this.inforMainIdList
      };
      this.$confirm("是否确定自动分发?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.loading = true;
          this.loadingText = "自动分发中，请稍后！！！";
          this.$axios({
            method: "post",
            url: "/banksys/datadistribute/autodisinforList.do",
            data: prop
          })
            .then(res => {
              this.loading = false;
              if (res.data.code === "1001") {
                this.$message.success(res.data.msg);
                this.inforMainIdList = [];
                this.getTableList();
              } else {
                this.$message.error(res.data.msg);
                this.getTableList();
                this.inforMainIdList = [];
              }
            })
            .catch(err => {
              this.loading = false;
              this.$message.error("网络异常，请重试！！！");
            });
        })
        .catch(() => {
          this.inforMainIdList = [];
          this.$message({
            type: "info",
            message: "已取消自动分发"
          });
        });
    },
    //  手动弹出框关闭的回调
    handleClose() {
      // this.yewIdList = [];
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
    uploadFile1(ele) {
      this.loading = true;
      this.loadingText = "新增中，请稍后！！！";
      const formData = new FormData();
      formData.append("file", ele.file);
      formData.append("fileCode", "0");
      axios({
        method: "post",
        data: formData,
        url: "/banksys/infordis/receiveinfordisdata.do",
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
        .then(res => {
          this.loading = false;
          if (res.data.code == "1001") {
            this.$message.success(res.data.msg);
            this.reload();
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch(err => {
          this.loading = false;
          this.$message.error("网络异常，请重试！！！");
        });
    },
    uploadFile2(ele) {
      this.loading = true;
      this.loadingText = "覆盖中，请稍后！！！";
      const formData = new FormData();
      formData.append("file", ele.file);
      formData.append("fileCode", "1");
      axios({
        method: "post",
        data: formData,
        url: "/banksys/infordis/receiveinfordisdata.do",
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
        .then(res => {
          this.loading = false;
          if (res.data.code == "1001") {
            this.$message.success(res.data.msg);
            this.reload();
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch(err => {
          this.loading = false;
          this.$message.error("网络异常，请重试！！！");
        });
    },

    handleChangeCode(e, form, thsAreaCode) {
      this.filters.checkCode = e;
    },
    handleDetail(id) {
      axios
        .post("/banksys/infordis/queryinfordetails.do", {
          inforMainId: id
        })
        .then(res => {
          this.$router.push({
            path: "/InformationDistributionDetail",
            query: { data: res.data.data, unitRank: res.data.unitRank }
          });
        })
        .catch(err => {
          this.$message.error("网络异常，请重试！！！");
        });
    },
    handleCurrentChange(val) {
      this.page = val;
      this.getTableList();
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getTableList();
    },
    //获取展示数据列表
    getTableList() {
      let para = {
        addTime: this.filters.addTime,
        pagenum: this.page,
        rows: this.pageSize
      };
      this.listLoading = true;
      axios({
        method: "post",
        url: "/banksys/infordis/queryinforlist.do",
        data: para
      })
        .then(res => {
          if (res.data.code === "1001") {
            this.$message.success(res.data.msg);
            this.total = res.data.data.total;
            this.tableData = res.data.data.list;
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
    // 获取点击的行
    handleClickRow(selection, row) {
      this.multipleSelection = selection;
    },
    handleClickAllRow(selection) {
      this.multipleSelection = selection;
    }
  },
  components: {}
};
</script>

<style scoped>
.btn-box {
  margin-left: 10px;
}
.submit_color {
  background-color: #858ffd;
  border-color: #858ffd;
}
.submit_color:hover {
  background-color: #a6acef;
  border-color: #a6acef;
}
.statime {
  margin-right: 20px;
}
</style>
