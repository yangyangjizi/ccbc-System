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
          <el-col :sm="6" :md="6" :lg="6" :xl="6">
            <el-form-item label="数据操作类别" prop="operateCategory" class="margin-box3" title="预警名单操作类别">
              <el-select
                v-model="filters.operateCategory"
                placeholder="请选择预警名单操作类别"
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
          <el-col :sm="6" :md="6" :lg="6" :xl="6">
            <el-form-item label="操作时间" title="预警名单操作时间"  prop="operateTime" class="margin-box3">
              <el-date-picker
               class="input-box111"
                v-model="filters.operateTime"
                placeholder="请输入预警名单操作时间"
                type="daterange"
                clearable
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :sm="6" :md="6" :lg="6" :xl="6">
            <el-form-item label="预警操作类别" title="预警详情操作类别" prop="detailOperateCategory" class="margin-box3">
              <el-select
                v-model="filters.detailOperateCategory"
                placeholder="请选择预警详情操作类别"
                class="input-box98"
              >
                <el-option
                  v-for="item in detailOperateCategoryList"
                  :key="item.operateVlaue"
                  :label="item.operateLabel"
                  :value="item.operateVlaue"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :sm="6" :md="6" :lg="6" :xl="6">
            <el-form-item label="操作时间" title="预警数据操作时间" prop="detailOperateTime" class="margin-box3">
               <el-date-picker
                class="input-box111"
                v-model="filters.detailOperateTime"
                placeholder="请输入预警数据操作时间"
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
          <el-button type="warning" v-on:click="getUsers" v-hasPermission="'warningByCaseQueryBtn'">查询</el-button>
          <el-button type="primary" v-on:click="resetData" v-hasPermission="'warningByCaseQueryBtn'">重置</el-button>
        </div>
      </el-form>
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
              @click="handleDetail(scope.row.commonId)"
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
        operateCategory: "",
        operateTime: "",
        detailOperateCategory:"",
        detailOperateTime:"",
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
          operateVlaue: "",
          operateLabel: "全部",
        },
        {
          operateVlaue: "6",
          operateLabel: "发布",
        },
        {
          operateVlaue: "3",
          operateLabel: "移出",
        },
        {
          operateVlaue: "4",
          operateLabel: "删除",
        }
      ],
      detailOperateCategoryList: [
         {
          operateVlaue: "",
          operateLabel: "全部",
        },
        {
          operateVlaue: "6",
          operateLabel: "发布",
        },
        {
          operateVlaue: "3",
          operateLabel: "移出",
        },
        {
          operateVlaue: "4",
          operateLabel: "删除",
        },
        {
          operateVlaue: "5",
          operateLabel: "查看",
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
    //调用条件接口
    getCheckList() {
      this.$axios
        .post("/banksys/accdoubtful/querytablenamelist.do", {
          tableType: "com_table_name",
          pageType:"warningByCase"
        })
        .then(res => {
          this.checkListObj = res.data.tableNameList;
        })
        .catch(err => {
          this.$message.error("网络异常，请重试！！！");
        });
    },

    //导入选择时间弹框关闭
    handleClose() {
      this.distributionForm.statisticsTime = "";
      this.fileList = [];
      this.handleDisabled = !this.handleDisabled;
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
        operateCategory: this.filters.operateCategory,
        operateTime: this.filters.operateTime,
        detailOperateCategory: this.filters.detailOperateCategory,
        detailOperateTime: this.filters.detailOperateTime,
        pageType: 'warningByCase',
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
        path: "/WarningCheckSituationDetail",
        query: { commonId: id,detailOperateCategory:this.filters.detailOperateCategory,detailOperateTime:JSON.stringify(this.filters.detailOperateTime)}
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
.input-box111 {
  width: 250px !important;
}
.input-box98 {
  width: 200px !important;
  margin-left: 14px !important;
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
.el-row:nth-child(7) > div:nth-child(4) > .margin-box3 {
  margin-left: -64px !important;
}
</style>
