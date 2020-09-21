
<template>
  <section v-loading="loading" :element-loading-text="loadingText">
    <!--工具条-->
    <el-col :span="24" class="toolbar" v-if="!loading">
      <el-form ref="epireadyRef" :inline="true" :model="filters">
        <el-row>
          <el-col :sm="6" :md="6" :lg="6" :xl="6">
            <el-form-item label="账户名称" prop="accName" >
              <el-input v-model="filters.accName" placeholder="请输入账户名称" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="6" :md="6" :lg="6" :xl="6">
            <el-form-item label="存款人名称" prop="depositorName" >
              <el-input v-model="filters.depositorName" placeholder="请输入存款人名称" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="6" :md="6" :lg="6" :xl="6">
            <el-form-item label="开户机构代码" prop="openAccUnit" >
              <el-input v-model="filters.openAccUnit" placeholder="请输入开户机构代码" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="6" :md="6" :lg="6" :xl="6">
            <el-form-item label="代表人姓名" title="法定代表人/单位负责人姓名" prop="legalPerName" >
              <el-input v-model="filters.legalPerName" placeholder="请输入法定代表人/单位负责人姓名" class="input-box97"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :sm="6" :md="6" :lg="6" :xl="6">
            <el-form-item label="企业名称" prop="firmName" >
              <el-input v-model="filters.firmName" placeholder="请输入企业名称" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="6" :md="6" :lg="6" :xl="6">
            <el-form-item label="账户有效期" prop="accValTime" >
              <el-input v-model="filters.accValTime" placeholder="请输入账户有效期" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="6" :md="6" :lg="6" :xl="6">
            <el-form-item label="注册资本币种" prop="regiCurrency" >
              <el-input v-model="filters.regiCurrency" placeholder="请输入注册资本币种" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="6" :md="6" :lg="6" :xl="6">
            <el-form-item label="证件有效期" title="法定代表人/单位负责人证件有效期" class="form-item-box1 " prop="legalPerEndDate">
              <el-input v-model="filters.legalPerEndDate" placeholder="请输入法定代表人/单位负责人证件有效期" ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :sm="6" :md="6" :lg="6" :xl="6">
            <el-form-item label="注册资金" prop="regiAmount" >
              <el-input v-model="filters.regiAmount" placeholder="请输入注册资金" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="6" :md="6" :lg="6" :xl="6">
            <el-form-item label="起始日期" prop="operStartDate" title="经营期限起始日期" >
              <el-input v-model="filters.operStartDate" placeholder="请输入经营期限起始日期" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="6" :md="6" :lg="6" :xl="6">
            <el-form-item label="地址" prop="address" >
              <el-input v-model="filters.address" placeholder="请输入地址" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="6" :md="6" :lg="6" :xl="6" >
            <el-form-item label="身份证号码" title="法定代表人/单位负责人身份证号码" prop="legalPerNumber">
              <el-input v-model="filters.legalPerNumber" placeholder="请输入法定代表人/单位负责人身份证号码" ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :sm="6" :md="6" :lg="6" :xl="6">
            <el-form-item label="经营范围" prop="busiScope" > 
              <el-input v-model="filters.busiScope" placeholder="请输入经营范围" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="6" :md="6" :lg="6" :xl="6">
            <el-form-item label="结束日期" prop="operEndDate" title="经营期限结束日期" >
              <el-input v-model="filters.operEndDate" placeholder="请输入经营期限结束日期" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="6" :md="6" :lg="6" :xl="6">
            <el-form-item label="显示项" prop="tableNameList" >
              <el-select
                v-model="filters.tableNameList"
                multiple
                collapse-tags
                placeholder="请选择显示项"
                
              >
                <el-option
                  v-for="item in checkListObj"
                  :key="item.key"
                  :label="item.label"
                  :value="item.key"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :sm="6" :md="6" :lg="6" :xl="6">
            <el-form-item label="统一信用代码" title="统一社会信用代码/营业执照号码" prop="socialCode">
              <el-input v-model="filters.socialCode" placeholder="请输入统一社会信用代码/营业执照号码" ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-form-item class="query">
            <el-button type="warning" v-on:click="getUsers" v-hasPermission="'accInforQuery'">查询</el-button>
            <el-button type="primary" v-on:click="resetData">重置</el-button>
          </el-form-item>
        </el-row>
      </el-form>
      <div class="margin-box99">
        <div v-if="ifShowDistribution" style="float:left">
          <el-dropdown>
            <el-button type="success" v-hasPermission="'accInforLead'">
              导入
              <i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <el-upload
                  action
                  :limit="1"
                  accept=".xlsx, .xls"
                  :show-file-list="false"
                  :http-request="uploadFile"
                  :file-list="fileList"
                  :before-upload="beforeExcelUpload"
                >
                  <span>人行账户信息</span>
                </el-upload>
              </el-dropdown-item>
              <el-dropdown-item>
                <el-upload
                  action
                  :limit="1"
                  accept=".xlsx, .xls"
                  :show-file-list="false"
                  :http-request="uploadNewFile"
                  :file-list="fileNewList"
                  :before-upload="beforeExcelUpload"
                >
                  <span>新一代客户信息</span>
                </el-upload>
              </el-dropdown-item>
              <el-dropdown-item>
                <el-upload
                  action
                  :limit="1"
                  accept=".xlsx, .xls"
                  :show-file-list="false"
                  :http-request="uploadWorkFile"
                  :file-list="fileWorkList"
                  :before-upload="beforeExcelUpload"
                >
                  <span>工商数据</span>
                </el-upload>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <div style="float:left">
          <el-button
            class="handle-distribution"
            type="primary"
            v-on:click="handleDistribution"
            v-hasPermission="'accInforDis'"
          >手动分发</el-button>
          <el-button type="info" v-on:click="handleYearCheck" v-hasPermission="'accInforCheck'">日常检查</el-button>
        </div>
        <div v-if="ifShowDistribution" style="float:right">
          <el-dropdown>
            <el-button type="danger" v-hasPermission="'accInforDown'">
              下载模板
              <i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <span @click="downFile('peopleAccInfoTemplate')">下载人行账户信息模板</span>
              </el-dropdown-item>
              <el-dropdown-item>
                <span @click="downFile('newGenDataTemplate')">下载新一代客户信息模板</span>
              </el-dropdown-item>
              <el-dropdown-item>
                <span @click="downFile('busiDataTemplate')">下载工商数据模板</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
      <!-- 弹出日常检查 -->
      <el-dialog :visible.sync="dialogYearCheck" title="日常检查" width="30%" center>
        <el-form :model="yearCheckForm" :label-width="labelWidth" class="el-form-box">
          <el-form-item label="日常检查数据:">
            <el-select
              v-model="yearCheckForm.yearCheckList"
              multiple
              clearable
              collapse-tags
              size="small"
              class="input-box4"
            >
              <el-option
                v-for="item in this.yearDateCheckList"
                :label="item.label"
                :value="item.value"
                :key="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click.native="handleYesYearCheck">确定</el-button>
          <el-button @click="handleNoYearCheck">取消</el-button>
        </span>
      </el-dialog>

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
          <el-button type="primary" @click.native="handleYes">确定</el-button>
          <el-button @click="handleNo">取消</el-button>
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
        <el-table-column
          type="selection"
          width="55"
          align="center"
          v-if="this.tableNameList.length != 0"
        ></el-table-column>
        <el-table-column
          v-for="info in tableNameList"
          show-overflow-tooltip
          :key="info.key"
          :label="info.label"
          align="center"
        >
          <el-table-column
            show-overflow-tooltip
            v-for="info1 in info.towTableNameList"
            :key="info1.key"
            :property="info1.key"
            :label="info1.label"
            align="center"
          >
            <template slot-scope="scope">{{scope.row[scope.column.property]}}</template>
          </el-table-column>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          align="center"
          v-if="this.tableNameList.length != 0"
          :width="labelWidth"
        >
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="small"
              v-hasPermission="'accInforDetail'"
              @click="handleDetail(scope.row.depositorId,scope.row.depositorName)"
              class="submit_color"
            >详情</el-button>
          </template>
        </el-table-column>
      </el-table>
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
  data() {
    return {
      labelPosition:"right",
      labelWidth: "100px",
      tableNameList: [],
      loading: "",
      loadingText: "拼命加载中",
      checkListObj: [],
      filters: {
        // options: [],
        tableNameList: [],
        depositorName: "",
        openAccUnit: "",
        accName: "",
        accValTime: "",
        legalPerEndDate: "",
        operStartDate: "",
        operEndDate: "",
        legalPerName: "",
        legalPerNumber: "",
        firmName: "",
        regiAmount: "",
        regiCurrency: "",
        busiScope: "",
        address: "",
        socialCode: ""
      },
      distributionForm: {
        distributionAddress: "",
        distributionAddressList: {}
      },
      yearCheckForm: {
        yearCheckList: []
      },
      yearDateCheckList: [
        {
          value: "peopleAccData",
          label: "人行账户信息"
        },
        {
          value: "newGenData",
          label: "新一代客户信息"
        },
        {
          value: "busiData",
          label: "工商数据信息"
        }
      ],
      yewIdList: [],
      multipleSelection: [],
      fileList: [],
      fileNewList: [],
      fileWorkList: [],
      dialogDistributionState: false,
      dialogYearCheck: false,
      ifShowDistribution: false,
      tableData: [],
      total: 0,
      page: 1,
      pageSize: 10,
      listLoading: false,
      styleObj: {
        background: "#eef1f6",
        "border-color": "#dbdbdb",
        "text-align": "center"
      }
    };
  },
  created() {
    this.getCheckList();
  },
  mounted() {
    this.getUsers();
    // this.getBankList();
    this.handleDistributionAddress();
  },
  methods: {
    // 日常检查弹框
    handleYesYearCheck() {
      this.loading = true;
      this.loadingText = "日常检查中，请稍后！！！";
      this.dialogYearCheck = false;
      this.$axios
        .post("/banksys/acccontrast/yearlycheck.do", {
          dataTypeList: this.yearCheckForm.yearCheckList,
          pageType: '5'
        })
        .then(res => {
          this.loading = false;
          if (res.data.code == "1001") {
            this.$message.success(res.data.msg);
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch(err => {
          this.loading = false;
          this.$message.error("网络异常，请重试！！！");
        });
    },
    handleNoYearCheck() {
      this.dialogYearCheck = false;
      this.yearCheckForm.yearCheckList = [];
    },
    //调用条件接口
    getCheckList() {
      this.$axios
        .post("/banksys/accdoubtful/querytablenamelist.do", {
          tableType: "yearly_table_name"
        })
        .then(res => {
          this.checkListObj = res.data.tableNameList;
        })
        .catch(err => {
          this.$message.error("网络异常，请重试！！！");
        });
    },

    //重置查询条件
    resetData() {
      this.$refs.epireadyRef.resetFields();
    },
    // 年检开始
    handleYearCheck() {
      this.dialogYearCheck = true;
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
    // 分发地址获取
    handleDistributionAddress() {
      axios
        .post("/banksys/datadistribute/queryunitandstafflist.do", {})
        .then(res => {
          this.distributionForm.distributionAddressList = res.data.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 分发处理拿到的各项的yewId
    handleDistribution() {
      for (let i = 0; i < this.multipleSelection.length; i++) {
        var yewId = this.multipleSelection[i].newGenId;
        this.yewIdList.push(yewId);
      }
      this.dialogDistributionState = true;
    },
    // 确定分发
    handleYes() {
      this.loading = true;
      this.loadingText = "分发中，请稍后！！！";
      let req = {};
      req = {
        depositorIdList: this.yewIdList,
        selectCode: this.distributionForm.distributionAddress
      };
      axios({
        method: "post",
        data: req,
        url: "/banksys/datadistribute/handdodisyearlydata.do"
      })
        .then(res => {
          this.loading = false;
          if (res.data.code === "1001") {
            this.dialogDistributionState = false;
            this.$message.success(res.data.msg);
            this.yewIdList = [];
            this.getUsers();
          } else {
            this.dialogDistributionState = false;
            this.$message.error(res.data.msg);
            this.yewIdList = [];
          }
        })
        .catch(err => {
          this.loading = false;
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
    // 取消分发
    handleNo() {
      this.dialogDistributionState = false;
      this.yewIdList = [];
    },
    //  关闭弹出框的回调
    handleClose() {
      this.yewIdList = [];
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
    //单位存款人导入功能
    uploadFile(ele) {
      this.loading = true;
      this.loadingText = "导入中，请稍后！！！";
      const fd = new FormData();
      fd.append("file", ele.file);
      fd.append("fileCode", "0");
      axios({
        method: "post",
        data: fd,
        url: "/banksys/acccontrast/recdepositordata.do",
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }).then(res => {
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
                url: "/banksys/acccontrast/recdepositordata.do",
                headers: {
                  "Content-Type": "multipart/form-data"
                }
              })
                .then(res => {
                  this.loading = false;
                  if (res.data.code == "1001") {
                    this.$message.success(res.data.msg);
                    this.reload();
                    // this.getUsers();
                    fd.set("fileCode", "0");
                  } else {
                    this.$message.error(res.data.msg);
                    fd.set("fileCode", "0");
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
          this.loading = false;
          this.$message.error(res.data.msg);
        }
      });
    },
    //新一代导入功能
    uploadNewFile(ele) {
      this.loading = true;
      this.loadingText = "导入中，请稍后！！！";
      const fd2 = new FormData();
      fd2.append("fileNew", ele.file);
      fd2.append("fileCode", "0");
      axios({
        method: "post",
        data: fd2,
        url: "/banksys/acccontrast/recnewgendata.do",
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }).then(res => {
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
              fd2.set("fileCode", "1");
              axios({
                method: "post",
                data: fd2,
                url: "/banksys/acccontrast/recnewgendata.do",
                headers: {
                  "Content-Type": "multipart/form-data"
                }
              })
                .then(res => {
                  this.loading = false;
                  if (res.data.code == "1001") {
                    this.$message.success(res.data.msg);
                    this.reload();
                    fd2.set("fileCode", "0");
                  } else {
                    this.$message.error(res.data.msg);
                    fd2.set("fileCode", "0");
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
          this.loading = false;
          this.$message.error(res.data.msg);
        }
      });
    },

    // 工商数据导入
    uploadWorkFile(ele) {
      this.loading = true;
      this.loadingText = "导入中，请稍后！！！";
      const fd3 = new FormData();
      fd3.append("fileBusi", ele.file);
      fd3.append("fileCode", "0");
      axios({
        method: "post",
        data: fd3,
        url: "/banksys/acccontrast/recbusidata.do",
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
                fd3.set("fileCode", "1");
                axios({
                  method: "post",
                  data: fd3,
                  url: "/banksys/acccontrast/recnewgendata.do",
                  headers: {
                    "Content-Type": "multipart/form-data"
                  }
                })
                  .then(res => {
                    this.loading = false;
                    if (res.data.code == "1001") {
                      this.$message.success(res.data.msg);
                      this.reload();
                      // this.getUsers();
                      fd3.set("fileCode", "0");
                    } else {
                      this.$message.error(res.data.msg);
                      fd3.set("fileCode", "0");
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
            this.loading = false;
            this.$message.error(res.data.msg);
          }
        })
        .catch(err => {
          this.loading = false;
          this.$message.error("网络异常，请重试！！！");
        });
    },
    handleDetail(id,name) {
      this.$router.push({
        path: "/DailyCheckDetail",
        query: { newGenId: id ,depositorName:name}
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
        tableNameList: this.filters.tableNameList,
        depositorName: this.filters.depositorName,
        openAccUnit: this.filters.openAccUnit,
        accName: this.filters.accName,
        accValTime: this.filters.accValTime,
        legalPerEndDate: this.filters.legalPerEndDate,
        operStartDate: this.filters.operStartDate,
        operEndDate: this.filters.operEndDate,
        legalPerName: this.filters.legalPerName,
        legalPerNumber: this.filters.legalPerNumber,
        firmName: this.filters.firmName,
        regiAmount: this.filters.regiAmount,
        regiCurrency: this.filters.regiCurrency,
        busiScope: this.filters.busiScope,
        address: this.filters.address,
        socialCode: this.filters.socialCode,
        pagenum: this.page,
        rows: this.pageSize
      };
      this.listLoading = true;
      axios({
        method: "post",
        url: "/banksys/acccontrast/querynewgendatalist.do",
        data: para
      })
        .then(res => {
          if (res.data.unitRank === 0) {
            this.ifShowDistribution = true;
          }
          if (res.data.code === "1001") {
            this.$message.success(res.data.msg);
            this.total = res.data.data.total;
            this.tableData = res.data.data.list;
            this.tableNameList = res.data.tableNameList;
            this.listLoading = false;
          } else {
            this.$message.error(res.data.msg);
            this.listLoading = false;
          }
        })
        .catch(err => {
          this.$message.error("网络异常，请重试！！！");
        });
    }
  }
};
</script>
<style scoped>
.handle-distribution {
  margin-left: 14px;
}
.margin-box99 {
  margin-bottom: 50px;
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
.el-row{
  box-sizing: border-box;
}

.el-row > div:nth-child(2){
  margin-left:-20px !important;
}
.el-row:nth-child(1) > div:nth-child(2) > .el-form-item{
  margin-left:-14px !important;
}
.el-row:nth-child(1) > div:nth-child(3) > .el-form-item{
  margin-left:-42px !important;
}
.el-row:nth-child(2) > div:nth-child(2) > .el-form-item{
  margin-left:-14px !important;
}
.el-row:nth-child(2) > div:nth-child(3) > .el-form-item{
  margin-left:-42px !important;
}
.el-row:nth-child(3) > div:nth-child(3) > .el-form-item{
  margin-left:13px !important;
}
.el-row:nth-child(1) > div:nth-child(4) > .el-form-item{
  margin-left:-32px !important;
}
.el-row:nth-child(2) > div:nth-child(4) > .el-form-item{
  margin-left:-32px !important;
}
.el-row:nth-child(3) > div:nth-child(4) > .el-form-item{
  margin-left:-32px !important;
}
.el-row:nth-child(4) > div:nth-child(4) > .el-form-item{
  margin-left:-46px !important;
}
</style>