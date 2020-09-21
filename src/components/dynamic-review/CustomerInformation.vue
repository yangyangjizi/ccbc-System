
<template>
  <section v-loading="loading" :element-loading-text="loadingText">
    <!--工具条-->
    <el-col :span="24" class="toolbar" v-if="!loading">
      <el-form ref="epireadyRef" :inline="true" :model="filters">
        <el-row>
          <el-col :sm="6" :md="6" :lg="6" :xl="6">
            <el-form-item label="账号" prop="accountNum">
              <el-input v-model="filters.accountNum" placeholder="请输入账号"></el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="6" :md="6" :lg="6" :xl="6">
            <el-form-item label="币别" prop="currenct">
              <el-input v-model="filters.currenct" placeholder="请输入币别"></el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="6" :md="6" :lg="6" :xl="6">
            <el-form-item label="账户名称" prop="accountName">
              <el-input v-model="filters.accountName" placeholder="请输入账户名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="6" :md="6" :lg="6" :xl="6">
            <el-form-item label="账户性质" prop="accountNature">
              <el-input v-model="filters.accountNature" placeholder="请输入账户性质" class="input-box97"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :sm="6" :md="6" :lg="6" :xl="6">
            <el-form-item label="开户许可证号" prop="openAccNum">
              <el-input v-model="filters.openAccNum" placeholder="请输入开户许可证号"></el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="6" :md="6" :lg="6" :xl="6">
            <el-form-item label="地址" prop="address">
              <el-input v-model="filters.address" placeholder="请输入地址"></el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="6" :md="6" :lg="6" :xl="6">
            <el-form-item label="开户日期" prop="openAccDate">
              <el-input v-model="filters.openAccDate" placeholder="请输入开户日期"></el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="6" :md="6" :lg="6" :xl="6">
            <el-form-item label="睡眠状态" prop="sleepStatus">
              <el-input v-model="filters.sleepStatus" placeholder="请输入睡眠状态"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :sm="6" :md="6" :lg="6" :xl="6">
            <el-form-item label="睡眠设置日期" prop="sleepDate">
              <el-input v-model="filters.sleepDate" placeholder="请输入睡眠设置日期"></el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="6" :md="6" :lg="6" :xl="6">
            <el-form-item label="开户行" prop="openAccBank">
              <el-input v-model="filters.openAccBank" placeholder="请输入开户行"></el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="6" :md="6" :lg="6" :xl="6">
            <el-form-item label="销户日期" prop="closeAccDate">
              <el-input v-model="filters.closeAccDate" placeholder="请输入销户日期"></el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="6" :md="6" :lg="6" :xl="6">
            <el-form-item label="资金用途" prop="useFund">
              <el-input v-model="filters.useFund" placeholder="请输入资金用途"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :sm="6" :md="6" :lg="6" :xl="6">
            <el-form-item label="账户终止状态" prop="accEndStatus">
              <el-input v-model="filters.accEndStatus" placeholder="请输入账户终止状态"></el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="6" :md="6" :lg="6" :xl="6">
            <el-form-item label="企业名称" prop="firmName">
              <el-input v-model="filters.firmName" placeholder="请输入企业名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="6" :md="6" :lg="6" :xl="6">
            <el-form-item label="代表人姓名" prop="legalName">
              <el-input v-model="filters.legalName" placeholder="请输入代表人姓名"></el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="6" :md="6" :lg="6" :xl="6">
            <el-form-item label="代表人证件号码" prop="legalIdNum">
              <el-input v-model="filters.legalIdNum" placeholder="请输入代表人证件号码"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :sm="6" :md="6" :lg="6" :xl="6">
            <el-form-item label="股东证件号码" prop="shareIdNum">
              <el-input v-model="filters.shareIdNum" placeholder="请输入股东证件号码"></el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="6" :md="6" :lg="6" :xl="6">
            <el-form-item label="股东姓名" prop="shareName">
              <el-input v-model="filters.shareName" placeholder="请输入股东姓名"></el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="6" :md="6" :lg="6" :xl="6">
            <el-form-item label="控制人姓名" prop="controName">
              <el-input v-model="filters.controName" placeholder="请输入实际控制人姓名"></el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="6" :md="6" :lg="6" :xl="6">
            <el-form-item label="控制人证件号码" prop="controIdNum">
              <el-input v-model="filters.controIdNum" placeholder="请输入控制人证件号码"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <div>
          <!-- <el-col :sm="6" :md="6" :lg="6" :xl="6"> -->
          <el-form-item label="显示项" prop="tableNameList" v-show="activeName == 'first'">
            <el-select v-model="filters.tableNameList" multiple collapse-tags placeholder="请选择显示项">
              <el-option
                v-for="item in checkListObj"
                :key="item.key"
                :label="item.label"
                :value="item.key"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="显示项" prop="tableNameList2" v-show="activeName == 'second'">
            <el-select v-model="filters.tableNameList2" multiple collapse-tags placeholder="请选择显示项">
              <el-option
                v-for="item in checkListObj2"
                :key="item.key"
                :label="item.label"
                :value="item.key"
              ></el-option>
            </el-select>
          </el-form-item>
          <!-- </el-col> -->
          <!-- <el-form-item class="query"> -->
          <el-button
            type="warning"
            v-on:click="handleGetData(activeName)"
            v-hasPermission="'accInforQuery'"
          >查询</el-button>
          <el-button type="primary" v-hasPermission="'accInforQuery'" v-on:click="resetData">重置</el-button>
          <!-- </el-form-item> -->
        </div>
      </el-form>

      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="三方数据" name="first">
          <div class="tableDataBox1">
            <div class="margin-box99" style="float:left">
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
            <div style="float:left" class="tt">
              <el-button
                class="handle-distribution"
                type="primary"
                v-on:click="handleDistribution"
                v-hasPermission="'accInforDis'"
              >手动分发</el-button>
              <el-button
                class="handle-distribution"
                type="warning"
                v-on:click="handleAutoDistribution"
                v-hasPermission="'accInforAutoDis'"
              >自动分发</el-button>
              <el-button
                type="info"
                v-on:click="handleYearCheck"
                v-hasPermission="'accInforCheck'"
              >开始年检</el-button>
            </div>
            <div style="float:right">
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
                    @click="handleDetail(scope.row.dynamicrevAccId)"
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
          </div>
        </el-tab-pane>
        <el-tab-pane label="工商数据" name="second">
          <!--列表-->
          <el-table
            :data="tableData2"
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
              v-if="this.tableNameList2.length != 0"
            ></el-table-column>
            <el-table-column
              v-for="info in tableNameList2"
              show-overflow-tooltip
              :key="info.key"
              :property="info.key"
              :label="info.label"
              align="center"
            >
              <!-- <el-table-column
                  show-overflow-tooltip
                  v-for="info1 in info.towTableNameList"
                  :key="info1.key"
                  :property="info1.key"
                  :label="info1.label"
                  align="center"
              >-->
              <template slot-scope="scope">{{scope.row[scope.column.property]}}</template>
              <!-- </el-table-column> -->
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              align="center"
              v-if="this.tableNameList2.length != 0"
              :width="labelWidth"
            >
              <template slot-scope="scope">
                <el-button
                  type="primary"
                  size="small"
                  v-hasPermission="'accInforDetail'"
                  @click="handleDetail(scope.row.dynamicrevAccId)"
                  class="submit_color"
                >详情</el-button>
              </template>
            </el-table-column>
          </el-table>
          <!--页码-->
          <el-pagination
            v-if="this.tableNameList2.length !==0"
            layout="total, sizes, prev, pager, next, jumper"
            @current-change="handleCurrentChange"
            @size-change="handleSizeChange"
            :current-page.sync="page"
            :page-sizes="[10, 15, 20, 30]"
            :page-size="pageSize"
            :total="total"
            background
          ></el-pagination>
        </el-tab-pane>
      </el-tabs>
      <!-- 弹出开始年检 -->
      <el-dialog :visible.sync="dialogYearCheck" title="年检" width="30%" center>
        <el-form :model="yearCheckForm" label-width="80px" class="el-form-box">
          <el-form-item label="年检数据:">
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
          <el-form-item v-if="ifMultiple">
            <el-checkbox v-model="yearCheckForm.checked">是否自动分发</el-checkbox>
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
        <el-radio-group v-model="watermarkStatus" class="water-box" v-if="this.unitRank == 0">
          <el-radio :label="'1'">全部支行</el-radio>
          <el-radio :label="'2'">全部网点</el-radio>
          <el-radio :label="'3'">自定义</el-radio>
        </el-radio-group>
        <el-form :model="distributionForm" :label-width="labelWidth" class="el-form-box">
          <el-form-item label="分发地址:" v-if="this.watermarkStatus == '3'|| this.unitRank != 0">
            <el-cascader
              ref="tree"
              placeholder="请选择分发地址"
              v-model="distributionForm.distributionAddress"
              :options="distributionForm.distributionAddressList"
              :props="defaultData"
              collapse-tags
              style="width:100%"
            ></el-cascader>
          </el-form-item>
          <el-form-item m-item label="复核任务:" v-if="this.unitRank == 2">
            <el-select
              v-model="distributionForm.reviewDate"
              multiple
              class="input-box4"
            >
              <el-option
                v-for="(item,index) in this.distributionForm.reviewDateList"
                :label="item.unitName"
                :value="item.unitName"
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
    </el-col>
  </section>
</template>
<script>
import axios from "axios";
export default {
  inject: ["reload"],
  data() {
    return {
      activeName: "first",
      watermarkStatus: "3",
      labelPosition: "right",
      labelWidth: "100px",
      tableNameList: [],
      tableNameList2: [],
      loading: "",
      loadingText: "拼命加载中",
      checkListObj: [],
      checkListObj2: [],
      ifMultiple: false,
      filters: {
        // options: [],
        tableNameList: [],
        tableNameList2: [],
        accountNum: "",
        currenct: "",
        accountName: "",
        accountNature: "",
        openAccNum: "",
        openAccDate: "",
        closeAccDate: "",
        sleepStatus: "",
        sleepDate: "",
        openAccBank: "",
        address: "",
        useFund: "",
        accEndStatus: "",
        firmName: "",
        legalName: "",
        legalIdNum: "",
        shareName: "",
        shareIdNum: "",
        controName: "",
        controIdNum: ""
      },
      distributionForm: {
        distributionAddress: [],
        distributionAddressList: {},
        reviewDate: [],
        reviewDateList: {}
      },
      defaultData: {
        //联级选择
        leafOnly: true,
        checkStrictly: true,
        multiple: true,
        value: "unitCode",
        label: "unitName",
        children: "children"
      },
      yearCheckForm: {
        yearCheckList: [],
        checked:false
      },
      yearDateCheckList: [
        {
          value: "01",
          label: "人行账户信息"
        },
        {
          value: "02",
          label: "新一代客户信息"
        },
        {
          value: "03",
          label: "工商数据信息"
        }
      ],
      yewIdList: [],
      accIdList: [],
      dynamicrevList: [],
      multipleSelection: [],
      fileList: [],
      fileNewList: [],
      fileWorkList: [],
      dialogDistributionState: false,
      dialogYearCheck: false,
      // ifShowDistribution: false,
      tableData: [],
      tableData2: [],
      unitRank: "",
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
    this.getCheckList2();
    this.unitRank = sessionStorage.getItem("unitRank");
    if (this.unitRank == 0) {
      this.ifMultiple = true;
    }
  },
  mounted() {
    this.getUsers();
    this.handleDistributionAddress();
  },
  methods: {
    //自动分发
    handleAutoDistribution() {
      for (let i = 0; i < this.multipleSelection.length; i++) {
        var accId = this.multipleSelection[i].dynamicrevAccId;
        this.accIdList.push(accId);
      }
      let prop = {
        pageType: "8",
        dynamicrevAccIdList: this.accIdList
      };
      this.$confirm("是否确定自动分发?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          axios({
            method: "post",
            data: prop,
            url: "/banksys/dynamicrev/autodisdynamicrevdata.do"
          })
            .then(res => {
              this.accIdList = [];
              if(res.data.code == "1001"){
                this.$message.success(res.data.msg)
              } else{
                this.$message.error(re.data.msg)
              }
            })
            .catch(err => {
              this.$message.error("网络异常，请重试！！！");
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    },
    handleClick() {},
    // 开始年检弹框
    handleYesYearCheck() {
      for (let i = 0; i < this.multipleSelection.length; i++) {
        var dynamicrevId = this.multipleSelection[i].dynamicrevAccId;
        this.dynamicrevList.push(dynamicrevId);
      }
      this.loading = true;
      this.loadingText = "年检中，请稍后！！！";
      this.dialogYearCheck = false;
      this.$axios
        .post("/banksys/dynamicrev/executedynamicrev.do", {
          dataTypeList: this.yearCheckForm.yearCheckList,
          autoType: this.yearCheckForm.checked,
          pageType: "8",
          dynamicrevAccIdList :this.dynamicrevList
        })
        .then(res => {
          this.loading = false;
          this.dynamicrevList = [];
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
    //点击查询
    handleGetData(v) {
      if (v == "first") {
        this.getUsers();
      } else {
        this.getUsers2();
      }
    },
    //调用条件接口
    getCheckList() {
      this.$axios
        .post("/banksys/accdoubtful/querytablenamelist.do", {
          tableType: "rev_table_name"
        })
        .then(res => {
          this.checkListObj = res.data.tableNameList;
        })
        .catch(err => {
          this.$message.error("网络异常，请重试！！！");
        });
    },
    getCheckList2() {
      this.$axios
        .post("/banksys/accdoubtful/querytablenamelist.do", {
          tableType: "busi_table_name"
        })
        .then(res => {
          this.checkListObj2 = res.data.tableNameList;
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
        .post("/banksys/dynamicrev/querydisunitcodelist.do", {})
        .then(res => {
          console.log(res);
          this.distributionForm.distributionAddressList = res.data.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 复核任务获取
    handleReviewDate(v) {
      axios
        .post("/banksys/dynamicrev/querycomtablelist.do", {
          dynamicrevAccId: v,
          pageType: "8"
        })
        .then(res => {
          console.log(res);
          this.distributionForm.reviewDateList = res.data.list;
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 分发处理拿到的各项的yewId
    handleDistribution() {
      for (let i = 0; i < this.multipleSelection.length; i++) {
        var yewId = this.multipleSelection[i].dynamicrevAccId;
        this.yewIdList.push(yewId);
      }
      if (this.yewIdList.length != 0) {
        this.dialogDistributionState = true;
        this.handleReviewDate(this.yewIdList);
      } else {
        this.$message.error("请选择所需操作的数据");
      }
    },
    // 确定分发
    handleYes() {
      this.loading = true;
      this.loadingText = "分发中，请稍后！！！";
      let req = {};
      req = {
        dynamicrevAccIdList: this.yewIdList,
        disBankList: this.distributionForm.distributionAddress,
        comTableList: this.distributionForm.reviewDate,
        pageType: "8",
        allType: this.watermarkStatus
      };
      axios({
        method: "post",
        data: req,
        url: "banksys/dynamicrev/handdisdynamicrevdata.do"
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
      fd.append("operateType", "8");
      axios({
        method: "post",
        data: fd,
        url: "/banksys/dynamicrev/recpeopleaccdata.do",
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
                url: "/banksys/dynamicrev/recpeopleaccdata.do",
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
      fd2.append("file", ele.file);
      fd2.append("fileCode", "0");
      fd2.append("operateType", "8");
      axios({
        method: "post",
        data: fd2,
        url: "/banksys/dynamicrev/recnewgenaccdata.do",
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
                url: "/banksys/dynamicrev/recnewgenaccdata.do",
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
      fd3.append("file", ele.file);
      fd3.append("fileCode", "0");
      fd3.append("operateType", "8");
      axios({
        method: "post",
        data: fd3,
        url: "/banksys/dynamicrev/recbusiinfodata.do",
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
                  url: "/banksys/dynamicrev/recbusiinfodata.do",
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
    handleDetail(id) {
      this.$router.push({
        path: "/CustomerInformationDetail",
        query: { dynamicrevAccId: id }
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
        accountNum: this.filters.accountNum,
        currenct: this.filters.currenct,
        accountName: this.filters.accountName,
        accountNature: this.filters.accountNature,
        openAccNum: this.filters.openAccNum,
        openAccDate: this.filters.openAccDate,
        closeAccDate: this.filters.closeAccDate,
        sleepStatus: this.filters.sleepStatus,
        sleepDate: this.filters.sleepDate,
        openAccBank: this.filters.openAccBank,
        address: this.filters.address,
        useFund: this.filters.useFund,
        accEndStatus: this.filters.accEndStatus,
        firmName: this.filters.firmName,
        legalName: this.filters.legalName,
        legalIdNum: this.filters.legalIdNum,
        shareName: this.filters.shareName,
        shareIdNum: this.filters.shareIdNum,
        controName: this.filters.controName,
        controIdNum: this.filters.controIdNum,
        pagenum: this.page,
        operateType: "8",
        rows: this.pageSize
      };
      this.listLoading = true;
      axios({
        method: "post",
        url: "/banksys/dynamicrev/querydynamicrevdatalist.do",
        data: para
      })
        .then(res => {
          // if (res.data.unitRank === 0) {
          //   this.ifShowDistribution = true;
          // }
          if (res.data.code === "1001") {
            console.log(res);
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
    },
    //获取用户列表
    getUsers2() {
      let para = {
        busiTableNameList: this.filters.tableNameList2,
        firmName: this.filters.firmName,
        legalName: this.filters.legalName,
        legalIdNum: this.filters.legalIdNum,
        shareName: this.filters.shareName,
        shareIdNum: this.filters.shareIdNum,
        controName: this.filters.controName,
        controIdNum: this.filters.controIdNum,
        pagenum: this.page,
        operateType: "8",
        rows: this.pageSize
      };
      this.listLoading = true;
      axios({
        method: "post",
        url: "/banksys/dynamicrev/queryaccbusidatalist.do",
        data: para
      })
        .then(res => {
          // if (res.data.unitRank === 0) {
          //   this.ifShowDistribution = true;
          // }
          if (res.data.code === "1001") {
            this.$message.success(res.data.msg);
            this.total = res.data.data.total;
            this.tableData2 = res.data.data.list;
            this.tableNameList2 = res.data.tableNameList;
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
.tt {
  margin-bottom: 10px;
  margin-left: -12px;
}
.el-button + .el-button {
  margin-left: 0px;
}
.handle-distribution {
  margin-left: 14px;
}
.margin-box99 {
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
.el-row {
  box-sizing: border-box;
}
.el-row:nth-child(1) > div:nth-child(1) > .el-form-item {
  margin-left: 54px !important;
}
.el-row:nth-child(1) > div:nth-child(2) > .el-form-item {
  margin-left: 14px !important;
}
.el-row:nth-child(2) > div:nth-child(2) > .el-form-item {
  margin-left: 14px !important;
}
.water-box {
  margin: 0 20% 20px;
}
</style>