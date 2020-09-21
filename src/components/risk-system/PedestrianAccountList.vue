<template>
  <section v-loading="loading" :element-loading-text="loadingText">
    <!--工具条-->
    <el-col :span="24" class="toolbar" v-if="!loading">
      <el-form class="margin-box" :inline="true" :model="filters">
        <el-row>
          <el-form-item label="账户性质:">
            <el-select v-model="filters.dataNames" multiple collapse-tags placeholder="请选择账户性质">
              <el-option
                v-for="item in filters.dataNameList"
                :key="item.level"
                :label="item.dataName"
                :value="item.level"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="开户日期:">
            <el-date-picker
              v-model="filters.openAccTime"
              type="date"
              placeholder="选择日期"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-form-item>

          <el-form-item label="销户日期:">
            <el-date-picker
              v-model="filters.closAccTime"
              type="date"
              placeholder="选择日期"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-form-item>

          <el-form-item label="账号:">
            <el-input v-model="filters.accNumber" class="input-box7" placeholder="请输入账号"></el-input>
          </el-form-item>

          <el-form-item label="存款人名称:">
            <el-input v-model="filters.depositorName" class="input-box7" placeholder="请输入存款人名称"></el-input>
          </el-form-item>
          <el-form-item label="账户名称:">
            <el-input v-model="filters.accName" class="input-box7" placeholder="请输入账户名称"></el-input>
          </el-form-item>
          <el-form-item label="注册地址代码:">
            <el-input v-model="filters.regAreaCode" class="input-box7" placeholder="请输入注册地址代码"></el-input>
          </el-form-item>

          <el-form-item label="开户许可证核准号:">
            <el-input v-model="filters.openAccNumber" class="input-box7" placeholder="请输入开户许可证核准号"></el-input>
          </el-form-item>

          <el-form-item label="添加时间:">
            <el-date-picker
              v-model="filters.addTime"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </el-form-item>

          <el-form-item label="银行名称:">
            <el-cascader
              placeholder="请输入银行名称"
              :options="filters.options"
              :props="filters.defaultData"
              @change="handleChangeCode"
              collapse-tags
              class="input-box6"
            ></el-cascader>
          </el-form-item>

          <el-form-item>
            <el-button type="warning" v-on:click="getUsers" v-hasPermission="'popAccQuery'">查询</el-button>
            <el-button type="primary" v-on:click="handleClear" v-hasPermission="'popAccReset'">重置</el-button>
          </el-form-item>

          <el-col :span="6"></el-col>
        </el-row>
      </el-form>
      <div class="margin-box">
        <el-button type="primary" @click="handleOutDate" v-hasPermission="'popAccExport'">导出</el-button>

        <el-button type="danger" @click="handleDelete" v-hasPermission="'popAccDel'">删除</el-button>
        <el-upload
          action
          :limit="1"
          accept=".xlsx, .xls"
          :show-file-list="false"
          :http-request="uploadFile"
          :file-list="fileList"
          :before-upload="beforeExcelUpload"
          class="upload-box"
        >
          <el-button type="info" v-hasPermission="'expectPeopleAcc'">存款人导入</el-button>
        </el-upload>
        <el-button
          class="check-button"
          style="float:right"
          @click="downFile('peopleAccTemplate')"
          v-hasPermission="'downPeopleAccTem'"
        >下载存款人导入模板</el-button>
        <el-badge :value="this.shouldDate" class="item">
          <el-button size="small" v-hasPermission="'popAccSLead'">应导入</el-button>
        </el-badge>
        <el-badge :value="this.actualDate" class="item">
          <el-button size="small" @click="handlePutIn" v-hasPermission="'popAccELead'">已导入</el-button>
        </el-badge>
        <el-badge :value="this.notDate" class="item">
          <el-button size="small" @click="handleNoPutIn" v-hasPermission="'popAccNLead'">未导入</el-button>
        </el-badge>
      </div>
      <!-- 已导入文件情况弹框 -->
      <el-dialog title="已导入机构" :visible.sync="toDialogVisible" width="30%">
        <ul class="hidden_box">
          <li
            v-for="(toOne,index) in toLeadUnitList"
            :key="index"
            class="li-border"
          >{{index+1}}：{{toOne}}</li>
        </ul>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="toDialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 未导入文件情况弹框 -->
      <el-dialog title="未导入机构" :visible.sync="noDialogVisible" width="30%">
        <ul class="hidden_box">
          <li
            v-for="(toOne,index) in noToLeadUnitList"
            :key="index"
            class="li-border"
          >{{index+1}}：{{toOne}}</li>
        </ul>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="noDialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>
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
        <el-table-column prop="number" label="序号" align="center" width="55">
          <template slot-scope="scope">{{scope.row.number}}</template>
        </el-table-column>
        <el-table-column prop="accNumber" label="账号" show-overflow-tooltip align="center"></el-table-column>
        <el-table-column prop="unitCode" label="银行机构代码" show-overflow-tooltip align="center"></el-table-column>
        <el-table-column prop="unitName" label="银行机构名称" show-overflow-tooltip align="center"></el-table-column>
        <el-table-column prop="depositorName" label="存款人名称" show-overflow-tooltip align="center"></el-table-column>
        <el-table-column prop="regAreaCode" label="注册地区代码" show-overflow-tooltip align="center"></el-table-column>
        <el-table-column prop="accName" label="账户名称" show-overflow-tooltip align="center"></el-table-column>
        <el-table-column prop="accType" label="账户性质" show-overflow-tooltip align="center"></el-table-column>
        <el-table-column prop="openAccNumber" label="开户许可证核准号" show-overflow-tooltip align="center"></el-table-column>
        <el-table-column prop="openAccTime" label="开户日期" show-overflow-tooltip align="center"></el-table-column>
        <el-table-column prop="closAccTime" label="销户日期" show-overflow-tooltip align="center"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="small"
              v-hasPermission="'popAccDetail'"
              @click="handleDetail(scope.row.depositorId)"
              class="submit_color"
            >详情</el-button>
          </template>
        </el-table-column>
      </el-table>
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
  data() {
    return {
      toDialogVisible: false,
      noDialogVisible: false,
      toLeadUnitList: [],
      noToLeadUnitList: [],
      loading: "",
      unitRank: "",
      loadingText: "拼命加载中",
      shouldDate: "",
      actualDate: "",
      notDate: "",
      filters: {
        addTime: "",
        accNumber: "",
        openAccTime: "",
        closAccTime: "",
        depositorName: "",
        regAreaCode: "",
        openAccNumber: "",
        accName: "",
        options: [],
        dataNames: [],
        dataNameList: [],
        checkCode: "",
        defaultData: {
          //联级选择
          multiple: true,
          value: "unitCode",
          label: "unitName",
          children: "children"
        }
      },
      multipleSelection: [],
      checkId: [],
      fileList: [],
      fullscreenNewLoading: false,
      dialogDistributionState: false,
      tableData: [],
      total: 0,
      pageSize: 10,
      page: 1,
      listLoading: false,
      styleObj: {
        background: "#eef1f6",
        "border-color": "#dbdbdb",
        "text-align": "center"
      }
    };
  },
  created() {},
  mounted() {
    this.getUsers();
    this.getBankList();
    this.getProductData();
  },
  methods: {
    handlePutIn() {
      this.toDialogVisible = true;
    },
    handleNoPutIn() {
      this.noDialogVisible = true;
    },
    //导出功能
    handleOutDate() {
      this.loading = true;
      this.loadingText = "导出中，请稍后！！！";
      let req = {};
      for (var i = 0; i < this.multipleSelection.length; i++) {
        var depositorId = this.multipleSelection[i].depositorId;
        this.checkId.push(depositorId);
      }
      req = {
        depositorIdList: this.checkId,
        addTime: this.filters.addTime,
        depositorName: this.filters.depositorName,
        regAreaCode: this.filters.regAreaCode,
        openAccNumber: this.filters.openAccNumber,
        accName: this.filters.accName,
        accNumber: this.filters.accNumber,
        openAccTime: this.filters.openAccTime,
        closAccTime: this.filters.closAccTime,
        accTypeList: this.filters.dataNames,
        unitCodes: this.filters.checkCode
      };
      axios({
        method: "post",
        data: req,
        url: "/banksys/peopleacc/exportdepositordata.do",
        responseType: "blob",
        headers: {
          "Content-Type": "application/json; application/octet-stream"
        }
      })
        .then(res => {
          this.loading = false;
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
        })
        .catch(err => {
          console.log(err);
        });
    },
    //删除功能
    handleDelete() {
      let req = {};
      if (this.multipleSelection.length == "0") {
        this.$message.error("请选中所要删除项！");
        return;
      }
      for (var i = 0; i < this.multipleSelection.length; i++) {
        var depositorId = this.multipleSelection[i].depositorId;
        this.checkId.push(depositorId);
      }
      req = {
        depositorIdList: this.checkId,
        addTime: this.filters.addTime,
        depositorName: this.filters.depositorName,
        regAreaCode: this.filters.regAreaCode,
        openAccNumber: this.filters.openAccNumber,
        accName: this.filters.accName,
        accNumber: this.filters.accNumber,
        openAccTime: this.filters.openAccTime,
        closAccTime: this.filters.closAccTime,
        accTypeList: this.filters.dataNames,
        unitCodes: this.filters.checkCode
      };
      axios({
        method: "post",
        data: req,
        url: "/banksys/peopleacc/deldepositordata.do"
      })
        .then(res => {
          if (res.data.code == "1001") {
            this.$message.success(res.data.msg);
            this.getUsers();
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 获取点击的行
    handleClickRow(selection, row) {
      this.multipleSelection = selection;
    },
    handleClickAllRow(selection) {
      this.multipleSelection = selection;
    },
    // 获取账户性质
    getProductData() {
      axios({
        method: "post",
        url: "/banksys/peopleacc/querydatalistbyfield.do",
        data: { field: "ACC_TYPE" }
      })
        .then(res => {
          this.filters.dataNameList = res.data.data;
        })
        .catch(err => {
          this.$message.error("网络异常，请重试！！");
        });
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
    //存款人导入功能
    uploadFile(ele) {
      this.loading = true;
      this.loadingText = "导入中，请稍后！！！";
      const fd = new FormData();
      fd.append("file", ele.file);
      fd.append("fileCode", "0");
      axios({
        method: "post",
        data: fd,
        url: "/banksys/peopleacc/receivedepositordata.do",
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
        .then(res => {
          if (res.data.code == "1001") {
            this.loading = false;
            this.$message.success(res.data.msg);
            this.reload();
          } else if (res.data.code === "1007") {
            this.$confirm("此操作将覆盖当日文件, 是否继续?", "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning"
            })
              .then(() => {
                fd.set("fileCode", "1");
                this.loading = true;
                this.loadingText = "导入中，请稍后！！！";
                axios({
                  method: "post",
                  data: fd,
                  url: "/banksys/peopleacc/receivedepositordata.do",
                  headers: {
                    "Content-Type": "multipart/form-data"
                  }
                })
                  .then(res => {
                    this.loading = false;
                    if (res.data.code == "1001") {
                      this.$message.success(res.data.msg);
                      this.reload();
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
                this.$message({
                  type: "info",
                  message: "已取消覆盖"
                });
                this.reload();
              });
          } else {
            this.$message.error(res.data.msg);
            this.reload();
          }
        })
        .catch(err => {
          this.$message.error("网络异常！请重试！！！");
        });
    },
    handleChangeCode(e, form, thsAreaCode) {
      this.filters.checkCode = e;
    },
    // 获取银行名称列表
    getBankList() {
      axios
        .post("/banksys/system/common/queryunitcode.do", {
          returnType: "tree",
          tableType: "0"
        })
        .then(res => {
          this.filters.options = res.data.list;
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleDetail(id) {
      this.$router.push({
        path: "/PedestrianAccountDetail",
        query: { depositorId: id }
      });
    },
    handleCurrentChange(val) {
      this.page = val;
      this.getUsers();
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getUsers();
    },
    //获取用户列表
    getUsers() {
      let para = {
        addTime: this.filters.addTime,
        depositorName: this.filters.depositorName,
        regAreaCode: this.filters.regAreaCode,
        openAccNumber: this.filters.openAccNumber,
        accName: this.filters.accName,
        accNumber: this.filters.accNumber,
        openAccTime: this.filters.openAccTime,
        closAccTime: this.filters.closAccTime,
        accTypeList: this.filters.dataNames,
        unitCodes: this.filters.checkCode,
        pagenum: this.page,
        rows: this.pageSize
      };
      this.listLoading = true;
      axios({
        method: "post",
        url: "/banksys/peopleacc/querydepositordatalist.do",
        data: para
      })
        .then(res => {
          this.unitRank = res.data.unitRank;
          if (res.data.code === "1001") {
            this.$message.success(res.data.msg);
            this.total = res.data.data.total;
            this.tableData = res.data.data.list;
            this.listLoading = false;
            this.shouldDate = res.data.countMap.unitCount;
            this.notDate = res.data.countMap.noToLeadUnitCount;
            this.actualDate = res.data.countMap.toLeadUnitCount;
            this.toLeadUnitList = res.data.countMap.toLeadUnitList;
            this.noToLeadUnitList = res.data.countMap.noToLeadUnitList;
          } else {
            this.$message.error(res.data.msg);
            this.listLoading = false;
          }
        })
        .catch(err => {
          this.$message.error("网络异常，请重试！！！");
        });
    },
    // 重置
    handleClear() {
      (this.filters.addTime = ""),
        (this.filters.depositorName = ""),
        (this.filters.regAreaCode = ""),
        (this.filters.openAccNumber = ""),
        (this.filters.accName = ""),
        (this.filters.accNumber = ""),
        (this.filters.openAccTime = ""),
        (this.filters.closAccTime = ""),
        (this.filters.dataNames = []),
        (this.filters.checkCode = "");
    }
  }
};
</script>
<style scoped>
.li-border {
  margin-bottom: 5px;
  padding-bottom: 5px;
  border-bottom: 1px solid #0d79ea;
}
.hidden_box {
  height: 300px !important;
  overflow: auto !important;
}
.item {
  margin-right: 30px;
  margin-left: 10px;
}
.el-form-item {
  margin-bottom: 10px;
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
.el-form-item {
  margin-right: 15px;
}
.upload-box {
  margin-left: 11px;
  display: inline;
}
.check-button {
  color: #fff;
  background-color: #eb42e2;
  float: right;
}
.check-button:hover {
  opacity: 0.7;
}
</style>