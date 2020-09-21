<template>
  <section v-loading="loading" :element-loading-text="loadingText">
    <!--工具条-->
    <el-col :span="24" class="toolbar" v-if="!loading">
      <el-form :inline="true" :model="filters">
        <div class="block">
          <span class="demonstration">级别:</span>
          <el-select v-model="filters.level" placeholder="请选择" @change="getTableData">
            <el-option
              v-for="item in optionList"
              :key="item.level"
              :label="item.label"
              :value="item.level"
            ></el-option>
          </el-select>
        </div>
        <!-- <div class="block">
          <span class="demonstration">银行名称:</span>
          <el-cascader
            clearable
            :show-all-levels="false"
            placeholder="请输入银行名称"
            :options="filters.options"
            :props="filters.defaultData"
            @change="handleChangeCode"
            collapse-tags
          ></el-cascader>
        </div> -->
        <el-button type="warning" v-hasPermission="'butESQuery'" v-on:click="getTableData">查询</el-button>
        <el-button type="primary" v-hasPermission="'butESReset'" v-on:click="clearConditions">重置</el-button>
        <el-button type="success" v-hasPermission="'butESExport'" v-on:click="handleOut">导出</el-button>
      </el-form>
      <!--列表-->
      <el-table
        :data="tableData"
        v-loading="listLoading"
        border
        :max-height="tableHeight"
        style="width: 100%;"
        :header-cell-style="styleObj"
        :span-method="objectSpanMethod"
      >
        <el-table-column prop="subName" label="支行" v-if="ifShow == true" align="center" key='1'></el-table-column>
        <el-table-column prop="unitName" label="开户银行"  key='2' align="center"></el-table-column>
        <el-table-column
          v-if="this.ifShowStaff === '4'"
          key='3'
          prop="staffName"
          label="员工姓名"
          align="center"
        ></el-table-column>
        <el-table-column prop="dataTotal" label="数据总量"  key='4' align="center">
        </el-table-column>
        <el-table-column prop="marketSuccessNum"  key='5' label="营销成功" align="center"></el-table-column>
        <el-table-column prop="marketFailedNum"  key='6' label="营销失败" align="center"></el-table-column>
        <el-table-column prop="nomarketNum"  key='7' label="未反馈/未营销" align="center"></el-table-column>
        <el-table-column prop="subNoDisNum"  key='13' label="支行未分发数据量" v-if="ifShowSubNoDisNum" align="center"></el-table-column>
        <el-table-column prop="unitNoDisNum"  key='14' label="网点未分发数据量" v-if="ifShowUnitNoDisNum" align="center"></el-table-column>
        <el-table-column prop="marketSuccessRate"  key='8' label="营销成功率" align="center">
          <template slot-scope="scope">{{scope.row.marketSuccessRate}}%</template>
        </el-table-column>
        <el-table-column prop="proportion"  key='9' label="营销成功占比率" align="center">
          <template slot-scope="scope">{{scope.row.proportion}}%</template>
        </el-table-column>
        <el-table-column prop="number" :label="labelConent" key='10' align="center" v-if="isShowCont">
        </el-table-column>
        <el-table-column prop="numberByUnit" label="网点在支行排名" key='11' align="center" v-if="isShowCont2">
        </el-table-column>
        <el-table-column prop="numberByStaff" label="员工在网点排名" key='12' align="center" v-if="isShowCont3">
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
      labelConent:"",
      ifShowSubNoDisNum: false,
      ifShowUnitNoDisNum: false,
      isShowCont: false,
      isShowCont2: false,
      isShowCont3: false,
      filters: {
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
      ifShowStaff: "",
      tableData: [],
      sendData: [],
      ifShow: true,
      listLoading: false,
      spanArr: [], // 一个空的数组，用于存放每一行记录的合并数
      pos: 0, // spanArr 的索引
      contentSpanArr: [],
      leaveSpanArr: [],
      position: 0,
      lev: 0,
      styleObj: {
        background: "#eef1f6",
        "border-color": "#dbdbdb",
        "text-align": "center"
      },
      optionList: [],
      options2: [
        {
          level: "1",
          label: "分行"
        },
        {
          level: "2",
          label: "支行"
        },
        {
          level: "3",
          label: "网点"
        },
        {
          level: "4",
          label: "员工"
        }
      ],
      options3: [
        {
          level: "1",
          label: "支行"
        },
        {
          level: "2",
          label: "网点"
        },
        {
          level: "3",
          label: "员工"
        }
      ],
      options4: [
        {
          level: "1",
          label: "网点"
        },
        {
          level: "2",
          label: "员工"
        }
      ],
      options5: [
        {
          level: "1",
          label: "员工"
        }
      ]
    };
  },
  mounted() {
    this.getBankList();
    this.getTableData();
  },
  methods: {
    // 导出
    handleOut(){
      this.loading = true;
      this.loadingText = "导出中，请稍后！！！";
      let req = {};
      req = {
        statiType: '0',
        statiData: this.sendData
      };
       axios({
        method: "post",
        data: req,
        url: "/banksys/busimarket/exportbusistatidata.do",
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
          console.log(err);
        });
    },
    // 重置选择条件
    clearConditions() {
      this.filters.level = "1";
    },
    //合并单元格
    //row:行对象，带有一行所有数据，column:列对象
    //rowIndex:行索引，columnIndex:列索引
    //加载表格时从（0，0）开始，（0，1）···（1，0）,(1,1)···依次获取数据
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      const sef = this;
      if (this.ifShowStaff === "4") {
        if (columnIndex === 0) {
          //每次走到第0列时给单元格加上rowspan和colspan属性
          const _row = this.spanArr[rowIndex];
          const _col = _row > 0 ? 1 : 0;
          return {
            rowspan: _row,
            colspan: _col //相当于给给表格加上rowspan,colspan属性
          };
        } else if (columnIndex === 1) {
          //每次走到第0列时给单元格加上rowspan和colspan属性
          const _row = this.contentSpanArr[rowIndex];
          const _col = _row > 0 ? 1 : 0;
          return {
            rowspan: _row,
            colspan: _col //相当于给给表格加上rowspan,colspan属性
          };
        } 
        // else if (columnIndex === 9) { // 合并全行排名
        //   //每次走到第0列时给单元格加上rowspan和colspan属性
        //   const _row = this.leaveSpanArr[rowIndex];
        //   const _col = _row > 0 ? 1 : 0;
        //   return {
        //     rowspan: _row,
        //     colspan: _col //相当于给给表格加上rowspan,colspan属性
        //   };
        // }
      } else if (this.ifShowStaff === "3") {
        if (columnIndex === 0) {
          //每次走到第0列时给单元格加上rowspan和colspan属性
          const _row = this.spanArr[rowIndex];
          const _col = _row > 0 ? 1 : 0;
          return {
            rowspan: _row,
            colspan: _col //相当于给给表格加上rowspan,colspan属性
          };
        } else if (columnIndex === 1) {
          //每次走到第0列时给单元格加上rowspan和colspan属性
          const _row = this.contentSpanArr[rowIndex];
          const _col = _row > 0 ? 1 : 0;
          return {
            rowspan: _row,
            colspan: _col //相当于给给表格加上rowspan,colspan属性
          };
        }
        //  else if (columnIndex === 7) { // 合并全行排名
        //   //每次走到第0列时给单元格加上rowspan和colspan属性
        //   const _row = this.leaveSpanArr[rowIndex];
        //   const _col = _row > 0 ? 1 : 0;
        //   return {
        //     rowspan: _row,
        //     colspan: _col //相当于给给表格加上rowspan,colspan属性
        //   };
        // }
      } else {
        if (columnIndex === 0) {
          //每次走到第0列时给单元格加上rowspan和colspan属性
          const _row = this.spanArr[rowIndex];
          const _col = _row > 0 ? 1 : 0;
          return {
            rowspan: _row,
            colspan: _col //相当于给给表格加上rowspan,colspan属性
          };
        }
      }
    },
    //由于数据是动态的，所以页面加载时需要调用下面的方法，根据后台数据处理以知道要合并的行/列
    //得到的spanArr数组表示某一行所需要合并的列数
    // 获取列表数据
    getSpanArr: function(data) {
      this.spanArr = []; //定义在vue的data中
      this.contentSpanArr = []; //定义在vue的data中
      this.leaveSpanArr = []; //定义在vue的data中
      if (data == null) {
        return;
      }
      const sef = this;
      if (this.ifShowStaff === "4") {
        for (var i = 0; i < data.length; i++) {
          if (i === 0) {
            this.spanArr.push(1);
            this.pos = 0;
            this.contentSpanArr.push(1);
            this.position = 0;
            this.leaveSpanArr.push(1); // 合并相关全行排名的字段值
            this.lev = 0;
          } else {
            // 判断当前元素与上一个元素是否相同
            if (data[i].subName === data[i - 1].subName) {
              this.spanArr[this.pos] += 1; //需要合并的行数
              this.spanArr.push(0); //新增被合并的行
            } else {
              this.spanArr.push(1);
              this.pos = i; //新的需要合并的第几行数
            }
            // 判断当前元素与上一个元素是否相同
            if (data[i].unitName === data[i - 1].unitName) {
              this.contentSpanArr[this.position] += 1; //需要合并的行数
              this.contentSpanArr.push(0); //新增被合并的行
            } else {
              this.contentSpanArr.push(1);
              this.position = i; //新的需要合并的第几行数
            }
            // 判断当前元素与上一个元素是否相同
            if (data[i].unitName === data[i - 1].unitName) {
              this.leaveSpanArr[this.lev] += 1; //需要合并的行数
              this.leaveSpanArr.push(0); //新增被合并的行
            } else {
              this.leaveSpanArr.push(1);
              this.lev = i; //新的需要合并的第几行数
            }
          }
        }
      } else if (this.ifShowStaff === "3") {
        for (var i = 0; i < data.length; i++) {
          if (i === 0) {
            this.spanArr.push(1);
            this.pos = 0;
            this.contentSpanArr.push(1);
            this.position = 0;
            this.leaveSpanArr.push(1);
            this.lev = 0;
          } else {
            // 判断当前元素与上一个元素是否相同
            if (data[i].subName === data[i - 1].subName) {
              this.spanArr[this.pos] += 1; //需要合并的行数
              this.spanArr.push(0); //新增被合并的行
            } else {
              this.spanArr.push(1);
              this.pos = i; //新的需要合并的第几行数
            }
            // 判断当前元素与上一个元素是否相同
            if (data[i].unitName === data[i - 1].unitName) {
              this.contentSpanArr[this.position] += 1; //需要合并的行数
              this.contentSpanArr.push(0); //新增被合并的行
            } else {
              this.contentSpanArr.push(1);
              this.position = i; //新的需要合并的第几行数
            }
            // 判断当前元素与上一个元素是否相同
            if (data[i].unitName === data[i - 1].unitName) {
              this.leaveSpanArr[this.lev] += 1; //需要合并的行数
              this.leaveSpanArr.push(0); //新增被合并的行
            } else {
              this.leaveSpanArr.push(1);
              this.lev = i; //新的需要合并的第几行数
            }
          }
        }
      } else {
        for (var i = 0; i < data.length; i++) {
          if (i === 0) {
            this.spanArr.push(1);
            this.pos = 0;
            this.contentSpanArr.push(1);
            this.position = 0;
          } else {
            // 判断当前元素与上一个元素是否相同
            if (data[i].unitName === data[i - 1].unitName) {
              this.spanArr[this.pos] += 1; //需要合并的行数
              this.spanArr.push(0); //新增被合并的行
            } else {
              this.spanArr.push(1);
              this.pos = i; //新的需要合并的第几行数
            }
          }
        }
      }
    },

    handleChangeCode(e, form, thsAreaCode) {
      this.filters.checkCode = e;
    },
    // 获取银行名称列表
    getBankList() {
      axios
        .post("/banksys/system/common/queryunitcode.do", {
          returnType: "tree",
          tableType: "1"
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
        level: this.filters.level,
        unitCodes: this.filters.checkCode
      };
      this.listLoading = true;
      axios({
        method: "post",
        url: "/banksys/busimarket/countentinfodatas.do",
        data: para
      })
        .then(res => {
          if (res.data.showRank === 1) {
          	this.ifShowSubNoDisNum = true;
          	this.ifShowUnitNoDisNum = true;
            this.isShowCont = true;
            this.isShowCont2 = false;
            this.isShowCont3 = false;
            this.labelConent = '支行在全行排名'
          } else if(res.data.showRank === 2) {
          	this.ifShowSubNoDisNum = false;
          	this.ifShowUnitNoDisNum = true;
            this.isShowCont = true;
            this.isShowCont2 = true;
            this.isShowCont3 = false;
            this.labelConent = '网点在全行排名'
          } else if(res.data.showRank === 3){
          	this.ifShowSubNoDisNum = false;
          	this.ifShowUnitNoDisNum = false;
            this.isShowCont = true;
            this.isShowCont2 = false;
            this.isShowCont3= true;
            this.labelConent = '员工在全行排名'
          } else {
          	this.ifShowSubNoDisNum = false;
          	this.ifShowUnitNoDisNum = false;
            this.isShowCont = false;
            this.isShowCont2 = false;
            this.isShowCont3 = false;
          }
          this.ifShowStaff = res.data.ifShowStaff;
           if (this.ifShowStaff === "3" || this.ifShowStaff === "4") {
            this.ifShow = true;
          } else {
            this.ifShow = false;
          }
          if (res.data.unitRank === 0) {
            this.optionList = this.options2;
          } else if (res.data.unitRank === 1) {
            this.optionList = this.options3;
          } else if (res.data.unitRank === 2) {
            this.optionList = this.options4;
          } else if (res.data.unitRank === 3) {
            this.optionList = this.options5;
          }
          if (res.data.code === "1001") {
            this.$message.success(res.data.msg);
            this.tableData = res.data.data;
            this.sendData = res.data;
            this.listLoading = false;
            ctx.getSpanArr(ctx.tableData);
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
.el-form-item {
  width: 100% !important;
}
.el-date-editor {
  width: 240px !important;
}
.el-cascader {
  width: 300px !important;
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