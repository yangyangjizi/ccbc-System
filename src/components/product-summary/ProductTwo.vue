<template>
  <section>
    <!--工具条-->
    <el-col :span="24" class="toolbar">
      <el-form :inline="true" :model="filters" class="clearfix">
        <div class="block">
          <span class="demonstration">统计结果选择:</span>
          <el-select
            v-model="filters.resultCheck"
            @change="getTableData"
            placeholder="请选择"
          >
            <el-option
              v-for="item in resultCheckList"
              :key="item.resultCheckCode"
              :label="item.resultCheckName"
              :value="item.resultCheckCode"
            ></el-option>
          </el-select>
        </div>
        <div class="block" v-if="this.ifShowStaff === '4'">
          <span class="demonstration">员工姓名:</span>
          <el-input
            v-model="filters.staffName"
            placeholder="请输入员工姓名"
            class="input-box"
          ></el-input>
        </div>
        <div class="block" v-if="this.ifShowStaff === '4'">
          <span class="demonstration">员工编号:</span>
          <el-input v-model="filters.staffNo" class="input-box" placeholder="请输入员工编号"></el-input>
        </div>
        <div class="block">
          <span class="demonstration">银行名称:</span>
          <el-cascader
            placeholder="请输入银行名称"
            :options="filters.options"
            :props="filters.defaultData"
            @change="handleChangeCode"
            collapse-tags
            clearable
            class="input-box6"
          ></el-cascader>
        </div>
        <div class="block" v-show="this.filters.resultCheck == 'byTax'">
          <span class="demonstration">企业名称:</span>
          <el-input v-model="filters.taxName" class="input-box" placeholder="请输入企业名称"></el-input>
        </div>
        <div class="block" v-show="this.filters.resultCheck == 'byUnit'">
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
        <div :class="filters.level =='4'? 'query':'block'">
        <el-button
          type="warning"
          v-hasPermission="'proSBUquery'"
          v-on:click="getTableData"
        >查询</el-button>
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
      tableHeight: "570px",
      filters: {
        staffName: "",
        staffNo: "",
        checkCode: "",
        resultCheck: "byUnit",
        taxName: "",
        options: [],
        level: "1",
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
      tableNameList: [],
      resultCheckList: [
        {
          resultCheckCode: "byUnit",
          resultCheckName: "机构营销"
        },
        {
          resultCheckCode: "byTax",
          resultCheckName: "企业客户营销"
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
    clearConditions() {
      this.filters.staffName = "";
      this.filters.staffNo = "";
      this.filters.resultCheck = "byUnit";
      this.filters.taxName = "";
      this.filters.level = "1";
    },
  
    //合并单元格
    //row:行对象，带有一行所有数据，column:列对象
    //rowIndex:行索引，columnIndex:列索引
    //加载表格时从（0，0）开始，（0，1）···（1，0）,(1,1)···依次获取数据
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      const sef = this;
      if (this.ifShowStaff === "3" || this.ifShowStaff === "4") {
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
      if (data == null) {
        return;
      }
      const sef = this;
      if (this.ifShowStaff === "3" || this.ifShowStaff === "4") {
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
        unitCodes: this.filters.checkCode,
        level: this.filters.level,
        staffName: this.filters.staffName,
        staffNo: this.filters.staffNo,
        statType: this.filters.resultCheck,
        taxName: this.filters.taxName
      };
      this.listLoading = true;
      axios({
        method: "post",
        url: "/banksys/busimarket/statclientdata.do",
        data: para
      })
        .then(res => {
          this.ifShowStaff = res.data.ifShowStaff;
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