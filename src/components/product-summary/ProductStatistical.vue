<template>
  <section>
    <!--工具条-->
    <el-col :span="24" class="toolbar">
      <el-form :inline="true" :model="filters" class="clearfix">
        <div class="block">
          <span class="demonstration">统计结果选择:</span>
          <el-select v-model="filters.resultCheck" @change="handleChange" placeholder="请选择">
            <el-option
              v-for="item in resultCheckList"
              :key="item.statiType"
              :label="item.resultCheckName"
              :value="item.statiType"
            ></el-option>
          </el-select>
        </div>
        <div class="block" v-if="filters.resultCheck !=='0'">
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
        <div class="block" v-if="filters.resultCheck ==='1'">
          <span class="demonstration">产品名称:</span>
          <el-select
            v-model="filters.productOne"
            multiple
            collapse-tags
            clearable
            placeholder="请选择"
          >
            <el-option
              v-for="item in productList"
              :key="item.label"
              :label="item.label"
              :value="item.label"
            ></el-option>
          </el-select>
        </div>

        <div class="block" v-if="filters.resultCheck ==='1'">
          <span class="demonstration">导入时间</span>
          <el-date-picker
            v-model="filters.leadTime"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </div>
        <div class="block" v-if="filters.resultCheck ==='2'">
          <span class="demonstration">导入时间</span>
          <el-date-picker
            v-model="filters.leadTime2"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </div>
        <div class="block" v-if="filters.resultCheck ==='1'">
          <span class="demonstration">反馈时间</span>
          <el-date-picker
            v-model="filters.backTime"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </div>
        <div :class="filters.level =='4'? 'query':'block'">
          <el-button type="warning" v-hasPermission="'proSBUquery'" v-on:click="getTableData">查询</el-button>
          <el-button type="primary" v-hasPermission="'grabReset'" v-on:click="clearConditions">重置</el-button>
        </div>
      </el-form>
      <!--列表-->
      <el-table
        :data="tableData"
        :max-height="tableHeight"
        v-loading="listLoading"
        border
        style="width: 100%;"
        :header-cell-style="styleObj"
        :span-method="objectSpanMethod"
      >
        <el-table-column
          v-for="info in tableNameList"
          :key="info.key"
          :label="info.label"
          :property="info.key"
          align="center"
        >
          <!-- <el-table-column
            v-for="info1 in info.towTableNameList"
            :key="info1.key"
            :property="info1.key"
            :label="info1.label"
            align="center"
          >-->
          <template slot-scope="scope">{{scope.row[scope.column.property]}}</template>
          <!-- </el-table-column> -->
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
      showCodeData: "",
      tableHeight: "570px",
      ifMerge: false,
      spanArr: [], // 一个空的数组，用于存放记录的合并数
      pos: 0, // spanArr 的索引
      contentSpanArr: [],
      position: 0,
      productList: [],
      filters: {
        leadTime: "",
        leadTime2: "",
        backTime: "",
        productOne: "",
        resultCheck: "1",
        level: "1"
      },
      ifShowStaff: "",
      tableData: [],
      tableNameList: [],
      resultCheckList: [],
      resultCheckList1: [
        {
          statiType: "1",
          resultCheckName: "机构营销统计"
        },
        {
          statiType: "0",
          resultCheckName: "部门营销统计"
        },
        {
          statiType: "2",
          resultCheckName: "机构分发数据统计"
        }
      ],
      resultCheckList2: [
        {
          statiType: "1",
          resultCheckName: "机构营销统计"
        },
        {
          statiType: "2",
          resultCheckName: "机构分发数据统计"
        }
      ],
      tableName: [],
      listLoading: false,
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
        }
      ],
      options4: [
        {
          level: "1",
          label: "网点"
        }
      ]
    };
  },
  created() {
    if (sessionStorage.unitRank == "0") {
      this.resultCheckList = this.resultCheckList1;
    } else {
      this.resultCheckList = this.resultCheckList2;
    }
  },
  mounted() {
    this.getProductData();
    this.getTableData();
  },
  methods: {
    handleChange() {
      this.getTableData();
    },
    // 获取产品名称条件
    getProductData() {
      this.$axios
        .post("/banksys/productsend/queryproductnamelist.do", {})
        .then(res => {
          this.productList = res.data.list;
        })
        .catch(err => {
          this.$message.error("网络异常，请重试！！！");
        });
    },
    clearConditions() {
      this.filters.resultCheck = "1";
      this.filters.level = "1";
      this.filters.productOne = "";
      this.filters.backTime = "";
      this.filters.leadTime = "";
      this.filters.leadTime2 = "";
    },

    //合并单元格
    //row:行对象，带有一行所有数据，column:列对象
    //rowIndex:行索引，columnIndex:列索引
    //加载表格时从（0，0）开始，（0，1）···（1，0）,(1,1)···依次获取数据
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (this.filters.resultCheck !== "0" && this.ifMerge == true) {
        if (columnIndex === 0) {
          //每次走到第0列时给单元格加上rowspan和colspan属性
          const _row = this.contentSpanArr[rowIndex];
          const _col = _row > 0 ? 1 : 0;
          return {
            rowspan: _row,
            colspan: _col //相当于给给表格加上rowspan,colspan属性
          };
        }
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
    getSpanArr(data) {
      this.spanArr = []; //定义在vue的data中
      this.contentSpanArr = []; //定义在vue的data中
      if (data == null) {
        return;
      }
      if (this.filters.resultCheck === "0") {
        for (var i = 0; i < data.length; i++) {
          if (i === 0) {
            this.spanArr.push(1);
            this.pos = 0;
            this.contentSpanArr.push(1);
            this.position = 0;
          } else {
            // 判断当前元素与上一个元素是否相同
            if (data[i].subName === data[i - 1].subName) {
              this.spanArr[this.pos] += 1; //需要合并的行数
              this.spanArr.push(0); //新增被合并的行 0代表合并 1代表不合并
            } else {
              this.spanArr.push(1);
              this.pos = i; //新的需要合并的第几行数
            }
            // 判断当前元素与上一个元素是否相同
            // if (data[i].unitName === data[i - 1].unitName) {
            //   this.contentSpanArr[this.position] += 1; //需要合并的行数
            //   this.contentSpanArr.push(0); //新增被合并的行
            // } else {
            //   this.contentSpanArr.push(1);
            //   this.position = i; //新的需要合并的第几行数
            // }
          }
        }
      } else if (this.filters.resultCheck === "1") {
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
            if (data[i].subName === data[i - 1].subName) {
              this.contentSpanArr[this.position] += 1; //需要合并的行数
              this.contentSpanArr.push(0); //新增被合并的行
            } else {
              this.contentSpanArr.push(1);
              this.position = i; //新的需要合并的第几行数
            }
          }
        }
      } else if (this.filters.resultCheck === "2") {
        // if(this.filters.level ==){}
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
              this.spanArr.push(0); //新增被合并的行 0代表合并 1代表不合并
            } else {
              this.spanArr.push(1);
              this.pos = i; //新的需要合并的第几行数
            }
            // 判断当前元素与上一个元素是否相同
            if (data[i].subName === data[i - 1].subName) {
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
    //获取展示列表
    getTableData() {
      let ctx = this;
      let para = {
        statiType: this.filters.resultCheck,
        leadTime: this.filters.leadTime,
        leadTime2: this.filters.leadTime2,
        backTime: this.filters.backTime,
        productNameList: this.filters.productOne,
        level: this.filters.level
      };
      this.listLoading = true;
      axios({
        method: "post",
        url: "/banksys/productsend/queryproductanddisnum.do",
        data: para
      })
        .then(res => {
          console.log(res);
          // this.ifShowStaff = res.data.ifShowStaff;
          if (res.data.showRank === 2) {
            this.ifMerge = true;
          } else {
            this.ifMerge = false;
          }
          this.showCodeData = res.data.unitRank;
          if (this.showCodeData === 0) {
            this.optionList = this.options2;
          } else if (this.showCodeData === 1) {
            this.optionList = this.options3;
          } else if (this.showCodeData === 2) {
            this.optionList = this.options4;
          }
          if (res.data.code === "1001") {
            this.$message.success(res.data.msg);
            this.tableData = res.data.data;
            this.tableNameList = res.data.tableNameList;
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
  width: 200px !important;
}
.el-select {
  width: 200px !important;
}
.block {
  /* float: left; */
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
.input-box {
  width: 200px;
}
</style>