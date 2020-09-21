<template>
  <section v-loading="loading" :element-loading-text="loadingText">
    <el-col :span="24" class="toolbar" v-if="!loading">
      <el-form ref="epireadyRef" :inline="true" :model="filters" style="overflow: hidden;">
        <el-row>
          <el-col :sm="6" :md="6" :lg="6" :xl="6">
            <el-form-item label="支行名称" prop="subName" class="margin-box3">
              <el-input
                v-model="filters.subName"
                placeholder="请输入支行名称"
                class="input-box99 input-box99"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="6" :md="6" :lg="6" :xl="6">
            <el-form-item label="开户银行名称" prop="openBankName" class="margin-box3">
              <el-input v-model="filters.openBankName" placeholder="请输入开户银行名称" class="input-box99"></el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="6" :md="6" :lg="6" :xl="6">
            <el-form-item label="财务身份证" prop="financeCard" class="margin-box3">
              <el-input v-model="filters.financeCard" placeholder="请输入财务身份证" class="input-box99"></el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="6" :md="6" :lg="6" :xl="6">
            <el-form-item label="账户" prop="account" class="margin-box3">
              <el-input v-model="filters.account" placeholder="请输入账户" class="input-box99"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :sm="6" :md="6" :lg="6" :xl="6">
            <el-form-item label="注册地址" prop="regAddress" class="margin-box3">
              <el-input
                v-model="filters.regAddress"
                placeholder="请输入注册地址"
                class="input-box99 input-box99"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="6" :md="6" :lg="6" :xl="6">
            <el-form-item label="实际经营地址" prop="actualBusiAddress" class="margin-box3">
              <el-input
                v-model="filters.actualBusiAddress"
                placeholder="请输入实际经营地址"
                class="input-box99"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="6" :md="6" :lg="6" :xl="6">
            <el-form-item label="联系人电话" prop="linkmanTel" class="margin-box3">
              <el-input v-model="filters.linkmanTel" placeholder="请输入联系人电话" class="input-box99"></el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="6" :md="6" :lg="6" :xl="6">
            <el-form-item label="联系人" prop="linkmanName" class="margin-box3">
              <el-input v-model="filters.linkmanName" placeholder="请输入联系人" class="input-box99"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :sm="6" :md="6" :lg="6" :xl="6">
            <el-form-item label="法人名称" prop="legalName" class="margin-box3">
              <el-input
                v-model="filters.legalName"
                placeholder="请输入法人名称"
                class="input-box99 input-box99"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="6" :md="6" :lg="6" :xl="6">
            <el-form-item label="联系人身份证" prop="linkmanCard" class="margin-box3">
              <el-input v-model="filters.linkmanCard" placeholder="请输入联系人身份证" class="input-box99"></el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="6" :md="6" :lg="6" :xl="6">
            <el-form-item label="财务联系人" prop="financeName" class="margin-box3">
              <el-input v-model="filters.financeName" placeholder="请输入财务联系人" class="input-box99"></el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="6" :md="6" :lg="6" :xl="6">
            <el-form-item label="实际控制人名称" prop="controlName" class="margin-box3">
              <el-input v-model="filters.controlName" placeholder="请输入实际控制人名称" class="input-box99"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :sm="6" :md="6" :lg="6" :xl="6">
            <el-form-item label="营业执照" prop="busiLicense" class="margin-box3">
              <el-input
                v-model="filters.busiLicense"
                placeholder="请输入营业执照"
                class="input-box99 input-box99"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="6" :md="6" :lg="6" :xl="6">
            <el-form-item label="股东联系电话" prop="shareTel" class="margin-box3">
              <el-input v-model="filters.shareTel" placeholder="请输入股东联系电话" class="input-box99"></el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="6" :md="6" :lg="6" :xl="6">
            <el-form-item label="法人身份证" prop="legalCard" class="margin-box3">
              <el-input v-model="filters.legalCard" placeholder="请输入法人身份证" class="input-box99"></el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="6" :md="6" :lg="6" :xl="6">
            <el-form-item label="实际控制人身份证" prop="controlCard" class="margin-box3">
              <el-input v-model="filters.controlCard" placeholder="请输入实际控制人身份证" class="input-box99"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :sm="6" :md="6" :lg="6" :xl="6">
            <el-form-item label="股东名称" prop="shareName" class="margin-box3">
              <el-input
                v-model="filters.shareName"
                placeholder="请输入股东名称"
                class="input-box99 input-box99"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="6" :md="6" :lg="6" :xl="6">
            <el-form-item label="财务联系方式" prop="financeTel" class="margin-box3">
              <el-input v-model="filters.financeTel" placeholder="请输入财务联系方式" class="input-box99"></el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="6" :md="6" :lg="6" :xl="6">
            <el-form-item label="股东身份证" prop="shareCard" class="margin-box3">
              <el-input v-model="filters.shareCard" placeholder="请输入股东身份证" class="input-box99"></el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="6" :md="6" :lg="6" :xl="6">
            <el-form-item label="实际控制人联系电话" prop="controlTel" class="margin-box3">
              <el-input v-model="filters.controlTel" placeholder="请输入实际控制人联系电话" class="input-box99"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :sm="6" :md="6" :lg="6" :xl="6">
            <el-form-item label="单位名称" prop="companyName" class="margin-box3">
              <el-input
                v-model="filters.companyName"
                placeholder="请输入单位名称"
                class="input-box99 input-box99"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="6" :md="6" :lg="6" :xl="6">
            <el-form-item label="法人联系电话" prop="legalTel" class="margin-box3">
              <el-input v-model="filters.legalTel" placeholder="请输入法人联系电话" class="input-box99"></el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="6" :md="6" :lg="6" :xl="6">
            <el-form-item label="数据状态" prop="operateCategory" title="数据状态" class="margin-box3">
              <el-select
                v-model="filters.operateCategory"
                placeholder="请选择数据状态"
                class="input-box99"
              >
                <el-option
                  v-for="item in operateCategoryList"
                  :key="item.operateVlaue"
                  :label="item.operateLabel"
                  :value="item.operateVlaue"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <!-- <el-col :sm="6" :md="6" :lg="6" :xl="6">
            <el-form-item label="所属部门" prop="dataSource" class="margin-box3">
              <el-select v-model="filters.dataSource" placeholder="请选择所属部门" class="input-box98">
                <el-option
                  v-for="item in filters.checkOptions"
                  :key="item.dataSource"
                  :label="item.label"
                  :value="item.label"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col> -->
          <el-col :sm="6" :md="6" :lg="6" :xl="6">
            <el-form-item label="显示项" prop="tableNameList">
              <el-select
                v-model="filters.tableNameList"
                multiple
                collapse-tags
                placeholder="请选择显示项"
                class="input-box99"
                @change="selectAll"
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
        </el-row>
        <el-row>
          
          <el-col :sm="6" :md="6" :lg="8" :xl="8">
            <el-form-item label="操作时间" prop="operateTime" title="预警名单操作时间" class="margin-box3">
              <el-date-picker
                class="input-box111"
                v-model="filters.operateTime"
                placeholder="请输入添加时间"
                type="daterange"
                clearable
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>

        <div class="query">
          <el-button type="warning" v-on:click="getUsers" v-hasPermission="'warningByCoQuery'">查询</el-button>
          <el-button type="primary" v-on:click="resetData" v-hasPermission="'warningByCoQuery'">重置</el-button>
        </div>
      </el-form>
      <!--列表-->
      <el-col class="margin-box" v-if="ifShowCode === 0">
        <el-button type="primary" @click="handleClick" v-hasPermission="'warningByCoLead'">导入</el-button>
        <el-button type="success" @click="handleOutClick" v-hasPermission="'warningByCoExp'">导出</el-button>
        <el-button
          type="warning"
          v-hasPermission="'warningByCoInto'"
          @click="handleMoveIn"
          v-if="this.filters.operateCategory == '3'"
        >移入</el-button>
        <el-button
          type="warning"
          @click="handleMoveOut"
          v-hasPermission="'warningByCoOut'"
          v-if="this.filters.operateCategory == '2'"
        >移出</el-button>
        <el-button type="danger" @click="handleMoveDelete" v-hasPermission="'warningByCoDel'">删除</el-button>
        <el-button
          class="refresh-btn"
          @click="handleRefresh"
          v-hasPermission="'warningByCoFlush'"
        >刷新</el-button>
        <div style="float:right" v-if="ifShowCode === 0">
          <el-button
            type="danger"
            @click="downFile('warningCommonTemplate')"
            v-hasPermission="'warningByCoDown'"
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
        @selection-change="handleChangeCheck"
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
        <el-table-column
          label="操作"
          align="center"
          v-if="this.tableNameList.length !==0"
          fixed="right"
        >
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="small"
              v-hasPermission="'warningByCoDetailsBtn'"
              @click="handleDetail(scope.row.commonId)"
              class="submit_color"
            >详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 操作弹框输入原因 -->
      <el-dialog title :visible.sync="dialogOperateVisible" width="30%" center>
        <el-form :model="operateForm">
          <el-form-item label="操作原因" :label-width="formLabelWidth" class="clearfix1">
            <el-input
              type="textarea"
              :rows="4"
              v-model="operateForm.operateReason"
              autocomplete="off"
            ></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogOperateVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleOperateYes">确 定</el-button>
        </div>
      </el-dialog>
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
        financeCard: "",
        account: "",
        regAddress: "",
        actualBusiAddress: "",
        linkmanCard: "",
        linkmanName: "",
        dataSource: "",
        linkmanCard: "",
        financeName: "",
        controlName: "",
        busiLicense: "",
        shareTel: "",
        legalCard: "",
        controlCard: "",
        shareName: "",
        financeTel: "",
        shareCard: "",
        controlTel: "",
        companyName: "",
        legalTel: "",
        legalName: "",
        operateCategory: "2",
        operateTime: "",
        checkOptions: [
          {
            dataSource: "",
            label: ""
          },
          {
            dataSource: "5",
            label: "结算部"
          },
          {
            dataSource: "1",
            label: "公司部"
          },
          {
            dataSource: "2",
            label: "保卫部"
          },
          {
            dataSource: "3",
            label: "合规部"
          },
          {
            dataSource: "4",
            label: "商机汇"
          },
          {
            dataSource: "6",
            label: "产品汇"
          }
        ],
        tableNameList: []
      },
      operateCategoryList: [
        {
          operateVlaue: "2",
          operateLabel: "移入"
        },
        {
          operateVlaue: "3",
          operateLabel: "移出"
        }
      ],
      checkListObj: [],
      oldOptions: [[]],
      distributionForm: {
        value: "结算部",
        selectDeptList: [
          {
            value: "5",
            label: "结算部"
          },
          {
            value: "1",
            label: "公司部"
          },
          {
            value: "2",
            label: "保卫部"
          },
          {
            value: "3",
            label: "合规部"
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
      dialogOperateVisible: false,
      warningIdList: [],
      nowOperateTypeList: [],
      operateType: "",
      formLabelWidth: "80px",
      operateForm: {
        operateReason: ""
      },
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
    this.getCheckList();
  },
  mounted() {},
  methods: {
    selectAll(val) {
      let allValues = [];
      //保留所有值
      for (let item of this.checkListObj) {
        allValues.push(item.key);
      }

      // 用来储存上一次的值，可以进行对比
      const oldVal = this.oldOptions.length === 1 ? [] : this.oldOptions[1];

      // 若是全部选择
      if (val.includes("all")) this.filters.tableNameList = allValues;

      // 取消全部选中  上次有 当前没有 表示取消全选
      if (oldVal.includes("all") && !val.includes("all")) this.filters.tableNameList = [];

      // 点击非全部选中  需要排除全部选中 以及 当前点击的选项
      // 新老数据都有全部选中
      if (oldVal.includes("all") && val.includes("all")) {
        const index = val.indexOf("all");
        val.splice(index, 1); // 排除全选选项
        this.filters.tableNameList = val;
      }

      //全选未选 但是其他选项全部选上 则全选选上 上次和当前 都没有全选
      if (!oldVal.includes("all") && !val.includes("all")) {
        console.log(11);
        if (val.length === allValues.length - 1)
          this.filters.tableNameList = ["all"].concat(val);
      }

      //储存当前最后的结果 作为下次的老数据
      this.oldOptions[1] = this.filters.tableNameList;
    },
    handleRefresh() {
      this.$confirm("此操作需长时间, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios
            .post("/banksys/accdoubtful/refreshdoubtfullist.do", {})
            .then(res => {
              console.log(res);
              if (res.data.code == "1001") {
                this.$message.success(res.data.msg);
              } else {
                this.$message.error(res.data.msg);
              }
            })
            .catch(error => {
              this.$message.error("网络异常，请稍后重试！！！");
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消刷新"
          });
        });
    },
    //移入
    handleMoveIn() {
      let MoveInDate = this.multipleSelection;
      for (let i in MoveInDate) {
        this.warningIdList.push(MoveInDate[i].commonId);
        this.nowOperateTypeList.push(MoveInDate[i].operateType);
      }
      if (this.warningIdList.length === 0) {
        this.$message.error("请选中要移入的项！！！");
        return;
      }
      this.dialogOperateVisible = true;
      this.operateType = "2";
    },
    // 移出
    handleMoveOut() {
      let RemoveDate = this.multipleSelection;
      for (let i in RemoveDate) {
        this.warningIdList.push(RemoveDate[i].commonId);
        this.nowOperateTypeList.push(RemoveDate[i].operateType);
      }
      console.log(this.warningIdList);
      if (this.warningIdList.length === 0) {
        this.$message.error("请选中要移出的项！！！");
        return;
      }
      this.dialogOperateVisible = true;
      this.operateType = "3";
    },
    // 删除
    handleMoveDelete() {
      let deleteDate = this.multipleSelection;
      for (let i in deleteDate) {
        this.warningIdList.push(deleteDate[i].commonId);
        this.nowOperateTypeList.push(deleteDate[i].operateType);
      }
      if (this.warningIdList.length === 0) {
        this.$message.error("请选中要删除的项！！！");
        return;
      }
      this.dialogOperateVisible = true;
      this.operateType = "4";
    },
    // 确定提交操作
    handleOperateYes() {
      this.loading = true;
      this.loadingText = "操作中，请稍后！！！";
      axios
        .post("/banksys/accdoubtful/operatedoubtfulaccount.do", {
          accountIdList: this.warningIdList,
          nowOperateTypeList: this.nowOperateTypeList,
          operateType: this.operateType,
          operateReason: this.operateForm.operateReason
        })
        .then(res => {
          this.loading = false;
          this.dialogOperateVisible = false;
          if (res.data.code === "1001") {
            this.$message.success(res.data.msg);
            this.getUsers();
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
    //调用条件接口
    getCheckList() {
      this.$axios
        .post("/banksys/accdoubtful/querytablenamelist.do", {
          tableType: "com_table_name"
        })
        .then(res => {
          console.log(res);
          this.checkListObj = res.data.tableNameList;
        })
        .catch(err => {
          this.$message.error("网络异常，请重试！！！");
        });
    },
    //导出
    handleOutClick() {
      this.loading = true;
      this.loadingText = "导出中，请稍后！！！";
      let req = {};
      for (var i = 0; i < this.multipleSelection.length; i++) {
        var commonId = this.multipleSelection[i].commonId;
        this.checkId.push(commonId);
      }
      req = {
        dataType: "1",
        doubtfulAccIdList: this.checkId,
        subName: this.filters.subName,
        openBankName: this.filters.openBankName,
        financeCard: this.filters.financeCard,
        account: this.filters.account,
        regAddress: this.filters.regAddress,
        actualBusiAddress: this.filters.actualBusiAddress,
        linkmanTel: this.filters.linkmanTel,
        linkmanName: this.filters.linkmanName,
        dataSource: this.filters.dataSource,
        linkmanCard: this.filters.linkmanCard,
        financeName: this.filters.financeName,
        controlName: this.filters.controlName,
        busiLicense: this.filters.busiLicense,
        shareTel: this.filters.shareTel,
        legalCard: this.filters.legalCard,
        controlCard: this.filters.controlCard,
        shareName: this.filters.shareName,
        financeTel: this.filters.financeTel,
        shareCard: this.filters.shareCard,
        controlTel: this.filters.controlTel,
        companyName: this.filters.companyName,
        legalTel: this.filters.legalTel,
        legalName: this.filters.legalName
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
          this.loading = false;
          this.checkId = [];
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
      fd.append("fileCode", "");
      axios({
        method: "post",
        data: fd,
        url: "/banksys/accdoubtful/recdoubtfuldatacommon.do",
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
                  url: "/banksys/accdoubtful/recdoubtfuldatacommon.do",
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
    handleChangeCheck(selection) {
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
        financeCard: this.filters.financeCard,
        account: this.filters.account,
        regAddress: this.filters.regAddress,
        actualBusiAddress: this.filters.actualBusiAddress,
        linkmanTel: this.filters.linkmanTel,
        linkmanName: this.filters.linkmanName,
        dataSource: this.filters.dataSource,
        linkmanCard: this.filters.linkmanCard,
        financeName: this.filters.financeName,
        controlName: this.filters.controlName,
        busiLicense: this.filters.busiLicense,
        shareTel: this.filters.shareTel,
        legalCard: this.filters.legalCard,
        controlCard: this.filters.controlCard,
        shareName: this.filters.shareName,
        financeTel: this.filters.financeTel,
        shareCard: this.filters.shareCard,
        controlTel: this.filters.controlTel,
        companyName: this.filters.companyName,
        legalTel: this.filters.legalTel,
        legalName: this.filters.legalName,
        tableNameList: this.filters.tableNameList,
        operateTime: this.filters.operateTime,
        operateCategory: this.filters.operateCategory,
        pagenum: this.page,
        rows: this.pageSize
      };
      this.listLoading = true;
      axios({
        method: "post",
        url: "/banksys/accdoubtful/querydoubtfuldatacommon.do",
        data: para
      })
        .then(res => {
          if (res.data.code === "1001") {
            //   this.$message.success(res.data.msg);
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
        path: "/GeneralDetail",
        query: { commonId: id }
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
.el-row {
  box-sizing: border-box;
}
.input-box99 {
  width: 200px !important;
}
.clearfix1 {
  float: none !important;
}
.input-box98 {
  width: 200px !important;
  margin-left: 14px !important;
}
.input-box111 {
  width: 250px !important;
}
.el-row > div:nth-child(2) > .margin-box3 {
  margin-left: -44px !important;
}
.el-row > div:nth-child(3) > .margin-box3 {
  margin-left: -34px !important;
}
.el-row:nth-child(1) > div:nth-child(4) > .margin-box3 {
  margin-left: 14px !important;
}
.el-row:nth-child(3) > div:nth-child(4) > .margin-box3 {
  margin-left: -56px !important;
}
.el-row:nth-child(4) > div:nth-child(4) > .margin-box3 {
  margin-left: -70px !important;
}
.el-row:nth-child(5) > div:nth-child(4) > .margin-box3 {
  margin-left: -84px !important;
}
.refresh-btn {
  color: #fff;
  background-color: #858ffd;
  border-color: #858ffd;
}
.refresh-btn :hover {
  opacity: 0.7;
  color: #fff;
}
</style>
