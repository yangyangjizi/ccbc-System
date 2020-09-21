<template>
  <div>
    <!--工具条-->
    <el-col
      :span="24"
      class="toolbar"
    >
      <el-form :inline="true" :model="filters">
        <el-col :span="6">
          <div class="block">
            <span class="demonstration">添加时间</span>
            <el-date-picker
              v-model="filters.addTime"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="block">
            <span class="demonstration">统计时间</span>
            <el-date-picker
              v-model="filters.statisticalTime"
              type="monthrange"
              range-separator="至"
              start-placeholder="开始月份"
              end-placeholder="结束月份"
              format="yyyy-MM"
              value-format="yyyy-MM "
            ></el-date-picker>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="block">
            <span class="demonstration">银行名称:</span>
            <el-cascader
              placeholder="请输入查询名称"
              :options="filters.options"
              :props="filters.defaultData"
              @change="handleChangeCode"
              collapse-tags
            ></el-cascader>
          </div>
        </el-col>
        <el-col :span="6">
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
          <div class="block">
            <el-button type="warning" v-hasPermission="'butBASQuery'" v-on:click="getTableData" class="btncolor">查询</el-button>
          </div>
        </el-col>
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
          prop="subName"
          label="支行"
          v-if="ifShow"
          align="center"
          show-overflow-tooltip
        >
          <template slot-scope="scope">{{scope.row.subName}}</template>
        </el-table-column>
        <el-table-column label="开户银行" align="center" show-overflow-tooltip>
          <template slot-scope="scope">{{scope.row.unitName}}</template>
        </el-table-column>
        <el-table-column label="存款人类别" align="center" show-overflow-tooltip>
          <template slot-scope="scope">{{scope.row.depositorName}}</template>
        </el-table-column>
        <el-table-column label="拒绝开户" align="center">
          <template slot-scope="scope">{{scope.row.refuseopenAccount}}</template>
        </el-table-column>
        <el-table-column label="延长开户审查期限" align="center">
          <template slot-scope="scope">{{scope.row.extendopenAccounttime}}</template>
        </el-table-column>
        <el-table-column label="控制账户交易" align="center">
          <el-table-column label="暂停非柜面业务" align="center">
            <template slot-scope="scope">{{scope.row.business}}</template>
          </el-table-column>
          <el-table-column label="限制交易规模或频率" align="center">
            <template slot-scope="scope">{{scope.row.control}}</template>
          </el-table-column>
          <el-table-column label="停止支付" align="center">
            <template slot-scope="scope">{{scope.row.stop}}</template>
          </el-table-column>
          <el-table-column label="终止业务" align="center">
            <template slot-scope="scope">{{scope.row.over}}</template>
          </el-table-column>
        </el-table-column>
      </el-table>
    </el-col>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "BankAccount",
  data() {
    return {
      tableHeight: "570px",
      filters: {
        addTime: "",
        statisticalTime: "",
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
      tableData: [],
      listLoading: false,
      ifShow: false,
      spanArr: [], // 一个空的数组，用于存放每一行记录的合并数
      pos: 0, // spanArr 的索引
      contentSpanArr: [],
      position: 0,
      styleObj: {
        background: "#eef1f6",
        "border-color": "#dbdbdb",
        "text-align": "center"
      },
      optionList:[],
      options2: [
        {
          level: "1",
          label: "一级"
        },
        {
          level: "2",
          label: "二级"
        },
        {
          level: "3",
          label: "三级"
        }
      ],
      options3: [
        {
          level: "1",
          label: "一级"
        },
        {
          level: "2",
          label: "二级"
        }
      ],
      options4: [
        {
          level: "1",
          label: "一级"
        }
      ]
    };
  },
  created() {},
  mounted() {
    this.getBankList();
    this.getTableData();
  },
  methods: {
    handleChangeCode(e, form, thsAreaCode) {
      this.filters.checkCode = e;
    },
    // 动态合并行列
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      const sef = this;
      if (sef.filters.level === "3") {
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
    getSpanArr: function(data) {
      this.spanArr = []; //定义在vue的data中
      this.contentSpanArr = []; //定义在vue的data中
      if (data == null) {
        return;
      }
      const sef = this;
      if (sef.filters.level === "3") {
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
    // 获取银行名称列表
    getBankList() {
      axios
        .post("/banksys/system/common/queryunitcode.do", { returnType: "tree", tableType: "0"})
        .then(res => {
          this.filters.options = res.data.list;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //获取数据列表
    getTableData() {
      if (this.filters.level === "3") {
        this.ifShow = true;
      } else {
        this.ifShow = false;
      }
      let ctx = this;
      let para = {
        addTime: this.filters.addTime,
        statisticalTime: this.filters.statisticalTime,
        unitCodes: this.filters.checkCode,
        level: this.filters.level
      };
      this.listLoading = true;
      axios({
        method: "post",
        url: "/banksys/banckaccount/statisticalBankAccount.do",
        data: para
      }).then(res => {
        if (res.data.code === "1001") {
          if(res.data.unitRank === 0){
            this.optionList = this.options2
          } else if(res.data.unitRank === 1){
            this.optionList = this.options3
          }else if(res.data.unitRank === 2){
            this.optionList = this.options4
          }
          this.$message.success(res.data.msg);
          this.tableData = res.data.data;
          this.listLoading = false;
          ctx.getSpanArr(ctx.tableData);
        } else {
          this.$message.error(res.data.msg);
          this.listLoading = false;
        }
      }).catch(err => {
        this.$message.error("网络异常，请重试！！！")
      });
    },
    handleAdd() {
      this.$router.push({ path: "/BankAccountAdd" });
    }
  },
  components: {}
};
</script>

<style scoped>
.block .el-cascader{
width:270px
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
.el-table th {
  text-align: center;
  background-color: #eef1f6;
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
