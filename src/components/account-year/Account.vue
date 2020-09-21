
<template>
  <div>
    <section>
      <!--工具条-->
      <el-col :span="24" class="toolbar">
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
                v-model="filters.statisticsTime"
                type="monthrange"
                range-separator="至"
                start-placeholder="开始月份"
                end-placeholder="结束月份"
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
                class="el-cascader-box"
              ></el-cascader>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="block">
              <span class="demonstration">级别:</span>
              <el-select v-model="filters.level" placeholder="请选择" @change="getUsers">
                <el-option
                  v-for="item in options2"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </div>
            <div class="block">
              <el-button type="warning" v-hasPermission="'butAISQuery'" v-on:click="getUsers" class="btncolor">查询</el-button>
            </div>
          </el-col>
        </el-form>
        <!--列表-->
        <el-table
          :data="tableData"
          :max-height="tableHeight"
          border
          v-loading="listLoading"
          style="width: 100%;"
          :header-cell-style="styleObj"
          :span-method="objectSpanMethod"
        >
          <el-table-column prop="subName" label="支行" v-if="ifShow" align="center">
            <template slot-scope="scope">{{scope.row.subName}}</template>
          </el-table-column>
          <el-table-column prop="unitName" label="开户银行" align="center">
            <template slot-scope="scope">{{scope.row.unitName}}</template>
          </el-table-column>
          <el-table-column prop="accountType" label="账户类型" align="center">
            <template slot-scope="scope">{{scope.row.accountType}}</template>
          </el-table-column>
          <el-table-column prop="yearlyNum" label="年检结束时，本机构存量账户数量" align="center">
            <template slot-scope="scope">{{scope.row.yearlyNum}}</template>
          </el-table-column>
          <el-table-column prop="area" label="未纳入年检账范围户的数量">
            <el-table-column prop="temporaryNum" label="临时存款账户数量" width="120" align="center">
              <template slot-scope="scope">{{scope.row.temporaryNum}}</template>
            </el-table-column>
            <el-table-column prop="frozenNum" label="法院、公安等部门冻结账户数量" width="120" align="center">
              <template slot-scope="scope">{{scope.row.frozenNum}}</template>
            </el-table-column>
            <el-table-column prop="dangerousNum" label="久悬账户数量" width="120" align="center">
              <template slot-scope="scope">{{scope.row.dangerousNum}}</template>
            </el-table-column>
            <el-table-column prop="newaccountNum" label="当年新开立账户数量" width="120" align="center">
              <template slot-scope="scope">{{scope.row.newaccountNum}}</template>
            </el-table-column>
            <el-table-column prop="subtotal" label="小计" width="120" align="center">
              <template slot-scope="scope">{{scope.row.subtotal}}</template>
            </el-table-column>
          </el-table-column>
          <el-table-column prop="shouldyearlyNum" label="应年检账户数量" align="center">
            <template slot-scope="scope">{{scope.row.shouldyearlyNum}}</template>
          </el-table-column>
          <el-table-column prop="results" label="年检结果">
            <el-table-column prop="qualifiedNum" label="年检合格账户数量" width="120" align="center">
              <template slot-scope="scope">{{scope.row.qualifiedNum}}</template>
            </el-table-column>
            <el-table-column prop="unqualifiedNum" label="年检不合格账户数量" width="120" align="center">
              <template slot-scope="scope">{{scope.row.unqualifiedNum}}</template>
            </el-table-column>
            <el-table-column prop="notcheckedNum" label="未年检账户数量" width="120" align="center">
              <template slot-scope="scope">{{scope.row.notcheckedNum}}</template>
            </el-table-column>
          </el-table-column>
          <el-table-column prop="yearlyRate" label="账户年检率" align="center">
            <template slot-scope="scope">{{scope.row.yearlyRate}}%</template>
          </el-table-column>
        </el-table>
      </el-col>
    </section>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      tableHeight: "570px",
      ///////////////////////
      list: [],
      listLoading: true,
      // 绑定的表格数据
      /*dynamicValidateForm: {
        domains: []
      },*/
      spanArr: [], // 一个空的数组，用于存放每一行记录的合并数
      pos: 0, // spanArr 的索引
      contentSpanArr: [],
      position: 0,
      ///////////////////////

      filters: {
        addTime: "",
        statisticsTime: "",
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
      // num: "",
      ifShow: false,
      listLoading: false,
      styleObj: {
        background: "#eef1f6",
        "border-color": "#dbdbdb",
        "text-align": "center"
      },
      options2: [
        {
          value: "1",
          label: "一级"
        },
        {
          value: "2",
          label: "二级"
        },
        {
          value: "3",
          label: "三级"
        }
      ]
    };
  },
  computed: {},

  mounted() {
    this.getBankList();
    this.getUsers();
  },
  methods: {
    handleChangeCode(e, form, thsAreaCode) {
      this.filters.checkCode = e;
    },
    // handleNum(num) {
    //   this.num = num;
    // },
    //合并单元格
    //row:行对象，带有一行所有数据，column:列对象
    //rowIndex:行索引，columnIndex:列索引
    //加载表格时从（0，0）开始，（0，1）···（1，0）,(1,1)···依次获取数据
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
    //获取用户列表
    getUsers() {
      if (this.filters.level === "3") {
        this.ifShow = true;
      } else {
        this.ifShow = false;
      }
      let ctx = this;
      let para = {
        addTime: this.filters.addTime,
        statisticsTime: this.filters.statisticsTime,
        level: this.filters.level,
        unitCodes: this.filters.checkCode,
        unitRank: 2
      };
      this.listLoading = true;
      axios({
        method: "post",
        url: "/banksys/accountyearly/queryletsaccountstat.do",
        data: para
      }).then(res => {
        if (res.data.code === "1001") {
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
    }
  }
};
</script>

<style scoped>
/* .query {
  float: right;
} */
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
.el-cascader-box {
  width: 270px;
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
</style>
 