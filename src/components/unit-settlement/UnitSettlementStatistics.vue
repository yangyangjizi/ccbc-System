<template>
  <section v-loading="loading" :element-loading-text="loadingText">
    <!--工具条-->
    <el-col :span="24" class="toolbar" v-if="!loading">
      <el-form :inline="true" :model="filters" class="clearfix">
        <div class="block">
          <span class="demonstration">上传时间:</span>
          <el-date-picker
            v-model="filters.statisticsTime"
            type="date"
            :clearable="false"
            placeholder="选择日期"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </div>
        <div class="block">
          <span class="demonstration">银行名称:</span>
          <el-cascader
            placeholder="请输入银行名称"
            :options="filters.options"
            :props="filters.defaultData"
            @change="handleChangeCode"
            collapse-tags
            class="input-box6"
          ></el-cascader>
        </div>
        <div class="block">
          <span class="demonstration">级别:</span>
          <el-select v-model="filters.level" placeholder="请选择" @change="getTableData">
            <el-option
              v-for="item in options2"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
        <el-button type="warning" v-on:click="getTableData" v-hasPermission="'accNumQuery'">查询</el-button>
      </el-form>
      <div class="margin-box">
        <el-button type="primary" @click="handleClick" v-hasPermission="'accNumLead'">导入</el-button>
        <el-button
          type="success"
          class="margin-box"
          v-on:click="exportexcel"
          v-hasPermission="'accNumExport'"
        >导出</el-button>
        <div style="float:right">
          <!-- <el-button
            type="danger"
            @click="downFile('unitSettlementTemplate')"
            v-hasPermission="'accNumDown'"
          >下载导入模版</el-button>-->
        </div>
      </div>

      <!-- 导入选择时间 -->
      <el-dialog
        :visible.sync="dialogDistributionState"
        @close="handleClose"
        title="导入时间"
        width="30%"
        center
      >
        <el-form :model="distributionForm" label-width="80px" class="el-form-box">
          <el-form-item label="统计时间:">
            <el-date-picker
              v-model="distributionForm.statisticsTime"
              type="date"
              :clearable="false"
              @blur="handleCheckTime"
              placeholder="选择日期"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-form-item>
        </el-form>
        <el-upload
          ref="upload"
          action
          :limit="1"
          accept=".xlsx, .xls"
          :on-success="handleview"
          :show-file-list="false"
          :http-request="uploadFile"
          :file-list="fileList"
          :before-upload="beforeExcelUpload"
        >
          <el-button type="primary" :disabled="handleDisabled">导入</el-button>
        </el-upload>
      </el-dialog>

      <!--支行数据列表-->
      <el-table
        :data="tableData"
        :max-height="tableHeight"
        v-loading="listLoading"
        border
        style="width: 100%;"
        :header-cell-style="styleObj"
        @select="handleClickRow"
        @select-all="handleClickAllRow"
        v-show="filters.level === '1'"
      >
        <el-table-column prop="unitName" label="银行机构" align="center" width="380px">
          <template slot-scope="scope">{{scope.row.subName}}</template>
        </el-table-column>
        <!-- <el-table-column prop="basicNum" label="基本账户" v-if="ifShow" align="center"> -->
        <el-table-column prop="basicNum" label="基本账户" align="center">
          <template slot-scope="scope">{{scope.row.basicNum}}</template>
        </el-table-column>
        <el-table-column prop="genNum" label="一般账户" align="center">
          <template slot-scope="scope">{{scope.row.genNum}}</template>
        </el-table-column>
        <el-table-column prop="deSubNum" label="专用账户" align="center">
          <template slot-scope="scope">{{scope.row.deSubNum}}</template>
        </el-table-column>
        <el-table-column prop="temSubNum" label="临时账户" align="center">
          <template slot-scope="scope">{{scope.row.temSubNum}}</template>
        </el-table-column>
        <el-table-column prop="total" label="合计" align="center">
          <template slot-scope="scope">{{scope.row.total}}</template>
        </el-table-column>
        <el-table-column prop="theYearTask" :label="label1 + '年任务数'" align="center">
          <template slot-scope="scope">{{scope.row.theYearTask }}</template>
        </el-table-column>
        <el-table-column prop="oldYearNum" :label="label2 + '年度账户数量'" align="center">
          <template slot-scope="scope">{{scope.row.oldYearNum}}</template>
        </el-table-column>
        <el-table-column prop="addNum" label="新增账户数量" align="center">
          <template slot-scope="scope">{{scope.row.addNum}}</template>
        </el-table-column>
        <el-table-column prop="sussFm" label="完成率" align="center">
          <template slot-scope="scope">{{scope.row.sussFm}}</template>
        </el-table-column>
      </el-table>

      <!--网点数据列表-->
      <el-table
        :data="tableData"
        :max-height="tableHeight"
        v-loading="listLoading"
        border
        style="width: 100%;"
        :header-cell-style="styleObj"
        @select="handleClickRow"
        @select-all="handleClickAllRow"
        :span-method="objectSpanMethod"
        v-show="filters.level === '2'"
      >
        <el-table-column prop="upName" label="支行" align="center">
          <template slot-scope="scope">{{scope.row.upName}}</template>
        </el-table-column>
        <el-table-column prop="subName" label="银行机构" align="center" width="380px">
          <template slot-scope="scope">{{scope.row.subName}}</template>
        </el-table-column>
        <el-table-column prop="basicNum" label="基本账户" align="center">
          <template slot-scope="scope">{{scope.row.basicNum}}</template>
        </el-table-column>
        <el-table-column prop="genNum" label="一般账户" align="center">
          <template slot-scope="scope">{{scope.row.genNum}}</template>
        </el-table-column>
        <el-table-column prop="deSubNum" label="专用账户" align="center">
          <template slot-scope="scope">{{scope.row.deSubNum}}</template>
        </el-table-column>
        <el-table-column prop="temSubNum" label="临时账户" align="center">
          <template slot-scope="scope">{{scope.row.temSubNum}}</template>
        </el-table-column>
        <el-table-column prop="total" label="合计" align="center">
          <template slot-scope="scope">{{scope.row.total}}</template>
        </el-table-column>
        <el-table-column prop="oldYearNum" :label="label2 + '年度账户数量'" align="center">
          <template slot-scope="scope">{{scope.row.oldYearNum}}</template>
        </el-table-column>
        <el-table-column prop="addNum" label="新增账户数量" align="center">
          <template slot-scope="scope">{{scope.row.addNum}}</template>
        </el-table-column>
        <el-table-column prop="number" label="新增排名" align="center">
          <el-table-column label="支行排名" align="center">
            <template slot-scope="scope">{{scope.row.number}}</template>
          </el-table-column>
          <el-table-column prop="numberByBank" label="网点在全行排名" align="center">
            <template slot-scope="scope">{{scope.row.numberByBank}}</template>
          </el-table-column>
          <el-table-column prop="numberByUnit" label="网点在本支行排名" align="center">
            <template slot-scope="scope">{{scope.row.numberByUnit}}</template>
          </el-table-column>
        </el-table-column>
      </el-table>
    </el-col>
  </section>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      loading: "",
      loadingText: "拼命加载中",
      tableHeight: "570px",
      label1: "",
      label2: "",
      handleDisabled: true,
      distributionForm: {
        statisticsTime: ""
      },
      filters: {
        statisticsTime: new Date(),
        level: "1",
        checkCode: "",
        options: [],
        defaultData: {
          //联级选择
          multiple: true,
          value: "unitCode",
          label: "unitName",
          children: "children"
        }
      },
      dialogDistributionState: false,
      tableData: [],
      ifShow: false,
      listLoading: false,
      spanArr: [], // 一个空的数组，用于存放每一行记录的合并数
      pos: 0, // spanArr 的索引
      contentSpanArr: [],
      multipleSelection: [],
      fileList: [],
      // checkId: [],
      position: 0,
      styleObj: {
        background: "#eef1f6",
        "border-color": "#dbdbdb",
        "text-align": "center"
      },
      options2: [
        {
          value: "1",
          label: "支行"
        },
        {
          value: "2",
          label: "网点"
        }
      ]
    };
  },
  created() {
    this.getNowFormatDate();
  },
  mounted() {
    this.getBankList();
    this.getTableData();
  },
  methods: {
    //获取当前时间，格式YYYY-MM-DD
    getNowFormatDate() {
      var date = new Date();
      var seperator1 = "-";
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      this.filters.statisticsTime =
        year + seperator1 + month + seperator1 + strDate;
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
    //导入选择时间弹框关闭
    handleClose() {
      this.distributionForm.statisticsTime = "";
      this.fileList = [];
      this.handleDisabled = !this.handleDisabled;
    },
    //合并单元格
    //row:行对象，带有一行所有数据，column:列对象
    //rowIndex:行索引，columnIndex:列索引
    //加载表格时从（0，0）开始，（0，1）···（1，0）,(1,1)···依次获取数据
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      const sef = this;
      if (columnIndex === 9 || columnIndex === 0) {
        //每次走到第0列时给单元格加上rowspan和colspan属性
        const _row = this.spanArr[rowIndex];
        const _col = _row > 0 ? 1 : 0;
        return {
          rowspan: _row,
          colspan: _col //相当于给给表格加上rowspan,colspan属性
        };
      }
    },

    //由于数据是动态的，所以页面加载时需要调用下面的方法，根据后台数据处理以知道要合并的行/列
    //得到的spanArr数组表示某一行所需要合并的列数
    // 获取列表数据
    getSpanArr: function(data) {
      this.spanArr = []; //定义在vue的data中
      this.contentSpanArr = []; //定义在vue的data中
      if (data == null) {
        return;
      }
      const sef = this;
      if (sef.filters.level === "2") {
        for (var i = 0; i < data.length; i++) {
          if (i === 0) {
            this.spanArr.push(1);
            this.pos = 0;
            this.contentSpanArr.push(1);
            this.position = 0;
          } else {
            // 判断当前元素与上一个元素是否相同
            if (data[i].subCode === data[i - 1].subCode) {
              this.spanArr[this.pos] += 1; //需要合并的行数
              this.spanArr.push(0); //新增被合并的行
            } else {
              this.spanArr.push(1);
              this.pos = i; //新的需要合并的第几行数
            }
            // 判断当前元素与上一个元素是否相同
            if (data[i].subCode === data[i - 1].subCode) {
              this.contentSpanArr[this.position] += 1; //需要合并的行数
              this.contentSpanArr.push(0); //新增被合并的行
            } else {
              this.contentSpanArr.push(1);
              this.position = i; //新的需要合并的第几行数
            }
          }
        }
      }
    },
    handleCheckTime() {
      if (this.distributionForm.statisticsTime) {
        this.handleDisabled = false;
      }
    },
    handleClick() {
      this.dialogDistributionState = true;
    },

    // 导入文件
    handleview() {},
    uploadFile(ele) {
      this.dialogDistributionState = false;
      const formData = new FormData();
      formData.append("file", ele.file);
      formData.append("statisticsTime", this.distributionForm.statisticsTime);
      formData.append("fileCode", "");
      this.loading = true;
      this.loadingText = "导入中，请稍后！！！";
      axios({
        method: "post",
        data: formData,
        url: "/banksys/accyearly/receiveaccdata.do",
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }).then(res => {
        this.dialogDistributionState = false;
        if (res.data.code == "1001") {
          this.loading = false;
          this.$message.success(res.data.msg);
          this.getTableData();
        } else if (res.data.code === "1007") {
          this.$confirm("此操作将覆盖当日文件, 是否继续?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(() => {
              formData.set("fileCode", "1");
              this.loading = true;
              this.loadingText = "导入中，请稍后！！！";
              axios({
                method: "post",
                data: formData,
                url: "/banksys/accyearly/receiveaccdata.do",
                headers: {
                  "Content-Type": "multipart/form-data"
                }
              })
                .then(res => {
                  this.dialogDistributionState = false;
                  this.loading = false;
                  if (res.data.code == "1001") {
                    this.$message.success(res.data.msg);
                    this.getTableData();
                    formData.set("fileCode", "");
                  } else {
                    this.$message.error(res.data.msg);
                    formData.set("fileCode", "");
                  }
                })
                .catch(err => {
                  this.dialogDistributionState = false;
                  this.loading = false;
                  console.log(err);
                });
            })
            .catch(() => {
              this.dialogDistributionState = false;
              this.loading = false;
              this.$message({
                type: "info",
                message: "已取消覆盖"
              });
            });
        } else if (res.data.code === "1008") {
          this.loading = false;
          this.$message({
            showClose: true,
            duration: 10000,
            message: res.data.msg,
            type: "error"
          });
        } else {
          this.loading = false;
          this.$message.error(res.data.msg);
        }
      });
    },
    // 获取点击的行
    handleClickRow(selection, row) {
      this.multipleSelection = selection;
    },
    handleClickAllRow(selection) {
      this.multipleSelection = selection;
    },
    // 数据导出
    exportexcel() {
      // let sef = this;
      this.loading = true;
 this.loadingText = "导出中，请稍后！！！";

      let req = {};
      // for (var i = 0; i < this.multipleSelection.length; i++) {
      //   var yewId = this.multipleSelection[i].yewId;
      //   this.checkId.push(yewId);
      // }
      req = {
        statisticsTime: this.filters.statisticsTime,
        level: this.filters.level,
        unitCodes: this.filters.checkCode
      };
      axios({
        method: "post",
        data: req,
        url: "/banksys/accyearly/exportaccdata.do",
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
          // this.checkId = [];
        })
        .catch(err => {
          this.loading = false;
          console.log(err);
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
    //获取展示列表
    getTableData() {
      let ctx = this;
      let para = {
        statisticsTime: this.filters.statisticsTime,
        level: this.filters.level,
        unitCodes: this.filters.checkCode
      };
      this.listLoading = true;
      axios({
        method: "post",
        url: "/banksys/accyearly/queryaccdatalist.do",
        data: para
      })
        .then(res => {
          if (res.data.code === "1001") {
            this.$message.success(res.data.msg);
            this.label1 = res.data.theYear;
            this.label2 = res.data.oldYear;
            this.tableData = res.data.data;
            this.listLoading = false;
            if (this.filters.level === "2") {
              ctx.getSpanArr(ctx.tableData);
            }
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
.el-col {
  margin-bottom: 10px !important;
}
.el-form-item {
  width: 100% !important;
}
.el-date-editor {
  width: 240px !important;
}
.el-cascader {
  width: 200px !important;
}
.el-select {
  width: 200px !important;
}
.block {
  float: left;
  margin-right: 20px;
  margin-bottom: 10px;
}
.block span {
  margin-right: 10px;
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
.statime {
  margin-right: 20px;
}
</style>