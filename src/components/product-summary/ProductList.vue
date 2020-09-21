<template>
  <section v-loading="loading" :element-loading-text="loadingText">
    <!--工具条-->
    <el-col :span="24" class="toolbar" v-if="!loading">
      <el-form ref="epireadyRef" :inline="true" :model="filters" style="overflow: hidden;">
        <el-form-item label="客户编码" prop="clientCode">
         <el-input v-model="filters.clientCode" placeholder="请输入客户编码"></el-input>
        </el-form-item>
        <el-form-item label="客户名称" prop="clientName">
         <el-input v-model="filters.clientName" placeholder="请输入客户编码"></el-input>
        </el-form-item>
        <el-form-item label="数据类型" prop="dataType">
          <el-select v-model="filters.dataType" clearable placeholder="请选择">
            <el-option
              v-for="item in dataTypeList"
              :key="item.dataType"
              :label="item.label"
              :value="item.dataType"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="分发状态" v-hasPermission="'butELDistribute'">
          <el-select v-model="filters.distributionCode" placeholder="请选择">
            <el-option
              v-for="item in filters.distributionList"
              :key="item.distributionCode"
              :label="item.label"
              :value="item.distributionCode"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="分发进度" v-hasPermission="'butELDistribute'">
          <el-select v-model="filters.nodeNameCode" placeholder="请选择">
            <el-option
              v-for="item in filters.nodeNameList1"
              :key="item.nodeNameCode"
              :label="item.label"
              :value="item.nodeNameCode"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="营销状态">
          <el-select v-model="filters.markStatusCode" placeholder="请选择">
            <el-option
              v-for="item in filters.markStatusList"
              :key="item.markStatusCode"
              :label="item.label"
              :value="item.markStatusCode"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="el-forms input-box18" label="添加时间">
          <el-date-picker
            v-model="filters.addTime"
            placeholder="请输入添加时间"
            type="daterange"
            clearable
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="warning" v-on:click="getUsers" v-hasPermission="'proBTquery'">查询</el-button>
          <el-button type="primary" v-on:click="resetData" v-hasPermission="'proReset'">重置</el-button>
        </el-form-item>
      </el-form>
      <div class="margin-box">
        <el-button
          type="primary"
          @click="handleImport"
          class="margin-box"
          v-hasPermission="'proLead'"
        >导入</el-button>
        <el-button
          type="success"
          @click="handleOutImport"
          class="margin-box"
          v-hasPermission="'proExport'"
        >导出</el-button>

        <el-button
          type="danger"
          v-hasPermission="'proDis'"
          @click="handleDistribution"
          class="margin-box"
        >手动分发</el-button>
        <el-button
          @click="downFile('clientTemplate')"
          type="info"
          class="margin-box-float"
          v-hasPermission="'proDown'"
        >下载客户信息模板</el-button>
      </div>

      <!-- 弹出手动分发框 -->
      <el-dialog
        :visible.sync="dialogDistributionState"
        @close="handleClose"
        title="分发"
        width="30%"
        center
      >
        <el-form
          :model="distributionForm"
          ref="distributionForm"
          label-width="80px"
          class="el-form-box22"
        >
          <el-row>
            <el-col :span="24">
              <el-form-item label="分发地址:" prop="distributionAddress">
                <el-select v-model="distributionForm.distributionAddress" class="input-box4">
                  <el-option
                    v-for="(item,index) in this.distributionForm.distributionAddressList"
                    :label="item.unitName"
                    :value="item.unitCode"
                    :key="index"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row v-if="unitRank === 0 || unitRank === 1">
            <el-col :span="24">
              <el-form-item label="撤回余期" prop="bankTime">
                <el-input
                  v-model="distributionForm.bankTime"
                  class="input-box0"
                  @blur="handleBlur($event)"
                ></el-input>个工作日
              </el-form-item>
            </el-col>
          </el-row>
          <el-row v-if="unitRank === 0 || unitRank === 1">
            <el-col :span="24">
              <el-form-item label="反馈余期" prop="marketTime">
                <el-input
                  v-model="distributionForm.marketTime"
                  class="input-box0"
                  @blur="handleBlur($event)"
                ></el-input>个自然日
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click.native="handleYes">确定</el-button>
          <el-button @click="handleNo('distributionForm')">取消</el-button>
        </span>
      </el-dialog>
      <!-- 点击导入出现弹框 -->
      <el-dialog title="导入" :visible.sync="dialogVisible" width="20%" center @close="handleClose">
        <el-form :model="imputForm" ref="imputForm" :label-width="labelWidth">
          <el-form-item label="数据类型" prop="dataType">
            <el-select v-model="imputForm.dataType" placeholder="请选择">
              <el-option
                v-for="item in dataTypeListTwo"
                :key="item.dataType"
                :label="item.label"
                :value="item.dataType"
              ></el-option>
            </el-select>
          </el-form-item>
          <div class="imput-box">
            <el-upload
              action
              :limit="1"
              ref="upload"
              accept=".xlsx, .xls"
              :http-request="uploadFileTwo"
              :on-remove="handleRemove2"
              :file-list="fileTwo"
            >
              <el-button size="small" type="danger">点击导入客户信息表</el-button>
              <div slot="tip" class="el-upload__tip">只能上传excel文件</div>
            </el-upload>
          </div>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="handleCance">取 消</el-button>
          <el-button type="primary" @click="handleConfirm('imputForm')">确 定</el-button>
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
          <template slot-scope="scope">{{ scope.row.number }}</template>
        </el-table-column>
        <el-table-column prop="dataUnitCode" label="机构编码" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column prop="dataUnitName" label="机构名称" show-overflow-tooltip align="center"></el-table-column>
        <el-table-column prop="clientCode" label="客户编码" show-overflow-tooltip align="center"></el-table-column>
        <el-table-column prop="clientName" label="客户名称" show-overflow-tooltip align="center"></el-table-column>
        <el-table-column prop="toPublicType" label="对公客户类型" show-overflow-tooltip align="center"></el-table-column>
        <el-table-column
          prop="clientHeadDept"
          label="客户归属总行部门"
          show-overflow-tooltip
          align="center"
        ></el-table-column>
        <el-table-column prop="sceneName" label="场景名称" show-overflow-tooltip align="center"></el-table-column>
        <el-table-column prop="scale" label="规模" show-overflow-tooltip align="center"></el-table-column>
        <el-table-column
          prop="nodeName"
          v-if="unitRank === 0 || unitRank === 1|| unitRank === 2"
          label="分发进度"
          show-overflow-tooltip
          align="center"
        ></el-table-column>
        <el-table-column
          prop="disStatus"
          v-if="unitRank === 0 || unitRank === 1 || unitRank === 2"
          label="分发状态"
          show-overflow-tooltip
          align="center"
        ></el-table-column>
        <el-table-column
          v-if="unitRank === 1 || unitRank === 2"
          label="撤回余期"
          show-overflow-tooltip
          align="center"
        >
          <template slot-scope="scope">
            <span v-if="scope.row.backStatus !='0'">
              <img src="../../assets/02.png" title="超时预警" />
            </span>
            <span v-else>{{ scope.row.backTime }}个工作日</span>
          </template>
        </el-table-column>
        <el-table-column
          v-if="unitRank === 1 || unitRank === 2"
          label="反馈余期"
          show-overflow-tooltip
          align="center"
        >
          <template slot-scope="scope">
            <span v-if="scope.row.marketStatus !='0'">
              <img src="../../assets/02.png" title="超时预警" />
            </span>
            <span v-else>{{ scope.row.marketTime }}个自然日</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="subName"
          label="分发支行名称"
          show-overflow-tooltip
          align="center"
          v-if="ifShowButtonTwo"
        ></el-table-column>
        <el-table-column
          prop="unitName"
          label="分发网点名称"
          show-overflow-tooltip
          align="center"
          v-if="ifShowButton"
        ></el-table-column>
        <el-table-column prop="affirmName" label="分发员工姓名" show-overflow-tooltip align="center"></el-table-column>
        <el-table-column prop="markStatus" label="营销状态" show-overflow-tooltip align="center"></el-table-column>
        <el-table-column prop="dataType" label="数据类型" show-overflow-tooltip align="center"></el-table-column>
        <el-table-column label="操作" align="center" :width="laberWidth2">
          <template slot-scope="scope">
            <el-button
              type="primary"
              v-hasPermission="'proBack'"
              size="small"
              v-if="scope.row.unitRank === 1 && scope.row.showButton  === '0'"
              @click="handleFeedBack('1',scope.row.marketStatus,scope.row.taxId,scope.row.disId)"
            >反馈</el-button>
            <el-button
              type="primary"
              v-hasPermission="'proBack'"
              size="small"
              v-if="scope.row.showButton == '0' && scope.row.dataStatus == '1'"
              @click="handleFeedBack('2',scope.row.showDetails ,scope.row.taxId,scope.row.disId)"
            >反馈</el-button>
            <el-button
              v-if=" scope.row.dataStatus ==='0'"
              type="warning"
              v-hasPermission="'affirmPro'"
              size="small"
              @click="handleAffirm(scope.row.disId)"
            >确定认领</el-button>
            <el-button
              type="danger"
              v-if="scope.row.backStatus ==='0' && scope.row.unitRank ===1 "
              v-hasPermission="'backByPro'"
              size="small"
              @click="handleBack(scope.row.taxId,scope.row.disId)"
            >退回</el-button>
            <el-button
              type="danger"
              v-if="scope.row.backStatus ==='0' && scope.row.unitRank === 2"
              v-hasPermission="'backByPro'"
              size="small"
              @click="handleBack(scope.row.taxId,scope.row.disId)"
            >退回</el-button>
            <el-button
              type="primary"
              v-hasPermission="'proDetails'"
              size="small"
              @click="handleDetail(scope.row.taxId,scope.row.disId)"
              class="submit_color"
            >详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 弹出反馈框 -->
      <el-dialog :visible.sync="dialogState" title="反馈" width="30%" center @close="handleDialogClose">
        <el-form :model="addForm" ref="addFormRef" label-width="30%" class="el-form-box22">
          <el-form-item label="营销状态:" prop="markStatus">
            <el-select v-model="addForm.markStatus" class="input-box4">
              <el-option
                v-for="(item,index) in this.addForm.markStatusList"
                :label="item.label"
                :value="item.markStatusCode"
                :key="index"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="反馈内容:" v-if="addForm.markStatus === '1'" prop="backDetails">
            <el-select v-model="addForm.backDetails" class="input-box4">
              <el-option
                v-for="(item,index) in this.addForm.backDetailsList"
                :label="item.codeName"
                :value="item.code"
                :key="index"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="银行账号:" prop="accountNO" v-if="addForm.markStatus === '0'">
            <el-input v-model="addForm.accountNO" class="input-box4"></el-input>
          </el-form-item>
          <el-form-item label="账户名称:" prop="accountName" v-if="addForm.markStatus === '0'">
            <el-input v-model="addForm.accountName" class="input-box4"></el-input>
          </el-form-item>
          <el-form-item label="开户时间:" prop="accountTime" v-if="addForm.markStatus === '0'">
            <el-date-picker
              v-model="addForm.accountTime"
              class="input-box4"
              type="date"
              placeholder="选择日期"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
            >></el-date-picker>
          </el-form-item>
          <el-form-item label="备注:" prop="remark">
            <el-input v-model="addForm.remark" type="textarea" class="input-box66"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="success" @click.native="handleSubmit">提交</el-button>
          <el-button @click="handleSubmitNo('addFormRef')">取消</el-button>
        </span>
      </el-dialog>
      <!-- 弹出退回反馈框 -->
      <el-dialog :visible.sync="dialogRejectedState" title="退回" width="30%" center>
        <el-form :model="rejectedForm" label-width="80px">
          <el-form-item label="撤回理由:">
            <el-input
              v-model="rejectedForm.counterReason"
              type="textarea"
              :rows="4"
              class="input-box5"
            ></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="success" @click.native="handleRejectedSubmit">提交</el-button>
          <el-button @click="dialogRejectedState = false">取消</el-button>
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
  name: "",
  data() {
    return {
      rejectedForm: {
        counterReason: ""
      },
      dialogRejectedState: false,
      loading: "",
      loadingText: "拼命加载中",
      taxId: "",
      disId: "",
      dialogDistributionState: false,
      ifShowButton: true,
      ifShowButtonTwo: false,
      distributionForm: {
        distributionAddress: "",
        distributionAddressList: {},
        bankTime: "",
        marketTime: ""
      },
      filters: {
        clientCode: "",
        clientName: "",
        addTime: "",
        dataType: "",
        distributionCode: "",
        nodeNameCode: "",
        markStatusCode: "",
        distributionList: [
          {
            distributionCode: "",
            label: "全部"
          },
          {
            distributionCode: "0",
            label: "分发成功"
          },
          {
            distributionCode: "1",
            label: "分发失败"
          },
          {
            distributionCode: "2",
            label: "未分发"
          }
        ],
        nodeNameList1: [
          {
            nodeNameCode: "",
            label: "全部"
          },
          {
            nodeNameCode: "1",
            label: "分发到支行"
          },
          {
            nodeNameCode: "2",
            label: "分发到网点"
          },
          {
            nodeNameCode: "3",
            label: "分发到员工"
          },
          {
            nodeNameCode: "999",
            label: "数据被退回"
          }
        ],
        nodeNameList2: [
          {
            nodeNameCode: "",
            label: "全部"
          },
          {
            nodeNameCode: "2",
            label: "分发到网点"
          }
        ],
        nodeNameList3: [
          {
            nodeNameCode: "",
            label: "全部"
          },
          {
            nodeNameCode: "3",
            label: "分发到员工"
          }
        ],
        markStatusList: [
          {
            markStatusCode: "",
            label: "全部"
          },
          {
            markStatusCode: "0",
            label: "营销成功"
          },
          {
            markStatusCode: "1",
            label: "营销失败"
          },
          {
            markStatusCode: "2",
            label: "未营销"
          }
        ]
      },
      unitRank: "",
      labelWidth: "80px",
      laberWidth2: "250px",
      tableData: [],
      total: 0,
      pageSize: 10,
      propType: "1",
      page: 1,
      disIdList: [],
      ifShowCode: "",
      listLoading: false,
      dialogVisible: false,
      multipleSelection: [],
      checkId: [],

      imputForm: {
        dataType: "0"
      },
      dataTypeList: [
        {
          dataType: "0",
          label: "无效数据"
        },
        {
          dataType: "1",
          label: "营销成功数据"
        },
        {
          dataType: "2",
          label: "存在问题数据"
        }
      ],
      dataTypeListTwo: [
        {
          dataType: "0",
          label: "无效数据"
        },
        {
          dataType: "1",
          label: "营销成功数据"
        }
      ],
      addForm: {
        markStatus: "",
        backDetails: "",
        remark: "",
        accountNO: "",
        accountName: "",
        accountTime: "",
        markStatusList: [],
        markStatusList1: [
          {
            markStatusCode: "0",
            label: "营销成功"
          },
          {
            markStatusCode: "1",
            label: "营销失败"
          },
          {
            markStatusCode: "2",
            label: "未营销"
          }
        ],
        markStatusList2: [
          {
            markStatusCode: "1",
            label: "营销失败"
          }
        ],
        backDetailsList: []
      },

      fileTwo: [],
      dialogState: false,
      formData: "",
      styleObj: {
        background: "#eef1f6",
        "border-color": "#dbdbdb",
        "text-align": "center"
      }
    };
  },
  created() {},
  watch: {},
  mounted() {
    this.getUsers();
    this.getFeedBackCode();
    this.getEnterpriseCode();
    this.getactualOperationCode();
    this.handleDistributionAddress();
  },
  methods: {
    // 确认提交反馈
    handleRejectedSubmit() {
      let req = {};
      req = {
        disId: this.disId,
        taxId: this.taxId,
        counterReason: this.rejectedForm.counterReason
      };
      axios({
        method: "post",
        data: req,
        url: "/banksys/busimarket/countertaxdata.do"
      })
        .then(res => {
          if (res.data.code === "1001") {
            this.$message.success(res.data.msg);
            this.dialogRejectedState = false;
            this.$router.push({ path: "/ProductList" });
          } else {
            this.$message.error(res.data.msg);
            this.dialogRejectedState = false;
          }
          this.$refs.rejectedForm.resetFields();
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleBack() {
      this.dialogRejectedState = true;
    },

    handleAffirm(disId) {
      this.$confirm("是否确定认领?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          axios
            .post("/banksys/busimarket/affirmProductData.do", { disId: disId })
            .then(res => {
              if (res.data.code === "1001") {
                this.$message.success(res.data.msg);
                this.getUsers();
              } else {
                this.$message.error(res.data.msg);
              }
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    },
    // 取消反馈提交
    handleSubmitNo(formName) {
      this.dialogState = false;
      this.$refs[formName].resetFields();
    },
    handleDialogClose(){
      this.dialogState = false;
      this.$refs.addFormRef.resetFields();
    },
    //提交
    handleSubmit() {
      let req = {};
      req = {
        disId: this.disId,
        taxId: this.taxId,
        markStatus: this.addForm.markStatus,
        backDetails: this.addForm.backDetails,
        accountNO: this.addForm.accountNO,
        accountName: this.addForm.accountName,
        accountTime: this.addForm.accountTime,
        remark: this.addForm.remark
      };
      axios({
        method: "post",
        data: req,
        url: "/banksys/busimarket/editclientbackdata.do"
      })
        .then(res => {
          if (res.data.code === "1001") {
            this.$message.success("提交成功");
            this.dialogState = false;
            this.getUsers();
          }
          this.$refs.addFormRef.resetFields();
        })
        .catch(err => {
          this.$message.error("网络异常，请重试！！！");
        });
    },
    // 获取反馈内容
    getFeedBackCode() {
      let prop = {};
      prop = {
        codeTypes: "cus_feedback",
        needAll: "1"
      };
      axios({
        method: "post",
        data: prop,
        url: "/banksys/system/common/querycode.do"
      })
        .then(res => {
          this.addForm.backDetailsList = res.data.list;
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 反馈按钮
    handleFeedBack(propType, showDetails, taxId, disId) {
      // this.propType = propType;
      this.taxId = taxId;
      this.disId = disId;
      this.dialogState = true;
      if (showDetails == 0 && propType == "2") {
        this.addForm.markStatusList = this.addForm.markStatusList1;
      } else {
        this.addForm.markStatusList = this.addForm.markStatusList2;
      }
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
    //手动分发弹框输入是正整数
    handleBlur(e) {
      let boolean = new RegExp("^[1-9][0-9]*$").test(e.target.value);
      if (!boolean) {
        this.$message.warning("请输入正整数");
        (e.target.value = ""),
          (this.distributionForm.bankTime = ""),
          (this.distributionForm.marketTime = "");
      }
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
    // 确定分发
    handleYes() {
      this.loading = true;
      this.loadingText = "分发中，请稍后！！！";
      let req = {};
      req = {
        disIdList: this.disIdList,
        selectCode: this.distributionForm.distributionAddress,
        bankTime: Number(this.distributionForm.bankTime),
        marketTime: Number(this.distributionForm.marketTime)
      };
      axios({
        method: "post",
        data: req,
        url: "/banksys/datadistribute/handdodistaxdata.do"
      })
        .then(res => {
          this.loading = false;
          if (res.data.code === "1001") {
            this.$message.success(res.data.msg);
            this.disIdList = [];
            this.getUsers();
            this.dialogDistributionState = false;
          } else {
            this.$message.error(res.data.msg);
            this.dialogDistributionState = false;
            this.disIdList = [];
          }
        })
        .catch(err => {
          this.loading = false;
          console.log(err);
        });
    },
    // 取消分发
    handleNo(formName) {
      this.dialogDistributionState = false;
      this.$refs[formName].resetFields();
      this.disIdList = [];
    },
    // 分发处理拿到的各项的taxId
    handleDistribution() {
      for (let i = 0; i < this.multipleSelection.length; i++) {
        var taxId = this.multipleSelection[i].disId;
        this.disIdList.push(taxId);
      }
      this.dialogDistributionState = true;
    },
    // 导入文件
    uploadFileTwo(ele) {
      this.formData.append("file", ele.file);
    },

    // 获取点击的行
    handleClickRow(selection, row) {
      this.multipleSelection = selection;
    },
    handleClickAllRow(selection) {
      this.multipleSelection = selection;
    },
    // 取消
    handleCance() {
      this.dialogVisible = false;
      this.imputForm.dataType = "0";
      this.fileTwo = [];
    },
    handleClose() {
      this.fileTwo = [];
    },
    handleRemove2(file, fileList) {
      this.formData.set("file", "");
      this.fileTwo = [];
    },

    //确定导入
    handleConfirm(form) {
      this.loading = true;
      this.loadingText = "导入中，请稍后！！！";
      this.formData.append("dataType", this.imputForm.dataType);
      axios({
        method: "post",
        data: this.formData,
        url: "/banksys/busimarket/receiveprocommon.do",
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
        .then(res => {
          this.loading = false;
          if (res.data.code == "1001") {
            this.$message.success(res.data.msg);
            this.formData = "";
            this.dialogVisible = false;
            this.getUsers();
          } else if (res.data.code === "1007") {
            this.$confirm("此操作将覆盖当日文件, 是否继续?", "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning"
            })
              .then(() => {
                this.loading = true;
                let that = this;
                this.formData.set("fileCode", "1");
                // console.log('11')
                axios({
                  method: "post",
                  data: this.formData,
                  url: "/banksys/busimarket/receiveprocommon.do",
                  headers: {
                    "Content-Type": "multipart/form-data"
                  }
                })
                  .then(res => {
                    this.loading = false;
                    if (res.data.code == "1001") {
                      that.$message.success(res.data.msg);
                      this.dialogVisible = false;
                      that.getUsers();
                      that.formData.set("fileCode", "");
                      this.formData = "";
                    } else {
                      that.$message.error(res.data.msg);
                      that.formData.set("fileCode", "");
                    }
                  })
                  .catch(err => {
                    this.loading = false;
                    this.$message.error("网络异常，请重试！！！");
                  });
              })
              .catch(() => {
                this.$message({
                  type: "info",
                  message: "已取消覆盖"
                });
              });
          } else {
            this.$message.error(res.data.msg);
            this.formData = "";
            this.dialogVisible = false;
          }
        })
        .catch(err => {
          this.$message.error("网络异常，请重试！！！");
        });
    },
    // 导入
    handleImport() {
      this.formData = new FormData();
      this.dialogVisible = true;
    },

    // 导出
    handleOutImport() {
      this.loading = true;
      this.loadingText = "导出中，请稍后！！！";
      let sef = this;
      let req = {};
      for (var i = 0; i < this.multipleSelection.length; i++) {
        var taxId = this.multipleSelection[i].taxId;
        this.checkId.push(taxId);
      }
      req = {
        addTime: this.filters.addTime,
        taxIdList: this.checkId
      };
      axios({
        method: "post",
        data: req,
        url: "/banksys/busimarket/exportclientlist.do",
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
          this.checkId = [];
        })
        .catch(err => {
          this.loading = false;
          console.log(err);
        });
    },

    // 实际经营地址条件
    getactualOperationCode() {
      axios({
        method: "post",
        data: "",
        url: "/banksys/datadistribute/queryrunaddresslist.do"
      })
        .then(res => {
          this.filters.actualOperationList = res.data.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 企业类型条件
    getEnterpriseCode() {
      let prop = {};
      prop = {
        codeTypes: "firm_type",
        needAll: "1"
      };
      axios({
        method: "post",
        data: prop,
        url: "/banksys/system/common/querycode.do"
      })
        .then(res => {
          this.filters.queryConTradingList = res.data.list;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //重置查询条件
    resetData() {
      this.filters.addTime = "";
      this.filters.dataType = "";
    },
    //获取用户列表
    getUsers() {
      this.loading = true;
      this.loadingText = "拼命加载中";
      let para = {
        pagenum: this.page,
        rows: this.pageSize,
        addTime: this.filters.addTime,
        dataType: this.filters.dataType,
        clientCode: this.filters.clientCode,
        clientName: this.filters.clientName,
        nodeNameCode : this.filters.nodeNameCode,
        markStatusCode  : this.filters.markStatusCode,
        distributionCode : this.filters.distributionCode
      };
      axios({
        method: "post",
        url: "/banksys/busimarket/queryclientdatalist.do",
        data: para
      })
        .then(res => {
          this.loading = false;
          if (res.data.code === "1001") {
            if (res.data.unitRank === 0) {
              this.ifShowButtonTwo = true;
            } else if (res.data.unitRank === 2) {
              this.ifShowButton = false;
            }
            this.$message.success(res.data.msg);
            this.total = res.data.data.total;
            this.tableData = res.data.data.list;
            this.unitRank = res.data.unitRank;
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch(err => {
          this.loading = false;
          this.$message.error("网络异常，请重试！！！");
        });
    },
    // 详情
    handleDetail(taxId, disId) {
      this.$router.push({
        path: "/ProductListDetail",
        query: { taxId: taxId, disId: disId, pageCode: "99", codeType: "0" }
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
.el-form-box22 {
  height: 250px !important;
}
.input-box66 {
  width: 300px !important;
}
.el-input {
  width: 300px !important;
}
.set-up {
  margin-left: 50px;
}
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
/* .el-form-item {
  float: left;
} */
.imput-box {
  text-align: center;
}
.submit_color {
  background-color: #858ffd;
  border-color: #858ffd;
}
.submit_color:hover {
  background-color: #a6acef;
  border-color: #a6acef;
}
.exportexcel_button {
  background-color: #7a94fd;
  color: white;
  border-color: #7a94fd;
}
</style>
